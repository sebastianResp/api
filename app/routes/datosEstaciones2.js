const express = require('express')
const router = express.Router()
const {
    createItem, getLastDate,
    datosGroup, fechasInicioFin, multigroup, getLastDatos, datosGdc, datosInsolacion, datosReporte, datosEva1, controlCalidadTemp,

    eliminar,

  //  getUltimoDatoTodas, getLastEstacion, datosUnDIa, getDatosDetalle, getBoletin,
   // prue, getPrecipitacion, getLastEstacionesIN, getTemp, getLastEstaciones, mongooseprueba,
} = require('../controllers/datosEstaciones2')


//crea para insertar                                consumirApi
router.post('/', createItem)
//ultimo timestamp de una estacion                  consumirApi
router.get('/last/:station_id', getLastDate)

////////////////////////////////////////
////////////////////////////////////////

// grupo por hora / dia / mes               
router.get('/group/:timestamp1/:timestamp2/:station_ide/:tiempo', datosGroup)

// min max fecha                            
router.get('/fechaIni/:station_ide', fechasInicioFin)

// para la rosa
router.get('/multi/:timestamp1/:timestamp2/:station_ide', multigroup)

//ultimos datos de una estacion                  
router.get('/ultimo/:station_id', getLastDatos)

router.get('/gdc/:timestamp1/:timestamp2/:station_ide/:tbase/:tmax', datosGdc)

router.get('/sol/:timestamp1/:timestamp2/:station_ide/:tiempo/:insolacion', datosInsolacion)

router.get('/reporte/:timestamp1/:timestamp2/:station_ide/:tiempo', datosReporte)

// eva1               
router.get('/eva1/:timestamp1/:timestamp2/:station_ide', datosEva1)

//control calidad
router.get('/cctemp/:timestamp1/:timestamp2/:station_ide/:var_mayor/:var_menor/:mayor/:menor', controlCalidadTemp)


router.get('/eliminar', eliminar)

/////////////////////
/////////////////////
///////////////////// 


// datos de todas
//router.get('/all', getUltimoDatoTodas)

/* 
//ultimo dato de cada estacionArray                 laravel
router.get('/allEstacion/:station_id/', getLastEstacion)
router.get('/dia/:timestamp1/:timestamp2/:station_ide', datosUnDIa)
router.get('/ultimos/', prue)
//DESCARTADO//datos estacion en periodo de una estacion         laravel
router.get('/datosDetalle/:timestamp1/:timestamp2/:station_ide', getDatosDetalle)
//DESCARTADO//precipitacion de una estacion en tiempo           laravel
router.get('/precipitacion/:timestamp1/:timestamp2/:station_ide', getPrecipitacion)
//DESCARTADO//datos para crear el boletin en tiempo             laravel
router.get('/boletin/:timestamp1/:timestamp2/:station_ide', getBoletin)
////prueba where find
router.get('/in', getLastEstacionesIN)
//DESCARTADO//Temp diaria de una estacion//
router.get('/temp/:timestamp1/:timestamp2/:station_ide', getTemp)
//DESCARTADO//uultimo dato de cada estacionArray//
router.get('/allEstaciones/:station_idArray/:station_nameArray', getLastEstaciones)
//Otraprueba where agregate
router.get('/agre/', mongooseprueba) */


module.exports = router 