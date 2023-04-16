import './Card.css'
import { useState, useEffect } from "react";

// import { FaTimes } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
export default function Card(props) {
  const [clicked, setClicked] = useState(true);
 
  console.log(clicked);
  
  function handleClick() {
    setClicked(!clicked);
  }
  // useEffect(() => {
  //   let timeOutId = null;
  //   if (clicked) {
  //     timeOutId = setTimeout(() => {
  //       setClicked(!clicked);
  //     }, 2000);
  //   }
  //   return () => clearTimeout(timeOutId);
  // }, [clicked]);

  return (
    <div className={clicked?'task new-task': 'task completed-task'} onClick={handleClick}>
      <p>{props.todo}</p>
      <div className="card-icon">
        {<MdDeleteForever onClick={props.handleClick} />}
      </div>
    </div>
  );
}
