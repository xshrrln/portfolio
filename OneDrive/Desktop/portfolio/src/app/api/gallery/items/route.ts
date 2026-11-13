import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const trackerPath = path.join(process.cwd(), "src", "data", "gallery.json");
    
    if (fs.existsSync(trackerPath)) {
      const fileData = fs.readFileSync(trackerPath, "utf-8");
      return NextResponse.json(JSON.parse(fileData));
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error("Error reading gallery items:", error);
    return NextResponse.json([], { status: 500 });
  }
}