export const isIssueShow = () => {
  return /^\/issues\/\d+$/.test(location.pathname);
};

export const isIssueNew = () => {
  return /^\/projects\/\w+\/issues\/new$/.test(location.pathname);
};
