import React, { useContext } from "react";
import UserContext from "../contexts/user";
import { NavLink } from "react-router-dom";

const TabelaUsersComponent = () => {
  const { users } = useContext(UserContext);
  return (
    <>
      {!users ? (
        <>
          <p>Carregando..</p>
        </>
      ) : (
        <div>
          <table>
            <tbody>
              {users.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <a href={"/user/" + item.id}>Editar Usuario</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TabelaUsersComponent;
