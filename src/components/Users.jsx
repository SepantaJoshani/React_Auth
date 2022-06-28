import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  //* if you create a button and trigger this refresh function it will give U a token
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal, abort } = controller;

    const getUsers = async () => {
      try {
        const { data } = await axiosPrivate.get("/users", {
          signal,
        });

        console.log(data);
        isMounted && setUsers(data);
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: location }, replace: ture });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
