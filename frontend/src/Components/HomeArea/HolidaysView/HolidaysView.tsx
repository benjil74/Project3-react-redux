import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import "./HolidaysView.css";
import HolidaysDetails from "../../../model/HolidaysDetails";
import FollowersButton from "../FollowersButton/FollowersButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Parallax } from 'react-parallax';
import image from "../../../assets/reka.jpg"

function HolidaysView(): JSX.Element {
    let holidays: HolidaysDetails[] = [];
    const userID = useSelector((state: any) => state.user.userID);
    const itemsPerPage = 10; 
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [state, setState] = useState({ holidays });
    const [isTokenAvailable, setIsTokenAvailable] = useState(false);
    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);
    const [isClicked4, setIsClicked4] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          localStorage.removeItem("token");
        }, 1800000);
        return () => clearTimeout(timeoutId);
      }, []); 
    useEffect(() => {
        const token = localStorage.getItem("token"); 
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsTokenAvailable(true); 
        } else {
            delete axios.defaults.headers.common["Authorization"];
            navigate("/");
        }
        
        async function getHolidays(){
            try {
                const usersPromise = axios.get<HolidaysDetails[]>("http://localhost:4000/holidays");
                let response = await usersPromise;
                holidays = response.data;
                holidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const holidaysForPage = holidays.slice(startIndex, endIndex);

                setState({ holidays: holidaysForPage });
                setIsClicked1(!isClicked1);
            } catch (ex) {
                ex as AxiosError;
            }
        };
        getHolidays();
    }, [currentPage, navigate]);

    async function allHolidays(){
        try {
            const usersPromise = axios.get<HolidaysDetails[]>("http://localhost:4000/holidays");
            let response = await usersPromise;
            holidays = response.data;
            holidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const holidaysForPage = holidays.slice(startIndex, endIndex);

            setState({ holidays: holidaysForPage });
            setIsClicked1(!isClicked1);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
        } catch (ex) {
            ex as AxiosError;
        }}

    async function myHolidays(){
        try {
            const usersPromise = axios.get<HolidaysDetails[]>("http://localhost:4000/holidays");
                let response = await usersPromise;
                holidays = response.data;
            const likedHolidaysResponse = await axios.get<HolidaysDetails[]>(
                `http://localhost:4000/followers/liked/${userID}`
            );
            const likedHolidayIDs = likedHolidaysResponse.data.map(
                (likedHoliday: HolidaysDetails) => likedHoliday.holidayID
            );
            const likedHolidays = holidays.filter((holiday) =>
            likedHolidayIDs.includes(holiday.holidayID)
        );
        likedHolidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const holidaysForPage = likedHolidays.slice(startIndex, endIndex);
            setState({ holidays: holidaysForPage });
            setIsClicked2(!isClicked2);
            setIsClicked1(false);
            setIsClicked3(false);
            setIsClicked4(false);
        } catch (ex) {
            ex as AxiosError;
        }
    }
    async function futureHolidays(){
        try {
            const usersPromise = axios.get<HolidaysDetails[]>("http://localhost:4000/futureHolidays");
            let response = await usersPromise;
            holidays = response.data;
            holidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const holidaysForPage = holidays.slice(startIndex, endIndex);

            setState({ holidays: holidaysForPage });
            setIsClicked3(!isClicked3);
            setIsClicked2(false);
            setIsClicked1(false);
            setIsClicked4(false);
        } catch (ex) {
            ex as AxiosError;
        }
    }
    async function currentHolidays(){
        try {
            const usersPromise = axios.get<HolidaysDetails[]>("http://localhost:4000/currentHolidays");
            let response = await usersPromise;
            holidays = response.data;
            holidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const holidaysForPage = holidays.slice(startIndex, endIndex);

            setState({ holidays: holidaysForPage });
            setIsClicked4(!isClicked4);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked1(false);
        } catch (ex) {
            ex as AxiosError;
        }
    }
    return (
         
        <div >
            <Parallax  bgImage={image} bgImageAlt="" strength={200}>
            {isTokenAvailable && (
                <div className="Intro">
                    YOUR TRAVEL <br></br>
                    STARTS HERE
            </div>
            )}
            </Parallax>
            <div className="Buttons">
                <button className={`ButtonView Button2 ${isClicked2 ? 'clicked' : ''}`} type="submit" onClick={myHolidays}>Holidays I Follow</button>  
                <button className={`ButtonView Button3 ${isClicked3 ? 'clicked' : ''}`} type="submit" onClick={futureHolidays}>Future Holidays</button>
                <button className={`ButtonView Button4 ${isClicked4 ? 'clicked' : ''}`} type="submit" onClick={currentHolidays}>Current Holidays</button>
                <button className={`ButtonView Button1 ${isClicked1? 'clicked' : ''}`} type="submit" onClick={allHolidays}>All Holidays</button>
            </div>
           <div className="HolidaysView">
            {isTokenAvailable && state.holidays.map((holiday: HolidaysDetails) => {
                let st: Date = new Date(holiday.startDate);
                let et: Date = new Date(holiday.endDate);             
                return (
                    <div key={holiday.holidayID} className="holiday-card">
                        <img src={`http://localhost:4000/images/${holiday.imageName}`} alt={holiday.place} />
                        <span className="folBut"><FollowersButton userId={userID} holidayId={holiday.holidayID}/></span>
                        <h2>{holiday.place}</h2>
                        <p><span className="title">Dates: {st.toLocaleDateString("en-UK")} - {et.toLocaleDateString("en-UK")}</span></p>
                        <p className="Description">{holiday.description}</p>
                        <div className="price-card">
                        <p>${holiday.price}</p>
                        </div>
                    </div>
                );
            })}
                 </div>
            {isTokenAvailable && (
                <div className="pagination-container">
                    <div className="pagination">
                        <button className="pagButton"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button className="pagButton"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={state.holidays.length < itemsPerPage}>
                            Next
                        </button>
                    </div>
                </div>
            )}
       
            {!isTokenAvailable && (
                <div className="not-logged-in-message">
                    <p>You are not logged in.</p>
                </div>
            )}
        </div>);
}
export default HolidaysView;

