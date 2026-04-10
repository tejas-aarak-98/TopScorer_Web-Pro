import './login.css'
import Cookies from "js-cookie"
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    useEffect(()=>{

      const token = Cookies.get("myToken");

      if(token !== undefined){

        navigate("/");

      }

    },[]);

    const [allValues, setValues] = useState({

      email : "",
      password : "",
      errorMsg : ""

    });

    const onSubmitUserDetails = async (e)=>{

        e.preventDefault();


        const Api = "http://localhost:8080/topscorer/login";

        const userDetails = {

            email : allValues.email,
            password : allValues.password

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
                Cookies.set("myToken",data.jwt_token);
                setValues({...allValues,errorMsg : ""}); 
                 navigate("/");
            }

            else{

                setValues({...allValues,errorMsg :data.error_msg});
            }

        } 

        
        catch (error) {

            console.log(error);
            

        }

    }

  return (
   
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue to TopScorer</p>

        <form className="login-form" onSubmit={onSubmitUserDetails}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email"   value={allValues.email}
              onChange={(e) => {setValues({...allValues,email:e.target.value})}} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password"  value={allValues.password}
              onChange={(e) => {setValues({...allValues,password:e.target.value})}}/>
          </div>

          <button className="login-btn1">Login</button>

            <p className="extra-text">

                Don’t have an account?{" "}
                <Link to="/sign-in" className="signup-link">
                    Sign Up
                </Link>
                
          </p>

            {allValues.errorMsg && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {allValues.errorMsg}
              </p>
            )}

        </form>
      </div>
    </div>

  )
}

export default Login;
