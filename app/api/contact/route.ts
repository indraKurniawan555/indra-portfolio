import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function getEmailConfig() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  if (!user || !pass) {
    console.warn('EMAIL_USER or EMAIL_PASS not set')
    return null
  }
  return { user, pass }
}

function getTransporter() {
  const config = getEmailConfig()
  if (!config) return null

  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })
}

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nama, email, dan pesan wajib diisi.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Format email tidak valid.' }, { status: 400 })
    }

    const transporter = getTransporter()
    if (!transporter) {
      console.error('Nodemailer transporter unavailable')
      return NextResponse.json(
        { error: 'Gagal mempersiapkan pengiriman email. Pastikan EMAIL_USER dan EMAIL_PASS di environment.' },
        { status: 500 }
      )
    }

    const mailOptions = {
      from: `"Blog Portfolio" <${process.env.EMAIL_USER}>`,
      to: 'indrasaya520@gmail.com',
      cc: email,
      subject: `Pesan dari ${name} (${email})`,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 8px;">
          <h2 style="margin: 0 0 8px;">📝 Pesan Baru dari Portfolio</h2>
          <p>Nama: ${name}</p>
          <p>Email: ${email}</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>`,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent to indrasaya520@gmail.com:', info.messageId)

    const confirmOptions = {
      from: `"Blog Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Terima kasih telah mengirim pesan!',
      text: `Halo ${name},\n\nTerima kasih telah mengirim pesan. Pesan Anda telah diterima.\n\nRingkasan:\n${message}\n\nSaya akan segera membalasnya.\n\nHormat,\n${process.env.EMAIL_USER}`,
      html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 8px;">
          <h2 style="margin: 0 0 8px;">Terima kasih!</h2>
          <p>Halo ${name},</p>
          <p>Terima kasih telah mengirim pesan ke portfolio saya. Pesan Anda telah terkirim.</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
          <div style="background: #f0f0f0; padding: 8px; white-space: pre-wrap;">${message}</div>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 12px 0;">
          <p>Saya akan segera membalasnya. Terima kasih!</p>
        </div>`,
    }

    await transporter.sendMail(confirmOptions)
    console.log('Confirmation email sent to sender:', email)

    return NextResponse.json({ success: true, message: 'Kirim ke indrasaya520@gmail.com dan konfirmasi ke pengirim berhasil.' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Gagal mengirim pesan. Silakan coba lagi.' }, { status: 500 })
  }
}