import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useDeletePostMutation,
  selectPostById,
  useUpdatePostMutation,
} from "../postSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../features/users/userSlice";
import classes from "../../components/postform.module.css";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const authors = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  const usersOptions = authors.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const onDeletePost = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete post", error);
    }
  };
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  async function onSave() {
    if (canSave) {
      try {
        updatePost({ id: post.id, title, body: content, userId }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    document.title = "Redux Blog | Edit Post";
  }, []);
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <input
          type="text"
          placeholder="title"
          onChange={onTitleChanged}
          name="title"
          defaultValue={title}
        />
        <select
          name="userId"
          value={userId}
          onChange={onAuthorChanged}
          defaultValue={userId}
        >
          <option value="">Author Name</option>
          {usersOptions}
        </select>
        <textarea
          type="text"
          placeholder="content"
          onChange={onContentChanged}
          name="description"
          defaultValue={content}
        />
        <div className={classes.buttonsContainer}>
          <button
            className="btn-primary"
            disabled={!canSave}
            onClick={onSave}
            type="button"
          >
            Save Post
          </button>
          <button
            className="btn-primary"
            onClick={onDeletePost}
            type="button"
            style={{ backgroundColor: "lightcoral" }}
          >
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
