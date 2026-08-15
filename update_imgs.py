import re

file_path = 'src/data/portfolioData.ts'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Move imports to the top
imports = '''import gdFlyer1 from '../assets/images/gd_flyer_study.jpg';
import gdShowcase from '../assets/images/gd_showcase_web.jpg';
import gdEcom1 from '../assets/images/gd_ecom1.jpg';
import gdEcom2 from '../assets/images/gd_ecom2.jpg';
import gdFlyer2 from '../assets/images/gd_flyer2.jpg';
'''

content = content.replace(imports, '') # Remove from bottom
content = imports + '\n' + content # Add to top

# 2. Replace bawarsol1.vercel.app images with professional ones
replacements = [
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/weather%20app.png', 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/beacon%20light%20accadmey.jfif', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/scholarmate.avif', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/developer%20portfolio.jfif', 'gdShowcase'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/restaurant-landing-page-.avif', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/recipe%20app.webp', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/netflix%20clone.jfif', 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/youtube%20clone.png', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/naya%20sol%20agency.webp', 'gdShowcase'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/construction-%20website.avif', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/zyro%20food.jfif', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/cosmatic%20castle.png', 'gdEcom1'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/my%20portfoli.jpg', 'gdShowcase'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/name%20meaning%20finder.jfif', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'),
    ('https://bawarsol1.vercel.app/Assets/website%20card%20imges/mini%20website.png', 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80')
]

for old, new in replacements:
    if new.startswith('gd'):
        # For variables, remove quotes
        content = content.replace(f"'{old}'", new)
    else:
        # For urls, keep quotes
        content = content.replace(f"'{old}'", f"'{new}'")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated portfolioData.ts successfully!')
