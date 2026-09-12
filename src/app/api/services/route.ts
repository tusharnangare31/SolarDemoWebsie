import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const sorted = [...db.services].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    return NextResponse.json(sorted);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const newService = {
      ...item,
      id: generateId('srv'),
      order_index: item.order_index || db.services.length + 1,
      features: Array.isArray(item.features) ? item.features : [],
    };
    db.services.push(newService);
    await saveDb(db);
    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.services.findIndex((s) => s.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    db.services[index] = { ...db.services[index], ...item };
    await saveDb(db);
    return NextResponse.json({ success: true, service: db.services[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.services = db.services.filter((s) => s.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
