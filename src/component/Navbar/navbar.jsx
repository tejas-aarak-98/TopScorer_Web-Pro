import "./navbar.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

        const logout = ()=>{

       Cookies.remove("myToken");
  
       navigate("/login")

}

      return (
    <>
      <nav className="navbar">
        <div className="logo"> <Link className=" text-white linktab" to={"/"}>TopScorer</Link></div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li> <Link className=" text-white linktab" to={"/"}>Home</Link></li>
          <li> <Link className=" text-white linktab" to={"/"}>About</Link></li>
          <li><Link to="/leaderboard" className="linktab text-white">Leaderboard</Link></li>

          <li className="mobile-only"><button className="login-bttn" onClick={logout}>Logout</button></li>

        </ul>

        <button className="login-btn desktop-only" onClick={logout}>LogOut</button>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );

}

export default Navbar;
