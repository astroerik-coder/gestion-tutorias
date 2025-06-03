import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Simulación de base de datos - en producción usar MySQL
const users = []

export async function POST(request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { clerkId, nombre, correo, rol, additionalInfo } = body

    // Aquí conectarías con tu base de datos MySQL
    const newUser = {
      id: users.length + 1,
      clerkId,
      nombre,
      correo,
      rol,
      additionalInfo,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    return NextResponse.json({ success: true, user: newUser })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
