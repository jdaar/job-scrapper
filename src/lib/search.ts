import { TOKENS, EXCLUDED_TOKENS } from "./dictionaries";
import { max_distance, min_length } from "./arguments";
import { log } from "./io";

const memoizedClosestTechnologyName = new Map<string, string>();

/**
 * Gets the closest technology name from the CUSTOM_TECHNOLOGIES dictionary.
 * @param input The input string to search a technology for.
 * @returns The closest technology name or null if no technology was found.
 * @example
 * const closestTechnologyName = findClosestTechnologyName('react')
 * console.log(closestTechnologyName) // React
 * @since 1.0.0
 */
export function findClosestTechnologyName(input: string): string | null {
  if (memoizedClosestTechnologyName.has(input.toLowerCase())) {
    log('debug', 'findClosestTechnologyName',`Found ${input} in memoized map`);
    return memoizedClosestTechnologyName.get(input.toLowerCase())!;
  }
  if (EXCLUDED_TOKENS.includes(input.toLowerCase())) {
    return null;
  }

  let closestMatch: string = "";
  let minDistance: number = Infinity;
  for (let techName of TOKENS) {
    if (techName.toLowerCase() === input.toLowerCase()) {
      log('debug', 'findClosestTechnologyName', `Found exact match for ${input}`);
      return techName;
    }
    if (techName.length < min_length || input.length < min_length) {
      continue;
    }
    const distance = getLevenshteinDistance(techName.toLowerCase(), input.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = techName;
    }
  }
  if (minDistance > max_distance) {
    return null;
  }
  memoizedClosestTechnologyName.set(input, closestMatch);
  log('debug', 'findClosestTechnologyName', `Found closest match for ${input}: ${closestMatch} (distance: ${minDistance}) and memoized it`);
  return closestMatch;
}

/**
 * Gets the Levenshtein distance between two strings.
 * @param str1 The first string to compare.
 * @param str2 The second string to compare. 
 * @returns The Levenshtein distance between the two strings.
 */
function getLevenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];
  
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }
  
  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]) + 1;
      }
    }
  }
  
  return matrix[len1][len2];
}
