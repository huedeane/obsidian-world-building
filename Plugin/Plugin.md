### Overview
---
This folder contains configuration files and other resources for all my Obsidian plugins. Below is a list of all the plugins I have installed, organized by category.
- Automation - These plugins are specifically designed to automate tasks within Obsidian, helping to streamline workflow
- Enhancer - These plugins help improve and extend the existing functionality within Obsidian making the experience smoother.
- Functionality - These plugins add new features and capabilities to Obsidian that don’t currently exist in the core application.
- Visual - These plugins modify the look and feel of Obsidian.
- Unset - These plugins were recently added to Obsidian and have not yet been configured in the JSON file.
### Plugin List
---
```dataviewjs
function isEmptyOrUndefined(data) {
  return data === undefined || data == '';
}

const filePath = "/Plugin/Util/Data/plugin-data.json"
const file = await app.vault.adapter.read(filePath);
const jsonPluginData = JSON.parse(file)

let lastCategory = null;

const plugins = dv.array(Object.values(app.plugins.manifests)
	.map(p => {
	  let emptyValue = '\u2013'
		let jsonRepo = jsonPluginData[p.id.toString()]?.repo
		let jsonDescription = jsonPluginData[p.id.toString()]?.description
		let jsonCategory = jsonPluginData[p.id.toString()]?.category
		
		let name = `[${p.name}](obsidian://adv-uri?settingid=${p.id})`
		let author = isEmptyOrUndefined(jsonRepo) ?
			emptyValue : `[${p.author.toString()}](${jsonRepo})`
		let description = isEmptyOrUndefined(jsonDescription) ? 
			p.description : jsonDescription
		let category = isEmptyOrUndefined(jsonCategory) ? 
			'Unset' : jsonCategory
  return [category,name, author, description, !p.isDesktopOnly ]
  })
	.sort((a, b) => {
		
	   // First compare categories
	  if (a[0] < b[0]) return -1;
	  if (a[0] > b[0]) return 1;
	
	  // If categories are the same, compare names
	  if (a[1] < b[1]) return -1;
	  if (a[1] > b[1]) return 1;
	
	  return 0; // They are equal
	})
	.flatMap(a => {
		const output = [];
		if (a[0] !== lastCategory && lastCategory !== null) {
			output.push(['---', '---', '---', '---', '---']);  // Insert empty array between categories
		}
		output.push(a);     // Push the full row, not just category

		lastCategory = a[0];
		return output;
	})
)
dv.table(["Category","Name/Setting", "Author/Github", "Description", "Mobile Compatibility"], plugins)
```