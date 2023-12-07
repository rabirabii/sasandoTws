import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const RegisterButton = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/sign-up")}
      variant="outlined"
      sx={{
        color: "rgb(107 33 168)",
        "&:hover": {
          backgroundColor: "rgb(107 33 168)",
          borderColor: "black",
          color: "white",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default RegisterButton;
