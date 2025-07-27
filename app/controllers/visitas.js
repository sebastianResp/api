const { httpError } = require('../helpers/handleError')
const datoModel = require('../models/visitas')


const createVisita = async (req, res) => {
    try {
        /*   const {
               timestamp
           } = req.body*/
        var timestamp = (Date.now() / 1000).toFixed();

        await datoModel.create({
            timestamp
        })

        const resDetail =await datoModel.count();

        res.send({ data: resDetail })
    } catch (e) {
        httpError(res, e)
    }
}




module.exports = { createVisita}