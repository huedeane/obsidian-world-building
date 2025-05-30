<%*
if (!tp.frontmatter.hasOwnProperty('sorting-spec')){
	console.error("sort-spec not detected")
	return
}

const buttonTemplate = `
\`\`\`meta-bind-button
label: {0}
style: primary
cssStyle: "width: 33% !important; height: 50px; visibility: {1}; display:inline !important;"
tooltip: ""
id: {2}
hidden: true
actions:
  - type: open
    link: {3}
    newTab: false
\`\`\`
`

const label = {
	"next" : "Next ▶",
	"previous" : "◀ Previous", 
	"home": "🏠 Home"
}

// Set current folder and file
const folder = tp.file.folder(true);
const fileName = tp.file.title + '.md';

// Get files and filter
const files = tp.app.vault.getFiles().filter(file => 
	file.path.startsWith(folder) && 
	file.extension === "md" &&
	file.name != fileName
	);

// Sort TFile by sort-spec
const sortOrder = tp.frontmatter['sorting-spec'].split("\n").map(name => name.replace("...", "").trim() + ".md")
const sortedFiles = files.sort((a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name));

for (const file of sortedFiles) {
	let content = await app.vault.read(file);
	let index = files.indexOf(file);
	let maxLength = files.length - 1;

	// Clear out applied pagination
	content = content.replace(/```meta-bind-button[\s\S]*?```/g, '');
	content = content.replace("\`\`BUTTON[Prev]\`\` \`\`BUTTON[Home]\`\` \`\`BUTTON[Next]\`\`", '');
	content = content.trim()

	// Create Metabind button
	if(index == 0)
		content += buttonTemplate.format(label.previous, "hidden", "Prev", "\"\"")
	else
		content += buttonTemplate.format(label.previous, "visible", "Prev", files[index-1].path)

	content += buttonTemplate.format(label.home, "visible", "Home", `${folder}/${fileName}`)
	
	if(index == maxLength)
		content += buttonTemplate.format(label.next, "hidden", "Next", "\"\"")
	else
		content += buttonTemplate.format(label.next, "visible", "Next", files[index+1].path)

	// Embed Metabind button by id
	content += ''
	content += "\`\`BUTTON[Prev]\`\` \`\`BUTTON[Home]\`\` \`\`BUTTON[Next]\`\`"

	// Update Content
	await tp.app.vault.modify(file, content);
}
%>