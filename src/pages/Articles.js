import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Helmet } from "react-helmet";

function FeaturedArticle({ article }) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="featured-article flex flex-col md:flex-row"
    >
      {/* Image Wrapper */}
      <div className="image-wrapper w-full relative mb-4 md:mb-0">
        <img
          src={article.image}
          alt={article.title}
          className="absolute top-0 left-0 w-full rounded-xl object-cover"
          style={{ maxHeight: "500px" }}
        />
      </div>

      {/* Article Content */}
      <div
        className="w-full md:w-1/2 pl-4 relative z-10 self-center rounded-xl shadow-md md:-ml-32"
        style={{
          maxWidth: "648px",
          marginTop: "60px",
          marginBottom: "60px",
          padding: "68px 54px",
          boxShadow: "0 3px 20px 0 rgba(8, 15, 52, 0.06)",
          background: "white",
          marginBottom: 200,
        }}
      >
        {/* Title */}
        <h2 className="text-2xl text-gray-600 mb-4">{article.title}</h2>

        {/* Description */}
        <p className="mb-4">{article.description}</p>

        {/* Divider */}
        <div className="border-b-2 border-gray-200 my-4"></div>

        {/* Metadata */}
        <div className="flex justify-between text-sm text-gray-500">
          {/* Category */}
          <div>{article.tag}</div>

          {/* Date (You might want to format this later) */}
          <div>{article.date}</div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="article-card bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
    >
      {/* Image */}
      <div className="relative" style={{ paddingBottom: "56.25%" }}>
        <img
          src={article.image}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl text-gray-600 mb-4">{article.title}</h3>
        <p className="text-gray-600">{article.description}</p>
      </div>
    </Link>
  );
}

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articlesCollection = collection(db, "articles");
      const snapshot = await getDocs(articlesCollection);
      const fetchedArticles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  if (articles.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-t-8 border-[rgb(248,87,87)] border rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Articles & Resources</title>
        <meta
          name="description"
          content="Discover the latest articles and resources."
        />

        {/* OpenGraph tags for Facebook */}
        <meta property="og:title" content="Articles & Resources" />
        <meta
          property="og:description"
          content="Discover the latest articles and resources."
        />
        {articles.length > 0 && (
          <meta property="og:image" content={articles[0].image} />
        )}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Articles & Resources" />
        <meta
          name="twitter:description"
          content="Discover the latest articles and resources."
        />
        {articles.length > 0 && (
          <meta name="twitter:image" content={articles[0].image} />
        )}
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Articles & Resources</h1>
      <br />
      {/* Featured Article */}
      {articles.length > 0 && <FeaturedArticle article={articles[0]} />}

      {/* Remaining Articles in Smaller Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {articles.slice(1).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Articles;
