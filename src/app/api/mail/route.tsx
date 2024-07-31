import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;
    const API_URL = process.env.CONVERTKIT_API_URL;
    const API_KEY = process.env.CONVERTKIT_API_KEY;

    const data = {
      api_key: API_KEY,
      email,
    };

    const convertKitRes = await fetch(`${API_URL}forms/${FORM_ID}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (convertKitRes.ok) {
      return NextResponse.json({ error: "" }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || String(error) },
      { status: 500 },
    );
  }
}
