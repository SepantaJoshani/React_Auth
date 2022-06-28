import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState([]);
  //* if you create a button and trigger this refresh function it will give U a token
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal, abort } = controller;

    const getUsers = async () => {
      try {
        const { data } = await axios.get("/users", {
          signal,
        });

        console.log(data);
        isMounted && setUsers(data);
      } catch (error) {
        console.log(error);
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
