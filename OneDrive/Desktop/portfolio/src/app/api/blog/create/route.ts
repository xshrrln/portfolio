import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let imagePath = "";

    // Handle image upload into public/images/
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const originalName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${Date.now()}-${originalName}`;
      
      const uploadDir = path.join(process.cwd(), "public", "images");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imagePath = `/images/${filename}`;
    }

    // Format filename slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const today = new Date().toISOString().split("T")[0];

    // Build MDX frontmatter & content
    let mdxContent = `---\ntitle: "${title.replace(/"/g, '\\"')}"\npublishedAt: "${today}"\nsummary: "${summary.replace(/"/g, '\\"')}"`;
    if (imagePath) {
      mdxContent += `\nimage: "${imagePath}"`;
    }
    mdxContent += `\n---\n\n${content}`;

    const postsDir = path.join(process.cwd(), "src", "app", "blog", "posts");
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(postsDir, `${slug}.mdx`), mdxContent);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}