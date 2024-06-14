import express from 'express';
import cors from 'cors';
import { handleSave } from './handle-save.js';
import { handleGetTemplate } from './handle-get-template.js';
import { handleGetTemplates } from './handle-get-templates.js';

const app = express()
  .use(express.json())
  .use(cors())
  .use(express.static('templates'))
  .use(express.static('public'));
const port = 3000

app.post('/:templateId', handleSave);

app.get('/', handleGetTemplates);
app.get('/:id', handleGetTemplate);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
