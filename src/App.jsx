import { useState } from "react";
import "./App.css";

function App(){
  const[impactMessage,setImpactMessage]=useState("");
  const[error,setError]=useState("");
  const[cg,setCG]=useState(null);
  const[subject,setSubject]=useState("");
  const[credits,setCredits]=useState("");
  const[grade,setGrade]=useState("");
  const[subjects,setSubjects]=useState([]);

  function addSubject(){
    if(!subject || !credits || !grade){
      setError("Please fill all fields");
      return;
    }
    setError("");
    
    const newSubject={
      subject,
      credits: Number(credits),
      grade: Number(grade)
    };

    setSubjects([...subjects, newSubject]);

    setSubject("");
    setCredits("");
    setGrade("");
    setError("");
  }

  function calculateCG(){
    let totalCredits=0;
    let weightedSum=0;

    subjects.forEach(sub=>{
      totalCredits+=sub.credits;
      weightedSum+=sub.credits*sub.grade;
    });

    if(totalCredits==0){
      setError("Please add atleast one Course");
      return;
    }

    const cgValue = (weightedSum/totalCredits).toFixed(2);
    setCG(cgValue);

    let maxImpact=0;
    let impactSubject="";

    subjects.forEach((sub)=>{
      const impact = sub.credits*sub.grade;
      if(impact>maxImpact){
        maxImpact=impact;
        impactSubject=sub.subject;
      }
    });

    setImpactMessage(
      `${impactSubject} has the highest impact on your CGPA due to higher credits.`
    );
  }

  return(
    <div className="container">
      <h1>Student Reality Tracker</h1>
      <h2>CGPA Calculator</h2>
      
      {error && <p style={{color: "red"}}>{error}</p>}

      <input
        type="text"
        placeholder="Course Name"
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
      />
      <input
        type="number"
        placeholder="Credits"
        value={credits}
        onChange={(e)=>setCredits(e.target.value)}
      />
      <input
        type="number"
        placeholder="Grade (0-10)"
        value={grade}
        onChange={(e)=>setGrade(e.target.value)}
      />
      
      <button onClick={addSubject}>Add Course</button>

      <ul>
        {subjects.map((sub,index)=>(
          <li key={index}>
            {sub.subject} | Credits: {sub.credits} | Grade: {sub.grade}
          </li>
        ))}
      </ul>

      <button onClick={calculateCG}>Calculate CGPA</button>

      {cg && <div className = "cg-result">Your CGPA: {cg}</div>}

      {impactMessage && (
        <p style={{marginTop:"8px",color:"#555"}}>
          {impactMessage}
        </p>
      )}
    </div>
  );
}

export default App