import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",

        { oldPassword, newPassword },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        alert(response.data);
      });
  };

  return (
    <Layout>
      <div>
        <h1>Change Your Password</h1>
        <input
          type="text"
          placeholder="Old Password..."
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="New Password..."
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <button onClick={changePassword}>Save Changes</button>
      </div>
    </Layout>
  );
}
