const { httpError } = require('../helpers/handleError')
const datoModel = require('../models/prueba')


const selectPruebas = async (req, res) => {
    try {
        const listAll = await datoModel.find();

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const selectPruebaId = async (req, res) => {
    try {
        var id = req.params.id;
        const listAll = await datoModel.find({ _id: id });

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const createPrueba = async (req, res) => {
    try {
        var user = req.params.user;
        var password = req.params.pass;

        await datoModel.create({ user, password })

        const listAll = await datoModel.find();

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const update = async (req, res) => {
    try {
        var id = req.params.id;
        var user = req.params.user;
        var password = req.params.pass;

        await datoModel.updateOne({ _id: id }, {
            "$set": {
                "user": user,
                "password": password
            }
        });

        const listAll = await datoModel.find({ _id: id });

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const delet = async (req, res) => {
    try {
        var id = req.params.id;

        await datoModel.deleteOne({ _id: id });

        const listAll = await datoModel.find();

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}


//  localhost:3000/api/1.0/prueba
//  localhost:3000/api/1.0/prueba/id/664cf0b9b041a710d04c3c53
//  localhost:3000/api/1.0/prueba/crear/<jusujuario/jontraseja
//  localhost:3000/api/1.0/prueba/update/664cf0b9b041a710d04c3c53/us/pas
//  localhost:3000/api/1.0/prueba/delete/664cf0b9b041a710d04c3c53

module.exports = { selectPruebas, createPrueba, selectPruebaId, update, delet }