import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { user, text } = reqBody;
    // console.log(reqBody);
    // console.log(user,text);

    const newBlog = new Blog({
      name: user,
      blog: text,
    });
    // console.log(newBlog);

    const savedBlog = await newBlog.save();
    if (savedBlog) {
      console.log("Blog saved successfully");
    }

    revalidatePath('/');

    return NextResponse.json(
      { message: "Blog Saved Successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}

export const runtime = 'edge'
