"use client";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "@/css/Result.css";
import unstarred from "@/img/star.png";
import starred from "@/img/starred.png";
import Link from "next/link";
import Image from "next/image";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: this.props.course_code,
      course_name: this.props.course_name,
      division: "Division of Computer Engineering",
      faculty: "Faculty of Applied Science and Engineering",
      isStarred: this.props.isStarred
    };
  }

  render() {
    return (
      <Container>
        <Link
          href={`/courseDetails/${this.state.course_code}`}
          className={"search-result-item"}
          style={{ textDecoration: "none" }}>
          <Row className={"result-display"}>
            <Col>
              <h5>{this.state.course_code}</h5>
            </Col>
            <Col>
              <h5>{this.state.course_name}</h5>
            </Col>
            <Col>{this.state.division}</Col>
            <Col>{this.state.faculty}</Col>
            <Col>
              <Image src={this.state.isStarred ? starred : unstarred} alt="" />
            </Col>
          </Row>
        </Link>
      </Container>
    );
  }
}

export default Result;
