import React from "react";
import { Link } from "react-router-dom";

function Verify() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-white">
      <div className="bg-white p-[30px] rounded-lg shadow-md text-center w-[300px]">
        <h2 className="text-[24px] text-[#8a4baf] mb-[15px] font-bold">
          Verify Account
        </h2>
        <form className="text-left">
          <label
            htmlFor="otp"
            className="block mb-[5px] text-[14px] text-[#333]"
          >
            OTP
          </label>

          <input
            type="number"
            required
            className="w-[92%] p-[10px] mb-[15px] border-[1px] border-solid border-[#ccc] rounded-[5px]"
          />

          <button className="bg-[#8a4baf] text-[#ffffff] py-[10px] px-[20px] rounded-[5px] text-[18px] cursor-pointer transition-all duration-300 ease-out mt-[10px] hover:bg-[#5f357e] md:text-[16px]">
            Verify
          </button>
        </form>
        <p>
          Go to{" "}
          <Link
            to="/login"
            className="underline text-blue-600 after:text-violet-600"
          >
            Login
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}

export default Verify;
