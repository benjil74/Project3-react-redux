import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Menu.css";

function Menu() {
  const firstName = useSelector((state: any) => state.user.firstName);
  const lastName = useSelector((state: any) => state.user.lastName);
  return (
    <div >
      <nav className="Menu" >
        <span className="Logo">
          < img src="/Logo-NGT.svg" alt="logo"/>
        </span>
        <div className="Nav">{`${firstName} ${lastName}`}</div>
        <NavLink className="Nav" to="/userReg">User Registration</NavLink>
        <NavLink className="Nav" to="/login">User Login</NavLink>
        <NavLink className="Nav" to="/holidays">Holidays</NavLink>     
      </nav>
    </div>
  );
}

export default Menu;