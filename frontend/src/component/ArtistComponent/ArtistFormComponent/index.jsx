import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMusisi,
  updateMusisiInformation,
} from "../../../redux/actions/artist";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url_img, server } from "../../../server";
import { loadUser } from "../../../redux/actions/user";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ArtistFormComponent = () => {
  const { musisi, error, successMessage } = useSelector(
    (state) => state.musisi
  );
  const [name, setName] = useState(musisi && musisi.name);
  const [about, setAbout] = useState(musisi && musisi.about);
  const [asal, setAsal] = useState(musisi && musisi.asal);
  const [twitter, setTwitter] = useState(musisi && musisi.twitter);
  const [website, setWebsite] = useState(musisi && musisi.website);
  const [personalWebsite, setPersonalWebsite] = useState(
    musisi && musisi.personalWebsite
  );
  const [instagram, setInstagram] = useState(musisi && musisi.instagram);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/artist/update-user-info`,
        {
          about,
          asal,
          twitter,
          instagram,
          website,
          personalWebsite,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Artist Info updated successfully");
        dispatch(loadMusisi());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/artist/update-musisi-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadMusisi());
        toast.success("Avatar update successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleBackground = async (e) => {
    const file = e.target.files[0];
    setBackgroundImg(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/artist/update-musisi-background`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("Avatar update successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <form onSubmit={updateSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-purple-800">
            Update your Profile
          </h2>
          <p className="mt-1 text-sm leading-6  text-gray-900">
            Some of Information will be displayed publicly so be careful what
            you wrote.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
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
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={`${musisi.name}`}
                    value={name}
                    readOnly
                  />
                </div>
              </div>
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
                  src={`${backend_url_img}${musisi?.avatar}`}
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
        <div class="sm:col-span-3">
          <label
            for="genre"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Homeland
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
              {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  test
                </span> */}
              <input
                type="text"
                name="asal"
                id="asal"
                autoComplete="asal"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={musisi.asal}
                onChange={(e) => setAsal(e.target.value)}
                value={asal}
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="genre"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Youtube
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
              {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  test
                </span> */}
              <input
                type="text"
                name="website"
                id="website"
                autoComplete="website"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={musisi.website}
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="genre"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Personal Website
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
              {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  test
                </span> */}
              <input
                type="text"
                name="personalWebsite"
                id="personalWebsite"
                autoComplete="personalWebsite"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={musisi.personalWebsiteebsite}
                onChange={(e) => setPersonalWebsite(e.target.value)}
                value={personalWebsite}
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="genre"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Twitter
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
              {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  test
                </span> */}
              <input
                type="text"
                name="twitter"
                id="twitter"
                autoComplete="twitter"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={musisi.twitter}
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="genre"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Instagram
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
              {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  test
                </span> */}
              <input
                type="text"
                name="instagram"
                id="instagram"
                autoComplete="instagram"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={musisi.instagram}
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="description"
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
              defaultValue={musisi?.about}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text sm:leading-6"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences description about yourself
          </p>
        </div>
        <div class="col-span-full">
          <label
            for="cover-photo"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Background Image
          </label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <input
                    id="backgroundImg"
                    name="backgroundImg"
                    type="file"
                    accept="image/*"
                    onChange={handleBackground}
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">Jpeg,Png,Gif</p>
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

export default ArtistFormComponent;
