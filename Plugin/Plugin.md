
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
```datacorejsx
const filePath = "/Plugin/Util/Data/plugin-data.json";
const file = await app.vault.adapter.read(filePath);
const jsonPluginData = JSON.parse(file);
let lastCategory = null

function isEmptyOrUndefined(data) {
  return data === undefined || data == '';
}

function syncScroll(leaf, targetScroll, previousScroll = null, startTime = Date.now(), timeout = 3000) {
  // Stop if timeout reached
  if (Date.now() - startTime > timeout) return;

	// Apply scroll
  leaf.view.currentMode.applyScroll(targetScroll);
	
	// Repeat scroll if not at target scroll
  const currentScroll = leaf.view.currentMode.getScroll();
  if (currentScroll !== targetScroll && currentScroll !== previousScroll) {
    requestAnimationFrame(() =>
      syncScroll(leaf, targetScroll, currentScroll, startTime, timeout)
    );
  }
}


function createPluginEnableButton(row, pluginData, setPluginData) {
	if (row.name == "---") return "---"
	
	const updated = [...pluginData]
	const leaf = app.workspace.activeLeaf;

	const buttonClick = async () => {
		const scroll = leaf.view.currentMode.getScroll();
		if (row.pluginEnabled) {
			await app.plugins.disablePluginAndSave(row.id);
		} else {
			await app.plugins.enablePluginAndSave(row.id);
		}
		updated.map(newRow => {
			if(newRow == row){
				newRow.pluginEnabled = !row.pluginEnabled
			}
		})
		setPluginData(updated)
		setTimeout(() => {
			syncScroll(leaf, scroll);
		}, 500);
	}
	return (
		<button onClick={buttonClick}>
			{row.pluginEnabled ? "Enabled" : "Disabled"}
		</button>
	);
}

function getPluginData(){
	return dc.array(Object.values(app.plugins.manifests)
		.map(p => {
		  let emptyValue = '\u2013';
			let jsonRepo = jsonPluginData[p.id.toString()]?.repo;
			let jsonDescription = jsonPluginData[p.id.toString()]?.description;
			let jsonCategory = jsonPluginData[p.id.toString()]?.category;
			
			let name = `[${p.name}](obsidian://adc-uri?settingid=${p.id})`;
			let author = isEmptyOrUndefined(jsonRepo) ?
				emptyValue : `[${p.author.toString()}](${jsonRepo})`;
			let description = isEmptyOrUndefined(jsonDescription) ? 
				p.description : jsonDescription;
			let category = isEmptyOrUndefined(jsonCategory) ? 
				'Unset' : jsonCategory;
				
			return {
				  category: category,
				  name: name,
				  author: author,
				  description: description,
				  platform: !p.isDesktopOnly ? 'All' : 'Desktop',
				  id: p.id,
				  pluginEnabled: app.plugins.enabledPlugins.has(p.id)
			}
	  })
	  .sort((a, b) => {
	   
			if (a.category === 'Unset' && b.category !== 'Unset') return 1;
		  if (b.category === 'Unset' && a.category !== 'Unset') return -1;
		  
		   // Compare categories
		  if (a.category < b.category) return -1;
		  if (a.category > b.category) return 1;
		
		  // If categories are the same, compare names
		  if (a.name < b.name) return -1;
		  if (a.name > b.name) return 1;
		
		  return 0;
		})
		.flatMap(a => {
			const output = [];

			if (a.category !== lastCategory && lastCategory !== null) {
				output.push(
				{
					  category: "---",
					  name: "---",
					  author: "---",
					  description: "---",
					  platform: "---",
				});
			}
			output.push(a);
	
			lastCategory = a.category;
			return output;
		})
	)
}

return function View() {  
	const [pluginData, setPluginData] = dc.useState(getPluginData().array());
	const columns = [
    { id: "Category", value: (row) => row.category },
    { id: "Name/Setting", value: (row) => row.name },
    { id: "Author/Github", value: (row) => row.author },
    { id: "Description", value: (row) => row.description },
    { id: "Platform", value: (row) => row.platform },
    { id: "Toggle", value: (row) => createPluginEnableButton(row, pluginData, setPluginData) },
	]
	
	return <dc.Table rows={pluginData} columns={columns} />;
}
```