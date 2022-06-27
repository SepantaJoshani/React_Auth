import { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import {
  ErrorMessage,
  Form,
  RegisterContainer,
  StyledSpan,
} from "./Form.styled";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

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
    console.log(pwd, user);
    setUser("");
    setPwd("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Go to home</a>
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
              <a href="#">Sign Up</a>
            </StyledSpan>
          </p>
        </RegisterContainer>
      )}
    </>
  );
};

export default Login;
