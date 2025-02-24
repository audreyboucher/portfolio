import { isIdValid } from "./element";

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToAnchor = (id?: string) => {
  if (isIdValid(id))
    document.getElementById(id!)!.scrollIntoView({ behavior: 'smooth' });
};
