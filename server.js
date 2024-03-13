import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve arquivos "public"
app.use(express.static(__dirname));

// Permite o parse de dados de formulário
app.use(express.urlencoded({ extended: true }));

// Importa as rotas definidas em routes.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
