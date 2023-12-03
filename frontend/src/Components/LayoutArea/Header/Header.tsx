import AdminMenu from "../AdminMenu/AdminMenu";
import Menu from "../Menu/Menu";
import "./Header.css";
import { useSelector } from "react-redux";

function Header(): JSX.Element {
    const isAdmin: any = useSelector((state: any) => state.admin.isAdmin);

    return (
        <div className="Header">
            {!isAdmin &&<Menu  />}
        {isAdmin &&<AdminMenu  />}
        </div>
    );
}

export default Header;
