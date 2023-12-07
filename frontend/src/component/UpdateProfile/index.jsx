import { Update } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { backend_url_img, server } from "../../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { isAuth, user, error, successMessage } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [about, setAbout] = useState(user && user.about);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserInformation(name, email, phoneNumber, about, password)
    ).then(() => {
      // Refresh the page on success
      window.location.reload();
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success("User Information updated successfully");
      dispatch({ type: "clearMessages" });
    }
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-user-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        toast.success("Avatar update successfully");
        navigate("/sasando/");
        dispatch(loadUser());
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-purple-800">
            Update Profile
          </h2>
          <p className="mt-1 text-sm leading-6  text-gray-900">
            Some of Information will be displayed publicly so be careful what
            you wrote. The Changes will be automatically update when the user
            refresh the page
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    test
                  </span> */}
                  <input
                    type="text"
                    name="fullName"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={user.name}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    test
                  </span> */}
                  <input
                    type="search"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={user.phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    test
                  </span> */}
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* About */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  rows={3}
                  name="about"
                  id="about"
                  placeholder={user.about}
                  defaultValue={""}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself
              </p>
            </div>

            {/* Photo */}
            <div className="col-span-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <img
                  className="h-12 w-12 text-gray-300 rounded-full"
                  src={`${backend_url_img}${user?.avatar}`}
                />
                <input
                  type="file"
                  id="image"
                  onChange={handleImage}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-100"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Verification Password */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2>Enter your password for Verification</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-x-6">
        <Button className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-800"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfile;
