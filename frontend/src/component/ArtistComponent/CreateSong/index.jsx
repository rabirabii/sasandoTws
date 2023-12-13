import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url_img } from "../../../server";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSong } from "../../../redux/actions/song";

const CreateSong = () => {
  const { genres, isLoading } = useSelector((state) => state.genre);
  const { musisi } = useSelector((state) => state.musisi);
  const { success, error } = useSelector((state) => state.song);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [Genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [releasedAt, setReleasedAt] = useState(null);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Song created successfully!");
      navigate("/artist-dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleSongChange = (e) => {
    const file = e.target.files[0];

    // Membuat objek FileReader
    const reader = new FileReader();

    // Menambah event listener untuk mendapatkan durasi setelah file dibaca
    reader.onloadend = () => {
      const audio = new Audio();
      audio.src = reader.result;
      audio.addEventListener("loadedmetadata", () => {
        const duration = Math.floor(audio.duration);
        setDuration(duration);
      });
    };

    // Membaca file sebagai URL data
    reader.readAsDataURL(file);

    setSong(file);
  };
  const handleDateChange = (e) => {
    // Handle changes in the input type date
    setReleasedAt(new Date(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("duration", duration);
    newForm.append("genre", Genre);
    newForm.append("img", img);
    newForm.append("song", song);
    newForm.append("artistId", musisi._id);
    newForm.append("description", description);
    newForm.append("lyrics", lyrics);
    newForm.append("releasedAt", releasedAt.toISOString());
    dispatch(createSong(newForm));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-purple-800">
            Upload Song
          </h2>
          <p className="mt-1 text-sm leading-6  text-gray-900">
            Upload your Song
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
                    placeholder={song?.name}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Duration
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-sky-300">
                  {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                  test
                </span> */}
                  <audio
                    ref={(audio) => {
                      if (audio) {
                        audio.onloadedmetadata = () => {
                          setDuration(Math.floor(audio.duration));
                        };
                      }
                    }}
                    src={
                      song instanceof File ? URL.createObjectURL(song) : song
                    }
                    controls
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
                  src={`${backend_url_img}${song?.img}`}
                />
                <input
                  name="img"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-100"
                />
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
                    value={
                      releasedAt ? releasedAt.toISOString().slice(0, 10) : ""
                    }
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="genre"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Genre
          </label>
          <div className="mt-2">
            <select
              id="genre"
              name="genre"
              autoComplete="genre"
              value={Genre}
              onChange={(e) => setGenre(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text sm:leading-6"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences description about the song
          </p>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Lyrics
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              rows={6}
              name="lyrics"
              id="lyrics"
              defaultValue={""}
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-sky-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-800 sm:text sm:leading-6"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences description about the song
          </p>
        </div>
        <div class="col-span-full">
          <label
            for="cover-photo"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Song
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
                    id="song"
                    name="song"
                    type="file"
                    accept="audio/*"
                    onChange={handleSongChange}
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">Mp3</p>
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

export default CreateSong;
