// TODO: refactor to use local proxy for media files
// served from CMS blob storage

export const buildMediaUrl = (
  mediaPath: string,
  baseMediaUrl = process.env.CMS_BLOB_STORAGE_BASE_URL ?? "",
): string => {
  if (!mediaPath) {
    return "";
  }

  return `${baseMediaUrl}${mediaPath}`;
};
