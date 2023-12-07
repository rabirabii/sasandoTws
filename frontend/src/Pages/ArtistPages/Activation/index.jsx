import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../../../server";

const ArtistActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/artist/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true, err);
          });
      };
      sendRequest();
    }
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p className="text-red-600">Your Token is expired</p>
      ) : (
        <p className="text-blue-600">
          Your Account has been created successfully
        </p>
      )}
    </div>
  );
};

export default ArtistActivationPage;
