export const replaceDynamicVariables = (text, { braces = ['{{', '}}'] } = {}) => {
  const [open, close] = braces;
  const regex = new RegExp(`${open}(?<type>\\w+?)-(?<pin>\\w+?)${close}`, 'g');
  return text.replace(regex, (match, ...args) => {
    const groups = args.pop();
    return `<span data-source="output" data-type="${groups.type}" data-pin="${groups.pin}">${match}</span>`;
  });
}
