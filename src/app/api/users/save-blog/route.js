import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(NextRequest) {
  try {
    const reqBody = await NextRequest.json();
    const { user, text } = reqBody;
    console.log(reqBody);
    console.log(user,text);

    const newBlog = new Blog({
      name:user,
      blog:text,
    });
    console.log(newBlog);

    const savedBlog = await newBlog.save();
    if (savedBlog) {
      console.log("Blog saved successfully");
    }
    return NextResponse.json(
      { message: "Blog Saved Successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
