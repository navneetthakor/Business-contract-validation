import React, { useContext, useEffect, useState } from "react";
import { UserLogedContext } from "../../context/UserLogedContext";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/CONTRACTIFY-1.png"
import avtar from "../../assets/avtar.jpeg"
import { LuArrowRightToLine } from "react-icons/lu";
import { BiArrowToBottom } from "react-icons/bi";

export default function Navbar() {
  // to chanck whether user login state changes or not
  const { isUserLoged, setIsUserLoged } = useContext(UserLogedContext);

  // to check weather we are on result page or not
  const location = useLocation();
  const pathIncludesResult = location.pathname.includes("result");

  // for navigation
  const navigate = useNavigate();

  // to hold user data
  const [user, setUser] = useState({
    image: "",
  });

  // login click 
  const handleLoginClick = () =>{
    if(localStorage.getItem('usertoken')){
      navigate('/result');
    }
    else{
      navigate('/login')
    }
  }

  // to get user data
  useEffect(() => {
    const togetUser = async () => {
      if (localStorage.getItem("usertoken")) {
        const url = `${process.env.REACT_APP_BACKEND_IP}/user/userAuthtokenLogin`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            usertoken: localStorage.getItem("usertoken"),
          },
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if (data.signal === "green") {
          setUser(data.user);
        }
      }
    };
    togetUser();
  }, [location.pathname, isUserLoged]);

  // navigation buttons
  const navButtons = (txt) => {
    return (
      <button onClick={() => navigate('/')} className="border-transparent hover:border-b-indigo-500 border-2 text-lg font-medium active:text-sm">
        {txt}
      </button>
    );
  };

  //  toggle click
  const toggleClick = () => {
    document.getElementById("toolbar").classList.toggle("hidden");
    document.getElementById("rightarr").classList.toggle("hidden");
    document.getElementById("bottomarr").classList.toggle("hidden");
  };
  // list of buttons for center
  const navLabels = ["Home", "How to use", "Help", "Documentation"];

  return (
    <div className=" relative z-[1000] top-0 left-0 sm:h-[11.5vh]  flex flex-row justify-between items-center px-[5vw] pt-1 border-gray-300 border-b-2">
      {/* logo division  */}
      <div className="h-[70%] sm:w-[15%]">
        <img style={{width: '100%', height: '100%'}} src={logo} alt='logo' />
      </div>

      {/* navigation  */}
      <div className="flex flex-row gap-5">
        {navLabels?.map((labal) => navButtons(labal))}
      </div>

      {/* login button  or avtar */}
      <div className="h-[100%] sm:w-[20%] flex items-center justify-end cursor-pointer">
        {pathIncludesResult ? (
          <div
            onClick={toggleClick}
            onBlur={toggleClick}
            className="dropdown dropdown-end flex flex-row gap-3 items-center border-[1px] rounded-md shadow-sm shadow-blue-500/50 border-gray-500 p-1"
          >
            <div class="avatar indicator">
              <div class="w-12 h-12 rounded-[50%] border-gray-500 border-[1px]">
               {!user.image ? <img src={avtar} /> : <img src={`${process.env.REACT_APP_BACKEND_IP}/${user.image}`} alt='user image' className="w-[100%] h-[100%]" /> }
              </div>
            </div>
            <div className="w-[50%]">
              <div className=" text-blue-500 truncate">{user.username} </div>
              <div className=" truncate">{user.email} </div>
            </div>
            <LuArrowRightToLine size={20} id="rightarr" />
            <BiArrowToBottom size={20} id="bottomarr" className="hidden" />
          </div>
        ) : (
          <button onClick={handleLoginClick} className="h-[70%] w-[50%] z-10 btn text-white bg-gradient-to-r from-cyan-500 to-blue-500 text-[1.2rem]">
            Login
          </button>
        )}
      </div>

      {/* iteam bar  */}
      <ul
        id="toolbar"
        tabIndex={0}
        className=" border-gray-300 rounded-sm p-2 border-2 shadow-md w-[15%] absolute top-[12vh] right-[5vw] hidden text-md"
      >
        <li
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="hover:bg-blue-500 hover:text-white rounded-sm pl-1 cursor-pointer"
        >
          <a>Settings</a>
        </li>
        <li
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="hover:bg-blue-500 hover:text-white rounded-sm pl-1 cursor-pointer"
        >
          <a>History</a>
        </li>
        <li
          onClick={() => {localStorage.removeItem('usertoken'); navigate('/'); toggleClick()}}
          className="hover:bg-blue-500 hover:text-white rounded-sm pl-1 cursor-pointer"
        >
          <a>Logout</a>
        </li>
      </ul>

    </div>
  );
}
