import {React} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {FaLinkedin, FaInstagram, FaGithub} from "react-icons/fa";

export default function About() {

return(
    <>
    <Navbar/>
    <section class="bg-[#0d1117]">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6 ">
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white ">Our Team</h2>
          <p class="font-light text-gray-400 lg:mb-16 sm:text-xl ">Meet the hardworking team that made the development of this web-application possible.</p>
      </div> 
      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div class="items-center bg-[#161b22] rounded-lg shadow sm:flex border-2 border-gray-500">
              <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/C4D03AQG-kYWFSDHekw/profile-displayphoto-shrink_200_200/0/1658652053870?e=1691625600&v=beta&t=XB2XItNhmM9qtHZ4Tsf5LZgGKYvXcMiNYFCwoIlb2B0" alt="Japneet Rajput"/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-white">
                      <a href="#">Japneet Rajput</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Frontend & Backend Web Developer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <ul class="flex space-x-4 sm:mt-0">
                      <li>
                          <a href="#" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaLinkedin size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="https://github.com/JapneetRajput" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaGithub size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="https://www.instagram.com/japneet.rajput/" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaInstagram size={25}/></svg>
                          </a>
                      </li>
                  </ul>
              </div>
          </div> 
          
          <div class="items-center bg-[#161b22] rounded-lg shadow sm:flex border-2 border-gray-500">
              <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/C4D03AQGjVJnZjakikg/profile-displayphoto-shrink_200_200/0/1657648501282?e=1691625600&v=beta&t=QF-HyNfNa8gaCSoHd0wU_zbbiAc4ERPgyTpv2XG_WPo" alt="Aayush Talreja"/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-white">
                      <a href="#">Aayush Talreja</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Frontend & UI/UX Developer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <ul class="flex space-x-4 sm:mt-0">
                      <li>
                          <a href="https://www.linkedin.com/in/aayushtalreja/" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaLinkedin size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="https://github.com/aayu5hgit" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaGithub size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="https://instagram.com/aayu5h._" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaInstagram size={25}/></svg>
                          </a>
                      </li>
                  </ul>
              </div>
          </div> 
          <div class="items-center bg-[#161b22] rounded-lg shadow sm:flex border-2 border-gray-500">
              <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/C4D03AQEQE_lJz2FIOA/profile-displayphoto-shrink_200_200/0/1658564245816?e=1691625600&v=beta&t=XQckiddC2KKwmjsbkjwuvhGjiGFON7AlA-1Qd4z7Tp8" alt="H.P"/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-white">
                      <a href="#">Hrishikesh Patil</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Frontend Developer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <ul class="flex space-x-4 sm:mt-0">
                      <li>
                          <a href="https://www.linkedin.com/in/hrishikesh-patil-2002/" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaLinkedin size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="https://github.com/hrishi0102" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaGithub size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="#" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaInstagram size={25}/></svg>
                          </a>
                      </li>
                  </ul>
              </div>
          </div> 
          <div class="items-center bg-[#161b22] rounded-lg shadow sm:flex border-2 border-gray-500">
              <a href="#">
                  <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/D4D03AQHaKnUaZ5p5qg/profile-displayphoto-shrink_200_200/0/1670198171858?e=1691625600&v=beta&t=ajPY-krClUyATCvkZ_DRA7uYM3c6jj4xf-ZLPKC6398" alt="DJ"/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-white">
                      <a href="#">Dhananjay Pai</a>
                  </h3>
                  <span class="text-gray-500 dark:text-gray-400">Backend Developer</span>
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <ul class="flex space-x-4 sm:mt-0">
                      <li>
                          <a href="https://www.linkedin.com/in/dhananjay-pai/" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaLinkedin size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="https://github.com/dhananjaypai08" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaGithub size={25}/></svg>
                          </a>
                      </li>
                      <li>
                          <a href="#" class="text-gray-500 hover:text-white">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><FaInstagram size={25}/></svg>
                          </a>
                      </li>
                  </ul>
              </div>
          </div> 
          
      </div>  
  </div>
</section>
<Footer/>
    </>
)
}