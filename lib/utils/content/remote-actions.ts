/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO: get back once type syncing with Payload CMS codebase
// is resolved

export const RemoteActions = ({ routerNavigate }: any) => {
  const navigateTo = ([{ page }]: any[]) => {
    routerNavigate(page[0].route);
  };

  return {
    navigateTo,
  };
};
