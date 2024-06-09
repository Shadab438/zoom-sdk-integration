import React from "react";

import SignUpForm from "./signup-form";
import image from "../../images/Login.png";
import { COURSEVITA_NAME, WELCOME_MESSAGE } from "../../utils/constants";

const SignUp = () => {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col border">
        <div className="absolute top-[8%] left-[25%] flex flex-col">
          <h3 className="text-2xl text-[#fff] text-[32px] font-medium my-4 text-center">
            {WELCOME_MESSAGE}
          </h3>
          <h1 className="text-3xl text-[#fff] text-[64px] font-medium ">
            {COURSEVITA_NAME}
          </h1>
        </div>

        <img
          src={image}
          alt="sign-in"
          className="h-full w-full object-cover cover-img bg-[#772BD8] image sm:none"
        />
      </div>

      <SignUpForm />
    </div>
  );
};

export default SignUp;
