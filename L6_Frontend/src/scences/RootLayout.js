import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import bgimage from "../assets/home_bg.jpg";
import bgimage2 from "../assets/lightBackground2.jpg";

export default function RootLayout() {
  return (
    <div
      data-theme="mytheme"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
