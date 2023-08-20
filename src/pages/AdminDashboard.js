import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import ImageDropzone from "../ImageDropzone";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ref as storageRef } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputStylez =
    "w-full min-h-[83px] px-14 py-4 border border-white rounded-lg bg-white shadow-md";

  const [property, setProperty] = useState({
    title: "",
    description: "",
    images: [],
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    price: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
  });

  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "properties"), property);

      alert("Property added successfully!");
      setProperty({
        title: "",
        description: "",
        images: [],
        bedrooms: "",
        bathrooms: "",
        sqft: "",
        price: "",
        propertyType: "",
        address: "",
        city: "",
        state: "",
      });
      setShowModal(false);
    } catch (error) {
      alert("There was an error adding the property. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  const handleImageUpload = async (acceptedFiles) => {
    try {
      // Map over all accepted files and create an upload promise for each one
      const uploadPromises = acceptedFiles.map(async (file) => {
        const imageReference = storageRef(
          storage,
          `property-images/${Date.now()}-${file.name}`
        );
        const snapshot = await uploadBytesResumable(imageReference, file);
        return getDownloadURL(snapshot.ref);
      });

      // Wait for all the upload promises to resolve
      const imageUrls = await Promise.all(uploadPromises);

      // Update the property state with the new image URLs
      setProperty((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...imageUrls],
      }));
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
  };

  useEffect(() => {
    const propertiesCollection = collection(db, "properties");
    const unsubscribe = onSnapshot(propertiesCollection, (snapshot) => {
      const props = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProperties(props);
    });

    return () => unsubscribe();
  }, []);

  const inputStyle =
    "w-full min-h-[83px] px-14 py-4 border border-white rounded-lg bg-white shadow-md";

  return (
    <div className="p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>

      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add New Property
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            className="absolute w-full h-full bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 z-10 p-4 rounded-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-lg"
            >
              &times;
            </button>
            <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
              <input
                className={inputStyle}
                name="title"
                placeholder="Title"
                value={property.title}
                onChange={handleChange}
              />
              <textarea
                className={inputStyle}
                name="description"
                placeholder="Description"
                value={property.description}
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="bedrooms"
                placeholder="Bedrooms"
                type="number"
                value={property.bedrooms}
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="bathrooms"
                placeholder="Bathrooms"
                type="number"
                value={property.bathrooms}
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="sqft"
                placeholder="Square Footage"
                value={property.sqft}
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="price"
                placeholder="Price"
                value={property.price}
                onChange={handleChange}
              />
              <select
                className={`w-full ${inputStyle} appearance-none`}
                name="propertyType"
                value={property.propertyType}
                onChange={handleChange}
              >
                <option value="">Select Property Type</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
              </select>
              <input
                className={inputStyle}
                name="address"
                placeholder="Address"
                value={property.address}
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="city"
                placeholder="City"
                value={property.city}
                onChange={handleChange}
              />
              <input
                className={inputStyle}
                name="state"
                placeholder="State"
                value={property.state}
                onChange={handleChange}
              />
              <ImageDropzone onDrop={handleImageUpload} />

              <button
                type="submit"
                className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg"
              >
                Save Property
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl mt-4 mb-4">Listed Properties:</h3>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${inputStylez} mb-4`}
        />

        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">City</th>
              <th className="py-2 px-4 border">State</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Sqft</th>
            </tr>
          </thead>
          <tbody>
            {properties
              .filter((prop) => {
                return (
                  prop.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  prop.address
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  prop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  prop.state.toLowerCase().includes(searchQuery.toLowerCase())
                );
              })
              .map((prop) => (
                <tr key={prop.id}>
                  <td className="py-2 px-4 border">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      className="w-24 h-24 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border">{prop.title}</td>
                  <td className="py-2 px-4 border">{prop.address}</td>
                  <td className="py-2 px-4 border">{prop.city}</td>
                  <td className="py-2 px-4 border">{prop.state}</td>
                  <td className="py-2 px-4 border">{prop.price}</td>
                  <td className="py-2 px-4 border">{prop.sqft}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
