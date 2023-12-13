import { Avatar, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { backend_url_img } from "../server";
import { Link } from "react-router-dom";

const AvatarUI = ({ artist }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {artist.map((individualArtist) => (
        <div
          key={individualArtist.id}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Link
            to={`/artist/${individualArtist._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Avatar
                src={`${backend_url_img}${individualArtist.avatar}`}
                style={{ width: 80, height: 80 }}
              />
              <Typography variant="h6">{individualArtist.name}</Typography>
            </div>
          </Link>
        </div>
      ))}
      <hr />
    </div>
  );
};

export default AvatarUI;
