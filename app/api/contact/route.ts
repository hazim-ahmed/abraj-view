import { NextResponse } from "next/server";
import { siteConfig } from "../../../config/site";
import fs from "fs";
import path from "path";

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

    const dateStr = new Date().toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
    });

    // 1. Save locally to CSV (Excel format with UTF-8 BOM)
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const csvPath = path.join(dataDir, "contacts.csv");
      const csvLine = `"${dateStr}","${name.replace(/"/g, '""')}","${phone.replace(/"/g, '""')}","${(email || "").replace(/"/g, '""')}","${(subject || "").replace(/"/g, '""')}","${message.replace(/"/g, '""')}"\n`;

      if (!fs.existsSync(csvPath)) {
        // UTF-8 BOM (\uFEFF) for Microsoft Excel compatibility
        const header = "\uFEFFالتاريخ,الاسم,رقم الجوال,البريد الإلكتروني,الموضوع,الرسالة\n";
        fs.writeFileSync(csvPath, header + csvLine, "utf8");
      } else {
        fs.appendFileSync(csvPath, csvLine, "utf8");
      }

      // Also append to JSON file
      const jsonPath = path.join(dataDir, "contacts.json");
      let existingContacts = [];
      if (fs.existsSync(jsonPath)) {
        try {
          const content = fs.readFileSync(jsonPath, "utf8");
          existingContacts = JSON.parse(content);
        } catch {
          existingContacts = [];
        }
      }
      existingContacts.push({
        id: Date.now().toString(),
        date: dateStr,
        name,
        phone,
        email,
        subject,
        message,
      });
      fs.writeFileSync(jsonPath, JSON.stringify(existingContacts, null, 2), "utf8");
    } catch (e) {
      console.error("Local file storage error:", e);
    }

    // 2. Forward to Google Sheets Webhook if configured
    if (siteConfig.googleSheetUrl) {
      try {
        await fetch(siteConfig.googleSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: dateStr,
            name,
            phone,
            email,
            subject,
            message,
          }),
        });
      } catch (e) {
        console.error("Google Sheets forward error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "تم حفظ الاستفسار في جدول البيانات بنجاح",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}
