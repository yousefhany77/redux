import "./App.css";
import PostForm from "./components/PostForm";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import SinglePagePost from "./features/Posts/SinglePagePost";
import Page404 from "./components/Page404";
import EditPost from "./features/Posts/EditPost";
import UserPage from "./features/users/UserPage";
import AllUsersPage from "./features/users/AllUsersPage";
import React from "react";
const PostsList = React.lazy(() => import("./components/PostsList"));
function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path="post">
            <Route index element={<PostForm />} />
            <Route path=":postId" element={<SinglePagePost />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>

          <Route path="users">
            <Route index element={<AllUsersPage />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
