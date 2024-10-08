"use client";
import React from "react";
import "@/css/coursecard.css";
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Link from "next/link";

function CourseCard(props) {
  return (
    <div className={"course-card-render"}>
      {props.wishlist_data.map((course) => (
        <Link
          key={course.course_code}
          href={`/courseDetails/${course.course_code}`}
          className={"wishlist-link"}>
          <Col className={"text-center wishlist-card"}>
            <h5>
              {course.course_code}: {course.course_name}
            </h5>
          </Col>
        </Link>
      ))}
    </div>
  );
}

export default CourseCard;
