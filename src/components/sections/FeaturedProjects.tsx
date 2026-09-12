import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import ProjectCarousel from '../ui/ProjectCarousel';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Recent Projects"
          subtitle="Explore our portfolio of successful solar installations across India"
        />
        <ProjectCarousel />
        <div className="text-center mt-10">
          <Button href="/projects" variant="outline" icon={ArrowRight} iconPosition="right">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
