import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes.js';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve arquivos "public"
app.use(express.static(__dirname));

// Permite o parse de dados de formulário
app.use(express.urlencoded({ extended: true }));

// Conexão com o MongoDB usando Mongoose
mongoose.connect('mongodb+srv://lucaspioh:jPA3tDqNxbyqwtzl@cluster0.tlvz0ze.mongodb.net/TesteRecebimentoRenner?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Importa as rotas definidas em routes.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
