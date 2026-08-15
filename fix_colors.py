import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content

    # ─── FIX INVISIBLE GRADIENT (via-white on light bg) ─────────────────────────
    # Hero heading: from-slate-900 via-white to-slate-500 → proper blue gradient
    new_content = new_content.replace(
        'bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-white to-slate-500',
        'bg-clip-text text-transparent bg-gradient-to-br from-blue-700 via-blue-500 to-indigo-600'
    )
    new_content = new_content.replace(
        'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500',
        'bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-500'
    )
    new_content = new_content.replace(
        'bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500',
        'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-700'
    )

    # ─── HEADINGS ──────────────────────────────────────────────────────────────
    # h1, h2, h3 that still have text-slate-900 should become a deeper navy
    new_content = re.sub(
        r'(className="[^"]*\btext-5xl[^"]*)"',
        lambda m: m.group(0).replace('text-slate-900', 'text-[#0A1628]'),
        new_content
    )

    # ─── Section headings: h2/h3 ────────────────────────────────────────────
    new_content = re.sub(
        r'(className="[^"]*(?:text-4xl|text-3xl|text-2xl)[^"]*)"',
        lambda m: m.group(0).replace('text-slate-900', 'text-[#0A1628]'),
        new_content
    )
    
    # Replace common plain text-slate-900 in h tags to deep navy
    new_content = re.sub(
        r'(<h[1-6][^>]*className="[^"]*?)text-slate-900',
        r'\1text-[#0A1628]',
        new_content
    )

    # ─── Accent text (blue-600) ─ keep bold & clear ─────────────────────────
    # blue-600 accent text stays — it's good. But replace any remaining cyan
    new_content = new_content.replace('text-blue-600/80', 'text-blue-600')

    # ─── Section label / eyebrow tags ───────────────────────────────────────
    new_content = new_content.replace('text-slate-500 uppercase tracking-[0.25em]', 'text-slate-400 uppercase tracking-[0.25em]')

    # ─── Body text ──────────────────────────────────────────────────────────
    # text-slate-500 in paragraphs → a more readable dark gray
    # Keep it as slate-500 which is good for body text on light bg

    # ─── Fix buttons with text-slate-900 (dark text on dark button) ─────────
    # Primary blue buttons should have white text
    new_content = new_content.replace(
        'bg-blue-600 text-slate-900',
        'bg-blue-600 text-white'
    )
    new_content = new_content.replace(
        'bg-blue-600 text-[#0A1628]',
        'bg-blue-600 text-white'
    )
    new_content = new_content.replace(
        'hover:bg-[#33F3FF] text-black',
        'hover:bg-blue-700 text-white'
    )

    # Fix badge pills that turned text-slate-900 on blue-600 bg
    new_content = re.sub(
        r'(bg-blue-600[^"]*?)text-slate-900',
        r'\1text-white',
        new_content
    )
    new_content = re.sub(
        r'(bg-blue-600[^"]*?)text-\[#0A1628\]',
        r'\1text-white',
        new_content
    )

    # italic/serif accent stays blue
    # Fix any span within h tags that might have turned invisible
    new_content = new_content.replace(
        'font-serif italic font-normal text-blue-600 accent-glow',
        'font-serif italic font-normal text-blue-600'
    )

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

src_dir = 'src'
changed = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            fp = os.path.join(root, file)
            if process_file(fp):
                changed.append(fp)

print(f'Updated {len(changed)} files:')
for f in changed:
    print(' -', f)
