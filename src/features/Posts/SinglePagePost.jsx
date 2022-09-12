import PostAuthor from "../postAuthor";
import TimeAgo from "../TimeAgo";
import ReactionsButtons from "../../components/ReactionsButtons";
import classes from "../../components/postsList.module.css";
import { useSelector } from "react-redux";
import { selectPostById } from "../postSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./singlepost.css";
import { useEffect } from "react";
import Page404 from "../../components/Page404";
const SinglePagePost = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
    <Page404/>
    );
  }
  useEffect(() => {
    document.title = post.title.slice(0, 10);
  }, []);
  return (
    <div className="singlepost">
      <article className={classes.post}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <ReactionsButtons post={post} />
        <div className={classes.postFotter}>
          <span>
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
          </span>
          <span className={classes.credits}>
            <PostAuthor authorID={post.userId} />
            <TimeAgo timeStamp={post.date} />
          </span>
        </div>
      </article>
    </div>
  );
};

export default SinglePagePost;
