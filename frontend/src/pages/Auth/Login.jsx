import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-white">
      <div className="bg-white p-[30px] rounded-lg shadow-md text-center w-[300px]">
        <h2 className="text-[24px] text-[#8a4baf] mb-[15px] font-bold">
          Login
        </h2>
        <form className="text-left">
          <label
            htmlFor="email"
            className="block mb-[5px] text-[14px] text-[#333]"
          >
            Email
          </label>
          <input
            type="email"
            required
            className="w-[92%] p-[10px] mb-[15px] border-[1px] border-solid border-[#ccc] rounded-[5px]"
          />

          <label
            htmlFor="password"
            className="block mb-[5px] text-[14px] text-[#333]"
          >
            Password
          </label>
          <input
            type="password"
            required
            className="w-[92%] p-[10px] mb-[15px] border-[1px] border-solid border-[#ccc] rounded-[5px]"
          />

          <button className="bg-[#8a4baf] text-[#ffffff] py-[10px] px-[20px] rounded-[5px] text-[18px] cursor-pointer transition-all duration-300 ease-out mt-[10px] hover:bg-[#5f357e] md:text-[16px]">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="underline text-blue-600 after:text-violet-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
