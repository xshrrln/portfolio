import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    // Save image into public/images/gallery/
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const originalName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${originalName}`;
    
    const uploadDir = path.join(process.cwd(), "public", "images", "gallery");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    const imagePath = `/images/gallery/${filename}`;

    // Optional: Save gallery items list to a local JSON file tracker
    const trackerDir = path.join(process.cwd(), "src", "data");
    const trackerPath = path.join(trackerDir, "gallery.json");
    
    if (!fs.existsSync(trackerDir)) {
      fs.mkdirSync(trackerDir, { recursive: true });
    }

    let items = [];
    if (fs.existsSync(trackerPath)) {
      const fileData = fs.readFileSync(trackerPath, "utf-8");
      items = JSON.parse(fileData);
    }

    const newItem = {
      id: Date.now(),
      title: title || "Untitled",
      category: category || "Uncategorized",
      image: imagePath,
      date: new Date().toISOString().split("T")[0],
    };

    items.unshift(newItem);
    fs.writeFileSync(trackerPath, JSON.stringify(items, null, 2));

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Error uploading gallery item:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}