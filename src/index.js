const express = require("express");
const axios = require("axios")
const app = express();
app.use(express.json());

const palavraChave = 60;

const funcoes = {
    ClienteParaClassificar: (cliente) => {
        cliente.status =
            cliente.idade >= palavraChave ?
            "prioritario" :
            "comum";
        console.log("Entrou no Cliente Para Classificar")
        axios.post("http://localhost:10000/eventos", {
            tipo: "ClienteClassificada",
            dados: {
                contador: cliente.contador,
                nome: cliente.nome,
                endereco: cliente.endereco,
                idade: cliente.idade,
                status: cliente.status,
                quantIngressos: cliente.quantIngressos
            }
        });
    },
};

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({ msg: "ok" });
});

app.listen(7000, () => console.log("Classificação. Porta 7000"));