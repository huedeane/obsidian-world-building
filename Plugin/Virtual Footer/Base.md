```dataviewjs
const file = dv.current().file;
const fileName = `${file.name}.md`
const vaultName = app.vault.getName();
const folderPath = file.folder;
const folder = folderPath.split("/").pop();
const folderNotePath = `${folderPath}/${folder}.md`;
const page = dv.page(folderNotePath);
const link = `obsidian://adv-uri?vault=${vaultName}&filepath={0}&viewmode=preview`;

const hrElement = {
  tag: "hr",
  content: "",
  options: { cls: "horizontal-module" }
};

const dateElement = {
  tag: "div",
  content: (file) => [
    `<div>Modified Date: ${file.mtime.toFormat("MMMM d, yyyy")}</div>`,
    `<div>Created Date: ${file.ctime.toFormat("MMMM d, yyyy")}</div>`
  ].join(""),
  options: { cls: "info-module" }
};

function createButton(name, type, path) {
  const btn = dv.el("button", name, { cls: `pagination-button pagination-${type}` });
  btn.onclick = () => {
	  let tFile = app.vault.getAbstractFileByPath(path);
		
	  const existingLeaf = app.workspace.getLeavesOfType("markdown").find(leaf => leaf.view.file === tFile);
	  if (existingLeaf) {
	    app.workspace.setActiveLeaf(existingLeaf);
	  } else {
	    app.workspace.activeLeaf.openFile(tFile);
	  }
  }
  return btn;
}

function createHorizontalElement() {
  return dv.el(hrElement.tag, hrElement.content, hrElement.options);
}

function createDateElement() {
  return dv.el(dateElement.tag, dateElement.content(file), dateElement.options);
}

function createPaginationElement() {
  const wrapper = dv.container.createEl("div", { cls: "pagination-module" });
	const paginationList = page['sorting-spec']
		.split('\n')
		.map(note => note.replace('...', '').trim() + '.md');
	const index = paginationList.indexOf(fileName);

	if (file.path == folderNotePath){
		const nextPath = `${folderPath}/${paginationList[index + 1]}`;
		wrapper.appendChild(createButton("🏠 begin", "begin", nextPath));
		return wrapper;
	}
	
	if (index > 0) {
		const prevPath = `${folderPath}/${paginationList[index - 1]}`;
		wrapper.appendChild(createButton("◀ prev", "prev", prevPath));
	}

	wrapper.appendChild(createButton("🏠 home", "home", folderNotePath));

	if (index < paginationList.length - 1) {
		const nextPath = `${folderPath}/${paginationList[index + 1]}`;
		wrapper.appendChild(createButton("next ▶", "next", nextPath));
	}

  return wrapper;
}

function renderVirtualFooter() {
  const wrapper = dv.container.createEl("div", { cls: "virtual-footer-custom" });
	wrapper.appendChild(createHorizontalElement());

	if (page?.pagination == 'true') {
		wrapper.appendChild(createPaginationElement());
		wrapper.appendChild(createHorizontalElement());
	}
	
	wrapper.appendChild(createDateElement());
}

renderVirtualFooter()
```
