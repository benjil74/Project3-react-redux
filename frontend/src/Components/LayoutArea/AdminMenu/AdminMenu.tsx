import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AdminMenu.css";

function AdminMenu() {
  const firstName = useSelector((state: any) => state.user.firstName);
  const lastName = useSelector((state: any) => state.user.lastName);
  return (
    
    <div className="Menu">
      <nav>
      <span className="Logo">
          < img src="/Logo-NGT.svg" alt="logo"/>
        </span>
            <div className="Nav">{`${firstName} ${lastName}`}</div>
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


