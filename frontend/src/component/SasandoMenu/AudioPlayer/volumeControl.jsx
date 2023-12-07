import React from "react";
import { Button, Grid, Slider, Typography } from "@mui/material";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

const VolumeControl = ({ onToggle, onChange, volume }) => {
  return (
    <Grid container alignItems="center" gap={2}>
      <Button
        variant="text"
        onClick={onToggle}
        sx={{ p: 0, m: 0, display: "inline-flex", width: 48, height: 48 }}
      >
        {volume === 0 ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
      </Button>

      <Slider
        aria-label="volume-slider"
        sx={{ width: "10rem", color: "accent.light" }}
        onChange={onChange}
        value={volume ? volume * 100 : 0}
      />
    </Grid>
  );
};

export default VolumeControl;
