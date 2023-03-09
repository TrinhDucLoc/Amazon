import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        {/* title: Sign in */}
        <div>
          <h1>Sign In</h1>
        </div>

        {/* Input: username, label value and onChange */}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        {/* Input: password, label value and onChange */}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        {/* Input: submit and submitHandler */}
        <div>
          <label>
            <button className="primary" type="submit">
              Sign In
            </button>
          </label>
        </div>

        {/* Register */}
        <div>
          New Customer?
          <Link to="/register">Create your account</Link>
        </div>
      </form>
    </div>
  );
}
