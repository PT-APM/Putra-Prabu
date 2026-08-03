import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale, defaultLocale } from '@/lib/i18n/config';

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
  let locale = defaultLocale;

  try {
    const body = await req.json();
    locale = isLocale(body.locale) ? body.locale : defaultLocale;
    const dict = getDictionary(locale);
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
    const tokenCount = (rateLimit.get(ip) as number[]) || [0];
    if (tokenCount[0] >= 3) {
      return NextResponse.json(
        { error: dict.contact.form.errorRateLimited },
        { status: 429 }
      );
    }
    rateLimit.set(ip, [tokenCount[0] + 1]);

    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: dict.contact.form.errorMissingFields }, { status: 400 });
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

    return NextResponse.json({ message: dict.contact.form.success }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: getDictionary(locale).contact.form.errorGeneric },
      { status: 500 }
    );
  }
}
