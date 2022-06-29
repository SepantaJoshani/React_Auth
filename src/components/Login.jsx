import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

import {
  ErrorMessage,
  Form,
  PersistContainer,
  RegisterContainer,
  StyledSpan,
} from "./Form.styled";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useLocalStorage("user", "");
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
      navigate(from, { replace: true });
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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

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
          <h1>Login</h1>
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
            <PersistContainer>
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust this device</label>
            </PersistContainer>
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
