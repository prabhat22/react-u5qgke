import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function EffectDemo() {
  const [value, setValue] = useState(window.innerWidth);
  const refContainer = useRef("");

  function handleSubmit() {
    console.log(refContainer.current.value);
  }
  useEffect(() => {
    console.log(refContainer);
    window.addEventListener("resize", checkSize);
    console.log(value);
    return () => {
      console.log("remove");
      window.removeEventListener("resize", checkSize);
    };
  });
  function checkSize() {
    setValue(window.innerWidth);
  }
  return (
    <div>
      {value}
      <input ref={refContainer} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
