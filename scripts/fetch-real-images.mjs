import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  // Services
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/services/commercial.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/services/systems.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/services/maintenance.jpg',
  },

  // Products
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/panel-mono.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1545209179-a5dc55049641?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/panel-bifacial.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/panel-poly.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/inverter-5kw.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/inverter-10kw.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/inverter-50kw.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/battery-5kwh.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/battery-10kwh.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/mount-roof.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/products/mount-ground.jpg',
  },

  // Projects
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/projects/jaipur-residence.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1587355760421-b930b809a4ad?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/projects/delhi-hospital.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/projects/pune-factory.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/projects/ahmedabad-commercial.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/projects/ludhiana-school.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/projects/surat-textile.jpg',
  },

  // Blog
  {
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/blog/pm-surya-ghar.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/blog/how-solar-works.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/blog/commercial-solar-roi.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/blog/maintenance-tips.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1558441719-8b489c63f7d1?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/blog/on-grid-vs-off-grid.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1545209179-a5dc55049641?w=800&q=80&auto=format&fit=crop',
    dest: 'public/images/blog/net-metering-guide.jpg',
  },

  // Team
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/team/rajesh-sharma.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/team/priya-patel.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/team/amit-verma.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/team/sunita-rao.jpg',
  },

  // Testimonials
  {
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/testimonials/vikram-singh.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/testimonials/anita-deshmukh.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/testimonials/suresh-patel.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
    dest: 'public/images/testimonials/rahul-mehta.jpg',
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log(`Starting download of ${images.length} realistic photography images...`);
  for (const item of images) {
    try {
      await download(item.url, item.dest);
      console.log(`✓ Downloaded ${item.dest}`);
    } catch (e) {
      console.error(`✗ Error downloading ${item.dest}:`, e.message);
    }
  }
  console.log('All image downloads completed!');
}

main();
