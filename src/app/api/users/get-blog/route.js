import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    const data = await Blog.find({});
    // console.log(data);
    // console.log(data.name,data.blog);

    revalidatePath("/");


    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
