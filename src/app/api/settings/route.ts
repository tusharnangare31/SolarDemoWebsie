import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.site_settings);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedSettings = await request.json();
    const db = await getDb();
    db.site_settings = {
      ...db.site_settings,
      ...updatedSettings,
      updated_at: new Date().toISOString(),
    };
    await saveDb(db);
    return NextResponse.json({ success: true, settings: db.site_settings });
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
