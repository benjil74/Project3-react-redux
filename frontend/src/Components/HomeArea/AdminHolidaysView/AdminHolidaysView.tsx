import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import "./AdminHolidaysView.css";
import { Link, NavLink} from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminActions } from "../../../Store/adminSlice";
import HolidaysDetails from "../../../model/HolidaysDetails";

function AdminHolidaysView(): JSX.Element {
    let holidays: HolidaysDetails[] = [];
    const role = localStorage.getItem("role"); 
    const dispatch = useDispatch();
    const adminHandler = () => {
        dispatch(adminActions.adminLogin());
      };
    const [state, setState] = useState({ holidays });
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState<number | null>(null);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          localStorage.removeItem("token");
        }, 1800000);
        return () => clearTimeout(timeoutId);
      }, []); 
    useEffect(() => {
        const token = localStorage.getItem("token");
        adminHandler();
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsTokenAvailable(true); 
        } else {
            delete axios.defaults.headers.common["Authorization"];
        };
        if (role==="admin") {
            setIsAdmin(true);
        }

        let getHolidays = async () => {
            try {
                const usersPromise = axios.get<HolidaysDetails[]>("http://localhost:4000/admin");
                let response = await usersPromise;
                holidays = response.data;
                holidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                setState({holidays});
            } catch (ex) {
                let x = ex as AxiosError;
                console.log(x.message)
            }
        };
        getHolidays();
    }, []);

    async function erase(id:any){
        try {
            axios.delete<HolidaysDetails[]>(`http://localhost:4000/admin/delete/${id}`);         
            window.location.reload();
        } 
        catch (error) {
            console.error('Error deleting holiday', error);
          }
    }

    return (
        <div >
           <div>
           {isTokenAvailable && isAdmin && (
            <button className="ButtonAdmin"> <Link className="Nav1" to="/admin/insertHoliday">Insert new holiday </Link></button>
           )}
            </div>
           <div className="holidaysView">
            {isTokenAvailable && isAdmin && state.holidays.map((holiday: HolidaysDetails) => {
                let st: Date = new Date(holiday.startDate);
                let et: Date = new Date(holiday.endDate);
                return (
                    <div key={holiday.holidayID} className="holiday-admin-card">
                        <img src={`http://localhost:4000/images/${holiday.imageName}`} alt={holiday.place} />
                        <h3>{holiday.place}</h3>
                        <p><span className="title">Dates: {st.toLocaleDateString("en-UK")} - {et.toLocaleDateString("en-UK")}</span></p>
                        <p>{holiday.description}</p>
                        <div className="price-admin-card">
                        <p>${holiday.price}</p>
                        </div>
                        <button className="ButtonAdmin"><NavLink className="Nav1" to={`/admin/editHoliday/${holiday.holidayID}`}>Edit</NavLink></button>
                        <button className="ButtonAdmin" onClick={() => setShowConfirmation(holiday.holidayID)}>Delete</button>
                        {showConfirmation === holiday.holidayID && (
                        <div className="confirmation-modal">
                        <p>Are you sure you want to delete this holiday?</p>
                        <button className="ButtonAdmin" onClick={()=>erase(holiday.holidayID)}>Yes</button>
                        <button className="ButtonAdmin" onClick={() => setShowConfirmation(0)}>No</button>
                        </div>
      )}
                    </div>
                );
            })}
            {!isTokenAvailable && (
                <div>
                    <p>You are not logged in.</p>
                </div>
            )}
            {!isAdmin && (
                <div>
                    <p>You are not admin.</p>
                </div>
            )}
        </div>
        </div>);
}
export default AdminHolidaysView;