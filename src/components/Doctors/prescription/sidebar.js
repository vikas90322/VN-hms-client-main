// import React from "react";
// import { Link } from "react-router-dom";
// import "./sidebar.css";
// import { FaWpforms } from "react-icons/fa";
// import { GiTestTubes } from "react-icons/gi";
// import { ImAttachment } from "react-icons/im";
// import { CgFileDocument } from "react-icons/cg";
//  import  Case from "./Case.png";
//  import  test from "./test.png"; 
//  import  attachment from "./attachment.png";
//  import  form from "./test.png"; 
 
// const Sidebar = () => {
//   return (
//     <div className="sidebar-docktor">
//       <Link to="/case" className="doc-link-nav">
//         {" "}
//         <div className="sidebar-item">
//           <span className="sidebar-icon">
//             <img src={Case} alt="Case"/>
//           </span>
//           Case
//         </div>
//       </Link>
//       <Link to="/doctests" className="doc-link-nav">
//         {" "}
//         <div className="sidebar-item">
//           <span className="sidebar-icon">
//           <img src={test} alt="test"/>
//           </span>
//           Tests
//         </div>
//       </Link>
//       <Link to="/attach" className="doc-link-nav">
//         {" "}
//         <div className="sidebar-item">
//           <span className="sidebar-icon">
//           <img src={attachment} alt="attachment"/>
//           </span>
//           Attach
//         </div>
//       </Link>
//       <Link to="/forms" className="doc-link-nav">
//         {" "}
//         <div className="sidebar-item">
//           <span className="sidebar-icon">
//           <img src={form} alt="form"/>
//           </span>
//           Forms
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Sidebar;







import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

import Case from "./Case.png";
import test from "./test.png";
import attachment from "./attachment.png";
import form from "./test.png";

const Sidebar = () => {
  return (
    <div className="sidebar-docktor">
      <Link to="/case" className="doc-link-nav">
        <div className="sidebar-item">
          <span className="sidebar-icon">
            <img src={Case} alt="Case" />
          </span>
          Case
        </div>
      </Link>
      <Link to="/doctests" className="doc-link-nav">
        <div className="sidebar-item">
          <span className="sidebar-icon">
            <img src={test} alt="test" />
          </span>
          Tests
        </div>
      </Link>
      <Link to="/attach" className="doc-link-nav">
        <div className="sidebar-item">
          <span className="sidebar-icon">
            <img src={attachment} alt="attachment" />
          </span>
          Attach
        </div>
      </Link>
      <Link to="/forms" className="doc-link-nav">
        <div className="sidebar-item">
          <span className="sidebar-icon">
            <img src={form} alt="form" />
          </span>
          Forms
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;

