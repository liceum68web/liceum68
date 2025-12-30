export const sliderClass =
  "w-full grid grid-cols-[50px_1fr_50px] overflow-hidden bg-white";
export const sliderLeftEdgeClass =
  "col-start-1 col-end-2 row-start-1 pointer-events-none z-10 bg-white [mask-image:linear-gradient(to_right,black,transparent)] [-webkit-mask-image:linear-gradient(to_right,black,transparent)] flex items-center justify-center transition-opacity duration-300";
export const sliderRightEdgeClass =
  "col-start-3 col-end-4 row-start-1 pointer-events-none z-10 bg-white [mask-image:linear-gradient(to_left,black,transparent)] [-webkit-mask-image:linear-gradient(to_left,black,transparent)] flex items-center justify-center transition-opacity duration-300";
export const sliderContentClass =
  "col-span-full row-start-1 flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";
export const hideEdgeClass = "opacity-0";
export const scrollButtonClass =
  "active:scale-95 transition-transform pointer-events-auto cursor-pointer text-[var(--color-start-blue)] hover:text-blue-900";
