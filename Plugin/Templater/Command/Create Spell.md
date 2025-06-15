<%*
	async function CreateSpell() {
		// Set note name
		const noteName = await tp.system.prompt('Spell Name');
		
		// Folder TFolder
		const folderPath = 'World/System/Magic System/Spell/Draft'
		const folder = app.vault.getAbstractFileByPath(folderPath)
		
		// Template TFile
		const templatePath = '/Plugin/Templater/Template/Spell Template'
		const template = tp.file.find_tfile(templatePath)
		
		// Create note
		await tp.file.create_new(template, noteName, true, folder)
		
		/* Code to edit note after creation
		const newFilePath = `${folderPath}/${noteName}`
		const file = tp.file.find_tfile(newFilePath);
		*/
	}
	tp.user.executeCommand(CreateSpell)
%>