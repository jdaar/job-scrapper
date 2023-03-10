import * as puppeteer from "puppeteer";
import { log } from "./io";

/**
 * Helper function to sleep for a given number of milliseconds.
 * @param ms The number of milliseconds to wait.
 * @example
 * await sleep(5000)
 * @since 1.0.0
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get the text for the first element that matches a given xpath.
 * @param page - The page to use.
 * @param url - The url to navigate to.
 * @param xpath - The xpath to use.
 * @returns The text for the first element that matches the given xpath.
 * @example
 * const text = await getTextByXPath(page, 'https://example.com', '//div[@id="text"]')
 * console.log(text) // 'text'
 * @since 1.0.0
 */
export async function getTextByXPath(
  page: puppeteer.Page,
  xpath: string
): Promise<string> {
  log("info", "getTextByXPath", `Getting text for xpath ${xpath}...`);
  const element = await page.$x(xpath);
  if (element.length === 0) {
    throw new Error(`Element for xpath ${xpath} not found.`);
  }
  const text = await element[0].getProperty("textContent");
  log("debug", "getTextByXPath", `Found text ${text} for xpath ${xpath}.`);

  const returnValue = await text.jsonValue();
  if (returnValue === null)
    throw new Error(`Text for xpath ${xpath} is undefined.`);

  return returnValue;
}

/**
 * Get the text for all elements that match a given xpath.
 * @param page - The page to use.
 * @param url - The url to navigate to.
 * @param xpath - The xpath to use.
 * @returns The text for all elements that match the given xpath.
 * @example
 * const texts = await getMultipleTextByXPath(page, 'https://example.com', '//div[@id="text"]')
 * console.log(texts) // ['text1', 'text2']
 * @since 1.0.0
 */
export async function getMultipleTextByXPath(
  page: puppeteer.Page,
  xpath: string
): Promise<string[]> {
  log("info", "getMultipleTextByXPath", `Getting text for xpath ${xpath}...`);
  const elements = await page.$x(xpath);
  if (elements.length === 0) {
    throw new Error(`Element for xpath ${xpath} not found.`);
  }
  log(
    "debug",
    "getMultipleTextByXPath",
    `Found ${elements.length} elements for xpath ${xpath}.`
  );
  const texts = await Promise.all(
    elements.map(async (element: any) => {
      const text = await element.getProperty("textContent");
      return text.jsonValue() as Promise<string>;
    })
  );
  if (texts === null || texts === undefined || texts.length === 0) {
    throw new Error(`Text for xpath ${xpath} is undefined.`);
  }
  log(
    "debug",
    "getMultipleTextByXPath",
    `Found texts ${texts} for xpath ${xpath}.`
  );
  return texts;
}

/**
 * Get the list items for a given xpath.
 * @param page - The page to use.
 * @param url - The url to navigate to.
 * @param xpath - The xpath to use.
 * @returns The list items or null if the xpath is not found.
 * @example
 * const items = await getListItemsByXPath(page, 'https://example.com', '//ul[@id="list"]')
 * console.log(items) // ['item1', 'item2', 'item3']
 * @since 1.0.0
 */
export async function getListItemsByXPath(
  page: puppeteer.Page,
  xpath: string
): Promise<string[]> {
  log(
    "info",
    "getListItemsByXPath",
    `Getting list items for xpath ${xpath}...`
  );
  const element = await page.$x(xpath);
  if (element.length === 0) {
    throw new Error(`Element for xpath ${xpath} not found.`);
  }
  const items = await element[0].$$eval("li", (nodes: any) =>
    nodes.map((node: any) => node.textContent?.trim() ?? "")
  );
  if (items === null || items === undefined || items.length === 0) {
    throw new Error(`List items for xpath ${xpath} is undefined.`);
  }
  log(
    "debug",
    "getListItemsByXPath",
    `Found items ${items} for xpath ${xpath}.`
  );
  return items;
}
