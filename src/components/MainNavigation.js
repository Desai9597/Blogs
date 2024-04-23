import { NavLink } from 'react-router-dom';
import logo from "../assets/blog_logo.jpg";

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <img src={logo} alt="Blogs" />
      <nav>
        <ul>
          <li>
            <NavLink
              to="/Blogs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Blogs/posts"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
