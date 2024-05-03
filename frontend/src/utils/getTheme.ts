export const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme === null) {
    return "#0EA5E9";
  }
  return String(theme);
};
