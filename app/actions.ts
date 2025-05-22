"use server"

interface RsvpData {
  name: string
  email: string
  phone: string
  guests: string
  message: string
}

export async function sendRsvp(data: RsvpData) {
  // Simulating a delay for the server action
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would send an email here
  // Example using a service like Nodemailer or a third-party email API

  console.log("RSVP received:", data)

  // For demonstration purposes, we're just returning success
  // In a real app, you would handle errors and send the email
  return { success: true }
}
