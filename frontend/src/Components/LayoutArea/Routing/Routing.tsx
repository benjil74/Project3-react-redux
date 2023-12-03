import { Routes, Route} from 'react-router';
import NotFound from '../../HomeArea/NotFound/NotFound';
import UsersView from '../../HomeArea/UsersView/UsersView';
import HolidaysView from '../../HomeArea/HolidaysView/HolidaysView';
import UserRegistrationView from '../../HomeArea/UserRegistrationView/UserRegistrationView';
import Login from '../../HomeArea/Login/Login';
import InsertHoliday from '../../HomeArea/InsertHoliday/InsertHoliday';
import AdminHolidaysView from '../../HomeArea/AdminHolidaysView/AdminHolidaysView';
import EditHoliday from '../../HomeArea/EditHoliday/EditHoliday';
import UsersPerHolidayChart from '../../HomeArea/Chart/chart';

function Routing() {
    return (
        <Routes>
            <Route path="/admin/users" element={<UsersView />} />  
            <Route path="/login" element={<Login />} /> 
            <Route path="/" element={<Login />} /> 
            <Route path="/userReg" element={<UserRegistrationView />} />
            <Route path="/holidays" element={<HolidaysView/>} />
            <Route path="/admin/holidays" element={<AdminHolidaysView/>} />
            <Route path="/admin/insertHoliday" element={<InsertHoliday />} />  
            <Route path="/admin/editHoliday/:holidayID" element={<EditHoliday />} /> 
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/chart" element={<UsersPerHolidayChart/>}/>
        </Routes>
    );
}

export default Routing;
