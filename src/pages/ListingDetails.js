import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function ListingDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyRef = doc(db, "properties", id);
      const propertyDoc = await getDoc(propertyRef);

      if (propertyDoc.exists()) {
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
              propertyData.lat = location.lat;
              propertyData.lng = location.lng;
            }
          } catch (error) {
            console.error("Failed to fetch lat/lng from address", error);
          }
        }

        setProperty(propertyData);
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
        onLoad={() => console.log("Map loaded!")}
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

  if (!property) return <div>Loading...</div>;

  console.log("Latitude:", property.lat, "Longitude:", property.lng);

  return (
    <div className="relative">
      {/* Hero Image */}
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-[500px] object-cover md:h-[500px]"
      />

      <section className="py-8 mt-4 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <ion-icon name="car-outline"></ion-icon>
                  <span>{property.propertyType}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p>{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Amenities:</h3>
                <ul className="list-disc pl-5">
                  {property.amenities && property.amenities.length > 0 ? (
                    property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))
                  ) : (
                    <li>No amenities listed.</li>
                  )}
                </ul>
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
                <span className="text-xl font-bold">{`$${property.price}`}</span>
                <span className="text-gray-600"></span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Contact the Agent</h3>
              <form className="space-y-4">
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
      </section>
    </div>
  );
}

export default ListingDetails;
