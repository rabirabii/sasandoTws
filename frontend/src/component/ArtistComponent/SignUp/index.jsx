import React, { useState, useEffect } from "react";
import logo from "../../../asset/img/logo.jpg";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import defaultProfile from "../../../asset/img/default_profile.png";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/artist/create-artist`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    setLoading(false); // Stop loading
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img src={logo} alt="Sample image" className="w-64 h-64" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Register Page
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            autoComplete="name"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            name="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-1 relative">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 relative"
              placeholder="Password"
              type={visible ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute right-2 top-2 h-full flex items-center pr-4">
              {visible ? (
                <VisibilityIcon
                  className="cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <VisibilityOffIcon
                  className="cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={defaultProfile}
                    alt="default profile"
                    className="h-full w-full object-cover rounded-full"
                  />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload your Avatar</span>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-white hover:bg-purple-800 px-4 py-2 text-gray-900 hover:text-white border shadow-sm shadow-black uppercase rounded text-xs tracking-wider"
              type="submit"
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already have an account?{" "}
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to="/sign-in"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
