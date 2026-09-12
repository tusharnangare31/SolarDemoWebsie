export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'top-5-benefits-of-rooftop-solar',
    title: 'Top 5 Benefits of Rooftop Solar for Indian Homes',
    excerpt: 'Discover how rooftop solar panels can save you money, increase your property value, and contribute to a cleaner India. Learn why 2024 is the best time to go solar.',
    content: `## Why Go Solar in 2024?\n\nIndia receives over 300 sunny days a year in most regions, making it one of the best countries in the world for solar energy. With electricity costs rising 5-8% annually and government subsidies at an all-time high, there has never been a better time to install rooftop solar.\n\n### 1. Save Up to 90% on Electricity Bills\n\nA well-designed solar system can offset most of your electricity consumption. A typical 5kW system for a 3BHK home generates 20-25 units daily, enough to cover most household needs. With net metering, excess power is exported to the grid, giving you credits on your bill.\n\n### 2. Government Subsidies Under PM Surya Ghar Yojana\n\nThe central government offers substantial subsidies:\n- ₹30,000/kW for the first 2 kW\n- ₹18,000/kW for the next 1 kW (2-3 kW)\n- Systems above 3 kW: flat ₹78,000 subsidy\n\nThis can reduce your upfront cost by 30-40%.\n\n### 3. Increase Property Value\n\nHomes with solar installations command a 3-4% premium in the real estate market. Solar panels are seen as a modern amenity that adds value.\n\n### 4. 25-Year Warranty & Long Lifespan\n\nModern solar panels come with a 25-year performance warranty and can last 30+ years. Inverters typically have 10-15 year warranties. The ROI over the system lifetime is exceptional.\n\n### 5. Reduce Your Carbon Footprint\n\nA 5kW system prevents approximately 7.5 tonnes of CO₂ emissions annually — equivalent to planting 120 trees every year.\n\n## Ready to Go Solar?\n\nContact us for a free site survey and customized solar proposal for your home.`,
    date: '2024-08-15',
    category: 'Solar Benefits',
    readTime: '5 min read',
    author: 'SunTech Solar Team',
  },
  {
    slug: 'complete-guide-solar-subsidies-2024',
    title: 'Complete Guide to Solar Subsidies in India (2024)',
    excerpt: 'Everything you need to know about PM Surya Ghar Yojana, state subsidies, and how to claim them. Step-by-step guide to maximizing your solar savings.',
    content: `## PM Surya Ghar Muft Bijli Yojana\n\nLaunched in February 2024, PM Surya Ghar Yojana aims to install rooftop solar on 1 crore households, providing up to 300 units of free electricity per month.\n\n### Subsidy Structure\n\n| System Size | Central Subsidy |\n|------------|----------------|\n| Up to 2 kW | ₹30,000/kW |\n| 2 kW to 3 kW | ₹18,000/kW (for additional capacity) |\n| Above 3 kW | Flat ₹78,000 |\n\n### Eligibility Criteria\n\n- Must be a residential consumer with a valid electricity connection\n- Rooftop should have adequate shadow-free area\n- Only grid-connected systems qualify\n- Installation must be done by an empaneled vendor\n- Subsidy is available on a first-come, first-served basis\n\n### How to Apply\n\n1. **Register** on the National Portal (pmsuryaghar.gov.in)\n2. **Get a feasibility report** from your DISCOM\n3. **Choose an empaneled vendor** (like SunTech Solar!)\n4. **Install the system** and apply for net metering\n5. **Claim subsidy** after DISCOM inspection\n\n### State-Specific Subsidies\n\nSeveral states offer additional subsidies:\n- **Gujarat**: Additional ₹10,000/kW for up to 10 kW\n- **Maharashtra**: MEDA subsidy for housing societies\n- **Rajasthan**: Subsidized rates for domestic consumers\n- **Karnataka**: KREDL subsidy programs\n\n## Tax Benefits for Businesses\n\nCommercial & industrial solar installations can claim:\n- 40% accelerated depreciation in the first year\n- GST input credit on solar equipment\n- Carbon credits under voluntary markets\n\n## Get Expert Help\n\nNavigating subsidy applications can be complex. Our team handles the complete process end-to-end, from registration to disbursement.`,
    date: '2024-07-20',
    category: 'Government Schemes',
    readTime: '7 min read',
    author: 'SunTech Solar Team',
  },
  {
    slug: 'solar-panel-maintenance-tips',
    title: 'Essential Solar Panel Maintenance Tips for Maximum Output',
    excerpt: 'Learn how to maintain your solar panels for optimal performance. Simple tips on cleaning, monitoring, and when to call a professional.',
    content: `## Keeping Your Solar System in Top Shape\n\nSolar panels are remarkably low-maintenance, but regular care ensures you get maximum energy output throughout their 25+ year lifespan.\n\n### Monthly: Visual Inspection\n\n- Check for visible dust, bird droppings, or debris on panels\n- Look for any physical damage (cracks, discoloration)\n- Verify the inverter display shows normal operation (green light)\n- Check your monitoring app for any performance drops\n\n### Quarterly: Panel Cleaning\n\n**Best practices for cleaning:**\n- Clean early morning or late evening (never when panels are hot!)\n- Use plain water with a soft sponge or cloth\n- Avoid harsh chemicals, abrasive tools, or pressure washers\n- For stubborn stains, use mild soap solution\n- Clean from top to bottom, letting water flow naturally\n\n**In dusty areas** (Rajasthan, Gujarat), monthly cleaning may be needed.\n\n### Bi-Annual: Professional Check-up\n\n- Electrical connection inspection\n- Inverter health check and firmware updates\n- Mounting structure tightness check\n- Earthing and lightning protection verification\n- DC cable condition assessment\n\n### Performance Monitoring\n\nModern systems come with Wi-Fi monitoring. Watch for:\n- Daily generation dropping below expected levels\n- Individual panel underperformance (in micro-inverter systems)\n- Inverter error codes or warnings\n- Net meter reading discrepancies\n\n### When to Call a Professional\n\n- Generation drops more than 20% from expected output\n- Inverter shows error codes or shuts down\n- Physical damage to panels or wiring\n- After severe weather events (hailstorm, cyclone)\n- Hot spots visible on panels (use thermal imaging)\n\n### AMC: The Smart Choice\n\nAn Annual Maintenance Contract (AMC) covers:\n- 2-4 scheduled cleaning visits\n- Quarterly performance reports\n- Priority emergency support\n- All preventive maintenance\n\nAMC typically costs ₹1,500-3,000/kW/year — a small price for 10-15% better performance.\n\n## Protect Your Investment\n\nContact us to learn about our comprehensive AMC plans starting at just ₹1,500/kW per year.`,
    date: '2024-06-10',
    category: 'Maintenance',
    readTime: '6 min read',
    author: 'SunTech Solar Team',
  },
];
