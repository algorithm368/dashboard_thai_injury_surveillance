/**
 * This brings in a `tools` called `csvParse` from the `d3-dsv` library.
 * It's like giving our robot eyes so it can read csv files.
 */
import { csvParse } from "d3-dsv";

/**
 * This make a function called `fetchCsvData` that you can use anywhere.
 * You give it:
 * - a `url`: where the csv file is on the internet,
 * - a `parser`: a helper function that tells it how to understand each row of the csv.
 * The <T> is a bit of TypeScript magic - it means:
 * - "We don't know what kind of data we'll get yet. Let's keep it flexible!"
 * @param url: example "https://example.com/data.csv"
 * @param parser: a function that transforms each row of the csv into the desired format
 * @returns: an array of the parsed data
 */
export async function fetchCsvData<T>(
  url: string,
  parser: (d: unknown) => T
): Promise<T[]> {
  /**
   * This line says:
   * "Robot! Go to this link and download the csv file!"
   */
  const response = await fetch(url);

  /**
   * This line says:
   * "Robot! If you can't find the file, let me know!"
   */
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  /**
   * This turn the file we got into plain text (like copy the csv into Notepad).
   */
  const csvText = await response.text();

  /**
   * Now we give that text to `csvParse`, which:
   * - Splits the text into rows and columns,
   * - Uses our `parser` to turn it into nice JavaScript objects.
   *
   * Example:
   * If the csv has a row like "2024-01,25635,8.394871710903345",
   * Into an object like:
   * { month: "2024-01", count: 25635, percentage: 8.394871710903345 }
   *
   * The `parser` function is like a translator that tells `csvParse` how to read each row.
   */
  const parsedData = csvParse(csvText, parser);

  /**
   * Finally, we return the parsed data.
   * This is an array of objects, each one representing a row in the csv.
   * The <T> means it can be any type we want, like DataPoint or something else.
   * So if we used this with DataPoint, it will return an array of DataPoint objects.
   */
  return parsedData as T[];
}
