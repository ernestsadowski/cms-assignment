export const getLogo = (fallbackLogo?: Sanity.Image, logo?: Sanity.Image) => {
  if (logo?.asset) {
    return logo;
  }

  return fallbackLogo;
};
