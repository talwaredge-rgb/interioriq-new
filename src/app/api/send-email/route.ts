import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, userName, fileCount, estimatedDelivery } = body;

    await resend.emails.send({
      from: "InteriorIQ Pro <support@interioriqpro.com>",
      to: userEmail,
      subject: "Your BoQ Upload is Confirmed",
      html: `
        <h1>Thank you, ${userName}</h1>
        <p>We successfully received your ${fileCount} files.</p>
        <p>Estimated delivery: <strong>${estimatedDelivery}</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } 
  catch (e) {
    console.error(e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
