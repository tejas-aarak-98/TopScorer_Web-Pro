import './App.css'
import SignIn from './component/Sign-in/signin';
import Login from './component/Login/login';
import Home from './component/Home/home';
import Exam from './component/Exam/exam';
import Leaderboard from './component/Leaderboard';
import NotFound from './component/NotFound';
import ProtectedRoute from './component/ProtectedRoute';
import { Routes,Route } from 'react-router-dom';



const App = () => {

  return (

    <div>
   
      <Routes>

        <Route path='/' element = {<ProtectedRoute Component={Home}/>}></Route>

        <Route path='/login' element = {<Login/>}></Route>

        <Route path='/sign-in' element = {<SignIn/>} ></Route>

        <Route path='/exam' element = {<ProtectedRoute Component={Exam}/>}></Route>

        <Route path='/*' element = {<NotFound/>}></Route>

        <Route path='/leaderboard' element = {<Leaderboard/>}></Route>

      </Routes>


    </div>

  )
}

export default App;

