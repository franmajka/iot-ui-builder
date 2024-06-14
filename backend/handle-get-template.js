import { readFile } from 'node:fs/promises';

export const readTemplate = async (id) => {
  const templatesPath = `./templates/${id}/template.json`;

  try {
    const template = await readFile(templatesPath, 'utf-8');
    return JSON.parse(template);
  } catch (error) {
    return {};
  }
}

export const handleGetTemplate = async (req, res) => {
  const { id } = req.params;
  const template = await readTemplate(id);
  res.json(template);
}
