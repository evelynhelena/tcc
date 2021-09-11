import React, { createContext, useState, useEffect } from "react";
import server from "../Config/BaseURL";
import api from "../services/Api";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const config = {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  };
  const getUsers = async () => {
    try {
      const { data } = await api.get(`${server.url}users`,config);
      if (data) setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
