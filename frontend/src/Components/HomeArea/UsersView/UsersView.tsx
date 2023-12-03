import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import "./UsersView.css";
import User from "../../../model/User";

function UsersView(): JSX.Element {
    let users: User[] = [];
    let isDataError: boolean = false;
    const role = localStorage.getItem("role");
    const [isAdmin, setIsAdmin] = useState(false);

    let [state, setState] = useState({ users });

    useEffect(() => {
        let getUsers = async () => {
            const token = localStorage.getItem("token");
    if (role==="admin") {
            setIsAdmin(true);
    };

    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];

            try {
                const usersPromise = axios.get<User[]>("http://localhost:4000/admin/users");
                let response = await usersPromise;
                users = response.data;
            }
            catch (ex) {
                let x = ex as AxiosError;
                isDataError = true;
                console.log(`${x.response?.status} --- ${x.message}`)
            }
            finally {
                setState({ users });
            }
        }
        getUsers();
    }, []);

    return (
        <div>
        {isAdmin && (
        <div className="UsersView">
            {
                isDataError ? <h2>Data error</h2>
                    :
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> Email</th>
                                <th> Role </th>
                            </tr>
                        </thead>
                        <tbody >
                            {state.users && state.users.map((user: User) => {
                                return (
                                    <tr key={user.userID}> 
                                        <td>{user.userID}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            }
            
        </div>
        )}
        {!isAdmin && (
          <div>
              <p>You are not admin.</p>
          </div>
      )}
    </div>
    );
}
export default UsersView;
