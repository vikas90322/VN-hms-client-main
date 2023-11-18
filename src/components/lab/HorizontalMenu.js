import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import {ImLab} from 'react-icons/im'
import "./CSS/HorizontalMenu.css"; // Create a new CSS file for styling

const HorizontalMenu = ({ onClose }) => {
  return (
    <div className="horizontal-menu">
         <FaTimes className="close-icon" onClick={onClose} />
      <ul>
        <li className="icon_1">
          <Link to="/" ><ImLab/></Link>
        </li>
        <li>
          <Link to="/">Option 2</Link>
        </li>
        <li>
          <Link to="/">Option 3</Link>
        </li>
        {/* Add more options as needed */}
      </ul>
      
    </div>
  );
};

export default HorizontalMenu;
