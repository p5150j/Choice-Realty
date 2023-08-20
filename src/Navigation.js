import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" p-4 fixed bg-white w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-4">
            <img
              src="/ColdwellBankerLogoVector.svg"
              alt="Coldwell Banker Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold  hover:text-blue-300">
              Alexia Manweiler
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className={`hidden md:flex space-x-6`}>
            <li>
              <Link to="/" className=" hover:text-blue-300">
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                to="/listing/sample"
                className="hover:text-blue-300"
              >
                Sample Listing
              </Link>
            </li> */}

            <li>
              <Link to="/articles" className=" hover:text-blue-300">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/add-article" className=" hover:text-blue-300">
                Add Article
              </Link>
            </li>
            <li>
              <Link to="/login" className=" hover:text-blue-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className=" hover:text-blue-300">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/admin" className=" hover:text-blue-300">
                Admin
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <ion-icon name="menu-outline" class="text-xl"></ion-icon>
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`flex flex-col space-y-4 mt-4 ${
            isMenuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <li>
            <Link to="/" className=" hover:text-blue-300">
              Home
            </Link>
          </li>
          {/* <li>
            <Link
              to="/listing/sample"
              className=" hover:text-blue-300"
            >
              Sample Listing
            </Link>
          </li> */}
          <li>
            <Link to="/articles" className="hover:text-blue-300">
              Articles
            </Link>
          </li>
          <li>
            <Link to="/add-article" className=" hover:text-blue-300">
              Add Article
            </Link>
          </li>
          <li>
            <Link to="/login" className=" hover:text-blue-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className=" hover:text-blue-300">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/admin" className=" hover:text-blue-300">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
