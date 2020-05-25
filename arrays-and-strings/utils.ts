import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

/**
 * Reads content for a newline-separated file and parses by the newline character.
 * @param filePath 
 */
export const readAndParseFile = async (filePath: string): Promise<string[]> =>
  (await readFileStr(filePath)).split("\n");

/**
 * Removes all whitespace from string and parses to an array.
 * @param current
 */
export const cleanString = (current: string): string[] =>
  current.replace(/\s/g, "").split("");

/**
 * Converts a char array to a map of the count for each char.
 * @param str
 */
export const convertArrayToCountMap = (str: string[]): Map<string, number> =>
  str.reduce((charToCount, curr) => {
    const currentCount = charToCount.get(curr);
    if (currentCount !== undefined) {
      return charToCount.set(curr, currentCount + 1);
    }
    return charToCount.set(curr, 1);
  }, new Map<string, number>());
