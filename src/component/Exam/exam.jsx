import { useEffect,useState } from 'react';
import './Exam.css';
import Navbar from '../Navbar/navbar';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/loader';

const Exam = () => {

 const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const onGetExam = async () => {

      setLoading(true);
      const token = Cookies.get("myToken");

      let Api = "http://localhost:8080/topscorer/student/exam/1";

          const options = {
           method : "Get",
           headers: {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
         
        }

      try {

        const Response = await fetch(Api,options);
        const data = await Response.json();

        if (Response.ok) {
        
          console.log(data);
           setQuestions(data); 
        }


      } 
      
      catch (error) {

        console.log(error);

      }

      finally{

          setLoading(false);
      }

    }

    onGetExam();

  }, []);

        if (loading) {

      return <Loader />
      
    }

const submitExam = async () => {

  const token = Cookies.get("myToken");

  const api = "http://localhost:8080/topscorer/student/submit";

  const answersArray = questions.map((q) => ({
    questionId: q.id,
    selectedOption: selectedAnswers[q.id]
  }));

  const requestBody = {
    examId: 1,
    answers: answersArray
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(requestBody)
  };

  try {

    const response = await fetch(api, options);

    const data = await response.json();
    console.log(data);

    if (response.ok) {

        alert(`${data.message} Score: ${data.score}`);

      setTimeout(() => { navigate("/"); }, 2000);

    } else {

      console.log(data.message);

    }

  } catch (error) {
    console.log(error);
  }
};

const handleAnswerChange = (option) => {

  const questionId = questions[currentQuestion].id;

  setSelectedAnswers({
    ...selectedAnswers,
    [questionId]: option
  });

};
    
  return (

      <>
    <Navbar/>

   <div className="exam-container">

  {questions.length > 0 && (

    <div className="question-card">

      <h3> Question {currentQuestion + 1} of {questions.length}</h3>

      <p>{questions[currentQuestion].questionText}</p>

      <div>

       <label>
  <input
    type="radio"
    name="option"
    checked = {selectedAnswers[questions[currentQuestion].id] === "A"}
    onChange={() => handleAnswerChange("A")}
  />
  {questions[currentQuestion].optionA}
</label>

<br/>

<label>
  <input
    type="radio"
    name="option"
    checked = {selectedAnswers[questions[currentQuestion].id] === "B"}
    onChange={() => handleAnswerChange("B")}
  />
  {questions[currentQuestion].optionB}
</label>

<br/>

<label>
  <input
    type="radio"
    name="option"
    checked = {selectedAnswers[questions[currentQuestion].id] === "C"}
    onChange={() => handleAnswerChange("C")}
  />
  {questions[currentQuestion].optionC}
</label>

<br/>

<label>
  <input
    type="radio"
    name="option"
    checked = {selectedAnswers[questions[currentQuestion].id] === "D"}
    onChange={() => handleAnswerChange("D")}
  />
  {questions[currentQuestion].optionD}
</label>

      </div>

      <div style={{marginTop:"20px"}}>

        <button
        disabled={currentQuestion === 0}
        onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
        Previous
        </button>

        <button
        disabled={currentQuestion === questions.length - 1}
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
        Next
        </button>

      </div>

         {currentQuestion === questions.length - 1 && (<div className="submit-container">

          <button className="submit-btn" onClick={submitExam}>Submit Exam</button></div>)}

    </div>

  )}

</div>

  </>
  );
}

export default Exam;
