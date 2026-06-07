import React from "react";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ReviewResume from "./pages/ReviewResume";
import WriteArticle from "./pages/WriteArticle";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import Layout from "./pages/Layout";
import BlogTitles from "./pages/BlogTitles";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast'



const App = () => {

  const {getToken} = useAuth()
  useEffect(()=>{
    getToken().then((token)=>{console.log(token)})
  },[])
  return (
    <div className="min-h-screen text-hi">
      <div className="app-bg" />
      <div className="grain" />
      <Toaster
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.95)",
            color: "#0c1411",
            border: "1px solid rgba(12,20,17,0.1)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 12px 30px -16px rgba(12,20,17,0.3)",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;