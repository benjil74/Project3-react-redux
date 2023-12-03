import { useEffect, useState } from 'react';
import "./FollowersButton.css"
import axios from "axios";

interface FollowersButtonProps {
   userId: number;
   holidayId: number;
}

interface FollowersProps {
   userID: number;
   holidayID: number;
}

function FollowersButton({ userId, holidayId }: FollowersButtonProps) {
   const [followers, setFollowers] = useState(0);
   const [liked, setLiked] = useState(false); 
   const userID = localStorage.getItem("userID");
   userId=Number(userID);
   useEffect(() => {
      async function fetchFollowers() {
         try {
            const response = await axios.get(`http://localhost:4000/followers/count/${holidayId}`);
            setFollowers(response.data.count);
         } catch (error) {
            console.error("Error fetching followers count:", error);
         }
      }
      fetchFollowers();
      async function fetchLikedState(){
         try {
            const response = await axios.get<FollowersProps[]>(`http://localhost:4000/followers`);
            const likedHolidays = response.data.filter((item: FollowersProps) => item.userID === Number(userID));
            if (likedHolidays.some((item) => item.holidayID === holidayId)) {
               setLiked(true);
         }
       } catch (error) {
            console.error("Error fetching liked state:", error);
         }
      }
      fetchLikedState();
   }, [userId, holidayId, liked, userID]);

   const toggleLike = async () => {
      try {
        if (!liked) {
          await axios.post(`http://localhost:4000/followers/update`, {
            userId,
            holidayId,
          });
          setFollowers(followers + 1);
        } else {

          await axios.delete(`http://localhost:4000/followers/delete`, {
            data: { userId, holidayId },
          });
          setFollowers(followers - 1);
        }
        setLiked(!liked);
      } catch (error) {
        console.error("Error updating followers:", error);
      }
    };
    
   return (
      <div className="follower-button-container">
         <button 
            className={`follower-button ${liked ? 'liked' : ''}`} 
            onClick={toggleLike}>
            Like: {followers} 
         </button>
      </div>
   );
}

export default FollowersButton;


 
