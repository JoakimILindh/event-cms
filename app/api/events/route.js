import { getCollection } from "@/lib/firebaseUtils"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const events = await getCollection('events')
    return NextResponse.json(events)
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}