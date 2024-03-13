import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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

// Define a função de conexão com o banco de dados
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lucaspioh:jPA3tDqNxbyqwtzl@cluster0.tlvz0ze.mongodb.net/TesteRecebimentoRenner?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexão MongoDB estabelecida com sucesso');
    // Inicie o servidor após a conexão bem-sucedida
    app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Encerre o processo em caso de erro de conexão
  }
};

// Chame a função de conexão com o banco de dados antes de definir as rotas
connectDB();

// Importa as rotas definidas em routes.js
app.use('/', routes);