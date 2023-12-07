import React, { useState } from "react";
import logo from "../asset/img/logo.jpg";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
const AuthForm = ({ title, buttonText, submitForm, formName }) => {
  const [e_mail, setEmail] = useState("");
  const [nama, setName] = useState("");
  const [sandi, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img src={logo} alt="Sample image" className="w-64 h-64" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            {title}
          </p>
        </div>

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
          autoComplete="name"
          name="email"
          required
          value={e_mail}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formName && (
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            name="text"
            required
            value={nama}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          placeholder="Password"
          type={visible ? "text" : "password"}
          name="password"
          autoComplete="current-password"
          required
          value={sandi}
          onChange={(e) => setPassword(e.target.value)}
        />
        {visible ? (
          <VisibilityIcon
            className="absolute right-2 top-2 cursor-pointer"
            size={25}
            onClick={() => setVisible(false)}
          />
        ) : (
          <VisibilityOffIcon
            className="absolute right-2 top-2 cursor-pointer"
            size={25}
            onClick={() => setVisible(true)}
          />
        )}
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            onClick={submitForm}
            className="mt-4 bg-white hover:bg-purple-800 px-4 py-2 text-gray-900 hover:text-white border shadow-sm shadow-black uppercase rounded text-xs tracking-wider"
            type="button"
          >
            {buttonText}
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          {title === "Login" ? (
            <>
              Don't have an account? <Link to="/sign-up">Register</Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                className="text-red-600 hover:underline hover:underline-offset-4"
                to="/sign-in"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
