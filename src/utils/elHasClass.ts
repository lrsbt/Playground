const elHasClass = (
  event: React.MouseEvent<Element, MouseEvent>,
  className: string
) => {
  const { target } = event;
  if (target instanceof HTMLElement) {
    return target.classList.contains(className); // DOMTokenList: contains() method
  }
  return false;
};

export { elHasClass };
