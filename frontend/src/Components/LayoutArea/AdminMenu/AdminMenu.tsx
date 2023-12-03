import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu() {

  return (
    <div className="Menu">
      <nav>
      <span className="Logo">
          < img src="/Logo-NGT.svg" alt="logo"/>
        </span>
            <NavLink className="Nav" to="/admin/users">Users</NavLink>
            <NavLink className="Nav" to="/admin/holidays">Admin holidays</NavLink>
            <NavLink className="Nav" to="/admin/insertHoliday">Insert holiday</NavLink>
            <NavLink className="Nav" to="/admin/chart">Chart</NavLink>
            <NavLink className="Nav" to="/login">User Login</NavLink>
        
      </nav>
    </div>
  );
}

export default AdminMenu;


