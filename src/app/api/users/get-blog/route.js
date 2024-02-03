import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const data = await Blog.find({}).exec();
    console.log(data);

    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
