import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Defina o esquema para os dados
const registroChegadaSchema = new mongoose.Schema({
    descricao: String,
    serialNumber: String,
    loja: String,
    datachegada: Date
});

// Crie um modelo com base no esquema
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

// Rota para buscar os últimos registros do banco de dados
router.get('/last_registrations', async (req, res) => {
    try {
        const lastRegistrations = await RegistroChegada.find().sort({ datachegada: -1 }).limit(5);
        res.json(lastRegistrations);
    } catch (error) {
        console.error('Erro ao buscar os últimos registros do MongoDB:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

export default router;