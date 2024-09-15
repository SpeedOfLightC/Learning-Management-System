import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../components/Testimonials/Testimonials";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center items-center bg-[#f5f5f5] py-[100px] px-0 text-center w-[100%]">
        <div className="max-w-[800px] mt-0 mb-auto">
          <h1 className="text-[36px] mb-[20px] md:text-[28px]">
            Welcome to Our LMS Platform
          </h1>
          <p className="text-lg text-[#666] mb-[40px] md:text-[16px]">
            Learn, Grow, Excel
          </p>
          <button
            className="bg-[#8a4baf] text-[#ffffff] py-[12px] px-[24px] rounded-[5px] text-[18px] cursor-pointer transition-all duration-300 ease-out mt-[10px] hover:bg-[#5f357e] md:text-[16px]"
            onClick={() => navigate("/courses")}
          >
            Get Started
          </button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}

export default Home;
