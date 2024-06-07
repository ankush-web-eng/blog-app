"use client";
import React from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { MdDelete } from "react-icons/md";

export default function Home() {
  const [user, setUser] = React.useState("");
  const [text, setText] = React.useState("");
  const [blog, setBlog] = React.useState(null);
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const sendBlog = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/save-blog", { user, text }, {
        cache: "no-cache",
        next: {revalidate:3}
      });
      console.log(response);
      setText("");
      setUser("");
      alert("Sent Successfully!!");
      setLoading(false)
      router.reload()
    } catch (error) {
      console.error("Try Part of frontend Failed", error.response.data);
    }
  };


  const deleteBlog = async (id) => {
    try {
      let pass = prompt("Enter Password to delete")
      if (pass == 'iamironman'){
        const response = await axios.post("/api/users/delete-blog", { id }, {
          cache: "no-cache",
          next: {revalidate:3}
        });
        console.log(response);
        alert("Deleted Successfully!!");
        router.reload()
      }else{
        alert("Wrong Password!!!")
      }
    } catch (error) {
      console.log("Error", error);
      alert("Unable to delete blog");
    }
  }
  

  const getData = async () => {
    try {
      const response = await axios.get("/api/users/get-blog", {
        cache: "no-cache",
        next: {revalidate:3}
      });
      setBlog(response.data.data);
    } catch (error) {
      console.error("Try Part of frontend Failed", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <body className=" flex flex-col dark:bg-black dark:text-white bg-white text-black space-y-4 h-screen">
      <Navbar className="w-screen z-10 fixed"/>
      <main className="flex flex-col items-center justify-center max-h-full ">
        <div className="flex flex-col space-y-4 box-shadow-2xl shadow-2xl px-2 py-4 rounded-xl ">
        <strong className="text-2xl font-serif">Add your Blog</strong>
          <h1>
            <input
              placeholder="Your Name"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="rounded-full px-2 py-1 border-2"
            />
          </h1>
          <p>
            <input
              className="rounded-xl px-2 py-6 border-2 "
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Your Blog"
            />
          </p>
          <button
            onClick={sendBlog}
            className="bg-black border border-gray-300 mb-4 my-2 px-2 py-2 rounded-xl text-white hover:bg-blue-300 touch-pinch-zoom active:bg-green-500 hover:text-black drop-shadow-2xl"
          >
            {loading? <span className="flex items-center space-x-2"><Loader2 className="animate-spin"/>Processing</span>: "Submit"}
          </button>
        </div>
        <div className="flex flex-wrap md:flex-row md:flex-wrap space-y-4 justify-evenly mt-8 items-center">
          {blog == null
            ? ""
            : blog.map((data, index) => (
                <div
                  key={index}
                  className="box-shadow-2xl shadow-2xl rounded-xl py-2 px-3 w-36 h-32 overflow-hidden overflow-y-scroll no-scrollbar"
                >
                  <strong>Name:{data.name}</strong>
                  <p><strong>Blog:</strong> {data.blog}</p>
                  <span ><MdDelete className="cursor-pointer" onClick={() => deleteBlog(data._id)}/></span>
                </div>
              ))}
        </div>
      </main>
    </body>
  );
}
