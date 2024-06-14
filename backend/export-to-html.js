import { inlineObjectToCss, styleObjectToCss } from './utils/object-to-css.js';
import { minify } from 'html-minifier';
import { replaceDynamicVariables } from './utils/replace-dynamic-variables.js';

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

  return `display:inline-flex; align-items: ${verticalAlignToCSS[textVerticalAlignment]}`;
}

const textStyleToCSS = ({ textStyle = [] }) => {
  const textStyleToCSS = {
    bold: 'font-weight: bold',
    italic: 'font-style: italic',
    underline: 'text-decoration: underline',
    'line-through': 'text-decoration: line-through',
  };

  if (textStyle.includes('underline') && textStyle.includes('line-through')) {
    return ['text-decoration: underline line-through'].concat(
      textStyle
        .filter(style => !['underline', 'line-through'].includes(style))
        .map(style => textStyleToCSS[style])
    ).join(';');
  }

  return textStyle.map(style => textStyleToCSS[style]).filter(Boolean).join(';');
}

const imageToHTML = ({ frame }) => {
  const { src, id } = frame;
  return `
    <img
      id="${id}"
      src="${src}"
      alt="Img ${id}"
      style="${sharedPropsToCSS(frame)}"
      class="${frame.className}"
    />
  `;
}

const rectangleToHTML = ({ frame, childrenHTML }) => {
  const tag = frame.type === 'button' ? 'button' : 'div';
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
  let textHTML = '';
  if (frame.textContent) {
    textHTML = `<div style="${textCssTextArr.join(';')}"><span>${
      replaceDynamicVariables(frame.textContent)
    }</span></div>`;
  }

  const style = sharedPropsToCSS(frame) + ';' + inlineObjectToCss(css);

  return `
    <${tag}
      id="${frame.id}"
      style="${style}"
      class="${frame.className}"
      ${frame.type === 'button' ? 'data-source="input"' : ''}
    >
      ${textHTML}
      ${childrenHTML}
    </${tag}>
  `;
}

const rangeToHTML = ({ frame, globalStyle }) => {
  const { id, min, max, step, value, thumbSize, thumbColor, trackColor, borderRadius } = frame;
  const css = {
    '--thumb-color': thumbColor,
    '--track-color': trackColor,
  };
  const match = value.match(/(?<type>\w+?)-(?<pin>\w+?)/);

  globalStyle[`[id='${id}']::-webkit-slider-runnable-track`] = {
    'border-radius': `${borderRadius}px`,
  };

  globalStyle[`[id='${id}']::-webkit-slider-thumb`] = {
    height: `${thumbSize * 2}px`,
    width: `${thumbSize * 2}px`,
  };

  globalStyle[`[id='${id}']:hover::-webkit-slider-thumb`] = {
    'box-shadow': `0 0 0 5px ${thumbColor}66`,
  };

  globalStyle[`[id='${id}']:focus::-webkit-slider-thumb`] = {
    'box-shadow': `0 0 0 8px ${thumbColor}66`,
  };

  return `
    <input
      id="${id}"
      type="range"
      min="${min}"
      max="${max}"
      step="${step}"
      style="${sharedPropsToCSS(frame)};${inlineObjectToCss(css)}"
      class="${frame.className}"
      ${match ? `
      data-source="input"
      data-type="${match.groups.type}"
      data-pin="${match.groups.pin}"
      ` : ''
      }
    />
  `;
}

const frameToHTML = ({ frame, childrenHTML, globalStyle }) => {
  const frameTypeToHTML = {
    image: imageToHTML,
    rectangle: rectangleToHTML,
    range: rangeToHTML,
    button: rectangleToHTML,
  };

  if (frame.type in frameTypeToHTML) {
    return frameTypeToHTML[frame.type]({ frame, childrenHTML, globalStyle });
  }

  return '';
}

const exportToHTMLRecursive = ({ frames, frameId, frameHierarchy, globalStyle }) => {
  const childrenHTML = Object.entries(frameHierarchy)
    .map(
      ([childId, childHierarchy]) => exportToHTMLRecursive({
        frames,
        frameId: childId,
        frameHierarchy: childHierarchy,
        globalStyle,
      }))
    .join('');


  return frameToHTML({ frame: frames[frameId], childrenHTML, globalStyle });
}

export const exportToHTML = ({ hierarchy, frames, customCss }) => {
  const globalStyle = {
    body: {
      margin: 0,
      padding: 0,
      'font-family': 'Arial, sans-serif',
    },
    '*': {
      'box-sizing': 'border-box',
    },
    'input[type="range"]': {
      '-webkit-appearance': 'none',
      appearance: 'none',
      background: 'transparent',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 450ms ease-in',
    },
    'input[type="range"]::-webkit-slider-thumb': {
      '-webkit-appearance': 'none',
      appearance: 'none',
      'border-radius': '50%',
      background: 'var(--thumb-color)',
      transition: 'all 200ms ease-in',
      'box-shadow': 'none',
    },
    button: {
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 200ms ease-in',
      'user-select': 'none',
    },
    'button:hover': {
      'box-shadow': '4px 6px 0 0 rgba(0, 0, 0, 0.1)',
    },
    'button:focus': {
      'box-shadow': '6px 9px 0 0 rgba(0, 0, 0, 0.1)',
    },
    'button:active': {
      'box-shadow': '6px 6px 0 0 rgba(0, 0, 0, 0.1)',
      transform: 'translateY(3px)',
    },
  };

  const framesHTML = Object.entries(hierarchy)
    .map(
      ([frameId, frameHierarchy]) => exportToHTMLRecursive({
        frames,
        frameId,
        frameHierarchy,
        globalStyle,
      })
    )
    .join('');

  return minify(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template</title>
        <style>
          ${styleObjectToCss(globalStyle)}
          ${customCss}
        </style>
        <script src="/script.js"></script>
      </head>
      <body>
        ${framesHTML}
        <script>
          document.querySelectorAll("input[type='range']").forEach(range => {
            const setBg = el => {
              const value = (el.value - el.min) / (el.max - el.min) * 100;
              el.style.background = (
                'linear-gradient(to right, var(--thumb-color) 0%, var(--thumb-color) ' +
                value + '%, var(--track-color) ' +
                value + '%, var(--track-color) 100%)'
              );
            }
            range.addEventListener('input', function() {
              setBg(this);
            });

            setBg(range);
          });
        </script>
      </body>
    </html>`,
    {
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    }
  );
};
