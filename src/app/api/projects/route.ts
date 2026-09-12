import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.projects);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const newProject = {
      ...item,
      id: generateId('proj'),
    };
    db.projects.push(newProject);
    await saveDb(db);
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.projects.findIndex((p) => p.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    db.projects[index] = { ...db.projects[index], ...item };
    await saveDb(db);
    return NextResponse.json({ success: true, project: db.projects[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.projects = db.projects.filter((p) => p.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
