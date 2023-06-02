import React, { useEffect, useState } from "react";


export default function Footer(){
//     const googleTranslateElementInit = () => {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: "en",
//             autoDisplay: false
//           },
//           "google_translate_element"
//         );
//       };
    // useEffect(() => {
    //     var addScript = document.createElement("script");
    //     addScript.setAttribute(
    //       "src",
    //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    //     );
    //     document.body.appendChild(addScript);
    //     window.googleTranslateElementInit = googleTranslateElementInit;
    //   }, []);

    return (
        <>
            <footer class="bg-[#0D1117] text-white  shadow dark:bg-gray-900 z-0">
                <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div class="sm:flex sm:items-center sm:justify-between text-white">
                        <a href="https://mumbai-hacks.vercel.app/" className="flex items-center mb-4 sm:mb-0">
                            <img src="" class="h-8 mr-3" />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MUMBAI</span>
                        </a>
                        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                            <li>
                                <a href="#" className="mr-4 md:mr-6 text-[#2f81e3] hover:underline ">About</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 md:mr-6 text-[#2f81e3]  hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="mr-4 md:mr-6 text-[#2f81e3]  hover:underline ">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className=" text-[#2f81e3] hover:underline">Contact</a>
                            </li>
                            <li>
                               {/* <div  id="google_translate_element"></div>  */}
                            </li>
                        </ul>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://mumbai-hacks.vercel.app/" class="hover:underline">MUMBAI™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </>
    );
}