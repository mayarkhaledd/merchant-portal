// Create a mapping object
const mimeMap: { [key: string]: string } = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "image/svg+xml": "svg",
};

// Utility function to convert MIME type to file extension
const mimeToExtension = (mime: string): string => {
  return mimeMap[mime] || "";
};

export default mimeToExtension;
