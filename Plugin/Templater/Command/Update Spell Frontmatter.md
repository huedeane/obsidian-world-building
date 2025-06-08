<%*
//Get current file
const spellFiles = tp.app.vault.getMarkdownFiles().filter(f => {
	return f.path.contains('Spell/') && !f.path.contains('/Draft') && !f.path.contains('Spell/Spell.md')
})

//Get json file
const jsonFilePath = '/Plugin/Util/Data/spell-attribute.json'
const jsonFile = await app.vault.adapter.read(jsonFilePath);
const jsonPluginData = JSON.parse(jsonFile)

const ignoreTag = ['tags', 'creation', 'status']

for (const file of spellFiles) {
	let content = await app.vault.read(file);

	await tp.app.fileManager.processFrontMatter(file, (frontmatter) => {
		// Clear frontmatter
	  for (const key in frontmatter) {
	    if (Object.hasOwnProperty.call(frontmatter, key)) {
		    if (ignoreTag.contains(key))
			    continue
			  else
		      delete frontmatter[key];
	    }
	  }
	  
	  //Set default tag
		frontmatter['tags'] = ['spell']
		frontmatter['status'] = 'completed'
		
	  //Rebuild spell properties
		jsonPluginData.forEach((data) => {
		  let attribute = tp.user.getSpellAttribute(content, data.attribute)
		  frontmatter[data.frontmatter] = attribute
		});
	});
};
%>