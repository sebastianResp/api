const { httpError } = require('../helpers/handleError')
const datoModel = require('../models/noAutomaticas')

//////// agrupar por hora / dia / mes 
const datosGroup = async (req, res) => {
    try {
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tiempo;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');
        var estaciones = station_ide.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = 0;
        var hora2 = (23 * 3600 + (59 * 60) + 0) * 1000;

        if (timedate1.getTime() > timedate2.getTime()) {
            var fechaResp = timedate1;
            timedate1 = timedate2;
            timedate2 = fechaResp;
        }

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;


        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            temp_hi: "$TempHi",
            temp_lo: "$TempLow",
            temp_avg: "$TempOut",

            hum_lo: "$HumOut",
            hum_hi: "$HumOut",
            hum_last: "$HumOut",

            rainfall_mm: "$Rain",

            solar_rad_hi: "$HiSolarRad",
            solar_rad_avg: "$SolarRad",

            wind_speed_hi: "$HiSpeed",
            wind_speed_avg: "$WindSpeed",

            uv_index_hi: "$UVUV",//
            valueToAvgUv: {
                $cond:
                {
                    if: { $eq: ["$UVUV", 0] },
                    then: null,
                    else: "$UVUV"
                }
            },

        };

        var muchasVariables = [];

        for (let index = 0; index < estaciones.length; index++) {
            muchasVariables.push({ lastation_id: { $eq: estaciones[index] } });
        }

        matche = {
            $and: [
                {
                    timestamp: {
                        $gte: fechaInicio,
                        $lte: fechaFinal
                    }
                },
                {
                    $or: muchasVariables
                }
            ]
        };


        var grupo = {
            _id: {},
            station_id: { $last: "$lastation_id" },
            count: { $sum: 1 },

            min_temp_lo: { $min: "$temp_lo" },
            avg_temp_avg: { $avg: "$temp_avg" },
            max_temp_hi: { $max: "$temp_hi" },

            min_hum_lo: { $min: "$hum_lo" },
            max_hum_hi: { $max: "$hum_hi" },
            last_hum: { $avg: "$hum_last" },

            avg_rainfall_mm: { $sum: "$rainfall_mm" },

            avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
            max_solar_rad_hi: { $max: "$solar_rad_hi" },


            avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
            max_wind_speed_hi: { $max: "$wind_speed_hi" },

            max_uv_index_hi: { $max: "$uv_index_hi" },
            avg_uv_index_avg: { $avg: "$valueToAvgUv" },

            timestamp: { $last: "$timestamp" },
            //timestampInicio: { $first: "$timestamp" },
            //fechaenletra: { $last: "$fechaFormato" },
            //fechaenletraInicio: { $first: "$fechaFormato" },

            hour: { $first: { "$hour": "$fechaFormato" } },
            day: { $first: { "$dayOfMonth": "$fechaFormato" } },
            month: { $first: { "$month": "$fechaFormato" } },
            year: { $first: { "$year": "$fechaFormato" } },


        };

        grupo._id = {};
        var sorto = {};

        if (tiempo == "year") {
            grupo._id = {
                month: { $month: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, month: 1 },
            }
        } else if (tiempo == "month" || tiempo == "week") {
            grupo._id = {
                day: { $dayOfMonth: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, day: 1 },
            }
        } else if (tiempo == "day") {
            grupo._id = {
                hour: { $hour: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, hour: 1 },
            }
        }
        grupo._id["station_id"] = "$lastation_id";

        var listAll = await datoModel.aggregate([
            {
                $project: proyecto
            },
            {
                $match: matche
            },
            {
                $group: grupo
            },
            sorto
        ]);

        res.send({ data: listAll })


    } catch (e) {
        httpError(res, e)
    }
}

//////// agrupar por hora / dia / mes 
const fechasInicioFin = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;

        var listAll = await datoModel.aggregate([
            {
                $project: {
                    lastation_id: "$station_id",
                    timestamp: "$timestamp",
                }
            },
            {
                $match: {
                    lastation_id: station_ide
                }
            },
            {
                $group: {
                    _id: null,
                    min: { $min: "$timestamp" },
                    max: { $max: "$timestamp" },
                }
            },
        ]);
        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}

