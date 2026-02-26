import json
import os
from pathlib import Path

def render_item(data):
    # Author template
    author_list = []
    for auth in data['authors']:
        name = f"{auth['first']} {auth['last']}"
        # bold the first author's name
        if "first" in auth.get("types", []):
            name = f"**{name}**"
        # starlize the correspond author's name
        if "corresponding" in auth.get("types", []):
            name = f"{name}*"
        author_list.append(name)
    
    authors_str = ", ".join(author_list)

    # Define HTML/Markdown template
    template = f"""
* {authors_str} ({data['year']}). 
  **{data['title']}**. 
  *{data['journal']}*. 
  [[DOI]({data['url']})] [[Altmetric]({data['altmetric']})]
"""
    return template

def main():
    json_dir = Path("publications/bibliography")
    # search for all the pubs' jason files, and order them with pub year
    json_files = sorted(json_dir.glob("*.json"), reverse=True)
    
    content = ""
    for jf in json_files:
        with open(jf, 'r', encoding='utf-8') as f:
            data = json.load(f)
            content += render_item(data)

    # Testing
    with open("publications/_temp_ref_test.md", "w", encoding='utf-8') as f:
        f.write(content)
    print("Success: _temp_ref_test.md has been generated.")

if __name__ == "__main__":
    main()