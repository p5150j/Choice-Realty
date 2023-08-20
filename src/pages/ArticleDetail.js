import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ReactQuill from "react-quill";
import "./custom-quill-styles.css";
import { Helmet } from "react-helmet";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const articleRef = doc(db, "articles", id);
      const articleDoc = await getDoc(articleRef);

      if (articleDoc.exists()) {
        setArticle({
          id: articleDoc.id,
          ...articleDoc.data(),
        });
      } else {
        console.log("No such article!");
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        {/* OpenGraph tags for Facebook */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.image} />
        {/* Add any other meta tags you think are relevant for SEO */}
      </Helmet>
      {/* Article Title */}
      <h2 className="text-3xl font-bold mb-6">{article.title}</h2>

      {/* Article Image */}
      <div className="relative w-full rounded-xl overflow-hidden mb-8">
        <img
          src={article.image}
          alt={article.title}
          className="w-full object-cover"
          style={{ maxHeight: "500px" }}
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg">
        <ReactQuill value={article.content} readOnly={true} theme={"bubble"} />
      </div>

      {/* Article Metadata */}
      <div className="mt-6 text-gray-600">
        <span>Tag: {article.tag}</span>
        {/* Add more metadata here if available, e.g., date, author */}
      </div>
    </div>
  );
}

export default ArticleDetail;
