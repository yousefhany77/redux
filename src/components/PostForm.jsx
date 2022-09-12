import React from "react";
import classes from "./postform.module.css";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../features/postSlice";

const PostForm = () => {
  const navigate = useNavigate();
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const postInitialState = {
    title: "",
    userId: "",
    description: "",
  };
  const [formInput, setFormInput] = React.useState(postInitialState);
  const { title, description, userId } = formInput;
  const authors = useSelector(selectAllUsers);
  function handleChange(event) {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  }

  const authorOptions = authors.map((author) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ));
  const canSave =
    Boolean(title.length) &&
    Boolean(userId.length) &&
    Boolean(description.length) &&
    !isLoading;
  async function savePost() {
    if (canSave) {
      try {
        await addNewPost({ title, body: description, userId }).unwrap();
        setFormInput(postInitialState);
      } catch (e) {
        console.error("Error saving post: " + e);
      } finally {
        navigate("/");
      }
    }
  }
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <select name="userId" value={formInput.userId} onChange={handleChange}>
          <option value="">Author Name</option>
          {authorOptions}
        </select>
        <textarea
          type="comment"
          placeholder="content"
          onChange={handleChange}
          name="description"
        />
        <button
          className="btn-primary"
          disabled={!canSave}
          onClick={savePost}
          type="button"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
