import './UserLogOut.css';
import { logOut } from '../../utilities/users-service';
import {useContext} from "react";
import {UserContext} from "../../pages/App/App";

export default function UserLogOut() {
  const {user, setUser} = useContext(UserContext);

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className="UserLogOut">
      <div>{user.name}</div>
      <div className="email">{user.email}</div>
      <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}
