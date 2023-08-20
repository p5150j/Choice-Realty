import React, { useState, useRef, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const reactQuillRef = useRef(); // Create a ref for ReactQuill

  useEffect(() => {
    if (reactQuillRef && reactQuillRef.current) {
      const quillInstance = reactQuillRef.current.getEditor();
      quillInstance.root.addEventListener("paste", handleImagePaste);
    }
  }, []);

  const handleImageUpload = async () => {
    if (!image) return null;
    const storageRef = ref(storage, "articles/" + image.name);
    await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  };

  const handleImagePaste = async (e) => {
    if (e.clipboardData && e.clipboardData.items) {
      let items = e.clipboardData.items;
      let item = items[0];
      if (item.kind === "file" && item.type.match(/^image\//i)) {
        e.preventDefault();
        let blob = item.getAsFile();
        const downloadUrl = await uploadImageToFirebase(blob);
        const quillInstance = reactQuillRef.current.getEditor();
        let range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, "image", downloadUrl);
      }
    }
  };

  const uploadImageToFirebase = async (blob) => {
    const storageRef = ref(storage, "article-images/" + new Date().getTime());
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImageUrl = await handleImageUpload();

    const articleData = {
      title,
      description,
      tag,
      content,
      image: uploadedImageUrl,
    };

    try {
      await addDoc(collection(db, "articles"), articleData);
      navigate("/articles");
    } catch (error) {
      console.error("Error adding article: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <ReactQuill ref={reactQuillRef} value={content} onChange={setContent} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Article
        </button>
      </form>
    </div>
  );
}

export default AddArticle;
