import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Simulate job search based on the resume
    const jobs = ["Software Engineer at Google", "Flutter Developer at Meta", "Backend Engineer at Amazon"];

    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json({ error: "Error processing request" }, { status: 500 });
  }
}
