import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {

  return (
    <div >
      <nav className="Menu" >
        <span className="Logo">
          < img src="/Logo-NGT.svg" alt="logo"/>
        </span>
        <NavLink className="Nav" to="/userReg">User Registration</NavLink>
        <NavLink className="Nav" to="/login">User Login</NavLink>
        <NavLink className="Nav" to="/holidays">Holidays</NavLink>     
      </nav>
    </div>
  );
}

export default Menu;


