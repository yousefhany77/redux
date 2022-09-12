import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice";
import "./users.css";

const AllUsersPage = () => {
  const allUsers = useSelector(selectAllUsers);
  const users = allUsers.map((user) => {
    return (
      <li>
        <Link to={`/users/${user.id}`} key={user.id}>
          {user.name}
        </Link>
      </li>
    );
  });
  return (
    <section>
      <h1>Users</h1>
      <ul className="user-list-items">{users}</ul>
    </section>
  );
};

export default AllUsersPage;
