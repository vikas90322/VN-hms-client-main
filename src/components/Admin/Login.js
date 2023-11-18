import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import hospitaldashboard from "./Jananiclinic.jpg";
import "./Login.css";
import VNC from "../../assests/VNC.jpg";
import { BASE_URL } from "../../services/Helpers";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    role: "Option",
    username: "",
    password: "",
  });
  const [roleError, setRoleError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [/*authenticated*/, setAuthenticated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setRoleError("");
    setLoginError(""); // Clear any previous login error when the user makes a change
  };


  useEffect(() => {
    localStorage.clear()
  }, []);

  const roleEmailHeadingMap = {
    doctor: "Doctor Id",
    laboratory: "Laboratory Id",
    pharmacy: "Pharmacy Id",
    admin: "Admin Id",
    reception: "Reception Id",
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const enteredRole = formData.role;
    const enteredId = formData.username;
    const enteredPassword = formData.password;
    try {
      // Send a request to retrieve staffid, password, and specialization
      const response = await axios.post(
        `${BASE_URL}/api/getCredentials`,
        {
          role: enteredRole,
          username: enteredId,
        }
      );

      if (response.data.success) {
        const { staffid, password, specialization } = response.data.credentials;

        // Check if the entered password matches the retrieved password
        if (enteredPassword === password) {
          // Authentication successful
          setAuthenticated(true);

          // Show a success alert
          toast.success("Login successful!");
          console.log("Lid : " + enteredId);
          // Retrieve the staffid from localStorage
          localStorage.setItem("staffid", enteredId);
          const storedStaffId = localStorage.getItem("staffid");


          // Check if it exists in localStorage
          if (storedStaffId) {
            console.log("Staff ID in localStorage:", storedStaffId);
          } else {
            console.log("Staff ID not found in localStorage");
          }

         
          if (specialization === "doctor") {
            navigate("/appointments", { state: { username: enteredId } });
          } else if (specialization === "admin") {
            navigate("/Frontpage", { state: { username: enteredId } });
          } else if (specialization === "laboratory") {
            navigate("/FindReports", { state: { username: enteredId } });
          } else if (specialization === "pharmacy") {
            navigate("/BillingDashboard", { state: { username: enteredId } });
          } else if (specialization === "reception") {
            // Check if staffid is correct
            if (enteredId === staffid) {
              navigate("/Patient", { state: { username: enteredId } });
            } else {
              setAuthenticated(false);
              setLoginError("Invalid username or password. Please try again.");
            }
          }
        } else {
          // Authentication failed due to incorrect password
          setAuthenticated(false);
          setLoginError("Invalid password. Please try again.");
        }
      } else {
        // Authentication failed due to invalid credentials
        setAuthenticated(false);
        if (response.data.message === "Invalid credentials") {
          setLoginError("Invalid username or password. Please try again.");
        } else {
          setLoginError(
            "An error occurred while logging in. Please try again later."
          );
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAuthenticated(false);
      setLoginError("Invalid username or password. Please try again.");
    }
  };
  return (
    <div className="admin">
      {/* <img
        style={{
          width: "190vh",
          height: "100vh",

        }}
        src={hospitaldashboard}
        alt="logo"
      /> */}
      <img className="img-login"
        style={{
          width: "145vh",
          height: "100vh",

        }}
        // src={hospitaldashboard}
        src={VNC}
        alt="logo"
      />
      <div className="signinpage">
        <form className="forml" onSubmit={handleLogin}>
          <h2 className="headinggs">VN clinic</h2>
          <h3 className="headingg">Sign in</h3>
          <br />
          <p>
            <label
              htmlFor="role"
              style={{
                textAlign: "left",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            ></label>
            <select
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "150px",
                height: "30px",
                color: "black",
                fontSize: "1rem",
                fontWeight: "bold",
                marginLeft: "15vw",
              }}
            >
              <option value="Option">Select</option>
              <option value="doctor"><b>Doctor</b></option>
              <option value="admin"><b>Admin</b></option>
              <option value="laboratory"><b>Laboratory</b></option>
              <option value="pharmacy"><b>Pharmacy</b></option>
              <option value="reception"><b>Reception</b></option>
            </select>

            {roleError && <p className="error-message">{roleError}</p>}
          </p>
          <p>
            <label
              htmlFor="username"
              className="id-label"
            >
              {roleEmailHeadingMap[formData.role] || "Email"}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="logininput_1"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Your User name"
            />
          </p>
          <p>
            <label
              htmlFor="password"
              className="id-label"
            >
              Password
            </label>
            <div style={{  }}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="logininput_1"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
              <span
                style={{
                  position: "absolute",
                  right: "8vw",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              >

              </span>
            </div>
          </p>
          <br></br>
          <p className="text-center mt-4">
            <button className="buttonn_1" type="submit">
              Login
            </button>
          </p>
          <p className="error-message">{loginError}</p>
        </form>
        <footer></footer>
      </div>
      <ToastContainer />
    </div>
  );
}
