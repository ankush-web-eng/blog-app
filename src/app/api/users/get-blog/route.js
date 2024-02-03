import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const data = await Blog.find({}).limit(100);
    console.log(data);
    // console.log(data.name,data.blog);

    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
