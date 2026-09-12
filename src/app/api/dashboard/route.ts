import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDb();

    const totalLeads = db.enquiries.length;
    const newLeads = db.enquiries.filter((l) => l.status === 'New').length;
    const totalProjects = db.projects.length;
    const totalProducts = db.products.length;
    const totalArticles = db.blog_posts.filter((b) => b.published).length;
    const totalTestimonials = db.testimonials.length;

    // Recent 5 leads
    const recentLeads = [...db.enquiries]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    return NextResponse.json({
      stats: {
        totalLeads,
        newLeads,
        totalProjects,
        totalProducts,
        totalArticles,
        totalTestimonials,
      },
      recentLeads,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
