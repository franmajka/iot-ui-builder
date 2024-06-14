import { opendir, mkdir } from 'node:fs/promises'

export const readTemplates = async () => {
  const templates = []

  try {
    const templatesDir = await opendir('./templates');

    for await (const dirent of templatesDir) {
      templates.push(dirent.name);
    }
  } catch (e) {
    await mkdir('./templates');
  }

  return templates;
}

export const handleGetTemplates = async (_, res) => {
  const templateIds = await readTemplates();
  res.json(
    templateIds.map(id => ({
      preview: `${id}/preview.png`,
      id,
    })),
  );
}
