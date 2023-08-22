import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

function AboutPage() {
  const [toastMessage, setToastMessage] = useState(null);
  const formRef = useRef(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Capture the form data
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Send data to Firebase Cloud Function
    try {
      const response = await fetch(
        "https://us-central1-lexi-b90dd.cloudfunctions.net/sendEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Email sent successfully.");
        setToastMessage("Email sent successfully.");
        formRef.current.reset(); // Reset the form values
        setTimeout(() => {
          setToastMessage(null);
        }, 3000); // Clears the toast after 3 seconds
      } else {
        console.error("Error sending email:", result.error);
        // Show an error message to the user.
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      // Show an error message to the user.
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Helmet>
        <title>
          About Alexia Manweiler - Coldwell Banker 1st Choice Realty
        </title>
        <meta
          name="description"
          content="Learn more about Lexi Manweiler, an esteemed graduate of Woodland Park High School and a distinguished realtor with Coldwell Banker 1st Choice Realty."
        />

        {/* OpenGraph tags for Facebook */}
        <meta
          property="og:title"
          content="About Alexia Manweiler - Coldwell Banker 1st Choice Realty"
        />
        <meta
          property="og:description"
          content="Discover the journey and expertise of Lexi Manweiler in the realm of real estate in the Pikes Peak area."
        />
        <meta
          property="og:image"
          content="https://www.coldwellbanker.com/_next/image?url=https%3A%2F%2Fimages.cloud.realogyprod.com%2Fagents%2FCBR%2FP00200000GFj297Ez8dMNdGF2sr1SAkfXiN2aJCR%2FP01600000GGSGyijYQ9cHVGEpxqvBoeGEG4NXWdV.jpg%3Fwidth%3D400&w=1920&q=75"
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Alexia Manweiler - Coldwell Banker 1st Choice Realty"
        />
        <meta
          name="twitter:description"
          content="Discover the journey and expertise of Lexi Manweiler in the realm of real estate in the Pikes Peak area."
        />
        <meta
          name="twitter:image"
          content="https://www.coldwellbanker.com/_next/image?url=https%3A%2F%2Fimages.cloud.realogyprod.com%2Fagents%2FCBR%2FP00200000GFj297Ez8dMNdGF2sr1SAkfXiN2aJCR%2FP01600000GGSGyijYQ9cHVGEpxqvBoeGEG4NXWdV.jpg%3Fwidth%3D400&w=1920&q=75"
        />
      </Helmet>
      <div className="flex flex-wrap mb-10">
        {/* Left Side: Image and Info */}
        <div className="w-full md:w-2/3 p-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <img
                src="https://www.coldwellbanker.com/_next/image?url=https%3A%2F%2Fimages.cloud.realogyprod.com%2Fagents%2FCBR%2FP00200000GFj297Ez8dMNdGF2sr1SAkfXiN2aJCR%2FP01600000GGSGyijYQ9cHVGEpxqvBoeGEG4NXWdV.jpg%3Fwidth%3D400&w=1920&q=75"
                alt="Alexia Manweiler"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 pl-4">
              <h1 className="text-2xl font-bold mb-2">Alexia Manweiler 🦄</h1>
              <p className="mb-2">
                <ion-icon name="person-outline"></ion-icon> Sales Associate
              </p>
              <p className="mb-2">
                <ion-icon name="business-outline"></ion-icon> Coldwell Banker
                1st Choice Realty
              </p>
              <p className="mb-2">
                <ion-icon name="document-text-outline"></ion-icon> License #:
                FA.100102228
              </p>
              <p className="mb-2">
                <a href="tel:7199305229">
                  <ion-icon name="call-outline"></ion-icon> (719) 930-5229
                  (Mobile)
                </a>
              </p>
              <p className="mb-2">
                <ion-icon name="mail-outline"></ion-icon>{" "}
                lexi@1stchoicerealtycb.com
              </p>
              <p className="mb-2">
                <ion-icon name="business-outline"></ion-icon> Coldwell Banker
                1st Choice Realty, Inc.
              </p>
              <p className="mb-2">
                <ion-icon name="location-outline"></ion-icon> Woodland Park, CO
                Office
              </p>
            </div>
          </div>
          {/* About Section */}
          <div className="mb-10">
            <br />
            <h2 className="text-xl font-bold mb-4">About Lexi 👋</h2>
            <h3 className="text-lg font-semibold">✅ Local Expertise</h3>
            <p className="text-gray-700 mb-4">
              Lexi Manweiler is a real estate professional deeply rooted in the
              Woodland Park community. As an esteemed graduate of Woodland Park
              High School, Lexi has an unparalleled understanding of the local
              market, making her an invaluable asset for those seeking to
              navigate the complexities of real estate in the Pikes Peak area.
              Drawing from her extensive experience, Lexi has honed her skills
              to provide tailored solutions to her clients, ensuring that their
              real estate aspirations are not just met, but exceeded.
            </p>

            <h3 className="text-lg font-semibold">
              ✅ Commitment to Excellence
            </h3>
            <p className="text-gray-700 mb-4">
              As a distinguished realtor with Coldwell Banker 1st Choice Realty,
              Lexi upholds the highest standards of professionalism, integrating
              core values of diligence, integrity, and exceptional client
              service in every transaction. Her comprehensive knowledge of
              Teller County, combined with her genuine passion for real estate,
              positions her as a trusted advisor in home buying and selling
              processes.
            </p>

            <h3 className="text-lg font-semibold">✅ Outside the Office</h3>
            <p className="text-gray-700 mb-4">
              Outside of her professional endeavors, Lexi is an avid hiker,
              exploring the scenic trails of Woodland Park and continuously
              seeking inspiration for her own home design and renovation
              projects.
            </p>

            <h3 className="text-lg font-semibold">Choose Lexi</h3>
            <p className="text-gray-700">
              Choosing Lexi as your realtor means securing a dedicated partner,
              committed to achieving outstanding results tailored to your unique
              needs.
            </p>
          </div>
        </div>
        {/* Right Side: Contact Form as a Card */}
        <div className="w-full md:w-1/3 p-4">
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Contact the Agent</h3>
            <form
              className="space-y-4"
              onSubmit={handleFormSubmit}
              ref={formRef}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="mt-1 p-2 w-full border rounded-md"
                ></textarea>
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
                  Send Message
                </button>
              </div>
            </form>

            {/* Agent details */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold">Agent: John Doe</h3>
              <p>Email: johndoe@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-20 right-0 mt-4 mr-4 p-4 rounded bg-green-500 text-white">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default AboutPage;
