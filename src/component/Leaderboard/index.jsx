import "./style.css";
  import { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import Cookies from "js-cookie";
import Loader from "../Loader/loader";
import Footer from "../Footer/footer";

const Leaderboard = () => {

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getLeaderboard = async () => {

      setLoading(true);

      const token = Cookies.get("myToken");

      const api = "https://topscorerbackend-4.onrender.com/topscorer/exam/1/leaderboard";

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      };

      try {

        const response = await fetch(api, options);
        const data = await response.json();

        if(response.ok){
          setLeaders(data);
          console.log(data);
          
        }

      } catch (error) {
        console.log(error);
      }

       setLoading(false);

    };

    getLeaderboard();



  }, []);
  
    if(loading){
      return<Loader/>;
    }
    
  return (
    <>
    <Navbar/>

    
<div className="leaderboard-page">

  <div className="leaderboard-container">

    <h2 className="leaderboard-title">🏆 Leaderboard</h2>

    <table className="leaderboard-table">

      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
        </tr>
      </thead>

      <tbody>

        {leaders.map((user,index)=>(
          <tr key={index}>
            <td className="rank">{user.rank}</td>
            <td>{user.username}</td>
            <td className="score">{user.score}</td>
          </tr>
        ))}

      </tbody>

    </table>

  </div>

</div>

    <Footer/>

    </>
        
  )
}

export default Leaderboard;
