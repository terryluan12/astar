import React, { Component } from "react";
import { Form, FormControl, Button, Table } from "react-bootstrap";
import "./css/styles.css";
import courselist from "../db/MOCK_DATA.json";
import CourseDescriptionPage from "./CourseDescription";

import empty_star from "./img/star.png";
import starred_star from "./img/starred.png";

//this component should:
// take list of courses, "courselist" from database (it is a list of courses that have a query)
// when a course row is clicked, it takes the user to the course description page (render course description based on a given course code)
// when the an EMPTY star is clicked, the course is added to the user's Wishlist data based
// when a COLOURED star is clicked, the course is REMOVED for the user's wishlist data base


function check_star_state(starred) {
  if (starred === "true") {
    return (
      starred_star
      
      )
  }
  return empty_star;
}

function modifyWishlist(course) {
  // alert("clicked" + course.Course_Code)

  return course;
  // controller should update data and add course to wishlist
}

function SearchResults() {
  const courseDisplay = courselist.map((course) => {
    return (
      //should go to course page when row is clicked
      <tr
        className="trow"
        courselist-item={course}
        onClick={<CourseDescriptionPage  />}
      >
        <td> {course.Course_Code} </td>
        <td> {course.Name} </td>
        <td> {course.Description} </td>
        <td> {course.Instructor} </td>
        <td> {course.Faculty} </td>
        {/* <td> {course.Syllabus} </td> */}
        <td>
          {" "}
          <img
            src={check_star_state(course.Starred)}
            onCLick={modifyWishlist(course)}
          ></img>
        </td>
      </tr>
    );
  });

  return (
    // <div className="searchresults">
    <div className="resultsdiv">
      <h3> Courses</h3>
      <Table striped bordered hover classname="resultstable">
        <thead>
          <tr className="trow">
            {/* https://stackoverflow.com/questions/37771316/react-triggering-click-event-on-table-row */}
            <th>Course Code</th>
            <th>Course Name </th>
            <th>Description</th>
            <th>Division</th>
            <th>Faculty</th>
            {/* <th>Syllabus</th> */}
            <th>Add to Wishlist</th>
          </tr>
        </thead>
        <tbody>{courseDisplay}</tbody>
      </Table>
    </div>
    //</div>
  );
}
export default SearchResults;