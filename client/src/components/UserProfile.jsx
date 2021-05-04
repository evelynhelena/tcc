import React, { useContext } from "react";
import UserContext from "../contexts/user";

const UserProfileComponent = () => {
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
                  <td>Teste</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UserProfileComponent;
