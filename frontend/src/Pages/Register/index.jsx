import React, { useState } from "react";
import AuthForm from "../../utilities/authForm";

import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Signup from "../../component/SignUp";

const Register = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

export default Register;
