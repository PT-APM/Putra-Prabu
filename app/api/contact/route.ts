import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache({
  max: 500,
  ttl: 15 * 60 * 1000, 
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
    const tokenCount = (rateLimit.get(ip) as number[]) || [0];
    if (tokenCount[0] >= 3) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan. Silakan coba lagi nanti.' },
        { status: 429 } 
      );
    }
    rateLimit.set(ip, [tokenCount[0] + 1]);

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nama, Email, dan Pesan wajib diisi.' }, { status: 400 });
    }

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, 
      replyTo: email,
      to: process.env.RECEIVER_EMAIL, 
      subject: `[Web Contact] ${subject || 'Pesan Baru'}`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      html: `
        <h3>Pesan Baru dari Website</h3>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Pesan berhasil dikirim!' }, { status: 200 });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengirim pesan.' },
      { status: 500 }
    );
  }
}