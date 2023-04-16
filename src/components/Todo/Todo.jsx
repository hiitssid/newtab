import { useEffect, useState } from "react";
import Card from "./Card";
import "./Todo.scss";

const localStorageKey = "toDoKey";
export default function App() {
  //type to inputfield, every keystroke is stored in input variable
  const [input, setInput] = useState();
  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  });
  // console.log(list);
  function handleChange(event) {
    setInput(event.target.value);
  }
  //press Add button event; add to State => list
  function handleClick(e) {
    e.preventDefault();
    if (!input) {
      alert("Get something done TODAY, start you plan here!");
    } else {
      setList((prevState) => [input, ...prevState]);
      setInput("");
    }
  }
  //store to localStorage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
  }, [list]);

  const card = list.map((item, index) => {
    return <Card key={index} todo={item} handleClick={()=>deleteClick(item)} />;
  });

  function deleteClick(item) {
    const newList = list.filter((itemfromList => itemfromList !==item))
    setList(newList)
  }

  return (
    <div className="App">
      <div className="wrapper">
        <form>
          <input type="text" value={input} onChange={handleChange} />
          <button onClick={handleClick}>Add</button>
        </form>
        <div className={card.length ? "card-wrapper" : ""}>{card}</div>
      </div>
    </div>
  );
}
