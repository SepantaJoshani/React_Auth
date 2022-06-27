import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import {
  ErrorMessage,
  Form,
  RegisterContainer,
  StyledSpan,
} from "./Form.styled";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const { setAuth, auth } = useAuth();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/">Go to home</Link>
          </p>
        </section>
      ) : (
        <RegisterContainer>
          <ErrorMessage ref={errRef} isError={errMsg} aria-live="assertive">
            {errMsg}
          </ErrorMessage>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            {/*****  UserName ****/}
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            {/*****  Password ****/}

            <label htmlFor="password">Password:</label>

            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Sign In</button>
          </Form>
          <p>
            Need an Account?
            <br />
            <StyledSpan>
              {/*put router link here*/}
              <Link to="/register">Sign Up</Link>
            </StyledSpan>
          </p>
        </RegisterContainer>
      )}
    </>
  );
};

export default Login;
