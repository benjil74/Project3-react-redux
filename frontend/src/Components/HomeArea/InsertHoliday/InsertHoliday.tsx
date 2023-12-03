import "./InsertHoliday.css";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import image from "../../../assets/Elephant.jpg";
import { useState } from "react";

interface HolidaysDetails{
    holidayID: number, 
    place: string, 
    description:string, 
    startDate: Date, 
    endDate: Date, 
    imageName: string, 
    price: number,
    myImage: any
}

function InsertHoliday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const navigate = useNavigate();
    const role = localStorage.getItem("role"); 
    const [isAdmin, setIsAdmin] = useState(false);
    let { register, handleSubmit, formState: { errors }, setError, getValues } = useForm<HolidaysDetails>();
    let isTokenAvailable = true;
    const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        else {
            delete axios.defaults.headers.common["Authorization"];
            isTokenAvailable=false;
        };
        if (role==="admin") {
            setIsAdmin(true);
        };

    return (
        <div className="AddHoliday" style={{ backgroundImage:`url(${image})` }}>
             
           { isTokenAvailable && isAdmin ? (
            <form className="add-card" onSubmit={handleSubmit(addHoliday)}>
                <h2>Insert holiday</h2>
                <p>
                    Place: <br />
                    <input type="text" {...register("place", { required: true, minLength: 3 })} />
                    {errors.place?.type === "required" ? <span>Name of place is required</span> : ""}
                    {errors.place?.type === "minLength" ? <span>Name is too short</span> : ""}
                    {errors.place?.type === "server" ? <span>{errors.place.message}</span> : ""}
                </p>
                <p>
                    Description: <br />
                    <input type="text" {...register("description", { required: true, minLength: 30 })} />
                    {errors.description?.type === "required" ? <span>Name is required</span> : ""}
                    {errors.description?.type === "minLength" ? <span>Description is too short</span> : ""}
                    {errors.description?.type === "server" ? <span>{errors.description.message}</span> : ""}
                </p>
                <p>
                    Start Date: <br />
                    <input type="date"  {...register("startDate", { required: true, validate: () => new Date(getValues("startDate")) >= new Date(today) })} />
                    {errors.startDate?.type === "required" ? <span>Start date is required</span> : ""}
                    {errors.startDate?.type === "validate" ? <span>Start Date can't be before today</span> : ""}
                    {errors.startDate?.type === "server" ? <span>{errors.startDate.message}</span> : ""}
                </p>
                <p>
                    End Date: <br />
                    <input type="date" {...register("endDate", { required: true, validate: () => new Date(getValues("startDate")) < new Date(getValues("endDate")) })} />
                    {errors.endDate?.type === "required" ? <span>End Date is required</span> : ""}
                    {errors.endDate?.type === "validate" ? <span>End Date can't be before Start Date</span> : ""}
                    {errors.endDate?.type === "server" ? <span>{errors.endDate.message}</span> : ""}
                </p>
                <p>
                    Price: <br />
                    <input type="number" {...register("price", { required: true, min:1, max:10000 })} />
                    {errors.price?.type === "required" ? <span>Price is required</span> : ""}
                    {errors.price?.type === "min" ? <span>Price is too low</span> : ""}
                    {errors.price?.type === "max" ? <span>Price is too high</span> : ""}
                    {errors.price?.type === "server" ? <span>{errors.price.message}</span> : ""}
                </p>
                <p>
                    Image:<br />
                    <input type="file" {...register("myImage", {required:true})} />
                    {errors.myImage?.type === "required" ? <span>Image is required</span> : ""}
                </p>
                <p>
                    <button className="Button" type="submit">Insert</button>
                </p>
            </form>)
            : 
            (
                <div>
                    <p>You are not logged in.</p>
                </div>
            )  }
            {!isAdmin && (
                <div>
                    <p>You are not admin.</p>
                </div>
            )}
        </div>
    );

    async function addHoliday(holiday: HolidaysDetails) {
        try {
            const userPromise = axios.post<HolidaysDetails>(`http://localhost:4000/admin/insertHoliday`, holiday);
            let response = await userPromise;
            console.log(JSON.stringify(response.data));
            await uploadImage(holiday);
        }
        catch (ex: any) {
            console.log(ex.message);
            console.log((ex as AxiosError).response?.data);
            if (ex.response.data.startDate)
                setError("startDate", {
                    type: "server",
                    message: ex.response.data.startDate
                });
            if (ex.response.data.birth_date)
                setError("endDate", {
                    type: "server",
                    message: ex.response.data.endDate
                });
        }
        finally {
            navigate("/admin/holidays");
        }
       

        async function uploadImage(holiday: HolidaysDetails) {
            try {
                const myFormData = new FormData();
                myFormData.append("image", holiday.myImage[0]);
                axios.post(`http://localhost:4000/admin/postImage/${holiday.place}`, myFormData);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    }
}

export default InsertHoliday;