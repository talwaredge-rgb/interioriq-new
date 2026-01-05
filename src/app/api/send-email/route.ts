import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userEmail, userName, fileCount, estimatedDelivery } = body;

    const emailResponse = await resend.emails.send({
      from: "InteriorIQ Pro <support@interioriqpro.com>",
      to: userEmail,
      subject: "BOQ Received — InteriorIQ Pro",
      html: `
        <h2>Hi ${userName},</h2>
        <p>Thanks for submitting your BOQ.</p>
        <p>Files Received: <b>${fileCount}</b></p>
        <p>Estimated Delivery: <b>${estimatedDelivery}</b></p>
        <p>We will get back to you soon.</p>
        <p>- Team InteriorIQ Pro</p>
      `
    });

    return NextResponse.json({ success: true, emailResponse });

  } catch (error) {
    console.error("Resend Email Error:", error);
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}
