import Hero from '@/components/sections/Hero';
import StatsSection from '@/components/sections/StatsSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Testimonials from '@/components/sections/Testimonials';
import Partners from '@/components/sections/Partners';
import CTABanner from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <Testimonials />
      <Partners />
      <CTABanner />
    </>
  );
}
