import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();
    return NextResponse.json(db.products);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const newProduct = {
      ...item,
      id: generateId('prod'),
      specs: Array.isArray(item.specs) ? item.specs : [],
      price: Number(item.price) || 0,
      is_enquire_only: item.is_enquire_only !== undefined ? item.is_enquire_only : true,
    };
    db.products.push(newProduct);
    await saveDb(db);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.products.findIndex((p) => p.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    db.products[index] = {
      ...db.products[index],
      ...item,
      price: Number(item.price) || 0,
    };
    await saveDb(db);
    return NextResponse.json({ success: true, product: db.products[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.products = db.products.filter((p) => p.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
