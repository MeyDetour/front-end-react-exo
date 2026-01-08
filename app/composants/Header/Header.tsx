 
import "./header.css";
import { Link } from "react-router";

export default function Header() { 
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
           
          <div className="header-title">
            <h1>DETOUR Mey</h1> 
          </div>
        </div>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li> <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/participants">Participants</Link>
          </li>
        </ul>
      </div>
      <div className="header-line"></div>
    </header>
  );
}
