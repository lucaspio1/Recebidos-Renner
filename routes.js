import express, { Router } from 'express';
import mongoose from 'mongoose';
import { join } from 'path';

const router = express.Router();

// Definir o esquema para os dados
const registroChegadaSchema = new mongoose.Schema({
    descricao: String,
    serialNumber: String,
    loja: String,
    datachegada: Date
});

// Criar um modelo com base no esquema
const RegistroChegada = mongoose.model('RegistroChegada', registroChegadaSchema);

// Rota para lidar com a submissão do formulário
router.post('/submit_registration', async (req, res) => {
    // Extrai os dados do formulário
    const { descricao, serialNumber, loja, datachegada } = req.body;

    try {
        // Inserir os dados no banco de dados
        await RegistroChegada.create({
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
    }
});

// Rota para buscar dados do banco e enviar para a página HTML
router.get('/data', async (req, res) => {
    try {
        const data = await RegistroChegada.find().sort({ datachegada: -1 }).limit(5);
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar os dados do MongoDB:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Rota para servir a página HTML que contém a tabela de dados
router.get('/recebidos', (req, res) => {
    const dataPath = join(process.cwd(), 'data.html');
    res.sendFile(dataPath);
});

export default router;
