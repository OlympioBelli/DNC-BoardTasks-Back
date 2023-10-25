const { default: mongoose } = require('mongoose');
const mongooseToSwagger = require('mongoose-to-swagger')
const swaggerAutogen = require("swagger-autogen")({
    openapi:'3.0.0',
    language: 'pt-BR'
})


const outputFile = './swagger_output.json'; //arquivo de saida do autogen
const endpointsFiles = ['../index.js', '../src/routes.js']; // arquivos das rotas/endpoints

let doc = {
    info: {
        version:"1.0.0",
        title:"API do BoardTask",
        description:"Documentação da API do BoardTask"
    },
    servers: [{
        url: "https://localhost:4000/",
        description:"Servidor localhost.",
    }, 
    {
        url: "https://boardtasks-back.versel.app/",
        description:"Servidor de Produção"
    }],

    consumes: ['application/json'],
    produces: ['application/json']

}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Documentação do Swagger foi gerada e se encontra no arquivo em:' + outputFile);
    if (process.env.NODE_ENV !='production'){
        require("../index.js");
    }
})