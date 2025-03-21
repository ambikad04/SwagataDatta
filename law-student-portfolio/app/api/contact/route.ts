import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the request
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically integrate with an email service
    // For example, using nodemailer, SendGrid, or another email API

    // For demonstration purposes, we'll just log the data
    console.log("Contact form submission:", { name, email, subject, message })

    // In a real implementation, you would send an email here
    // Example with EmailJS or similar service would go here

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

