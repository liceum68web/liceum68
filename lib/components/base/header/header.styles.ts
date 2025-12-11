const mainPanelClass =
  "max-w-screen-2xl w-full grid grid-cols-[1fr_auto_1fr] grid-rows-[1fr] border-b border-gray-200 p-4";

const headerContainerClass =
  "w-full flex flex-col items-center z-(--z-index-sticky)";

const headerRightToolbarClass =
  "col-start-3 row-start-1 flex items-center justify-end";

const headerLeftToolbarClass = "col-start-1 row-start-1 flex items-center";

const headerCenterToolbarClass =
  "col-start-2 row-start-1 flex items-center justify-center";

const headerNavMenuClass = "overflow-hidden";

const drawerClass =
  "overflow-hidden grid grid-rows-[0fr] opacity-0 transition-all duration-100 ease-in-out";

const drawerExpandedClass = "grid-rows-[1fr] opacity-100";

const headerNavMenuContentWrapperClass = "h-full";

export {
  mainPanelClass,
  headerContainerClass,
  headerRightToolbarClass,
  headerLeftToolbarClass,
  headerCenterToolbarClass,
  headerNavMenuClass,
  drawerClass,
  drawerExpandedClass,
  headerNavMenuContentWrapperClass,
};
