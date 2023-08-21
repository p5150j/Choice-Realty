import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function Navigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      console.log("onAuthStateChanged triggered");
      if (currentUser) {
        console.log("Current user found:", currentUser.email);
        setUser(currentUser);

        const db = getFirestore();
        const userQuery = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userTypeFromFirestore = userDoc.data().type;
          console.log("User type from Firestore:", userTypeFromFirestore);
          setUserType(userTypeFromFirestore);
        } else {
          console.log(
            "User document not found in Firestore for user:",
            currentUser.email
          );
        }
      } else {
        console.log("No current user found");
        setUser(null);
        setUserType(null);
      }
    });
  }, []);

  return (
    <nav className="p-4 fixed bg-white w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-4"
          >
            <span className="text-lg md:text-xl hover:text-blue-300">
              Alexia Manweiler
            </span>
            <img
              src="/ColdwellBankerLogoVector.svg"
              alt="Coldwell Banker Logo"
              className="hidden md:block h-8 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className={`hidden md:flex space-x-6`}>
            <li>
              <Link to="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-blue-300">
                Articles
              </Link>
            </li>

            {user && (
              <li>
                <Link onClick={logout} className="hover:text-blue-300">
                  Logout
                </Link>
              </li>
            )}

            {!user && (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-blue-300">
                    Signup
                  </Link>
                </li>
              </>
            )}

            {user && userType === "admin" && (
              <>
                <li>
                  <Link to="/admin" className="hover:text-blue-300">
                    Admin
                  </Link>
                </li>
                <li>
                  <Link to="/add-article" className="hover:text-blue-300">
                    Add Article
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <ion-icon name="menu-outline" className="text-xl"></ion-icon>
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`flex flex-col space-y-4 mt-4 ${
            isMenuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <li>
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/articles" className="hover:text-blue-300">
              Articles
            </Link>
          </li>

          {user && (
            <li>
              <Link onClick={logout} className="hover:text-blue-300">
                Logout
              </Link>
            </li>
          )}

          {!user && (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-300">
                  Signup
                </Link>
              </li>
            </>
          )}

          {user && userType === "admin" && (
            <>
              <li>
                <Link to="/admin" className="hover:text-blue-300">
                  Admin
                </Link>
              </li>
              <li>
                <Link to="/add-article" className="hover:text-blue-300">
                  Add Article
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
