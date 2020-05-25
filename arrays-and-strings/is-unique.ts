import {
  cleanString,
  convertArrayToCountMap,
  readAndParseFile
} from "./utils.ts";

/**
 * Given a string, check that all of the characters in the string are unique.
 * @param current
 */
const checkUniqueCharacters = (current: string): boolean => {
  const characterMap = convertArrayToCountMap(cleanString(current));
  return Array.from(characterMap.values()).every(count => count === 1);
};

/**
 * Helper function that returns the difference between two ASCII characters.
 * @param str1
 * @param str2
 */
const getAsciiDiff = (str1: string, str2: string): number =>
  str1.charCodeAt(0) - str2.charCodeAt(0);

/**
 * Same function as `checkUniqueCharacters`, but does not use any data structures.
 * Iterates over a string and bitwise increments the checker variable.
 * If the letter has been seen before, the checker variable will return true.
 * @param current
 */
const checkUniqueCharactersNoStructure = (current: string): boolean => {
  const cleanedString = cleanString(current);
  let checker = 0;
  return cleanedString.every(char => {
    const bitAtIndex = getAsciiDiff(char, "a");
    if ((checker & (1 << bitAtIndex)) > 0) {
      return false;
    }
    checker = checker | (1 << bitAtIndex);
    return true;
  });
};

["sherlock.txt", "sample-strings.txt"].forEach(async filename => {
  const parsedFile = await readAndParseFile(`./sample-data/${filename}`);
  parsedFile.map(checkUniqueCharacters);
  parsedFile.map(checkUniqueCharactersNoStructure);
});
