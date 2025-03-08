import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="">
          email
          <input
            type="text"
            name="id"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          password
          <input
            type="text"
            name=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Log In</button>
      </form>
    </div>
  );
};
