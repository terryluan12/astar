"use client";
import React, { useState } from "react";
import axios from "axios";
import Result from "./Results";
import "../css/Result.css";
import Label from "./Label";
import "../css/styles.css";

function HomePage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await getSearch(input);
    let result_temp = [<Label key="empty"></Label>];

    switch (res.status) {
      case 200:
        if (res.data.length === 0) {
          alert("Course not found");
        } else {
          result_temp = res.data.courses.map((result) => (
            <Result
              key={result.course_code}
              course_code={result.course_code}
              course_name={result.course_name}
            ></Result>
          ));
        }
        break;
      case 400:
        alert("400 Error. Please refresh");
        break;
      default:
        alert("Unknown Error. Please contact website owner");
        break;
    }

    setResults(result_temp);
  };

  const getSearch = async (input) => {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/course?code=${input}`,
    );
  };

  return (
    <div className="SearchQuery">
      <div style={{ marginTop: "10%" }}>
        <h1> A* Course Finder Search</h1>
        <form onSubmit={handleSubmit} className={"search"}>
          <input
            placeholder={"Search for course code, course name, keyword ..."}
            className={"text-input"}
            type="text"
            value={input}
            onChange={handleChange}
          />
          <input type="submit" value="Submit" className={"submit-button"} />
        </form>
      </div>

      <div className={"search-result-display"}>{results}</div>
    </div>
  );
}

export default HomePage;
