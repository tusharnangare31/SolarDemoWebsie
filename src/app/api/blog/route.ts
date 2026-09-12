import { NextResponse } from 'next/server';
import { getDb, saveDb, generateId } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const db = await getDb();

    if (slug) {
      const post = db.blog_posts.find((p) => p.slug === slug);
      if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      return NextResponse.json(post);
    }

    const sorted = [...db.blog_posts].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return NextResponse.json(sorted);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();

    const slug =
      item.slug ||
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const newPost = {
      ...item,
      id: generateId('blog'),
      slug,
      published: item.published !== undefined ? item.published : true,
      created_at: new Date().toISOString(),
      author: item.author || 'SunTech Solar Team',
      read_time: item.read_time || '5 min read',
    };
    db.blog_posts.unshift(newPost);
    await saveDb(db);
    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const item = await request.json();
    const db = await getDb();
    const index = db.blog_posts.findIndex((p) => p.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    db.blog_posts[index] = { ...db.blog_posts[index], ...item };
    await saveDb(db);
    return NextResponse.json({ success: true, post: db.blog_posts[index] });
  } catch {
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = await getDb();
    db.blog_posts = db.blog_posts.filter((p) => p.id !== id);
    await saveDb(db);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
