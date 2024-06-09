import { inlineObjectToCss, styleObjectToCss } from './utils/object-to-css.js';

const sharedPropsToCSS = ({ x, y, width, height, rotation, borderRadius }) => {
  const css = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  if (rotation) {
    css['transform-origin'] = `0 0`;
    css.transform = `rotate(${rotation}deg)`;
  }

  if (borderRadius) {
    css['border-radius'] = `${borderRadius}px`;
  }

  return inlineObjectToCss(css);
}

const textVerticalAlignmentToCSS = ({ textVerticalAlignment }) => {
  const verticalAlignToCSS = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
  };

  if (!verticalAlignToCSS[textVerticalAlignment]) {
    return '';
  }

  return `display:inline-flex;align-items:${verticalAlignToCSS[textVerticalAlignment]}`;
}

const textStyleToCSS = ({ textStyle = [] }) => {
  const textStyleToCSS = {
    bold: 'font-weight:bold',
    italic: 'font-style:italic',
    underline: 'text-decoration:underline',
    strikethrough: 'text-decoration:line-through',
  };

  return textStyle.map(style => textStyleToCSS[style]).filter(Boolean).join(';');
}

const imageToHTML = ({ frame }) => {
  const { src, id } = frame;
  return `<img id="${id}" src="${src}" alt="Img ${id}" style="${sharedPropsToCSS(frame)}" />`;
}

const rectangleToHTML = ({ frame, childrenHTML }) => {
  const css = {
    'background-color': `${frame.backgroundColor}`,
  }

  const textCssTextArr = [];
  const textCSSObj = {
    height: '100%',
  };

  if (frame.textColor) {
    textCSSObj.color = frame.textColor;
  }

  if (frame.fontSize) {
    textCSSObj['font-size'] = `${frame.fontSize}px`;
  }

  if (frame.padding) {
    css.padding = `${frame.padding}px`;
  }

  if (frame.textAlignment) {
    css['text-align'] = frame.textAlignment;
  }

  if (frame.textVerticalAlignment) {
    textCssTextArr.push(textVerticalAlignmentToCSS(frame));
  }

  if (frame.textStyle) {
    textCssTextArr.push(textStyleToCSS(frame));
  }

  textCssTextArr.push(inlineObjectToCss(textCSSObj));
  const textHTML = frame.textContent ? `<div style="${textCssTextArr.join(';')}"><span>${frame.textContent}</span></div>` : '';

  const style = sharedPropsToCSS(frame) + ';' + inlineObjectToCss(css);

  return `<div id="${frame.id}" style="${style}">${textHTML}${childrenHTML}</div>`;
}

const frameToHTML = ({ frame, childrenHTML }) => {
  const frameTypeToHTML = {
    image: imageToHTML,
    rectangle: rectangleToHTML,
  };

  if (frame.type in frameTypeToHTML) {
    return frameTypeToHTML[frame.type]({ frame, childrenHTML });
  }

  return '';
}

const exportToHTMLRecursive = ({ frames, frameId, frameHierarchy }) => {
  const childrenHTML = Object.entries(frameHierarchy)
    .map(
      ([childId, childHierarchy]) => exportToHTMLRecursive({
        frames,
        frameId: childId,
        frameHierarchy: childHierarchy,
      }))
    .join('');


  return frameToHTML({ frame: frames[frameId], childrenHTML });
}

export const exportToHTML = ({ hierarchy, frames }) => {
  const framesHTML = Object.entries(hierarchy)
    .map(
      ([frameId, frameHierarchy]) => exportToHTMLRecursive({
        frames,
        frameId,
        frameHierarchy
      })
    )
    .join('');

  const globalStyle = {
    body: {
      margin: 0,
      padding: 0,
      'font-family': 'Arial,sans-serif',
    },
    '*': {
      'box-sizing': 'border-box',
    }
  };

  return `<html><head><style>${styleObjectToCss(globalStyle)}</style></head><body>${framesHTML}</body></html>`;
};
