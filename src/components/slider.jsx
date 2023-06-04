import React from "react";
import "../styles/slider.css";

export default function Slider({ distance, setDistance }) {
  const handleRadioChange = (event) => {
    setDistance(event.target.value);
  };

  return (
    <form>
      <div className="px-2 w-full min-h-screen flex justify-center items-center">
        <div className="mb-2">
          <h2 className="block text-white lg:text-3xl sm:text-base font-bold mb-2">
            Select Radius
          </h2>
          <div className="w-full">
            <div className="grid grid-cols-3  gap-28 w-full">
              <div className="inline-block radio">
                <input
                  name="answer"
                  type="radio"
                  id="B1"
                  hidden="hidden"
                  value="2"
                  checked={distance === "2"}
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="B1"
                  className="px-2 py-1 cursor-pointer rounded-lg flex justify-center items-center text-xl lg:text-5xl font-bold sm:w-10 sm:h-10 lg:w-32 lg:h-32"
                >
                  2 KM
                </label>
              </div>
              <div className="inline-block radio">
                <input
                  name="answer"
                  type="radio"
                  id="C1"
                  hidden="hidden"
                  value="5"
                  checked={distance === "5"}
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="C1"
                  className="px-2 py-1 cursor-pointer rounded-lg flex justify-center items-center text-xl lg:text-5xl font-bold sm:w-10 sm:h-10 lg:w-32 lg:h-32"
                >
                  5 KM
                </label>
              </div>
              <div className="inline-block radio">
                <input
                  name="answer"
                  type="radio"
                  id="D1"
                  hidden="hidden"
                  value="10"
                  checked={distance === "10"}
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor="D1"
                  className="px-2 py-1 cursor-pointer rounded-lg flex justify-center items-center text-xl lg:text-5xl font-bold sm:w-10 sm:h-10 lg:w-32 lg:h-32"
                >
                  10 KM
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
