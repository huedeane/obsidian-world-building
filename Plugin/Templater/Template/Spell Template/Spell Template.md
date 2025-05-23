---
sorting-spec: |-
  De...ription
  Attribute
  Prerequisite
  Augmentation
  Remarks
  Synergy
  Variant
  History
tags:
  - Spell
creation: <% tp.file.creation_date() %>
---
### Description
---  
N/A  
  
### Attribute  
___  
- __Cost:__ Low, Medium, High, Variable  
- __Target:__ Self, Single, Multi, Area of Effect  
- __Range:__ Short, Medium, Long  
- __Cast Time:__ Instant, Prepared, Channel, Delayed  
- __Cast Type:__ Focused, Scattershot, Barrage, Sustained, Expansive, Stationary, Creation  
- __Persistence:__ Instant, Temporary, Permanent, Concentration  
- __Complexity:__ Basic, Intermediate, Advanced  
- __Depth:__ Low, Medium, High  
  
### Prerequisite  
___  
  
__Technique:__  
  
- __Infusion:__  
- __Extraction:__  
- __Enhancement:__  
- __Manipulation:__  
- __Shaping:__  
- __Animate:__  
- __Transmutation:__  
- __Projection:__  
- __Restoration:__  
- __Conjuration:__  
  
__Item:__ N/A  
  
### Augmentation  
___  
  
- __Infusion:__  
- __Extraction:__  
- __Enhancement:__  
- __Manipulation:__  
- __Shaping:__  
- __Animate:__  
- __Transmutation:__  
- __Projection:__  
- __Restoration:__  
- __Conjuration:__  
  
### Remarks
___  
N/A  
  
### Synergy
___  
N/A  
  
### Variant  
___  
N/A  
  
### History
___  
N/A

<%*
// Remove Sorting Spec Tag
let content = tR 
const modifyContent = tp.user.removeTag(content, 'sorting-spec')
tp.user.setContent(tR, modifyContent)

//Set Spell Name
//const noteName = await tp.system.prompt("Spell Name");
//await tp.file.rename(noteName)
%>