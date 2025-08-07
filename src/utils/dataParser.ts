// src/utils/dataParser.ts
import { formatMonth } from "./dateUtils";

/**
 * Common data types for different chart components
 */
export type MonthDataPoint = {
  month: string;
  count: number;
  percentage: number;
};

export type ProvinceDataPoint = {
  province: string;
  count: number;
};

export type TimeDataPoint = {
  time: string;
  count: number;
};

export type AgeDataPoint = {
  age: string;
  count: number;
};

/**
 * Generic field mapping configuration
 */
export type FieldMapping = {
  [outputField: string]: {
    sourceField: string;
    transform?: (value: unknown) => unknown;
  };
};

/**
 * Generic parser that can handle unknown data structure with field mapping
 * @param row The raw data row
 * @param fieldMapping Configuration for mapping source fields to output fields
 * @param requiredFields Array of fields that must be present
 * @returns Parsed data object
 */
export const parseGenericDataRow = <T>(
  row: unknown,
  fieldMapping: FieldMapping,
  requiredFields: string[]
): T => {
  if (typeof row !== "object" || row === null) {
    throw new Error("Invalid data format: expected object");
  }

  const rowData = row as Record<string, unknown>;

  // Check if all required fields exist in source data
  const missingFields = requiredFields.filter((field) => {
    const sourceField = fieldMapping[field]?.sourceField || field;
    return !(sourceField in rowData);
  });

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  // Build the output object
  const result: unknown = {};

  for (const [outputField, config] of Object.entries(fieldMapping)) {
    const sourceValue = rowData[config.sourceField];
    result[outputField] = config.transform
      ? config.transform(sourceValue)
      : sourceValue;
  }

  return result as T;
};

/**
 * Predefined parsers for common data types
 */

// Month data parser
export const parseMonthDataRow = (row: unknown): MonthDataPoint => {
  return parseGenericDataRow<MonthDataPoint>(
    row,
    {
      month: { sourceField: "month", transform: formatMonth },
      count: { sourceField: "count", transform: Number },
      percentage: { sourceField: "percentage", transform: Number },
    },
    ["month", "count", "percentage"]
  );
};

// Province data parser
export const parseProvinceDataRow = (row: unknown): ProvinceDataPoint => {
  return parseGenericDataRow<ProvinceDataPoint>(
    row,
    {
      province: { sourceField: "prov", transform: String },
      count: { sourceField: "count", transform: Number },
    },
    ["province", "count"]
  );
};

// Time data parser
export const parseTimeDataRow = (row: unknown): TimeDataPoint => {
  return parseGenericDataRow<TimeDataPoint>(
    row,
    {
      time: { sourceField: "time", transform: String },
      count: { sourceField: "count", transform: Number },
    },
    ["time", "count"]
  );
};

// Age data parser (for future use)
export const parseAgeDataRow = (row: unknown): AgeDataPoint => {
  return parseGenericDataRow<AgeDataPoint>(
    row,
    {
      age: { sourceField: "age", transform: String },
      count: { sourceField: "count", transform: Number },
    },
    ["age", "count"]
  );
};

/**
 * Factory function to create custom parsers
 * @param fieldMapping Field mapping configuration
 * @param requiredFields Required fields array
 * @returns Parser function
 */
export const createCustomParser = <T>(
  fieldMapping: FieldMapping,
  requiredFields: string[]
) => {
  return (row: unknown): T => {
    return parseGenericDataRow<T>(row, fieldMapping, requiredFields);
  };
};

/**
 * Common transform functions that can be reused
 */
export const transforms = {
  toNumber: (value: unknown) => Number(value),
  toString: (value: unknown) => String(value),
  formatMonth: (value: unknown) => formatMonth(String(value)),
  toUpperCase: (value: unknown) => String(value).toUpperCase(),
  toLowerCase: (value: unknown) => String(value).toLowerCase(),
  parseFloat: (value: unknown) => parseFloat(value),
  parseInt: (value: unknown) => parseInt(value, 10),
};
