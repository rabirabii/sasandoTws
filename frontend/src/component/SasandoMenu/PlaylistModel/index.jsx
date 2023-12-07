import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_url_img, server } from "../../../server";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { Button, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
const PlaylistModel = ({ closeModel, playlist }) => {
  const [name, setName] = useState(playlist.name || ""); // Set default value to playlist name
  const [desc, setDesc] = useState(playlist.desc || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const updateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", thumbnail);
      formData.append("name", name);
      formData.append("desc", desc);

      const response = await axios.put(
        `${server}/playlist/edit-playlist/${playlist._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Playlist updated successfully");
        setLoading(false);
        // window.location.reload(); // Consider alternative update mechanisms if possible
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setLoading(false);
    }
  };

  const handleBackground = async (e) => {
    const file = e.target.files[0];
    setGambar(file);

    if (!file) {
      return; // Handle no file selected scenario
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.put(
        `${server}/playlist/update-background/${playlist._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Background image updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal_container}>
        <form onSubmit={updateSubmit} className={styles.form_container}>
          <IconButton className={styles.close_btn} onClick={closeModel}>
            <CloseOutlined />
          </IconButton>
          <h1 className={styles.form_title}>Edit Playlist</h1>

          <div className={styles.scrollable_content}>
            <div className={styles.input_container}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                placeholder="Enter playlist name"
                name="name"
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.input_container}>
              <label htmlFor="desc" className={styles.label}>
                Description
              </label>
              <input
                type="text"
                placeholder="Enter playlist description"
                name="desc"
                id="desc"
                autoComplete="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.thumbnail_container}>
              <label htmlFor="thumbnail" className={styles.label}>
                Choose a Thumbnail
              </label>
              <div className={styles.thumbnail_preview}>
                {thumbnail && (
                  <img
                    className={styles.thumbnail_image}
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail Preview"
                  />
                )}
              </div>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className={styles.file_input}
              />
            </div>

            <div className={styles.background_img_container}>
              <label htmlFor="gambar" className={styles.label}>
                Choose a Background Image
              </label>
              <div className={styles.thumbnail_preview}>
                {gambar && (
                  <img
                    className={styles.thumbnail_image}
                    src={URL.createObjectURL(gambar)}
                    alt="Background Image Preview"
                  />
                )}
              </div>
              <input
                type="file"
                name="gambar"
                id="gambar"
                accept="image/*"
                onChange={handleBackground}
                className={styles.file_input}
              />
            </div>

            <Button
              type="submit"
              className={styles.submit_button}
              disabled={loading}
              sx={{
                color: "rgb(107 33 168)",
                backgroundColor: "#fff",
              }}
            >
              {loading ? "Updating..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaylistModel;