//rangos rosa vientos
const multigroup = async (req, res) => {
    try {
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = 0;
        var hora2 = (23 * 3600 + (59 * 60) + 0) * 1000;

        if (timedate1.getTime() > timedate2.getTime()) {
            var fechaResp = timedate1;
            timedate1 = timedate2;
            timedate2 = fechaResp;
        }

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;

        var listAll = await datoModel.aggregate([
            {
                $project: {
                    range: {
                        $concat: [
                            { $cond: [{ $and: [{ $gte: ["$WindSpeed", 0] }, { $lt: ["$WindSpeed", 0.9] }] }, "0 - 0.9 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$WindSpeed", 0.9] }, { $lt: ["$WindSpeed", 1.8] }] }, "0.9 - 1.8 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$WindSpeed", 1.8] }, { $lt: ["$WindSpeed", 2.7] }] }, "1.8 - 2.7 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$WindSpeed", 2.7] }, { $lt: ["$WindSpeed", 3.6] }] }, "2.7 - 3.6 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$WindSpeed", 3.6] }, { $lt: ["$WindSpeed", 4.5] }] }, "3.6 - 4.5 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$WindSpeed", 4.5] }, { $lt: ["$WindSpeed", 8.9] }] }, "4.5 - 8.9 m/s", ""] },
                            { $cond: [{ $gte: ["$WindSpeed", 8.9] }, "> 8.9 m/s", ""] }
                        ]
                    },
                    WindDir: "$WindDir",
                    WindSpeed: "$WindSpeed",

                    timestamp: "$timestamp",
                    lastation_id: "$station_id",
                }
            },
            {
                $match: {
                    $and: [
                        {
                            timestamp: {
                                $gte: fechaInicio,
                                $lte: fechaFinal
                            }
                        },
                        { lastation_id: station_ide }
                    ]
                }
            },
            {
                $group: {
                    "_id": {
                        dir: "$WindDir",
                        speed: "$range",
                    },
                    count: { $sum: 1 },
                    speed: { $last: "$WindSpeed" },
                    rango: { $last: "$range" },
                    dir: { $last: "$WindDir" },
                },

            },
        ]);
        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}

