import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { adminActions } from "../../../Store/adminSlice";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../../Store/userSlice";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/NewYork.jpg";
import "./Login.css"

interface UserLogin {
    userID: string;
    email: string;
    password: string;
    token: string;
    role: string;
}

function LoginApp(){
    let { register, handleSubmit, formState: { errors }, setError } = useForm<UserLogin>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const adminHandler = () => {
        dispatch(adminActions.adminLogin());
      };
      const userHandler = () => {
        dispatch(adminActions.adminLogout());
      };
    return (
        <div className="LoginUser" style={{ backgroundImage:`url(${image})` }}>  
            <form className="login-card" onSubmit={handleSubmit(loginUser)}>
            <h2>USER LOGIN</h2>
                <p>
                    <input type="email" placeholder="email"{...register("email", { required: true, minLength: 3, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} />
                    {errors.email?.type === "minLength" ? <span>Name is too short</span> : ""}
                    {errors.email?.type === "pattern" ? <span>Invalid email format</span>: ""}
                </p>
                <p>
                    <input type="password" placeholder="password"{...register("password", { required: true, minLength: 4 })} />
                </p>
                <div>
                {errors.email?.type === "server" ? <span>{errors.email.message}</span> : ""}
                {errors.password?.type === "server" ? <span>{errors.password.message}</span> : ""}
                </div>
                <p>
                    <button className="ButtonLogin" type="submit">Login</button>
                    <button className="ButtonLogout" type="button" onClick={logout}>Logout</button>
                </p>
                <div>New User ? <Link to="/userReg">Registration </Link></div>
            </form>
        </div>
    );

    async function loginUser(user: UserLogin) {
        try {
            
            const response = await axios.post<UserLogin>(`http://localhost:4000/auth/login`, user);
            const token = response.data.token;
            const userID = response.data.userID;
            const role = response.data.role;
            dispatch(setUser(response.data.userID));
            localStorage.removeItem("token");
            if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } else {
            delete axios.defaults.headers.common["Authorization"];
            }
            console.log(response.data);
            localStorage.setItem("token", token);
            localStorage.setItem("userID", userID);
            localStorage.setItem("role", role);
            if (role === "admin")
            {
                adminHandler();
                navigate("/admin/holidays");
            }
            else
            {   
                userHandler();
                navigate("/holidays");
            }  
            console.log(response.data);
            } 
            catch (ex: any) {
                console.log(ex.message);
                console.log((ex as AxiosError).response?.data);
                setError("email", {
                    type: "server",
                    message: "Incorrect email or password"
                });
              }
        }
       
        function logout() {
            dispatch(clearUser());
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
        }
    };
export default LoginApp;