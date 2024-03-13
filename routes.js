import express, { Router } from 'express';
import { MongoClient } from 'mongodb';
import { join } from 'path';

const router = express.Router();

// URL de conexão com seu banco de dados MongoDB
const url = 'mongodb+srv://lucaspioh:jPA3tDqNxbyqwtzl@cluster0.tlvz0ze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Nome do banco de dados
const dbName = 'TesteRecebimentoRenner';

// Rota para lidar com a submissão do formulário
router.post('/submit_registration', async (req, res) => {
  // Extrai os dados do formulário
  const { descricao, serialNumber, loja, datachegada } = req.body;

  // Conectar ao banco de dados MongoDB
  const client = new MongoClient(url);

router.get('/', (req, res) => {
    // Constrói o caminho absoluto para index.html
    const indexPath = join(__dirname, 'index.html');
    console.log("Caminho do arquivo index.html:", indexPath);
    
    // Envia o arquivo index.html
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error("Erro ao enviar o arquivo index.html:", err);
        res.status(err.status).end();
      } else {
        console.log("Arquivo index.html enviado com sucesso!");
      }
    });
  });
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('RegistroChegada');
    
    // Inserir os dados no banco de dados
    await collection.insertOne({
      descricao,
      serialNumber,
      loja,
      datachegada: new Date(datachegada)
    });

    console.log('Dados inseridos com sucesso no MongoDB');

    // Redirecionar o usuário para outra página, se necessário
    res.redirect('/index.html');
  } catch (error) {
    console.error('Erro ao inserir dados no MongoDB:', error);
    res.status(500).send('Erro interno do servidor');
  } finally {
    // Fechar a conexão com o cliente
    await client.close();
  }
});

// Rota para buscar dados do banco e enviar para a página HTML
router.get('/data', async (req, res) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('RegistroChegada');
        const data = await collection.find().toArray();

        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar os dados do MongoDB:', error);
        res.status(500).send('Erro interno do servidor');
    } finally {
        await client.close();
    }
});

// Rota para servir a página HTML que contém a tabela de dados
router.get('/recebidos', (req, res) => {
    const dataPath = join(process.cwd(), 'data.html');
    res.sendFile(dataPath);
});

export default router;
