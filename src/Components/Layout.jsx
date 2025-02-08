import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (for small screens)
  useEffect(() => {
    const handleTouchOutside = (event) => {
      if (window.innerWidth < 768) {
        const sidebar = document.querySelector(".sidebar");
        const toggleBtn = document.querySelector(".toggle-btn");
        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          toggleBtn &&
          !toggleBtn.contains(event.target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleTouchOutside);
    document.addEventListener("touchstart", handleTouchOutside); // Touch support

    return () => {
      document.removeEventListener("click", handleTouchOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div>
          <Link to="/" className="bg-white p-1 d-flex text-decoration-none">
            <img src="../logo.png" className="logo" alt="form logo" />
            <h4 className="text-center text-dark mt-2 mx-1">Form Builder</h4>
          </Link>
          <ul className="nav flex-column gap-2 mt-4" style={{ fontFamily: "Poppins", fontSize: "1.1rem" }}>
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                <i className="fa-solid fa-house mx-3"></i>Dashboard
              </Link>
            </li>
            <li>
              <Link to="/forms" className="nav-link text-white">
                <i className="fa-regular fa-file mx-3"></i> Forms
              </Link>
            </li>
            <li>
              <Link to="/templates" className="nav-link text-white">
                <i className="fa-solid fa-chart-bar mx-3"></i>Templates
              </Link>
            </li>
            <li>
              <Link to="/submissions" className="nav-link text-white">
                <i className="fa-regular fa-clipboard mx-3"></i>Submissions
              </Link>
            </li>
            <li>
              <Link to="/logout" className="nav-link text-white">
                <i className="fa-solid fa-sign-out-alt mx-3"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        {/* Navbar */}
        <div expand="lg" className="colortheme">
          <div fluid className="d-flex justify-content-between">
            <button
              className="toggle-btn text-white"
              onClick={(e) => {
                e.stopPropagation(); // Prevent sidebar from closing when clicking the button
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <i className="fa fa-bars"></i>
            </button>
            {/* <div className="mt-2 text-light">Dashboard</div> */}
            <div className="d-flex align-items-center bg-light rounded-pill p-2">
              <i className="fa-solid fa-circle-user m-1 fa-xl"></i>
              <span className="px-2">Username</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4">{children}</div>
      </div>

      {/* Sidebar open/close effect for mobile */}
      <style>
        {`
          .main-content {
            margin-left: ${isSidebarOpen ? "250px" : "0"};
            transition: margin-left 0.3s ease-in-out;
            width: 100%;
          }
          
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0; /* Ensure it doesn't shift on mobile */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
