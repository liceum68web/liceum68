export const menuCardClass =
  "w-full group grid grid-cols-[auto_1fr] grid-rows-[1fr] [grid-template-areas:'icon_label'] md:grid-rows-[repeat(2,min-content)] md:[grid-template-areas:'icon_label'_'icon_description'] gap-x-4 transition-colors duration-200 hover:bg-indigo-100 p-1 md:p-2 m-1 md:m-2 rounded-lg";

export const menuCardIconClass =
  "[grid-area:icon] bg-indigo-100 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-gray-50 text-[var(--color-start-blue)]";

export const menuCardLabelClass =
  "[grid-area:label] font-medium text-base text-gray-900 [align-self:center] truncate";

export const menuCardDescriptionClass =
  "hidden md:block [grid-area:description] mt-1 [&>span]:text-sm [&>span]:text-gray-600 [&>span]:line-clamp-2";
