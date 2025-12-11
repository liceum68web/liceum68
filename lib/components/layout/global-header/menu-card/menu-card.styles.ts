export const menuCardClass =
  "w-full group grid grid-cols-[auto_1fr] grid-rows-[repeat(2,min-content)] [grid-template-areas:'icon_label'_'icon_description'] gap-x-4 transition-colors duration-200 hover:bg-indigo-100 p-2 -m-2 rounded-lg";

export const menuCardIconClass =
  "[grid-area:icon] bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-gray-50";

export const menuCardLabelClass =
  "[grid-area:label] font-medium text-base text-gray-900 truncate";

export const menuCardDescriptionClass =
  "[grid-area:description] text-sm text-gray-600 mt-1 line-clamp-2";
