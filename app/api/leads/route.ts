import { asc } from "drizzle-orm";
import { getDb } from "../../../db";
import { leads } from "../../../db/schema";

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  if (message.includes("no such table")) return "The leads table is unavailable. The site migration needs to be applied before using persistence.";
  return message;
}

function parseLead(payload: string) {
  try { return JSON.parse(payload); } catch { return null; }
}

export async function GET() {
  try {
    const db = getDb();
    const rows = await db.select().from(leads).orderBy(asc(leads.id));
    return Response.json({ leads: rows.map((row) => parseLead(row.payload)).filter(Boolean) });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { leads?: Array<{ id: number }> };
    const items = body.leads ?? [];
    if (!items.length) return Response.json({ error: "leads are required" }, { status: 400 });
    const now = new Date().toISOString();
    const db = getDb();
    await db.batch(items.map((lead) => db.insert(leads).values({ id: lead.id, payload: JSON.stringify(lead), updatedAt: now }).onConflictDoUpdate({ target: leads.id, set: { payload: JSON.stringify(lead), updatedAt: now } })));
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const lead = await request.json() as { id?: number };
    if (!lead.id) return Response.json({ error: "lead id is required" }, { status: 400 });
    const db = getDb();
    const now = new Date().toISOString();
    await db.insert(leads).values({ id: lead.id, payload: JSON.stringify(lead), updatedAt: now }).onConflictDoUpdate({ target: leads.id, set: { payload: JSON.stringify(lead), updatedAt: now } });
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
