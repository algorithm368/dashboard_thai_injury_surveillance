/**
 * This is function called `formatMonth`
 * You give it a string that looks like a date - example: "2024-01"
 * It will give you back a new string that's easier to read - example: "Jan 2024"
 *
 * @param monthStr: example "2024-01"
 * @returns {string}: example "Jan"
 */
export function formatMonth(monthStr: string): string {
  /**
   * This checks: "Did someone forget to give us a date?"
   *  - If yes, we return an empty string.
   *  - If no, we continue to format the date.
   */
  if (!monthStr) return "";

  /**
   * It cuts the string at the "-" symbol.
   * So "2024-01" becomes ["2024", "01"].
   *  - year is "2024"
   *  - month is "01"
   */
  const month = monthStr.split("-")[1];

  /**
   * This is a list of month names.
   * Each one is where that month is in the year.
   *  - names[0] is "Jan"
   *  - names[1] is "Feb"
   *  ...
   *  - names[11] is "Dec"
   */
  const names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /**
   * The month part from before was a string like "01".
   * We change it to a number = 1.
   * Then we subtract 1 because arrays start at 0.
   * So "monthIndex = 11"  -> which is "Dec" in the "names" array.
   */
  const monthIndex = parseInt(month, 10) - 1;

  /**
   * This is a "safety check".
   *  - Is the month a number?
   *  - IS it between 0 and 11?
   *  If something's wrong -> just return the original input like "2024-01".
   */
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return monthStr;

  /**
   * This puts the pieces together.
   * It takes the month name from the "names" array and the year.
   * So "Jan" + "2024" becomes "Jan".
   *
   * Finally, it returns that new string.
   */
  return `${names[monthIndex]}`;
}
