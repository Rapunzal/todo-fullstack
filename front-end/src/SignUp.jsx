import React, { useState } from "react";
import axios from "axios";

export const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    let url = import.meta.env.VITE_API;

    try {
      let response = await axios.post(url + "/api/signup", data);
      console.log(response);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <button>Sign Up</button>
      </form>
    </div>
  );
};
