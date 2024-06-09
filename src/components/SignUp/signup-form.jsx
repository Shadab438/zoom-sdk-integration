import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CryptoJS from "crypto-js";

import GOOGLE_ICON from "../../images/google-icon.svg";
import LOGO from "../../images/logo.svg";
import "../../styles/signIn/form.css";

import {
  GOOGLE_REDIRECT,
  EMAIL_REQUIRED,
  PASSWORD_VALID,
  EMAIL_VALID,
  FULL_NAME_VALID,
  baseURL,
} from "../../utils/constants";

const schema = z.object({
  name: z.string().min(1, { message: FULL_NAME_VALID }),
  email: z
    .string()
    .min(1, { message: EMAIL_REQUIRED })
    .email({ message: EMAIL_VALID }),
  password: z.string().min(8, PASSWORD_VALID),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = async (data) => {
    // console.log(data);
    // let secret_key = CryptoJS.SHA256().toString(CryptoJS.enc.Base64);

    const { name, email, password } = data;

    // const encryptedPassword = CryptoJS.AES.encrypt(
    //   password,
    //   secret_key
    // ).toString();

    // const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, secret_key);
    // const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // console.log(encryptedPassword);

    const registerNewUser = { name, email, password };
    console.log(registerNewUser);

    try {
      const { data } = await fetch(`${baseURL}/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerNewUser),
      });

      alert("Successfully signed up!! Redirecting to Sign In");

      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputStyle =
    "w-full text-[#686677] text-[16px] font-medium py-2 px-3 my-2 border";

  return (
    <div className=" w-1/2 max-h-[634px] bg-white flex flex-col p-20 justify-between items-center relative">
      <div
        className="max-w-[450px] w-full flex flex-col mx-auto absolute top-4"
        style={{ height: "100vh" }}
      >
        <div className="mb-6 mx-auto ">
          <img src={LOGO} alt="logo" className="logo" />
        </div>
        <div className="w-full flex flex-col my-2">
          <h3 className="text-3xl font-semibold  text-[#171725]">Sign Up</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col">
            <label
              htmlFor="name"
              className="text-[#9794AA] font-medium text-[16px]"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter full name"
              className={`${inputStyle} ${
                errors.name && "border-red-500"
              } appearance-none focus:shadow-outline rounded outline-none focus:outline-none bg-transparent`}
              {...register("name")}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.name?.message}
              </p>
            )}

            <label
              htmlFor="email"
              className="text-[#9794AA] font-medium text-[16px]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              className={`${inputStyle} ${
                errors.email && "border-red-500"
              } appearance-none focus:shadow-outline rounded outline-none focus:outline-none bg-transparent`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email?.message}
              </p>
            )}

            <label
              htmlFor="password"
              className="text-[#9794AA] font-medium text-[16px]"
            >
              Enter Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`${inputStyle} ${
                  errors.password && "border-red-500"
                } appearance-none focus:shadow-outline rounded outline-none pr-4 focus:outline-none bg-transparent`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="showpassword"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="w-full flex flex-col items-center my-3">
            <button className="w-full text-white bg-[#772BD8] mb-3 font-semibold rounded-md p-4 text-center flex items-center justify-center">
              Sign Up
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-2 mb-3">
            <div className="w-full h-[1px] bg-black" />
            <p className="absolute text-md text-black/80 bg-white p-2">
              or Sign Up with
            </p>
          </div>
        </form>

        <Link to={GOOGLE_REDIRECT}>
          <div className="max-w-[220px] mx-auto text-[#060606] my-3 bg-white font-semibold rounded-full border p-3 text-center flex items-center justify-center cursor-pointer">
            <img src={GOOGLE_ICON} alt="google icon" className="h-7 w-7 mr-2" />
            Sign up with Google
          </div>
        </Link>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-black">
            Already have an account?{" "}
            <Link to="/sign-in">
              <span className="font-semibold cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
