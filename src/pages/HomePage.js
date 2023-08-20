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
      <div className="hidden md:grid grid-cols-2 gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            The best place to find your dream house.
          </h1>
          <p className="mb-8">
            Lexi is ready to help with your homebuying and selling needs. As a
            proud member of the Coldwell Banker 1st Choice Realty family, Lexi
            carries the values of hard work, integrity, and outstanding client
            service into everything she does.
          </p>

          <button
            className="font-nunito"
            style={{
              padding: "20px 40px",
              borderRadius: "12px",
              color: "white",
              backgroundColor: "rgb(31, 105, 255)",
              boxShadow: "0 2px 12px 0 rgba(20, 20, 43, 0.07)",
              transform: "scale3d(1, 1, 1.01)",

              transition:
                "box-shadow 300ms ease, color 300ms ease, background-color 300ms ease, transform 300ms ease",
            }}
          >
            Learn More
          </button>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-100 p-4 rounded mb-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          {/* Search Text Input with Icon */}
          <div className="relative mt-2 md:mt-0 md:col-span-2">
            <input
              type="text"
              placeholder="Search properties..."
              className="border h-20 pl-20 pr-32 rounded-xl bg-white shadow-md w-full"
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
            ></ion-icon>
          </div>

          {/* Bedrooms Dropdown */}
          <div className="relative mt-2 md:mt-0 md:col-span-2">
            <select
              className="border h-20 pl-20 pr-32 rounded-xl bg-white shadow-md w-full"
              style={{
                borderColor: "#fff",
                boxShadow: "2px 2px 20px 0 rgba(8, 15, 52, 0.06)",
              }}
            >
              <option value="">Bedrooms</option>
              {/* Add bedroom options here */}
            </select>
            <ion-icon
              name="bed-outline"
              class="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl"
            ></ion-icon>
          </div>

          {/* Price Range Dropdown with Icon */}
          <div className="relative mt-2 md:mt-0 md:col-span-2">
            <select
              className="border h-20 pl-20 pr-32 rounded-xl bg-white shadow-md w-full"
              style={{
                borderColor: "#fff",
                boxShadow: "2px 2px 20px 0 rgba(8, 15, 52, 0.06)",
              }}
            >
              <option value="">Select Price Range</option>
              {/* Add price ranges here */}
            </select>
            <ion-icon
              name="pricetag-outline"
              class="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl"
            ></ion-icon>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties
            .filter((prop) => {
              return (
                prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prop.address
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                prop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prop.state.toLowerCase().includes(searchQuery.toLowerCase())
              );
            })
            .map((prop) => (
              <Link to={`/listing/${prop.id}`} key={prop.id}>
                <div className="border rounded-2xl bg-white shadow-md mb-4 flex w-full h-72 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-1/2 h-full object-cover rounded-l-2xl"
                  />
                  <div className="p-4 w-1/2 space-y-2 relative flex flex-col">
                    <div className="flex items-start space-x-2 mt-2">
                      <ion-icon
                        name="location-outline"
                        className="text-xl mt-1"
                      ></ion-icon>
                      <div>
                        <span className="text-sm block">{prop.address}</span>
                        <span className="text-sm">{`${prop.city}, ${prop.state}`}</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold truncate">{prop.title}</h2>
                    <p className="text-xs text-gray-600 truncate flex-grow">
                      {prop.description}
                    </p>
                    <div className="mt-2 space-x-2">
                      <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{`${prop.sqft} sqft`}</span>
                      <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{`${prop.bedrooms} Beds`}</span>
                      <span className="bg-gray-200 text-xs px-2 py-1 rounded-full">{`${prop.bathrooms} Baths`}</span>
                    </div>
                    <div className="absolute top-2 right-2 text-sm font-semibold">
                      ${prop.price}
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
