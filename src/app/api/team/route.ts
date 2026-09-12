import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    const sorted = [...db.team_members].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    return NextResponse.json(sorted);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const newMember = {
      ...item,
      id: generateId('team'),
      order_index: item.order_index || db.team_members.length + 1,
    };
    db.team_members.push(newMember);
    await saveDb(db);
    return NextResponse.json({ success: true, member: newMember }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.team_members.findIndex((m) => m.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    db.team_members[index] = { ...db.team_members[index], ...item };
    await saveDb(db);
    return NextResponse.json({ success: true, member: db.team_members[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.team_members = db.team_members.filter((m) => m.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
