"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "../../css/LogIn.css";

function LoginPage() {
  // TODO: fix username password procedure
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setLogin] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await loginAccount(username, password);
    switch (res.status) {
      case 200:
        setLogin(true);
        localStorage.setItem("username", username);
        router.refresh();
        router.push("/wishlist");
        break;
      default:
        alert("Invalid Username and Password. Please try again");
        break;
    }
  };
  const loginAccount = async (username, password) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
      username: username,
      password: password,
    });
  };

  return (
    <div className={"sign-up"}>
      <h1> Log In</h1>
      <form onSubmit={handleLogin}>
        <input
          name="username"
          onChange={handleUsernameChange}
          required
          type="text"
          placeholder="Username"
          className={"signup-input"}
        />
        <br />
        <input
          name="password"
          onChange={handlePasswordChange}
          required
          type="text"
          placeholder="Password"
          className={"signup-input"}
        />
        <br />
        <Link
          href={`?username=${username}`}
          style={{ textDecoration: "none" }}
          className="signup-button"
        >
          <button type="submit" onClick={handleLogin}>
            Log In
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
