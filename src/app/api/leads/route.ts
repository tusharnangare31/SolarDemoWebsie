import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const db = await getDb();
    let leads = [...db.enquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    if (source && source !== 'All') {
      leads = leads.filter((l) => l.source_page === source);
    }

    if (status && status !== 'All') {
      leads = leads.filter((l) => l.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          (l.email && l.email.toLowerCase().includes(q))
      );
    }

    return NextResponse.json(leads);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.phone) {
      return NextResponse.json({ error: 'Name and phone number are required' }, { status: 400 });
    }

    const db = await getDb();
    const newLead = {
      id: generateId('lead'),
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email ? data.email.trim() : undefined,
      location: data.location ? data.location.trim() : 'Unspecified',
      message: data.message ? data.message.trim() : undefined,
      source_page: data.source_page || 'Contact Page',
      system_size_estimate: data.system_size_estimate || undefined,
      monthly_bill: data.monthly_bill || undefined,
      status: 'New' as const,
      created_at: new Date().toISOString(),
    };

    db.enquiries.unshift(newLead);
    await saveDb(db);

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const db = await getDb();
    const index = db.enquiries.findIndex((l) => l.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    db.enquiries[index].status = status;
    await saveDb(db);

    return NextResponse.json({ success: true, lead: db.enquiries[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.enquiries = db.enquiries.filter((l) => l.id !== id);
    await saveDb(db);

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
