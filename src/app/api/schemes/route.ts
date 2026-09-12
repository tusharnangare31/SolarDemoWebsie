import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.government_schemes);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch schemes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const newScheme = {
      ...item,
      id: generateId('sch'),
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
      subsidy_slabs: Array.isArray(item.subsidy_slabs) ? item.subsidy_slabs : [],
      state_schemes: Array.isArray(item.state_schemes) ? item.state_schemes : [],
    };
    db.government_schemes.push(newScheme);
    await saveDb(db);
    return NextResponse.json({ success: true, scheme: newScheme }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create scheme' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.government_schemes.findIndex((s) => s.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Scheme not found' }, { status: 404 });
    }
    db.government_schemes[index] = { ...db.government_schemes[index], ...item };
    await saveDb(db);
    return NextResponse.json({ success: true, scheme: db.government_schemes[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update scheme' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.government_schemes = db.government_schemes.filter((s) => s.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete scheme' }, { status: 500 });
  }
}
