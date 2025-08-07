export const parseRow = <T>(row: unknown, parser: (row: unknown) => T): T => {
  try {
    return parser(row);
  } catch (error) {
    throw new Error(
      `Failed to parse row: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
