import "./UserRegistrationView.css";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import User from "../../../model/User";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Store/userSlice";
import { Link } from "react-router-dom";
import image from "../../../assets/Venice.jpg"

interface UserLogin {
    userID: string;
    email: string;
    password: string;
    token: string;
}

function UserReg() {
    let { register, handleSubmit, formState: { errors }, setError } = useForm<User>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className="NewUser" style={{ backgroundImage:`url(${image})` }}>
            <form className="register-card" onSubmit={handleSubmit(add)}>
            <h2>User Registration</h2>
                <p className="p">
                    <input type="text" placeholder="First name" {...register("firstName", { required: true, minLength: 3 })} />
                    {errors.firstName?.type === "required" ? <span>First Name is required</span> : ""}
                    {errors.firstName?.type === "minLength" ? <span>First Name is too short</span> : ""}
                    {errors.firstName?.type === "server" ? <span>{errors.firstName.message}</span> : ""}
                </p>
                <p className="p">
                    <input type="text" placeholder="Last name"{...register("lastName", { required: true, minLength: 3 })} />
                    {errors.lastName?.type === "required" ? <span>Last Name is required</span> : ""}
                    {errors.lastName?.type === "minLength" ? <span>Last Name is too short</span> : ""}
                    {errors.lastName?.type === "server" ? <span>{errors.lastName.message}</span> : ""}
                </p>
                <p className="p">
                    <input type="email"  placeholder="email"{...register("email", { required: true, min: 0, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
                    {errors.email?.type === "required" ? <span>Email is required</span> : ""}
                    {errors.email?.type === "pattern" ? <span>Invalid email format</span>: ""}
                    {errors.email?.type === "server" ? <span>{errors.email.message}</span> : ""}
                </p>
                <p>
                    <input type="text" placeholder="password"{...register("password", { required: true, minLength: 4})} />
                    {errors.password?.type === "required" ? <span>Password is required</span> : ""}
                    {errors.password?.type === "minLength" ? <span>Password is too short</span> : ""}
                    {errors.password?.type === "server" ? <span>{errors.password.message}</span> : ""}
                </p>
                <p>
                    <button className="Button" type="submit">Register</button>
                </p>
                <div>Already a member ? <Link to="/login">Login </Link></div>
            </form>

        </div>
    );

    async function add(user: User) {
        try {
          const emailCheck = await axios.get<User>(
            `http://localhost:4000/checkEmail?email=${user.email}`
          );
      
          if (emailCheck.data) {
            try {
              const userPromise = axios.post<User>(`http://localhost:4000/insertUser`, user);
              let response = await userPromise;
              console.log(JSON.stringify(response.data));  
              if(response)
              {
                axios.post<UserLogin>(`http://localhost:4000/auth/login`, user)
        .then(async response => {
            const token  =  response.data.token;
            const userID = response.data.userID;

            dispatch(setUser(response.data.userID));
                if (token) {
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                }
                else
                    delete axios.defaults.headers.common["Authorization"];
            localStorage.setItem("token", token);
            localStorage.setItem("userID", userID);

            const answer = await axios.get<User[]>(`http://localhost:4000/user/${userID}`);
            if (answer.data.length > 0) {
                const userData = answer.data[0];
                const firstName = userData.firstName;
                const lastName = userData.lastName;
                dispatch(setUser({ userID, firstName, lastName }));
              } else {
                console.error('No user data returned from the server.');
              }
            navigate("/holidays");
      
        console.log(JSON.stringify(response.data));}
        )
        .catch ( errors=>console.log((errors as AxiosError).response?.data))
              }
            } 
            catch (ex: any) {
              console.log(ex.message);
              console.log((ex as AxiosError).response?.data);
            }
          } else {
            console.log("Email is already taken");
          }
        }
        catch (ex: any) {
          console.log(ex.message);
          console.log((ex as AxiosError).response?.data);
          setError("email", {
              type: "server",
              message: "Email is already taken"
          });
        }
    }
}

export default UserReg;


 
