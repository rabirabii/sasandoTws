import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { createAlbum } from "../../../redux/actions/album";
import { Button } from "@mui/material";
import ReactDatePicker from "react-date-picker";
const CreateAlbumComponent = () => {
  const { musisi } = useSelector((state) => state.musisi);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [thumbnail, setThumbnail] = useState(null);
  const [songs, setSongs] = useState("");
  const { success, error } = useSelector((state) => state.album);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [label, setLabel] = useState("");
  const [artistSongs, setArtistSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setError] = useState(null);
  const [releasedAt, setReleasedAt] = useState(null);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Album created successfully!");
      navigate("/artist-dashboard");
    }
  }, [error, success, navigate]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleDateChange = (e) => {
    // Handle changes in the input type date
    setReleasedAt(new Date(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", thumbnail);

    formData.append("musisiId", musisi._id);
    formData.append("desc", desc);
    formData.append("label", label);
    formData.append("releasedAt", releasedAt.toISOString());
    dispatch(createAlbum(formData));
  };

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        setIsLoading(true);

        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
        const response = await fetch(
          `${server}/song/get-all-songs/${musisi._id}`
        );
        const data = await response.json();

        console.log("API Response:", data);

        setArtistSongs(data.songs); // Adjust the property based on your API response
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (musisi && musisi._id) {
      fetchArtistSongs();
    }
  }, [musisi]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-purple-800">
            Upload Album
          </h2>
          <p className="mt-1 text-sm leading-6  text-gray-900">
            Upload your Album
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
                    placeholder="Enter Album Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="label"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Label
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                test
              </span> */}
                  <input
                    type="text"
                    name="label"
                    id="label"
                    autoComplete="label"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Album Label"
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="releasedAt"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Released At
            </label>
            <div className="mt-2">
              <input
                id="releasedAt"
                type="date"
                name="releasedAt"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleDateChange}
                value={releasedAt ? releasedAt.toISOString().slice(0, 10) : ""}
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              rows={3}
              name="description"
              id="description"
              defaultValue={""}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text sm:leading-6"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences description about the Album
          </p>
        </div>
        <div class="col-span-full">
          <label
            for="cover-photo"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            thumbnail
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
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
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

export default CreateAlbumComponent;
