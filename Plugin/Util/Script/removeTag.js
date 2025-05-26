/**
 * Remove tag from front matter
 */
function removeTag(content, tag) {
    let startIndex = content.search(tag);
    if (startIndex !== -1) {
        let endIndex = content.indexOf('\n', startIndex); // Find the end of the sorting-spec block
        // Find where the next section starts (tags or creation, for example)
        const nextSectionIndex = content.search(/^\w+:/m);
        if (nextSectionIndex !== -1) {
            endIndex = nextSectionIndex;
        }
        // Remove the sorting-spec block and reassemble the string
        content = content.substring(0, startIndex) + content.substring(endIndex);
    }
    return content
}

module.exports = removeTag;