import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;

    console.log(id);

    const savedBlog = await Blog.findByIdAndDelete(id);
    if (!savedBlog) {
      return NextResponse.json({ message: "Unable to delete blog", success: false }, { status: 404})
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
