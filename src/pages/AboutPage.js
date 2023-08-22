import React from "react";
import { Helmet } from "react-helmet";

function AboutPage() {
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
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Contact Alexia</h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Your Message"
                  rows="4"
                ></textarea>
              </div>
              <button
                className="bg-[rgb(248,87,87)] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
