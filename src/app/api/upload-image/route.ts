import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Form Data: _FormData [FormData] {
//   [Symbol(state)]: [
//     { name: 'file', value: [File] }
//   ]
// }

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log(file.arrayBuffer());
    const fileBuffer = await file.arrayBuffer();
    // blob to base64
    let fileBase64 = Buffer.from(fileBuffer).toString("base64");
    fileBase64 = `data:image/png;base64,${fileBase64}`;
    const response = await cloudinary.uploader.upload(fileBase64, {
      upload_preset: "ml_default",
      folder: "coffee-shop",
      resource_type: "image",
    });
    return NextResponse.json({ secure_url: response.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}
