import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Colors mapping
    replacements = [
        # Backgrounds
        (r'bg-\[\#050505\]', 'bg-slate-50'),
        (r'bg-white/\[0\.02\]', 'bg-white shadow-sm'),
        (r'bg-white/\[0\.03\]', 'bg-white shadow-sm border border-slate-200'),
        (r'bg-white/\[0\.04\]', 'bg-slate-50 border border-slate-200'),
        (r'bg-white/\[0\.05\]', 'bg-slate-100'),
        (r'bg-white/\[0\.07\]', 'bg-slate-100'),
        (r'bg-white/5', 'bg-slate-100'),
        (r'bg-white/10', 'bg-slate-200'),
        (r'bg-white/20', 'bg-slate-200'),
        (r'bg-black/40', 'bg-slate-100'),
        (r'bg-black/60', 'bg-white/90'),
        (r'bg-black/80', 'bg-white/90'),
        
        # Borders
        (r'border-white/5', 'border-slate-200'),
        (r'border-white/10', 'border-slate-200'),
        (r'border-white/20', 'border-slate-300'),
        (r'border-\[\#00F0FF\]', 'border-blue-600'),
        
        # Text
        (r'text-white', 'text-slate-900'),
        (r'text-\[\#F0F0F0\]', 'text-slate-900'),
        (r'text-slate-300', 'text-slate-600'),
        (r'text-slate-400', 'text-slate-500'),
        (r'from-white', 'from-slate-900'),
        (r'via-white/10', 'via-slate-200'),
        
        # Accent Cyan to Blue-600
        (r'\[\#00F0FF\]', 'blue-600'),
        
        # Fix gradients that used #050505
        (r'from-\[\#050505\]', 'from-slate-50'),
        (r'via-\[\#050505\]', 'via-slate-50'),
        
        # Box shadow accents
        (r'shadow-\[\#00F0FF\]', 'shadow-blue-600'),
        (r'hover:shadow-\[\#00F0FF\]', 'hover:shadow-blue-600'),
        
        # Fix any text-blue-600/80 (Tailwind syntax might not support exact bracket opacity easily if mixed, 
        # but [\#00F0FF]/80 becomes blue-600/80 which works in TW v3+)
    ]

    new_content = content
    for old, new in replacements:
        new_content = re.sub(old, new, new_content)
        
    # Manual fixes for text on buttons if they used white text on cyan bg (now blue bg)
    # wait, if background is blue-600, text should be white, but we replaced text-white with text-slate-900!
    # Let's fix text-slate-900 back to text-white if it's inside a blue-600 button.
    # Actually, we can just do a broad replacement and fix bugs if we see them.

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

src_dir = 'src'
changed_files = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            filepath = os.path.join(root, file)
            if process_file(filepath):
                changed_files.append(filepath)

print(f"Updated {len(changed_files)} files to light theme.")
