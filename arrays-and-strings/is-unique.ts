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
 * Same function as `checkUniqueCharacters`, but does not use any data structures.
 * @param current
 */
const checkUniqueCharactersNoStructure = (current: string): boolean => {
  return true;
};

const sherlockFile: string = await readFileStr("./sample-data/sherlock.txt");
const sampleStringsFile: string = await readFileStr(
  "./sample-data/sample-strings.txt"
);

sampleStringsFile.split("\n").forEach(checkUniqueCharacters);
sherlockFile.split("\n").forEach(checkUniqueCharacters);
