import UserModal from "DBconfig/models/UserModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();

  try {
    // 3- Try to delete user based on email
    const deletedUser = await UserModal.findOneAndDelete({ email: objFromFrontEnd.email });

    if (!deletedUser) {
      // If no user is found with the given email
      return NextResponse.json("Failed to delete user");
    }

    // 4- Return success message
    return NextResponse.json("Failed to delete user");
  } catch (error) {
    // Handle errors
    console.error("Error deleting user:", error);
    return NextResponse.json("Failed to delete user");
  }
}
