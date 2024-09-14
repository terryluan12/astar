"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../img/logo.png";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

function NavbarComp(props) {
  const [username, setUsername] = useState(null);
  const [login, setLogin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("username") !== "") {
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const logOut = () => {
    localStorage.setItem("username", "");
    setUsername(localStorage.getItem(""));
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <Navbar bg="myBlue" variant="dark" sticky="top" expand="lg">
        <Navbar.Brand>
          <Image layout="responsive" src={logo} alt="" />{" "}
          <Nav.Link href="/" style={{ color: "white", display: "inline" }}>
            A* Course Finder
          </Nav.Link>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} href="/">
              Search
            </Nav.Link>

            {username && (
              <Nav.Link as={Link} href="/wishlist">
                My Wishlist
              </Nav.Link>
            )}

            {!username ? (
              <Nav.Link as={Link} href="/login">
                Login
              </Nav.Link>
            ) : (
              <Nav.Link onClick={logOut} as={Link} href="/">
                Logout
              </Nav.Link>
            )}

            {!username && (
              <Nav.Link as={Link} href="/signup">
                Sign Up
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComp;