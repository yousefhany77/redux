import { useEffect } from "react";
import classes from "./postsList.module.css";
import { useSelector } from "react-redux";
import PostExcerpt from "./PostExcerpt";
import {
  selectPostIds,
} from "../features/postSlice";
import { usePostsQuery } from "../features/postSlice";
const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = usePostsQuery();
  const postIds = useSelector(selectPostIds);

  useEffect(() => {
    document.title = "Redux Blog | Home";
  }, []);
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = postIds.map((postId) => {
      return <PostExcerpt postId={postId} key={postId} />;
    });
  } else if (isError) {
    content = <p>{error}</p>;
  } else {
    content = <p>No Posts</p>;
  }
  return (
    <section className={classes.section}>
      <h1>Posts</h1>
      {content}
    </section>
  );
};

export default PostsList;
