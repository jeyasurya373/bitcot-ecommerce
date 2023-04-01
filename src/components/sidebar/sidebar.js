import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./sidebar.css";
import Icon from "../../assets/images/icons/Path.svg";

function SideBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="sideBarContainer">
      <div onClick={handleDropdownClick} className="sidebaricons">
        <img src={Icon} className="sidebaricon" alt="Icons" />
        <h1 className="sideBarHeading">Ecommerce</h1>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/small-monochrome-icon/drop-down-arrow-4.png"
          className="sidebarDropdownicon"
          alt="Icons"
        />
      </div>
      {dropdownOpen && (
        <ul className={`sideBarWrapper ${dropdownOpen ? "visible" : ""}`}>
          <li className="SideBaritem">
            <NavLink
              to="/"
              className={`sidebarButton ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Product List
            </NavLink>
          </li>
          <li className="SideBaritem">
            <NavLink
              to="/add"
              className={`sidebarButton ${
                location.pathname === "/add" ? "active" : ""
              }`}
            >
              Add Product
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default SideBar;
