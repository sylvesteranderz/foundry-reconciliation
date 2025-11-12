import store from "@/store/store";
import { format } from "date-fns";
import { ToWords } from "to-words";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import _, { isEmpty } from "lodash";
import React from "react";

/**
 * Formats a date to 'MMM d yyyy' format (e.g., 'Oct 5 2025')
 * @param date - The date to format (defaults to current date)
 * @returns Formatted date string
 */
export const NewFoundryDateFormat = (
  date: Date | number | string = new Date()
): string => {
  return format(new Date(date), "MMM d, yyyy");
};

export function exportToExcel(data: any, filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${filename}.xlsx`);
}
export function initials(value = "") {
  const valueArray = value?.split(" ");

  return valueArray.map(([first]) => first?.toUpperCase()).join("");
}
export function getRandomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const toHex = (value: number) => value.toString(16).padStart(2, "0");
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return hexColor;
}

export const parseToMoney = (
  v: any,
  simplify: boolean = false,
  decimalPlaces: number = 2,
  currencySymbol?: string
): React.ReactElement | string => {
  const num = Number(v);

  // Handle invalid values
  if (v === null || v === undefined || isNaN(num) || !isFinite(num)) {
    return React.createElement(
      'span',
      null,
      currencySymbol ? currencySymbol + ' ' : '',
      '0',
      React.createElement('sup', { className: 'text-[0.65em]' }, '.00')
    );
  }

  const absNum = Math.abs(num);
  const isNegative = num < 0;
  const sign = isNegative ? "-" : "";

  if (simplify) {
    const tiers = [
      { value: 1e12, symbol: "T" },
      { value: 1e9, symbol: "B" },
      { value: 1e6, symbol: "M" },
      { value: 1e3, symbol: "K" },
    ];

    for (const tier of tiers) {
      if (absNum >= tier.value) {
        const simplifiedValue = num / tier.value;
        const formatted = simplifiedValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: decimalPlaces,
        });
        
        const [whole, decimal] = formatted.split(".");
        return React.createElement(
          'span',
          null,
          currencySymbol ? currencySymbol + ' ' : '',
          sign + whole,
          React.createElement('sup', { className: 'text-[0.75em] tracking-wider' }, '.' + (decimal || '00')),
          tier.symbol
        );
      }
    }
  }

  // Standard formatting with superscripted decimals
  const formatted = absNum.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimalPlaces,
  });

  const [whole, decimal] = formatted.split(".");
  
  return React.createElement(
    'span',
    null,
    currencySymbol ? currencySymbol + ' ' : '',
    sign + whole,
    React.createElement('sup', { className: 'text-[0.75em] tracking-wide' }, '.' + (decimal || '00'))
  );
};

export function formatNumber(number: number) {
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixIndex = 0;

  if (number < 9999) {
    return parseToMoney(Number(number)) || 0;
  }

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return Number(number.toFixed(2)).toLocaleString() + suffixes[suffixIndex];
}

export const NumberToWords = new ToWords({
  localeCode: "en-US",
  converterOptions: {
    currency: false,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: "Cedi",
      plural: "Cedis",
      symbol: "₵",
      fractionalUnit: {
        name: "Pesewa",
        plural: "Pesewas",
        symbol: "P",
      },
    },
  },
});

export function removeWords(
  inputString: string,
  wordsToRemove: string[]
): string {
  const pattern = wordsToRemove
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  const regex = new RegExp(`\\b(${pattern})\\b`, "gi");

  return inputString.replace(regex, "").replace(/\s+/g, " ").trim();
}

export const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

export function timeDifference(creationDate: Date) {
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the creation date
  const timeDifferenceMs = currentDate.getTime() - creationDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  const result = daysDifference > 0 ? daysDifference : 1;

  return `${result} day (s)`;
}

export function timeDifferenceAgo(creationDate: Date) {
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the creation date
  const timeDifferenceMs = currentDate.getTime() - creationDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

  return daysDifference >= 1 ? `${daysDifference} day (s) ago` : "today";
}

export const formatDate = (isoDate: any) => {
  if (!isoDate || isNaN(Date.parse(isoDate))) {
    return "";
  }

  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateForSubscription = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Converts date to YYYY-MM-DD format
};

export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  // Handle case where adding months results in invalid date (e.g., 31st January)
  if (newDate.getDate() !== date.getDate()) {
    newDate.setDate(0); // Set to last day of previous month
  }
  return newDate;
};

export const parseCurrency = (code: any) => {
  switch (code) {
    case "USD":
      return "$";
    case "GHS":
      return "₵";
    default:
      return "";
  }
};

export const setMissingValuesToNull = (data: any) => {
  const parsedData: any = {};

  for (const key in data) {
    if (data[key] === undefined || data[key] === "") {
      parsedData[key] = null;
    } else {
      parsedData[key] = data[key];
    }
  }

  return parsedData;
};

export function formatDateWithSlash(inputDate: any) {
  // Parse the input date
  const date = new Date(inputDate);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  // Format the date as DD/MM/YY
  return `${day}/${month}/${year}`;
}

export const dateApproahingExpiry = (item: any) => {
  const endDate = new Date(item.end_date);
  const today = new Date();
  const approachingEndDate = new Date(
    today.getTime() + 15 * 24 * 60 * 60 * 1000
  );
  return endDate.getTime() <= approachingEndDate.getTime();
};

export function isAccountingManager() {
  const roles = store.getState().auth.userInfo.roles;

  return Array.from(roles || []).some((role) =>
    role.includes("accounting:manager")
  );
}

/**
 * Cleans an object by removing properties with undefined values
 * @param obj - The object to clean
 * @returns A new object with undefined values removed
 */
export const cleanObject = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

type TreeNode<T> = T & { children?: TreeNode<T>[] };

/**
 * Builds a nested tree structure from flat data.
 *
 * @param items - Flat array of data items.
 * @param getId - Function to extract unique ID from an item.
 * @param getParentId - Function to extract the parent ID from an item.
 * @returns A nested tree of items.
 */
export function buildTree<T>(
  items: T[],
  getId: (item: T) => string,
  getParentId: (item: T) => string
): TreeNode<T>[] {
  const normalized = items.map((item) => ({
    ...item,
    parentId: getParentId(item) || "",
  }));

  const grouped = _.groupBy(normalized, "parentId");

  function buildNode(parentId: string): TreeNode<T>[] {
    return (grouped[parentId] || []).map((item) => {
      const { parentId, ...rest } = item;
      return {
        ...(rest as T),
        children: buildNode(getId(item)),
      };
    });
  }

  return buildNode("");
}

export function getCurrencySymbol(currency: string, locale = "en") {
  try {
    if (currency.toLowerCase() == "ghs") return "₵";
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
    }).format(0);

    return formatted.replace(/[\d\s.,]/g, "");
  } catch (error) {
    console.error({
      error,
      currency,
    });
    return "";
  }
}

export function cleanFrappeError(message: string): string {
  if (!message) return "An error occurred";

  // Remove HTML tags
  const withoutHtml = message.replace(/<[^>]*>/g, " ");

  // Remove known prefixes
  const withoutPrefix = withoutHtml.replace(/frappe\.exceptions\.\w+:?/gi, " ");

  // Optional: remove filler words or trim
  const cleaned = withoutPrefix
    .replace(/\b(Error|ValidationError|frappe|exceptions)\b/gi, "")
    .replace(/\.+$/, "") // remove trailing periods
    .trim();

  return cleaned || "An error occurred";
}

export function getDefaultCurrency() {
  const { erp_defaults } = store.getState()["org-details"];

  return String(erp_defaults.default_currency || "");
}

export function HasPermittedRole(access: string[]): boolean {
  const { userInfo } = store.getState().auth;
  const { roles } = store.getState()["persist-slice"];

  const role_permitted = access
    ?.map((i: string) => {
      const target = roles?.find((x) => x.name === i);

      return target?.id;
    })
    ?.some((i: string) => userInfo?.roles?.includes(i));

  return role_permitted || isEmpty(access);
}

export function cleanFrappeValidationError(rawMessage: string): string {
  if (!rawMessage) return "";

  // Remove the Frappe exception class (e.g., 'frappe.exceptions.ValidationError: ')
  const cleanedMessage = rawMessage
    .replace(/^frappe\.exceptions\.\w+Error:\s*/, "")
    .trim();

  // Strip out all HTML tags
  const plainTextMessage = cleanedMessage.replace(/<[^>]*>/g, "");

  return plainTextMessage;
}
