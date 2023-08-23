import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleMap, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function ListingDetails() {
  // State variables
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [schools, setSchools] = useState([]);
  const [parks, setParks] = useState([]);
  const [message, setMessage] = useState("");
  const [mapsLoaded, setMapsLoaded] = useState(false);

  // Refs for DOM elements and external services
  const formRef = useRef(null);
  const googleRef = useRef(null);
  const placesServiceRef = useRef(null);

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

  useEffect(() => {
    const fetchProperty = async () => {
      console.log("[useEffect] Fetching property data...");

      const propertyRef = doc(db, "properties", id);
      const propertyDoc = await getDoc(propertyRef);

      if (propertyDoc.exists()) {
        console.log("Successfully fetched property from Firestore.");

        let propertyData = {
          id: propertyDoc.id,
          ...propertyDoc.data(),
        };

        // Check if the property has valid lat and lng values
        if (!propertyData.lat || !propertyData.lng) {
          const address = `${propertyData.address}, ${propertyData.city}`;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
              )}&key=${GOOGLE_MAPS_API_KEY}`
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const location = data.results[0].geometry.location;
              console.log(
                "Successfully fetched lat/lng from address:",
                location
              );

              propertyData.lat = location.lat;
              propertyData.lng = location.lng;
            }
          } catch (error) {
            console.error("Failed to fetch lat/lng from address", error);
          }
        }

        setProperty(propertyData);
        setMessage(
          `I am interested in the property at ${propertyData.address}, ${propertyData.city}. Please contact me.`
        );
      } else {
        console.log("No such property!");
      }
    };

    fetchProperty();
  }, [id]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMapLoad = (map) => {
    console.log("[handleMapLoad] Map loaded...");

    googleRef.current = window.google;
    placesServiceRef.current = new googleRef.current.maps.places.PlacesService(
      map
    );
    console.log("[handleMapLoad] Google and PlacesService refs set!");
  };

  useEffect(() => {
    console.log("[useEffect] Checking if we should fetch nearby places...");
    console.log("googleRef:", googleRef.current);
    console.log("placesServiceRef:", placesServiceRef.current);

    if (property && googleRef.current && placesServiceRef.current) {
      // Introducing a delay of 2 seconds before fetching
      setTimeout(() => {
        console.log("[useEffect] Fetching nearby places after delay...");
        fetchNearbyPlaces(property.lat, property.lng, "school").then(
          setSchools
        );
        fetchNearbyPlaces(property.lat, property.lng, "park").then(setParks);
      }, 2000);
    }
  }, [property]);

  const fetchNearbyPlaces = (lat, lng, type) => {
    console.log(`[fetchNearbyPlaces] Fetching nearby ${type}...`);

    return new Promise((resolve, reject) => {
      const location = new googleRef.current.maps.LatLng(lat, lng);
      const request = {
        location: location,
        radius: "2000",
        type: type,
      };

      // Log the request object
      console.log(`Fetching ${type} with request:`, request);

      placesServiceRef.current.nearbySearch(request, (results, status) => {
        if (status === googleRef.current.maps.places.PlacesServiceStatus.OK) {
          // Log the results
          console.log(`Fetched ${type} successfully:`, results);
          resolve(results);
        } else {
          // Log the error status
          console.error(`Failed to fetch nearby ${type} with status:`, status);
          reject(new Error(`Failed to fetch nearby ${type}`));
        }
      });
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    arrows: true,
  };

  const mapStyles = [
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          color: "#878787",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f9f5ed",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#aee0f4",
        },
      ],
    },
  ];

  // Google Map component
  const renderGoogleMap = () => {
    return (
      <GoogleMap
        key={Date.now()}
        onLoad={(map) => {
          console.log("Map loaded!");
          googleRef.current = window.google;
          placesServiceRef.current =
            new window.google.maps.places.PlacesService(map);
        }}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: property.lat, lng: property.lng }}
        zoom={15}
        defaultZoom={15}
        defaultCenter={{ lat: property.lat, lng: property.lng }}
        options={{ styles: mapStyles }} // Set the styles here
      >
        <Marker position={{ lat: property.lat, lng: property.lng }} />
      </GoogleMap>
    );
  };

  if (!property)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-t-8 border-[rgb(248,87,87)] border rounded-full animate-spin"></div>
      </div>
    );

  console.log("Latitude:", property.lat, "Longitude:", property.lng);
  console.log("Rendering ListingDetails...");

  return (
    <div className="relative p-4 md:p-0">
      {/* Hero Image */}
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-[500px] object-cover md:h-[500px]"
      />

      <section className="py-8 mt-4 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="col-span-2 space-y-8">
            {/* Address and Title */}
            <div>
              <div className="flex items-center text-gray-600 mb-2 space-x-2">
                <ion-icon name="location-outline"></ion-icon>
                <span>{`${property.address}, ${property.city}`}</span>
              </div>
              <h1 className="text-2xl font-bold mb-4">{property.title}</h1>

              <div className="mt-4 mb-4">{renderGoogleMap()}</div>

              {/* Chips */}
              <div className="flex flex-wrap space-x-4 mb-4">
                <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded">
                  <ion-icon name="cube-outline"></ion-icon>
                  <span>{property.sqft} sqft</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded">
                  <ion-icon name="bed-outline"></ion-icon>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded">
                  <ion-icon name="water-outline"></ion-icon>
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded">
                  <ion-icon name="bookmark-outline"></ion-icon>
                  <span>{property.propertyType}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p>{property.description}</p>
              </div>

              {/* Gallery Grid View */}
              <div className="grid grid-cols-3 gap-4 mb-8 mt-8">
                {property.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="cursor-pointer"
                    onClick={() => openModal(index)}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-4">
                    Nearby Schools:
                  </h3>
                  <ul>
                    {schools.map((school, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mb-2 text-sm"
                      >
                        <span>{school.name}</span>
                        <span className="px-2 py-1 bg-gray-200 rounded">
                          {Math.round(school.rating * 20) || "N/A"} %{" "}
                          <ion-icon name="thumbs-up-outline"></ion-icon>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Nearby Parks:</h3>
                  <ul>
                    {parks.map((park, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mb-2 text-sm"
                      >
                        <span>{park.name}</span>
                        <span className="px-2 py-1 bg-gray-200 rounded">
                          {Math.round(park.rating * 20) || "N/A"}{" "}
                          <ion-icon name="thumbs-up-outline"></ion-icon>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Carousel Modal */}
              <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Carousel"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4"
              >
                <Slider {...settings}>
                  {property.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ))}
                </Slider>
              </Modal>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-full md:col-span-1 bg-white p-6 shadow-md rounded-lg md:mt-[-271px]">
            {/* Rent and Contact */}
            <div className="space-y-4">
              <div>
                <span
                  className="text-xl font-bold"
                  style={{ color: "rgb(248, 87, 87)" }}
                >
                  {`$${property.price}`}
                </span>
                <span className="text-gray-600"></span>
              </div>
            </div>

            {/* Contact Form */}
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
                    className="mt-1 p-2 w-full border rounded-md text-gray-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
      </section>

      {toastMessage && (
        <div className="fixed top-20 right-0 mt-4 mr-4 p-4 rounded bg-green-500 text-white">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default ListingDetails;
