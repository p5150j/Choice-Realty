import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesCollection = collection(db, "properties");
      const snapshot = await getDocs(propertiesCollection);
      const fetchedProperties = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(fetchedProperties);
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Welcome to Our Real Estate Platform</title>
        <meta
          name="description"
          content="Discover the best properties in your favorite locations."
        />

        {/* OpenGraph tags for Facebook */}
        <meta
          property="og:title"
          content="Welcome to Our Real Estate Platform"
        />
        <meta
          property="og:description"
          content="Discover the best properties in your favorite locations."
        />
        <meta
          property="og:image"
          content="https://assets.website-files.com/6193ce0889184dacb7d96c80/619412c0cc09986edee32714_image-1-hero-realtor-template.jpg"
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Welcome to Our Real Estate Platform"
        />
        <meta
          name="twitter:description"
          content="Discover the best properties in your favorite locations."
        />
        <meta
          name="twitter:image"
          content="https://assets.website-files.com/6193ce0889184dacb7d96c80/619412c0cc09986edee32714_image-1-hero-realtor-template.jpg"
        />
      </Helmet>
      {/* Hero Section */}
      <div className="grid md:grid-cols-6 grid-cols-1 gap-4 md:gap-8 mb-16 p-4 md:p-0">
        <div className="md:col-span-3 flex flex-col justify-center mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-wide mb-4">
            The best place to find your dream house.
          </h1>
          <p className="text-base leading-relaxed mb-6 md:mb-8">
            Lexi is ready to help with your homebuying and selling needs. As a
            proud member of the Coldwell Banker 1st Choice Realty family, Lexi
            carries the values of hard work, integrity, and outstanding client
            service into everything she does.
          </p>
          <Link
            to="/about"
            style={{
              display: "inline-block",
              width: "100%",
              maxWidth: 200,
              padding: "15px 30px",
              backgroundColor: "rgb(248, 87, 87)",
              borderRadius: "12px",
              color: "white",
              boxShadow: "rgba(20, 20, 43, 0.07) 0px 2px 12px 0px",
              transform: "scale3d(1, 1, 1.01)",
              transition:
                "box-shadow 300ms ease 0s, color 300ms ease 0s, background-color 300ms ease 0s, transform 300ms ease 0s",
              textAlign: "center", // To center the text
            }}
          >
            Learn More
          </Link>
        </div>
        <div className="md:col-span-3 grid grid-cols-2 gap-4 relative overflow-hidden">
          <div className="relative pb-4">
            <img
              src="https://images.unsplash.com/photo-1565182999561-18d7dc61c393"
              alt="Real Estate 1"
              className="shadow-lg w-full object-cover slide-in-up parallax-image rounded-xl"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <div className="relative pt-4">
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
              alt="Real Estate 2"
              className="shadow-lg w-full object-cover slide-in-down parallax-image rounded-xl"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Real Estate 3"
              className="shadow-lg w-full object-cover slide-in-up parallax-image rounded-xl"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1629236714692-9dddb8ebe990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
              alt="Real Estate 4"
              className="shadow-lg w-full object-cover slide-in-down parallax-image rounded-xl"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-100 p-4 rounded mb-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          {/* Search Text Input with Icon */}
          <div className="relative mt-2 md:mt-0 md:col-span-6">
            <input
              type="text"
              placeholder="Search properties..."
              className="border h-20 pl-20 pr-32 rounded-xl bg-white shadow-md w-full text-lg font-medium"
              style={{
                borderColor: "#fff",
                boxShadow: "2px 2px 20px 0 rgba(8, 15, 52, 0.06)",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ion-icon
              name="search"
              class="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl"
              title="Search by location, name, or description"
            ></ion-icon>
            {searchQuery && (
              <ion-icon
                name="close-outline"
                class="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer"
                onClick={() => setSearchQuery("")}
              ></ion-icon>
            )}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div class="p-4 md:p-0">
        <h2 className="text-2xl font-semibold mb-4">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties
            .filter((prop) => {
              return (
                prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prop.address
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                prop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prop.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prop.bedrooms.toString().includes(searchQuery) ||
                prop.price.toString().includes(searchQuery)
              );
            })
            .map((prop) => (
              <Link to={`/listing/${prop.id}`} key={prop.id}>
                <div className="border rounded-2xl bg-white shadow-md mb-6 md:flex block w-full h-auto md:h-72 hover:shadow-lg transition-shadow duration-300">
                  <div className="md:w-1/2 w-full h-48 md:h-full overflow-hidden rounded-l-2xl">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>

                  <div className="p-6 md:w-1/2 w-full space-y-4 relative flex flex-col justify-between">
                    <div
                      className="absolute top-2 right-2 text-xl font-bold"
                      style={{ color: "#f85757" }}
                    >
                      ${prop.price}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <ion-icon name="location-outline"></ion-icon>
                        <span className="text-sm block">{`${prop.address}`}</span>
                      </div>
                      <h2 className="text-xl font-bold truncate">
                        {prop.title}
                      </h2>
                      <p className="text-base leading-relaxed text-gray-600 flex-grow overflow-hidden line-clamp-4">
                        {prop.description}
                      </p>
                    </div>

                    <div>
                      <hr className="border-gray-300 my-2" />
                      <div className="space-x-2">
                        <span className="bg-[rgb(248,87,87)] text-white text-xs px-2 py-1 rounded-full">{`${prop.sqft} sqft`}</span>
                        <span className="bg-[rgb(248,87,87)] text-white text-xs px-2 py-1 rounded-full">{`${prop.bedrooms} Beds`}</span>
                        <span className="bg-[rgb(248,87,87)] text-white text-xs px-2 py-1 rounded-full">{`${prop.bathrooms} Baths`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
