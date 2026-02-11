import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null

export async function POST(request: NextRequest) {
  if (!transporter || !CONTACT_EMAIL) {
    return NextResponse.json(
      { error: 'Contact form is not configured' },
      { status: 503 }
    )
  }

  let body: { name?: string; email?: string; subject?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, subject, message } = body
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    subject.length < 5 ||
    message.length < 10
  ) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 })
  }

  try {
    await transporter.sendMail({
      from: SMTP_USER!,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact send error:', err)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
