import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes.js';
import { MongoClient } from 'mongodb';

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

// URL de conexão com seu banco de dados MongoDB
const url = 'mongodb+srv://lucaspioh:jPA3tDqNxbyqwtzl@cluster0.tlvz0ze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Nome do banco de dados
const dbName = 'TesteRecebimentoRenner';

async function startServer() {
  try {
    console.log('Conectando ao MongoDB...');
    const client = new MongoClient(url);
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso');

    // Inicia o servidor após a conexão ser estabelecida
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

// Inicia o servidor
startServer();

