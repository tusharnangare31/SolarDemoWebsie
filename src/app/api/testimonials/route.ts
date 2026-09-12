import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.testimonials);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const newTestimonial = {
      ...item,
      id: generateId('test'),
      rating: Number(item.rating) || 5,
    };
    db.testimonials.push(newTestimonial);
    await saveDb(db);
    return NextResponse.json({ success: true, testimonial: newTestimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.testimonials.findIndex((t) => t.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    db.testimonials[index] = {
      ...db.testimonials[index],
      ...item,
      rating: Number(item.rating) || 5,
    };
    await saveDb(db);
    return NextResponse.json({ success: true, testimonial: db.testimonials[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
