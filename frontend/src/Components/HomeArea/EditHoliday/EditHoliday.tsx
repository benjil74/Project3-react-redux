import "./EditHoliday.css";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface HolidaysDetails{
    holidayID: number, 
    place: string, 
    description:string, 
    startDate: Date, 
    endDate: Date, 
    imageName: string, 
    price: string,
    myImage: any
}

function EditHoliday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const navigate = useNavigate();
    let { register, handleSubmit, formState: { errors }, setError, setValue, getValues } = useForm<HolidaysDetails>();
    const { holidayID } = useParams();
    const [imageName, setImageName] = useState<string>("");
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const getHolidayByID= useCallback (async()=> {
        try {
        const userPromise = await axios.get<HolidaysDetails[]>(`http://localhost:4000/admin/holiday/${holidayID}`);
        let response = userPromise.data;
        console.log(response);
        
        setImageName(response[0].imageName);
        setValue("holidayID", response[0].holidayID);
        setValue("place", response[0].place);
        setValue("description", response[0].description);
        setValue("price", response[0].price);
        setValue("startDate", response[0].startDate);
        setValue("endDate", response[0].endDate);     
          } 
        catch (ex) {
          let x = ex as AxiosError;
          console.log(x.message);
        }
      },[])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setIsTokenAvailable(true);
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }
        getHolidayByID(); 
      }, [getHolidayByID]);
      
    return (
        <div> 
           { isTokenAvailable  ?  
          (
            <form onSubmit={handleSubmit(updateHoliday)}>
                <h2>Edit holiday</h2>
                <p className="ID">
                    ID <br/>
                    <input {...register("holidayID")}/>
                    </p>
                <p>
                    Place: <br />
                    <input type="text"  {...register("place", { required: true, minLength: 3 })}></input> 
                    {errors.place?.type === "required" ? <span>Name of place is required</span> : ""}
                    {errors.place?.type === "minLength" ? <span>Name is too short</span> : ""}
                    {errors.place?.type === "server" ? <span>{errors.place.message}</span> : ""}
                </p>
                <p>
                    Description: <br />
                    <textarea className="Description" {...register("description", { required: true, minLength: 30 })}/>
                    {errors.description?.type === "required" ? <span>Description is required</span> : ""}
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
                    <input type="date" {...register("endDate", { required: true, validate: () => new Date(getValues("startDate")) < new Date(getValues("endDate"))  })} />
                    {errors.endDate?.type === "required" ? <span>End Date is required</span> : ""}
                    {errors.endDate?.type === "validate" ? <span>End Date can't be before Start Date</span> : ""}
                    {errors.endDate?.type === "server" ? <span>{errors.endDate.message}</span> : ""}
                </p>
                <p>
                    Price: <br />
                    <input type="number" {...register("price", { required: true, min:0, max:10000 })}/>
                    {errors.price?.type === "required" ? <span>Price is required</span> : ""}
                    {errors.price?.type === "min" ? <span>Price is too low</span> : ""}
                    {errors.price?.type === "max" ? <span>Price is too high</span> : ""}
                    {errors.price?.type === "server" ? <span>{errors.price.message}</span> : ""}
                </p>
                <p>
                <span>Image:</span><br />
                    <img src={`http://localhost:4000/images/${imageName}`} alt={"no pic"} />
                    <input className="center-image" type="file" {...register("myImage", {required: false})} />
                </p>
                <p>
                    <button className="Button" type="submit">Update</button>
                </p>
            </form>
            ) 
            : 
            (
                <div className="not-logged-in-message">
                    <p>You are not logged in.</p>
                </div>
            )  }
        </div>
    );

    async function updateHoliday(holiday: HolidaysDetails) {
        try {
            const userPromise = axios.put<HolidaysDetails>(`http://localhost:4000/admin/updateHoliday`, holiday);
            await userPromise;
            if (holiday.myImage && holiday.myImage[0]) {
                await uploadImage(holiday);
        }
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
            window.location.reload();
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
export default EditHoliday;
