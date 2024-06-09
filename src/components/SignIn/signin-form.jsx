import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import GOOGLE_ICON from "../../images/google-icon.svg";
import LOGO from "../../images/logo.svg";
import "../../styles/signIn/form.css";
import {
  GOOGLE_REDIRECT,
  EMAIL_REQUIRED,
  PASSWORD_VALID,
  EMAIL_VALID,
  baseURL,
} from "../../utils/constants";
import axios from "axios";

const schema = z.object({
  // email: z
  //   .string()
  //   .min(1, { message: EMAIL_REQUIRED })
  //   .email({ message: EMAIL_VALID }),
  username: z.string().min(1),
  password: z.string().min(8, PASSWORD_VALID),
});

const SignInForm = () => {
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
    const { username, password } = data;

    const loginUser = { username, password };

    try {
      const response = await fetch(`${baseURL}/auth/authenticate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await response.json();
      console.log(data);
      localStorage.setItem("_to-k_e--n", data.accessToken);

      const fetchData = async () => {
        const response = await fetch(`${baseURL}/user/loggedInUser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_to-k_e--n")} `,
          },
        });
        const data = await response.json();

        localStorage.setItem("userInfo", JSON.stringify(data));

        navigate("/");
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputStyle =
    "w-full text-[#686677] text-[16px] font-medium py-3 px-3 my-2 border";

  return (
    <div className="w-1/2 max-h-[634px] bg-white flex flex-col p-20 justify-between items-center relative">
      <div className="max-w-[450px] w-full flex flex-col mx-auto absolute top-10">
        <div className="mb-10 mx-auto ">
          <img src={LOGO} alt="logo" className="logo" />
        </div>
        <div className="w-full flex flex-col my-2">
          <h3 className="text-3xl font-semibold  text-[#171725]">Sign In</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col">
            <label
              htmlFor="username"
              className="text-[#9794AA] font-medium text-[16px]"
            >
              User Name
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter user name"
              className={`${inputStyle} ${
                errors.email && "border-red-500"
              } appearance-none focus:shadow-outline rounded outline-none focus:outline-none bg-transparent`}
              {...register("username")}
            />
            {/* {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email?.message}
              </p>
            )} */}

            <label
              htmlFor="password"
              className="text-[#9794AA] font-medium text-[16px]"
            >
              Password
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
              Sign In
            </button>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline-offset-2">
              Forgot password?
            </p>
          </div>

          <div className="w-full flex items-center justify-center relative py-2 mb-3">
            <div className="w-full h-[1px] bg-black" />
            <p className="absolute text-md text-black/80 bg-white p-2">
              or continue with
            </p>
          </div>
        </form>

        <Link to={GOOGLE_REDIRECT}>
          <div className="max-w-[220px] mx-auto text-[#060606] my-3 bg-white font-semibold rounded-full border p-3 text-center flex items-center justify-center cursor-pointer">
            <img src={GOOGLE_ICON} alt="google icon" className="h-7 w-7 mr-2" />
            Sign in with Google
          </div>
        </Link>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-black">
            Don't have an account?{" "}
            <Link to="/sign-up">
              <span className="font-semibold cursor-pointer">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
