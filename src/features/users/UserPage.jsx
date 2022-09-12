import { useParams, Link } from "react-router-dom";
import { selectUserById } from "./userSlice";
import { useGetPostByUserIdQuery } from "../postSlice";
import { useSelector } from "react-redux";
import "./users.css";
import Page404 from "../../components/Page404";
const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h1>{user?.name} Post's</h1>
      <ul className="user-list-items">{content}</ul>
    </section>
  );
};
export default UserPage;
