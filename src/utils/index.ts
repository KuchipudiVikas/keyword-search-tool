export const downloadCSV = (
  keywords: string[],
  results: object,
  domain: string
): void => {
  // Add the header and a blank line to the keywords array
  let pageName = domain.charAt(0).toUpperCase() + domain.slice(1);
  const csvContent = [`${pageName} Keywords`, ""].concat(keywords);

  const finalCsvContent = csvContent
    .map((key) => {
      if (results[key]) {
        return `${key}, ${results[key]}`;
      }
      return `${key}, `;
    })
    .join("\n");
  // Create a blob from the CSV string
  const blob = new Blob([finalCsvContent], { type: "text/csv" });

  // Create a temporary anchor tag, set its properties, and simulate a click on it
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = "keywords.csv";
  document.body.appendChild(a); // Append to body to make it clickable
  a.click();

  // Cleanup: remove the anchor and revoke the object URL
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyKeywordsToClipboard = async (
  keywords: string[]
): Promise<void> => {
  // Convert keywords array into a comma-separated string
  const csvContent = keywords.join(", ");

  // Use the Clipboard API to write the content
  try {
    await navigator.clipboard.writeText(csvContent);
    console.log("Keywords copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy keywords:", err);
  }
};
