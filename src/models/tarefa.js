const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        posicao:{
            type:Number,
            required: 'é obrigatório!'
        },
        titulo:{
            type:String,
            required: 'é obrigatório!'
        },
        descricao:{
            type:String,
            default: '',
        },
        status:{
            type:String,
            required: 'é obrigatório!'
        },
        dataEntrega: {
            type:Date,
            default: null,
        },
        usuarioCriador: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Usuario',
            required: 'é obrigatório!'
        }
    },
    {
        timestamps: true
    }

)

//No usuariocriador, o ref está referenciado com a collection Usuario

const EsquemmaTarefa = mongoose.models.Tarefa || mongoose.model('Tarefa', esquema)
module.exports = EsquemmaTarefa;