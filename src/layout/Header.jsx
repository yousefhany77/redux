import { NavLink, useNavigate } from "react-router-dom";
import "./layout.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <h2 onClick={() => navigate("/")} className="title">
        Redux Blog
      </h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/post">Post</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
