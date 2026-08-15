import os
import re

def fix_buttons(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content

    # Fix: text-black on blue button backgrounds → text-white
    content = re.sub(r'(bg-blue-600[^"]*?)\btext-black\b', r'\1text-white', content)
    content = re.sub(r'\btext-black\b([^"]*?bg-blue-600)', r'text-white\1', content)
    
    # Also fix remaining hover:bg-[#33F3FF] to hover:bg-blue-700
    content = content.replace('hover:bg-[#33F3FF]', 'hover:bg-blue-700')
    
    # Fix bg-blue-600 text color inconsistencies
    # Pattern: className="... text-black ... bg-blue-600 ..."
    def fix_class_attr(m):
        attr = m.group(0)
        # if it has bg-blue-600, replace text-black with text-white
        if 'bg-blue-600' in attr and 'text-black' in attr:
            attr = attr.replace('text-black', 'text-white')
        return attr
    
    content = re.sub(r'className="[^"]*"', fix_class_attr, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

src_dir = 'src'
changed = []
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            fp = os.path.join(root, file)
            if fix_buttons(fp):
                changed.append(fp)

print(f'Fixed {len(changed)} files')
