import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "../components/user/User";
import { UserPost } from "../components/post/UserPost";
import { PosrDetails } from "../components/post/PosrDetails";
import { UserEdit } from "../components/user/UserEdit";

export default function index() {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" element={<User />} />
          <Route path="/user-post/:id" element={<UserPost />} />
          <Route path="/post-details/:id" element={<PosrDetails />} />
          <Route path="/user-edit/:id" element={<UserEdit />} />

          {/* <Route path="/add/:id" element={<Create />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
