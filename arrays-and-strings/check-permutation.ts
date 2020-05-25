import {
  cleanString,
  convertArrayToCountMap,
  readAndParseFile
} from "./utils.ts";

const checkPermutation = (str1: string, str2: string): boolean => {
  const str1Map = convertArrayToCountMap(cleanString(str1));
  const str2Map = convertArrayToCountMap(cleanString(str2));
  return Array.from(str1Map).every(([str1Char, str1Count]) => {
    const str2Count = str2Map.get(str1Char);
    if (str2Count === undefined) {
      return false;
    }
    return str2Count === str1Count;
  });
};

(await readAndParseFile("./sample-data/permutations.txt")).map(
  currentPermutation => {
    const [str1, str2] = currentPermutation.split(", ");
    return checkPermutation(str1, str2);
  }
);
