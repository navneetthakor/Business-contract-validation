import React from 'react'
import bg from '../assets/home1.jpg'
import { IoMdCloudUpload } from "react-icons/io";
import { MdFindInPage } from "react-icons/md";
import { TbLayersDifference } from "react-icons/tb";
import { FcAnswers } from "react-icons/fc";
import { FaHighlighter } from "react-icons/fa";


export default function Home() {
  return (
    <div>
      <section className="text-gray-600 body-font z-10">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Welcome to Contractify
            </h1>
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Your AI Business Contract Validator
            </h2>
            <p className="mb-8 leading-relaxed">Upload your contracts and obtain the deviations present in it from the actual template. We securely store all your contracts and templates for easy access to you for future validations. Contractify provides you all the details and knowledge regarding the contract with the best accuracy for the best collaboration!!</p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6  hover:bg-blue-300 rounded text-lg cursor-pointer">Try Now</button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="home1" src={bg} />
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">How We Do?</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-black text-lg">Our AI Model performs the following 6 tasks for generating your response.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <IoMdCloudUpload />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Storing on Cloud</h2>
                <p className="leading-relaxed text-base">We store all your contracts and templates you upload on a secure cloud which none other can access.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <MdFindInPage />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Extracting Entities</h2>
                <p className="leading-relaxed text-base">Extracting key entities present in your contract such as people involved, organizations involved, amount mentioned, duration mentioned, etc.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <TbLayersDifference />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Performing classification</h2>
                <p className="leading-relaxed text-base">Based on the contract and template you provide, we classify the sub-clauses for obtaining the deviations present in your contract.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Finding Deviations</h2>
                <p className="leading-relaxed text-base">Obtain all the deviations present in your contract which deflects from a standard template or differ in terms of various conditions from past collaborations with the same Firm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <FcAnswers />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Generating Summary</h2>
                <p className="leading-relaxed text-base">Obtain a brief summary regarding all the validation tasks performed on your contract for quicker information.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <FaHighlighter />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Highlighted Pdf</h2>
                <p className="leading-relaxed text-base">We provide you with a highlighted version of your contract so you can  directly see the deviations present and take actions accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


// const mixBlend = {
//   position: "absolute",
//   inset: "0px",
//   background: image,
//   backgroundRepeat: "repeat",
//   backgroundPosition: "right top",
//   backgroundSize: "20px, 20px",
//   mixBlendMode: "overlay",
// };


    // {/* <div
    //   className="flex justify-center items-center"
    //   style={{
    //     inset: "0px",
    //     backgroundImage: `url(${image})`,
    //     backgroundRepeat: "repeat",
    //     backgroundPosition: "right top",
    //     backgroundSize: "20px, 20px",
    //     mixBlendMode: "overlay",
    //     opacity: "0.5",
    //     zIndex: -1,
    //   }}
    //   > */}