import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Cards";

const Container = () => {
  const URL = import.meta.env.VITE_OPEN_URL;
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function fetchPosts() {
    axios.get(`${URL}/user/showallproducts`)
      .then(response => {
        setPosts(response.data.products);
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtered posts based on search term
 const filteredPosts = posts.filter(item =>
  item?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
   ||
   item?.model?.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <div className="w-full min-h-screen h-full bg-zinc-800 p-5">
      
      {/* Search Input */}
      <div className="mb-4 w-full flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="z-4 px-4 py-2 mt-15 rounded border-1 outline-none w-full sm:w-1/2 text-zinc-400"
        />
      </div>

      {/* Cards Display */}
      <div className="relative grid grid-cols-2 gap-1 sm:flex sm:gap-1 sm:flex-wrap sm:flex-row">
        {filteredPosts.map((item, index) => (
          <Card data={item} key={index} />
        ))}

        {filteredPosts.length === 0 && (
          <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[-50%] font-semibold text-[14vw] leading-none tracking-tighter text-zinc-900'>
            {posts.length === 0 ? "Loading..." : "NoResults"}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Container;