//                  EL ultimo valor registrado de cada estacion
const getLastDatos = async (req, res) => {
    try {
        var estacion = req.params.station_id;
        const listAll = await datoModel.find(
            { station_id: { $eq: estacion } },
            {
                "_id": 0, "station_id": 1, "timestamp": 1,
                "TempOut": 1, "WindSpeed": 1, "SolarRad": 1,
                "HumOut": 1, "Rain": 1
            }
        ).sort({ timestamp: -1 }).limit(1);

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}


//                  calculos para grado dia de crecimiento
const datosGdc = async (req, res) => {
    try {
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tbase;
        var tiempo2 = req.params.tmax;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');
        var estaciones = station_ide.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = 0;
        var hora2 = (23 * 3600 + (59 * 60) + 0) * 1000;

        if (timedate1.getTime() > timedate2.getTime()) {
            var fechaResp = timedate1;
            timedate1 = timedate2;
            timedate2 = fechaResp;
        }

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;

        ////
        var numeroT = Number(tiempo);
        var numeroT2 = Number(tiempo2);
        var suma = { $add: ["$TempHi", "$TempLow"] };
        // var resta = { $subtract: ["$temp_hi", "$temp_lo"] };
        var division = { $divide: [suma, 2] };

        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            gdc: {
                $cond:
                {
                    if: { $and: [{ $gte: [division, numeroT] }, { $lt: [division, numeroT2] }] },
                    then: { $subtract: [division, numeroT] },
                    else: 0
                }
            },
        };

        var muchasVariables = [];
        for (let index = 0; index < estaciones.length; index++) {
            muchasVariables.push({ lastation_id: { $eq: estaciones[index] } });
        }

        matche = {
            $and: [
                {
                    timestamp: {
                        $gte: fechaInicio,
                        $lte: fechaFinal
                    }
                },
                {
                    $or: muchasVariables
                }
            ]
        };

        var grupo = {
            _id: {
                day: { $dayOfMonth: "$fechaFormato" },
                month: { $month: "$fechaFormato" },
                year: { $year: "$fechaFormato" },
            },
            station_id: { $last: "$lastation_id" },
            count: { $sum: 1 },
            gdc: { $sum: "$gdc" },
            timestamp: { $last: "$timestamp" },
        };

        var listAll = await datoModel.aggregate([
            {
                $project: proyecto
            },
            {
                $match: matche
            },
            {
                $group: grupo
            },
            {
                $sort: { timestamp: 1 },
            }
        ]);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

//                  calculos radiacion solar
const datosInsolacion = async (req, res) => {
    try {
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tiempo;

        var insolacion = Number(req.params.insolacion);

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');
        var estaciones = station_ide.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = 0;
        var hora2 = (23 * 3600 + (59 * 60) + 0) * 1000;

        if (timedate1.getTime() > timedate2.getTime()) {
            var fechaResp = timedate1;
            timedate1 = timedate2;
            timedate2 = fechaResp;
        }

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;

        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            solar_rad_avg: "$SolarRad",

            solar_rad_count: {
                $cond:
                {
                    if: { $eq: ["$SolarRad", 0] },
                    then: 0,
                    else: 1
                }
            },

            solar_rad_count200: {
                $cond:
                {
                    if: { $gte: ["$SolarRad", insolacion] },
                    then: 1,
                    else: 0
                }
            },
        };

        var muchasVariables = [];

        for (let index = 0; index < estaciones.length; index++) {
            muchasVariables.push({ lastation_id: { $eq: estaciones[index] } });
        }

        matche = {
            $and: [
                {
                    timestamp: {
                        $gte: fechaInicio,
                        $lte: fechaFinal
                    }
                },
                {
                    $or: muchasVariables
                }
            ]
        };

        var grupo = {
            _id: {},
            station_id: { $last: "$lastation_id" },
            count: { $sum: 1 },

            avg_solar_rad_avg: { $avg: "$solar_rad_avg" },

            contadorSolar: { $sum: "$solar_rad_avg" },
            contadorMayor: { $sum: "$solar_rad_count" },
            contadorMayor200: { $sum: "$solar_rad_count200" },

            timestamp: { $last: "$timestamp" },
            hour: { $first: { "$hour": "$fechaFormato" } },
            day: { $last: { "$dayOfMonth": "$fechaFormato" } },
            month: { $first: { "$month": "$fechaFormato" } },
            year: { $first: { "$year": "$fechaFormato" } },
        };

        grupo._id = {};
        var sorto = {};
        if (tiempo == "year") {
            grupo._id = {
                month: { $month: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, month: 1 },
            }
        } else if (tiempo == "month" || tiempo == "week") {
            grupo._id = {
                day: { $dayOfMonth: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, day: 1 },
            }
        } else if (tiempo == "day") {
            grupo._id = {
                hour: { $hour: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, hour: 1 },
            }
        }

        var listAll = await datoModel.aggregate([
            {
                $project: proyecto
            },
            {
                $match: matche
            },
            {
                $group: grupo
            },
            sorto
        ]);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}


//                  pa<ra el reporte
const datosReporte = async (req, res) => {
    try {
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tiempo;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');
        var estaciones = station_ide.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = 0;
        var hora2 = (23 * 3600 + (59 * 60) + 0) * 1000;

        if (timedate1.getTime() > timedate2.getTime()) {
            var fechaResp = timedate1;
            timedate1 = timedate2;
            timedate2 = fechaResp;
        }

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;


        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            temp_hi: "$TempHi",
            temp_lo: "$TempLow",
            temp_avg: "$TempOut",

            rainfall_mm: "$Rain",

            solar_rad_hi: "$SolarRad",

            wind_speed_hi: "$HiSpeed",
            wind_speed_avg: "$WindSpeed",

            uv_index_hi: "$UVUV",


            dew_point_last: "$DewPt",
            wet_bulb_last: "$DewPt",
            cooling_degree_days: "$CoolTemp",
            heating_degree_days: "$HeatD_D",
            bar_absolute: "$Bar",
            bar_hi: "$Bar",
        };

        var muchasVariables = [];

        for (let index = 0; index < estaciones.length; index++) {
            muchasVariables.push({ lastation_id: { $eq: estaciones[index] } });
        }

        matche = {
            $and: [
                {
                    timestamp: {
                        $gte: fechaInicio,
                        $lte: fechaFinal
                    }
                },
                {
                    $or: muchasVariables
                }
            ]
        };

        var grupo = {
            _id: {},
            station_id: { $last: "$lastation_id" },
            count: { $sum: 1 },

            min_temp_lo: { $min: "$temp_lo" },
            avg_temp_avg: { $avg: "$temp_avg" },
            max_temp_hi: { $max: "$temp_hi" },

            avg_rainfall_mm: { $sum: "$rainfall_mm" },

            max_solar_rad_hi: { $max: "$solar_rad_hi" },

            avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
            max_wind_speed_hi: { $max: "$wind_speed_hi" },

            max_uv_index_hi: { $max: "$uv_index_hi" },

            timestamp: { $last: "$timestamp" },
            hour: { $first: { "$hour": "$fechaFormato" } },
            day: { $first: { "$dayOfMonth": "$fechaFormato" } },
            month: { $first: { "$month": "$fechaFormato" } },
            year: { $first: { "$year": "$fechaFormato" } },

            avg_dew_point_last: { $avg: "$dew_point_last" },

            avg_wet_bulb_last: { $avg: "$wet_bulb_last" },

            sum_cooling_degree_days: { $sum: "$cooling_degree_days" },
            sum_heating_degree_days: { $sum: "$heating_degree_days" },

            max_bar_absolute: { $max: "$bar_absolute" },
            max_bar_hi: { $max: "$bar_hi" },
        };

        grupo._id = {};
        var sorto = {};
        if (tiempo == "year") {
            grupo._id = {
                month: { $month: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, month: 1 },
            }
        } else if (tiempo == "month" || tiempo == "week") {
            grupo._id = {
                day: { $dayOfMonth: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, day: 1 },
            }
        } else if (tiempo == "day") {
            grupo._id = {
                hour: { $hour: "$fechaFormato" },
            };
            sorto = {
                $sort: { station_id: 1, hour: 1 },
            }
        }
        grupo._id["station_id"] = "$lastation_id";

        var listAll = await datoModel.aggregate([
            {
                $project: proyecto
            },
            {
                $match: matche
            },
            {
                $group: grupo
            },
            sorto
        ]);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

/* //group by station_id  max timestamp
const getUltimoDatoTodas = async (req, res) => {
    try {
        //https://stackoverflow.com/questions/61910358/how-to-group-and-get-doc-with-max-date-for-each-unique-value-in-mongodb
        var listAll = await datoModel.aggregate([
            {
                $match: {
                    "timestamp": { "$gte": 1741323600 }
                }
            },
            {
                $group: {
                    _id: '$station_id',
                    doc: {
                        $max: {
                            timestamp: "$timestamp", station_id: "$station_id",
                            TempOut: "$TempOut", WindSpeed: "$WindSpeed",
                            SolarRad: "$SolarRad", HumOut: "$HumOut", Rain: "$Rain",
                        },
                    }
                }
            },
            {
                $replaceRoot: { newRoot: "$doc" }
            }
        ]);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

////////revisar si esta optimizado o solo hace x veces la consulta
const getLastEstacion = async (req, res) => {
    try {
        var estacion_ide = req.params.station_id

        const listAll = await datoModel.find(
            { station_id: { $eq: estacion_ide } },
            {
                "_id": 0,
                "station_id": 1, "TempOut": 1, "WindSpeed": 1,
                "SolarRad": 1, "HumOut": 1, "Rain": 1,
                'timestamp': 1,
            }
        ).sort({ timestamp: -1 }).limit(1);

        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
} */

module.exports = {
    datosGroup, fechasInicioFin, multigroup, getLastDatos, datosGdc, datosInsolacion, datosReporte,

}