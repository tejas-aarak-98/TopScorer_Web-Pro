import './signin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignIn = () => {

      const navigate = useNavigate();

      const [allValues, setValues] = useState({
  
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER"
  
      });


    const signup = async (e)=>{

        e.preventDefault();

        const Api = "https://topscorerbackend-4.onrender.com/topscorer/save";

        const userDetails = {

            name : allValues.name,
            email : allValues.email,
            password : allValues.password,
            role : allValues.role
        }

        const options = {

            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(userDetails)
        }

        try {
            
            const response = await fetch(Api,options);
            const data = await response.json();


            if(response.ok){

                console.log(data);
                alert("Your Account Created Successfully");
                
                navigate("/login");

            }
            
        } catch (error) {

            console.log(error);
            
        }

    }

    return (

    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account 🚀</h2>
        <p className="signup-subtitle">
          Join TopScorer and start your journey
        </p>

        <form className="signup-form" onSubmit={signup}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" value={allValues.name}
              onChange={(e) => {setValues({...allValues,name:e.target.value})}}/>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={allValues.email}
              onChange={(e) => {setValues({...allValues,email:e.target.value})}}/>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create password" value={allValues.password}
              onChange={(e) => {setValues({...allValues,password:e.target.value})}}/>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" value={allValues.confirmPassword}
              onChange={(e) => {setValues({...allValues,confirmPassword:e.target.value})}}/>
          </div>

          <button className="signup-btn">Sign Up</button>

          <p className="extra-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );

}

export default SignIn;
