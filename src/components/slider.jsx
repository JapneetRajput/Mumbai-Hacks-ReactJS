import react from "react";
import "../styles/slider.css";
export default function Slider() {
  return (
      
<form>
  <div class="px-2 w-full min-h-screen flex justify-center items-center">
    <div class="mb-2">
      <h2 class="block text-white lg:text-3xl sm:text-base font-bold mb-2 ">
        Select Radius
      </h2>
      <div class="w-full">
        <div class="grid grid-cols-3  gap-28 w-full">
          <div class="inline-block radio">
            <input
              name="answer"
              type="radio"
              id="B1"
              hidden="hidden"
              value="B"
            />
            <label
              for="B1"
              class="px-2 py-1 cursor-pointer rounded-lg flex justify-center items-center text-xl lg:text-5xl font-bold sm:w-10 sm:h-10 lg:w-32 lg:h-32 "
            >
              2 KM
            </label>
          </div>
          <div class="inline-block radio">
            <input
              name="answer"
              type="radio"
              id="C1"
              hidden="hidden"
              value="C"
            />
            <label
              for="C1"
              class="px-2 py-1 cursor-pointer rounded-lg flex justify-center items-center text-xl lg:text-5xl font-bold sm:w-10 sm:h-10 lg:w-32 lg:h-32"
            >
              5 KM
            </label>
          </div>
          <div class="inline-block radio">
            <input
              name="answer"
              type="radio"
              id="D1"
              hidden="hidden"
              value="D"
            />
            <label
              for="D1"
              class="px-2 py-1 cursor-pointer rounded-lg flex justify-center items-center text-xl lg:text-5xl font-bold sm:w-10 sm:h-10 lg:w-32 lg:h-32"
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
