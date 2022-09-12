import PostAuthor from "../features/postAuthor";
import TimeAgo from "../features/TimeAgo";
import ReactionsButtons from "./ReactionsButtons";
import classes from "./postsList.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/postSlice";
const PostExcerpt = ({ postId }) => {
  
  const post = useSelector((state) =>selectPostById(state, postId))
  console.log(post)
  return (
    <article className={classes.post}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <ReactionsButtons post={post} />
      <div className={classes.postFotter}>
        <span>
          <Link to={`post/${post.id}`}>View Post</Link>
        </span>
        <span className={classes.credits}>
          <PostAuthor authorID={post.userId} />
          <TimeAgo timeStamp={post.date} />
        </span>
      </div>
    </article>
  );
};
export default PostExcerpt;
