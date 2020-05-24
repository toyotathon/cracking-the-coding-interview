import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

/**
 * Helper function that removes all whitespace from string and parses to array
 * @param current
 */
const cleanString = (current: string): string[] =>
  current.replace(/\s/g, "").split("");

/**
 * Given a string, check that all of the characters in the string are unique.
 * @param current
 */
const checkUniqueCharacters = (current: string): boolean => {
  const characterMap = cleanString(current).reduce((charToCount, curr) => {
    const currentCount = charToCount.get(curr);
    if (currentCount !== undefined) {
      return charToCount.set(curr, currentCount + 1);
    }
    return charToCount.set(curr, 1);
  }, new Map<string, number>());
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

const sherlockFile = await readFileStr("./sample-data/sherlock.txt");
const sampleStringsFile = await readFileStr("./sample-data/sample-strings.txt");

sampleStringsFile.split("\n").forEach(checkUniqueCharacters);
sherlockFile.split("\n").forEach(checkUniqueCharacters);

console.log(
  sampleStringsFile.split("\n").map(checkUniqueCharactersNoStructure)
);
console.log(sherlockFile.split("\n").map(checkUniqueCharactersNoStructure));
