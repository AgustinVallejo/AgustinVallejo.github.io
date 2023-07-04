import os
import re

# Path to the fileNames.js file
file_names_file = "assets/fileNames.js"

# Path to the assets/art directory
art_dir = "assets/art"

# Read the fileNames.js file
with open(file_names_file, "r") as file:
    content = file.read()

# Extract the filenames from the files variable
files = re.findall(r"'([\w.-]+)'", content)

# Get the filenames of files in the assets/art directory that are not in the files list
new_files = [
    file
    for file in os.listdir(art_dir)
    if file not in files and not file.endswith((".xlsx", ".xls"))
]

commented_files = []

for line in content.split("\n"):
    if line.strip().startswith("//"):
        commented_files.append( re.findall(r"'([\w.-]+)'", line)[0] )

all_files = new_files + files
all_files.sort()
all_files.reverse()

if new_files:
    # Construct the updated content
    updated_content = ""

    # Add the new filenames to the appropriate location
    updated_content += "let files = [\n"
    for file in all_files:
        if file in commented_files:
            updated_content += f"\t// '{file}',\n"
        else:
            updated_content += f"\t'{file}',\n"
    updated_content += "]"

    # Print the added filenames
    print("Added filenames:")
    for file in new_files:
        print(file)

    # Prompt for confirmation to proceed with the overwrite
    confirmation = input("Do you want to proceed with the overwrite? (y/n): ")

    if confirmation.lower() == "y":
        # Save the updated fileNames.js file
        with open(file_names_file, "w") as file:
            file.write(updated_content)
        print("FileNames.js updated successfully.")
    else:
        print("No changes were made.")
else:
    print("No new filenames found.")
