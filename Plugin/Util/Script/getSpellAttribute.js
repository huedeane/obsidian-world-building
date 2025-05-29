/**
 * Get spell attribute from spell
 */
function getSpellAttribute(content, key) {
  const regex = new RegExp(`- __${key}:__\\s*(.*)`, "i"); // 'i' for case-insensitive
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

module.exports = getSpellAttribute;