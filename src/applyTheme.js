export const applyTheme = (themeObj) => {
  const root = document.documentElement;

  Object.entries(themeObj).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
