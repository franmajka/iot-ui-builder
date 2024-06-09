export const inlineObjectToCss = cssObject => {
  return Object.entries(cssObject)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
}

export const styleObjectToCss = cssObject => {
  return Object.entries(cssObject)
    .map(([selector, cssObj]) => `${selector}{${inlineObjectToCss(cssObj)}}`)
    .join('');
}
