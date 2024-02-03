import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Server Successfully Connected!!");
    });

    connection.on("error", (error) => {
      console.log("Something went wrong while connecting to server" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!!");
    console.log(error);
  }
}

