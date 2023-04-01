import "./header.css";
import Logo from "../../assets/images/thumbnails/Logo.svg";
import Menu from "../../assets/images/icons/icon-menu.svg";
import Search from "../../assets/images/icons/magnifying-glass.png";
import Notification from "../../assets/images/icons/notification.png";
import Globe from "../../assets/images/icons/icon-globe.png";
import Settings from "../../assets/images/icons/setting.png";
import ProfileImg from "../../assets/images/thumbnails/profile-img.png";

function Header() {
  const users = JSON.parse(localStorage.getItem("users"));
  const email = users[0].email;
  const username = email.split("@")[0];
  console.log(username, "header");

  return (
    <div className="headerWrapper">
      <div className="headerLeft">
        <img src={Logo} className="logoImg" alt="header_Logo" />
      </div>
      <div className="headerCenter">
        <div className="headerCenterLeft">
          <img src={Menu} className="menuIcon" alt="menu_Icon" />
          <input type="text" className="searchInput" placeholder="Search" />
          <img src={Search} className="searchIcon" alt="search_Icon" />
        </div>
        <div className="headerCenterRight">
          <img src={Notification} className="icons" alt="Icons" />
          <img src={Globe} className="icons" alt="Icons" />
          <img src={Settings} className="icons" alt="Icons" />
        </div>
      </div>
      <div className="headerRight">
        <img src={ProfileImg} className="profileIcon" alt="Icons" />
        <p className="userName">
          Hi,<span>{username}</span>
        </p>
      </div>
    </div>
  );
}

export default Header;
