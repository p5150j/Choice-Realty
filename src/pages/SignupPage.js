import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Add a new user document to the Firestore "users" collection
      await addDoc(collection(db, "users"), {
        uid: userId,
        email,
        name,
        phone,
        type: "user",
      });

      setToastMessage("Successfully signed up! Redirecting...");
      setTimeout(() => {
        // Redirect to homepage
        window.location.href = "/";
      }, 3000); // 3 seconds delay
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signup
          </h2>
        </div>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border h-20 pl-5 pr-8 rounded-xl bg-white shadow-md w-full"
                style={{
                  borderColor: "rgb(255, 255, 255)",
                  boxShadow: "rgba(8, 15, 52, 0.06) 2px 2px 20px 0px",
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border h-20 pl-5 pr-8 rounded-xl bg-white shadow-md w-full mt-4"
                style={{
                  borderColor: "rgb(255, 255, 255)",
                  boxShadow: "rgba(8, 15, 52, 0.06) 2px 2px 20px 0px",
                }}
              />
            </div>

            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border h-20 pl-5 pr-8 rounded-xl bg-white shadow-md w-full mt-4"
                style={{
                  borderColor: "rgb(255, 255, 255)",
                  boxShadow: "rgba(8, 15, 52, 0.06) 2px 2px 20px 0px",
                }}
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border h-20 pl-5 pr-8 rounded-xl bg-white shadow-md w-full mt-4"
                style={{
                  borderColor: "rgb(255, 255, 255)",
                  boxShadow: "rgba(8, 15, 52, 0.06) 2px 2px 20px 0px",
                }}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "20px 40px",
                borderRadius: "12px",
                color: "white",
                backgroundColor: "#f85757",
                boxShadow: "0 2px 12px 0 rgba(20, 20, 43, 0.07)",
                transform: "scale3d(1, 1, 1.01)",
                transition:
                  "box-shadow 300ms ease, color 300ms ease, background-color 300ms ease, transform 300ms ease",
              }}
            >
              Signup
            </button>
          </div>
        </form>
      </div>

      {toastMessage && (
        <div className="fixed top-20 right-0 mt-4 mr-4 p-4 rounded bg-green-500 text-white">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default SignupPage;
