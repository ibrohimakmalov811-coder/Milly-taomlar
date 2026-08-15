import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, phone, message } = await req.json();

        // Ma'lumotlar to'liq kelganini tekshirish
        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: "Barcha maydonlarni to'ldiring!" },
                { status: 400 }
            );
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        // Telegramga yuboriladigan xabar formati (HTML formatida)
        const text = `
📥 <b>Yangi Buyurtma / Xabar!</b>

👤 <b>Ismi:</b> ${name}
📞 <b>Telefon:</b> ${phone}
💬 <b>Xabar:</b> ${message}
    `;

        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            throw new Error('Telegramga xabar yuborishda xatolik yuz berdi');
        }

        return NextResponse.json({ success: true, message: "Xabar muvaffaqiyatli yuborildi!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Serverda xatolik yuz berdi" },
            { status: 500 }
        );
    }
}