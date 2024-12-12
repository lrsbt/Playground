export const addToStylesheet = ({
  name,
  color
}: {
  name: string;
  color: string;
}) => {
  document.documentElement.style.setProperty(`--${name}`, color);
};
