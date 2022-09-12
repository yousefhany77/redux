import { useSelector } from "react-redux";
import { selectAllUsers } from "./users/userSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ authorID }) => {
  const authors = useSelector(selectAllUsers);
  console.log(authors)
  const author = authors.find((user) => user.id === authorID);
  return (
    <span>
      by{" "}
      {author ? (
        <Link to={`/users/${authorID}`} key={authorID}>
          {author.name}
        </Link>
      ) : (
        "Unknown"
      )}
    </span>
  );
};

export default PostAuthor;
