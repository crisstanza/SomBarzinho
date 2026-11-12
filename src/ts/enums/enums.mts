export const HTML = Object.freeze({
  CLASS_NAMES: Object.freeze({
    CURRENT: "current",
    NO_RESULTS: "no-results",
    BG_X: (index: number) => `bg-${index}`,
  }),
  ATTRIBUTE_NAMES: Object.freeze({
    BG: `bg`,
  }),
});

export const SORT_BY = Object.freeze({
  NAME: "#nome",
  ARTIST: "#artista",
});

export const SEARCH_IN = Object.freeze({
  NAME: "#nome",
  ARTIST: "#artista",
  LYRICS: "#letra",
});
