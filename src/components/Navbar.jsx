import { Link, NavLink } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
import "./../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaBitcoin className="logo-icon" />
        <Link to="/" className="brand">Crypto Live App</Link>
      </div>
      <div className="navbar-right">
        <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
        <NavLink to="/search" className="nav-link" activeclassname="active">Search</NavLink>
        <NavLink to="/about" className="nav-link" activeclassname="active">About</NavLink>
      </div>
    </nav>
  );
}
