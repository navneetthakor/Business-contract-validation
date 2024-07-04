import React from 'react'
import { CiChat1 } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

export default function Sidebar(props) {
  const {setResultStatus} = props
  return (
    <ul className="menu bg-base-200 rounded-box w-[15vw] h-[22vh] bg-transparent shadow-lg border-[1px] border-gray-500 shadow-blue-500/50 pt-5">
        <li onClick={() => setResultStatus("none")}>
          <a className="bg-blue-500 text-white">
          <CiChat1 size={20} color="white"/>
          New Chat
          </a>
        </li>
        <li
        onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <a>
          <GoHistory size={20}/>
            History
          </a>
        </li>
        <li
        onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <a>
          <IoSettingsOutline size={20}/>
            Settings
          </a>
        </li>
      </ul>
  )
}
