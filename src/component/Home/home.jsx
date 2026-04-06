import "./home.css"
import { Link } from "react-router-dom";
import studentImg from "../../assets/speed test-rafiki.svg";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";


const Home = () => {

   return (
    
    <div className="home">

      <Navbar/>
    
      <div className="hero">
        <div className="hero-left">
          <h1>Ace Your Exams Online</h1>
          <p>Prepare, Practice, and Perform Your Best.</p>

          <div className="buttons">

            <button className="primary-btn"><Link className=" text-white linktab" to={"/exam"}>Start Exam</Link></button>
            <Link className="outbtn linktab" to="/leaderboard">View Leaderboard</Link>

          </div>
        </div>

        <div className="hero-right">
          <img src={studentImg} alt="Student" />
        </div>
      </div>

    {/* Features Section */}
    <section className="features">
      <div className="feature">
        <div className="icon">📚</div>
        <h3>Multiple Categories</h3>
        <p>Attempt quizzes from various topics and levels.</p>
      </div>

      <div className="feature">
        <div className="icon">⚡</div>
        <h3>Instant Results</h3>
        <p>Get your score and correct answers immediately.</p>
      </div>

      <div className="feature">
        <div className="icon">🏆</div>
        <h3>Leaderboard</h3>
        <p>Compete with friends and track your progress.</p>
      </div>
    </section>

    <Footer/>

    </div>
  );

}

export default Home;
