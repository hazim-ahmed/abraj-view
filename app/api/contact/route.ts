import { NextResponse } from "next/server";
import { siteConfig } from "../../../config/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "الرجاء تعبئة جميع الحقول المطلوبة" },
        { status: 400 }
      );
    }

    // Try forwarding to Web3Forms API
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY",
          from_name: name,
          to_email: siteConfig.email,
          subject: subject || `استفسار جديد من ${name}`,
          name,
          phone,
          email,
          message,
        }),
      });
    } catch (e) {
      console.error("Web3Forms error:", e);
    }

    return NextResponse.json({
      success: true,
      message: "تم استلام الطلب بنجاح",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
