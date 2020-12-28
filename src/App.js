import React, { useState } from "react";
import "./style.css";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState("");
  const [peoples, setPeople] = useState(["john", "prabhat"]);
  function clickHandler() {
    // setCounter(counter + 1);
    setCounter(value => value + 1);
  }
  function changeHandler(event) {
    setValue(event.target.value);
  }
  function addPeople() {
    console.log(value, peoples);
    setPeople([...peoples, value]);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Counter Example</h1>

      <h2>{counter}</h2>
      <button className="btn" onClick={clickHandler}>
        Increase counter
      </button>
      <div>
        <form>
          <input value={value} onChange={changeHandler} />
        </form>
      </div>
      <button className="btn" onClick={addPeople}>
        Add People
      </button>
      {peoples.map((record, index) => {
        return <li key={index}>{record}</li>;
      })}
    </div>
  );
}
