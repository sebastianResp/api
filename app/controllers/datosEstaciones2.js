const { httpError } = require('../helpers/handleError')
const datoModel = require('../models/datosEstaciones2')

//                  consumirApi
const createItem = async (req, res) => {
    try {
        const {
            station_id,
            date,
            ////     station_nombre,
            timestamp,
            wind_speed_avg,
            ////     dew_point_hi_at,
            uv_dose,
            wind_chill_last,
            solar_rad_hi,
            ////    dew_point_lo_at,
            ////    thsw_index_hi_at,
            dew_point_last,
            rain_size,
            thsw_index_lo,
            uv_index_hi,
            thsw_index_hi,
            ////   thsw_index_lo_at,
            ////   solar_rad_hi_at,
            heat_index_hi,
            //  arch_int,
            //   good_packets_streak,
            wind_run,
            ////    rain_rate_hi_at,
            // tx_id,
            temp_hi,
            temp_lo,
            wind_dir_of_prevail,
            thw_index_last,
            rain_rate_hi_clicks,
            rainfall_in,
            ////     wind_chill_lo_at,
            rainfall_mm,
            wet_bulb_last,
            // rain_rate_hi_in,
            hum_lo,
            heat_index_last,
            hum_hi,
            ////   heat_index_hi_at,
            rain_rate_hi_mm,
            rainfall_clicks,
            ////     wet_bulb_hi_at,
            solar_rad_volt_last,
            wind_speed_hi,
            //  temp_last,
            temp_avg,
            hum_last,
            wind_chill_lo,
            wet_bulb_hi,
            ////   wind_speed_hi_at,
            //  reception,
            ////     wet_bulb_lo_at,
            solar_rad_avg,
            // afc,
            cooling_degree_days,
            //  rssi,
            wet_bulb_lo,
            wind_speed_hi_dir,
            ////    temp_lo_at,
            dew_point_hi,
            thw_index_lo,
            ////     uv_index_hi_at,
            dew_point_lo,
            solar_energy,
            //  resynchs,
            ////     temp_hi_at,
            thw_index_hi,
            ////    hum_lo_at,
            ////    thw_index_lo_at,
            ////    thw_index_hi_at,
            thsw_index_last,
            ////     hum_hi_at,
            uv_index_avg,
            uv_volt_last,
            heating_degree_days,//////////
            ////   temp_in_lo_at,
            /*  temp_in_hi,
             ////   temp_in_hi_at,
             hum_in_hi,
             temp_in_last,
             temp_in_lo,
             hum_in_lo,
             hum_in_last,
             dew_point_in,
             ////     hum_in_lo_at,
             heat_index_in,
             ////    hum_in_hi_at,/////// */
            bar_absolute,
            ////    bar_hi_at,
            bar_sea_level,
            bar_lo,
            bar_hi,
            ////   bar_lo_at
        } = req.body

        const resDetail = await datoModel.create({
            station_id,
            date,
            ////     station_nombre,
            timestamp,
            wind_speed_avg,
            ////     dew_point_hi_at,
            uv_dose,
            wind_chill_last,
            solar_rad_hi,
            ////    dew_point_lo_at,
            ////    thsw_index_hi_at,
            dew_point_last,
            rain_size,
            thsw_index_lo,
            uv_index_hi,
            thsw_index_hi,
            ////   thsw_index_lo_at,
            ////   solar_rad_hi_at,
            heat_index_hi,
            //  arch_int,
            //   good_packets_streak,
            wind_run,
            ////    rain_rate_hi_at,
            // tx_id,
            temp_hi,
            temp_lo,
            wind_dir_of_prevail,
            thw_index_last,
            rain_rate_hi_clicks,
            rainfall_in,
            ////     wind_chill_lo_at,
            rainfall_mm,
            wet_bulb_last,
            // rain_rate_hi_in,
            hum_lo,
            heat_index_last,
            hum_hi,
            ////   heat_index_hi_at,
            rain_rate_hi_mm,
            rainfall_clicks,
            ////     wet_bulb_hi_at,
            solar_rad_volt_last,
            wind_speed_hi,
            //  temp_last,
            temp_avg,
            hum_last,
            wind_chill_lo,
            wet_bulb_hi,
            ////   wind_speed_hi_at,
            //  reception,
            ////     wet_bulb_lo_at,
            solar_rad_avg,
            // afc,
            cooling_degree_days,
            //  rssi,
            wet_bulb_lo,
            wind_speed_hi_dir,
            ////    temp_lo_at,
            dew_point_hi,
            thw_index_lo,
            ////     uv_index_hi_at,
            dew_point_lo,
            solar_energy,
            //  resynchs,
            ////     temp_hi_at,
            thw_index_hi,
            ////    hum_lo_at,
            ////    thw_index_lo_at,
            ////    thw_index_hi_at,
            thsw_index_last,
            ////     hum_hi_at,
            uv_index_avg,
            uv_volt_last,
            heating_degree_days,//////////
            ////   temp_in_lo_at,
            /*  temp_in_hi,
             ////   temp_in_hi_at,
             hum_in_hi,
             temp_in_last,
             temp_in_lo,
             hum_in_lo,
             hum_in_last,
             dew_point_in,
             ////     hum_in_lo_at,
             heat_index_in,
             ////    hum_in_hi_at,/////// */
            bar_absolute,
            ////    bar_hi_at,
            bar_sea_level,
            bar_lo,
            bar_hi,
            ////   bar_lo_at
        })
        res.send({ data: resDetail })
    } catch (e) {
        httpError(res, e)
    }
}
//                  consumirApi
const getLastDate = async (req, res) => {
    //EL ultimo valor registrado de cada estacion
    try {
        var estacion = req.params.station_id;
        const listAll = await datoModel.find(
            { station_id: { $eq: estacion } },
            {
                "_id": 0, "station_id": 1, "timestamp": 1,
            }
        ).sort({ timestamp: -1 }).limit(1);

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function tiempoFechas(fecha1, fecha2) {
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
    //console.log(fechaInicio + "-" + fechaFinal);

    return [fechaInicio, fechaFinal];
}

//                  EL ultimo valor registrado de cada estacion
const getLastDatos = async (req, res) => {
    try {
        var estacion = req.params.station_id;
        const listAll = await datoModel.find(
            { station_id: { $eq: estacion } },
            {
                "_id": 0, "station_id": 1, "timestamp": 1,
                "temp_avg": 1, "wind_speed_avg": 1, "solar_rad_avg": 1,
                "hum_last": 1, "rainfall_mm": 1
            }
        ).sort({ timestamp: -1 }).limit(1);

        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

//                  agrupar hora / dia / mes 
const datosGroup = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;
        var estaciones = station_ide.split(':');
        var tiempo = req.params.tiempo;
        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);
        /*      var fecha1 = req.params.timestamp1;
             var fecha2 = req.params.timestamp2;
            
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
        var fechaFinal = (timedate2.getTime() + hora2) / 1000; */


        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            temp_hi: {
                $cond:
                {
                    if: { $ne: ["$temp_hi", NaN] },
                    then: "$temp_hi",
                    else: null
                }
            },
            temp_lo: {
                $cond:
                {
                    if: { $ne: ["$temp_lo", NaN] },
                    then: "$temp_lo",
                    else: null
                }
            },
            // temp_avg: "$temp_avg",
            temp_avg: {
                $cond:
                {
                    if: { $ne: ["$temp_avg", NaN] },
                    then: "$temp_avg",
                    else: null
                }
            },
            /*   count_temp_avg: {
                  $cond:
                  {
                      //   if: { $gte: ["$temp_avg", -1000000000000] },   //  if: { $isNumber: "$temp_avg" },
                      if: { $and: [{ $isNumber: "$temp_avg" }, { $ne: ["$temp_avg", null] }, { $ne: ["$temp_avg", NaN] }] },
                      then: 1,
                      else: 0
                  }
              }, */

            hum_lo: {
                $cond:
                {
                    if: { $ne: ["$hum_lo", NaN] },
                    then: "$hum_lo",
                    else: null
                }
            },
            hum_hi: {
                $cond:
                {
                    if: { $ne: ["$hum_hi", NaN] },
                    then: "$hum_hi",
                    else: null
                }
            },
            hum_last: {
                $cond:
                {
                    if: { $ne: ["$hum_last", NaN] },
                    then: "$hum_last",
                    else: null
                }
            },

            rainfall_mm: {
                $cond:
                {
                    if: { $ne: ["$rainfall_mm", NaN] },
                    then: "$rainfall_mm",
                    else: null
                }
            },

            solar_rad_hi: {
                $cond:
                {
                    if: { $ne: ["$solar_rad_hi", NaN] },
                    then: "$solar_rad_hi",
                    else: null
                }
            },
            solar_rad_avg: {
                $cond:
                {
                    if: { $ne: ["$solar_rad_avg", NaN] },
                    then: "$solar_rad_avg",
                    else: null
                }
            },

            /*   solar_rad_count: {
                   $cond:
                   {
                       if: { $eq: ["$solar_rad_avg", 0] },
                       then: 0,
                       else: 1
                   }
               },
   
               solar_rad_count200: {
                   $cond:
                   {
                       if: { $gte: ["$solar_rad_avg", 200] },
                       then: 1,
                       else: 0
                   }
               },
               solar_rad_count120: {
                   $cond:
                   {
                       if: { $gte: ["$solar_rad_avg", 120] },
                       then: 1,
                       else: 0
                   }
               },
                 solar_rad_avg: {
                    $cond:
                    {
                        if: { $eq: ["$solar_rad_avg", 0] },
                        then: null,
                        else: "$solar_rad_avg"
                    }
                }, */

            wind_speed_hi: {
                $cond:
                {
                    if: { $ne: ["$wind_speed_hi", NaN] },
                    then: "$wind_speed_hi",
                    else: null
                }
            },
            wind_speed_avg: {
                $cond:
                {
                    if: { $ne: ["$wind_speed_avg", NaN] },
                    then: "$wind_speed_avg",
                    else: null
                }
            },

            uv_index_hi: {
                $cond:
                {
                    if: { $ne: ["$uv_index_hi", NaN] },
                    then: "$uv_index_hi",
                    else: null
                }
            },
            // uv_index_avg: "$uv_index_avg",
            uv_index_avg: {
                $cond:
                {
                    if: { $and: [{ $eq: ["$uv_index_avg", 0] }, { $eq: ["$temp_avg", NaN] }] },
                    then: null,
                    else: "$uv_index_avg"
                }
            },


            /*  dew_point_last: "$dew_point_last",
             wet_bulb_last: "$wet_bulb_last",
             cooling_degree_days: "$cooling_degree_days",
             //   cooling_degree_days: { $multiply: ['$cooling_degree_days', 1/1, 66] },
             heating_degree_days: "$heating_degree_days",
             //  heating_degree_days: { $multiply: ['$heating_degree_days', 1/1, 66] },
             bar_absolute: "$bar_absolute",
             bar_hi: "$bar_hi", */

        };

        /*  var matche = {
             $and: [
                 {
                     timestamp: {
                         $gte: fechaInicio,
                         $lte: fechaFinal
                     }
                 },
                 { lastation_id: station_ide }
             ]
         }; */

        /*  matche = {
             $and: [
                 {
                     timestamp: {
                         $gte: fechaInicio,
                         $lte: fechaFinal
                     }
                 },
                 {
                     $and: [{
                         lastation_id: {
                             $eq: station_ide
                         }
                     }
                     ]
                 }
             ]
         }; */

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
                //hour: { $hour: "$fechaFormato" },
                // day: { $dayOfMonth: "$fechaFormato" },
                ///   month: { $month: "$fechaFormato" },
                //year: { $year: "$fechaFormato" },
            },
            station_id: { $last: "$lastation_id" },
            count: { $sum: 1 },
            // count_temp_avg: { $sum: "$count_temp_avg" },

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
            avg_uv_index_avg: { $avg: "$uv_index_avg" },

            timestamp: { $last: "$timestamp" },

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

//                  ultimos timestamps 
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

//                  rangos rosa vientos
const multigroup = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;
        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);

        /*     var fecha1 = req.params.timestamp1;
          var fecha2 = req.params.timestamp2;
        
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
          var fechaFinal = (timedate2.getTime() + hora2) / 1000; */

        var listAll = await datoModel.aggregate([
            {
                $project: {
                    range: {
                        $concat: [
                            { $cond: [{ $and: [{ $gte: ["$wind_speed_avg", 0] }, { $lt: ["$wind_speed_avg", 0.9] }] }, "0 - 0.9 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_speed_avg", 0.9] }, { $lt: ["$wind_speed_avg", 1.8] }] }, "0.9 - 1.8 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_speed_avg", 1.8] }, { $lt: ["$wind_speed_avg", 2.7] }] }, "1.8 - 2.7 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_speed_avg", 2.7] }, { $lt: ["$wind_speed_avg", 3.6] }] }, "2.7 - 3.6 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_speed_avg", 3.6] }, { $lt: ["$wind_speed_avg", 4.5] }] }, "3.6 - 4.5 m/s", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_speed_avg", 4.5] }, { $lt: ["$wind_speed_avg", 8.9] }] }, "4.5 - 8.9 m/s", ""] },
                            { $cond: [{ $gte: ["$wind_speed_avg", 8.9] }, "> 8.9 m/s", ""] }
                        ]
                    },
                    range2: {
                        $concat: [
                            { $cond: [{ $and: [{ $gt: ["$wind_dir_of_prevail", 0] }, { $lte: ["$wind_dir_of_prevail", 11.25] }] }, "N", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 11.25] }, { $lte: ["$wind_dir_of_prevail", 33.75] }] }, "NNE", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 33.75] }, { $lte: ["$wind_dir_of_prevail", 56.75] }] }, "NE", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 56.75] }, { $lte: ["$wind_dir_of_prevail", 78.75] }] }, "ENE", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 78.75] }, { $lte: ["$wind_dir_of_prevail", 101.25] }] }, "E", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 101.25] }, { $lte: ["$wind_dir_of_prevail", 123.75] }] }, "ESE", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 123.75] }, { $lte: ["$wind_dir_of_prevail", 146.25] }] }, "SE", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 146.25] }, { $lte: ["$wind_dir_of_prevail", 168.75] }] }, "SSE", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 168.75] }, { $lte: ["$wind_dir_of_prevail", 191.25] }] }, "S", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 191.25] }, { $lte: ["$wind_dir_of_prevail", 213.75] }] }, "SSO", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 213.75] }, { $lte: ["$wind_dir_of_prevail", 236.25] }] }, "SO", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 236.25] }, { $lte: ["$wind_dir_of_prevail", 258.75] }] }, "OSO", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 258.75] }, { $lte: ["$wind_dir_of_prevail", 281.25] }] }, "O", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 281.25] }, { $lte: ["$wind_dir_of_prevail", 303.75] }] }, "ONO", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 303.75] }, { $lte: ["$wind_dir_of_prevail", 326.25] }] }, "NO", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 326.25] }, { $lte: ["$wind_dir_of_prevail", 348.75] }] }, "NNO", ""] },
                            { $cond: [{ $and: [{ $gte: ["$wind_dir_of_prevail", 348.75] }, { $lte: ["$wind_dir_of_prevail", 360] }] }, "N", ""] },
                        ]
                    },
                    WindDir: "$wind_dir_of_prevail",
                    WindSpeed: "$wind_run",

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
                        dir: "$range2",
                        speed: "$range",
                        //   Y_DT: "$wind_run",
                        //     Z: "$Z"
                    },
                    count: { $sum: 1 },
                    speed: { $last: "$WindSpeed" },
                    rango: { $last: "$range" },
                    dir: { $last: "$range2" },
                    //   adj: {$sum: "$adj" },   
                    //   bjc: {$sum: "$bjc" },
                    //   jbc: {$sum: "$jbc" },
                    //  mnk: {$sum: "$mnk"}
                },

            },
            { $limit: 500 }
        ]);
        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}


//                  calculos para grado dia de crecimiento
const datosGdc = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tbase;
        var tiempo2 = req.params.tmax;
        var estaciones = station_ide.split(':');
        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);

        /*  var fecha1 = req.params.timestamp1;
         var fecha2 = req.params.timestamp2;
        
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
         var fechaFinal = (timedate2.getTime() + hora2) / 1000; */

        ////
        var numeroT = Number(tiempo);
        var numeroT2 = Number(tiempo2);
        var suma = { $add: ["$temp_hi", "$temp_lo"] };
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
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tiempo;
        var estaciones = station_ide.split(':');
        var insolacion = Number(req.params.insolacion);

        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);
        /*     var fecha1 = req.params.timestamp1;
            var fecha2 = req.params.timestamp2;    
        
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
            var fechaFinal = (timedate2.getTime() + hora2) / 1000; */

        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            solar_rad_avg: "$solar_rad_avg",

            solar_rad_count: {
                $cond:
                {
                    if: { $eq: ["$solar_rad_avg", 0] },
                    then: 0,
                    else: 1
                }
            },

            solar_rad_count200: {
                $cond:
                {
                    if: { $gte: ["$solar_rad_avg", insolacion] },
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
                // day: { $dayOfMonth: "$fechaFormato" },
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

//                  para el reporte
const datosReporte = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;
        var tiempo = req.params.tiempo;
        var estaciones = station_ide.split(':');
        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);
        /*   var fecha1 = req.params.timestamp1;
          var fecha2 = req.params.timestamp2;
         
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
          var fechaFinal = (timedate2.getTime() + hora2) / 1000; */


        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            temp_hi: "$temp_hi",
            temp_lo: "$temp_lo",
            temp_avg: "$temp_avg",

            rainfall_mm: "$rainfall_mm",

            solar_rad_hi: "$solar_rad_avg",

            wind_speed_hi: "$wind_speed_hi",
            wind_speed_avg: "$wind_speed_avg",

            uv_index_hi: "$uv_index_hi",


            dew_point_last: "$dew_point_last",
            wet_bulb_last: "$wet_bulb_last",
            cooling_degree_days: "$cooling_degree_days",
            heating_degree_days: "$heating_degree_days",
            bar_absolute: "$bar_absolute",
            bar_hi: "$bar_hi",
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

const datosEva1 = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;
        var estaciones = station_ide.split(':');
        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);

        /*    var fecha1 = req.params.timestamp1;
           var fecha2 = req.params.timestamp2;
         
           //  var tiempo = req.params.tiempo;
   
           //   var insolacion = Number(req.params.insolacion);
   
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
           var fechaFinal = (timedate2.getTime() + hora2) / 1000; */

        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            solar_rad_count100: {
                $cond:
                {
                    if: { $gte: ["$solar_rad_avg", 120] },
                    then: 1,
                    else: 0
                }
            },

            temp_avg: "$temp_avg",

            // hum_lo: "$hum_lo",
            // hum_hi: "$hum_hi",
            hum_last: "$hum_last",

            wind_speed_avg: "$wind_speed_avg",
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

            contadorMayor100: { $sum: "$solar_rad_count100" },

            avg_temp_avg: { $avg: "$temp_avg" },
            //   min_hum_lo: { $min: "$hum_lo" },
            //   max_hum_hi: { $max: "$hum_hi" },
            last_hum_avg: { $avg: "$hum_last" },
            avg_wind_speed_avg: { $avg: "$wind_speed_avg" },

            timestamp: { $last: "$timestamp" },
            hour: { $first: { "$hour": "$fechaFormato" } },
            day: { $last: { "$dayOfMonth": "$fechaFormato" } },
            month: { $first: { "$month": "$fechaFormato" } },
            year: { $first: { "$year": "$fechaFormato" } },
        };

        //  grupo._id = {};
        //   var sorto = {};
        /*   if (tiempo == "year") {
              grupo._id = {
                  month: { $month: "$fechaFormato" },
                   // day: { $dayOfMonth: "$fechaFormato" },
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
          } */

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
            //     sorto
        ]);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const controlCalidadTemp = async (req, res) => {
    try {
        var station_ide = req.params.station_ide;
        var estaciones = station_ide.split(':');

        var var_mayor = req.params.var_mayor;
        var_mayor = "$" + var_mayor;
        var var_menor = req.params.var_menor;
        var_menor = "$" + var_menor;
        var mayor = Number(req.params.mayor);
        var menor = Number(req.params.menor);

        const [fechaInicio, fechaFinal] = tiempoFechas(req.params.timestamp1, req.params.timestamp2);

        /*   var fecha1 = req.params.timestamp1;
          var fecha2 = req.params.timestamp2;
  
          //  var tiempo = req.params.tiempo;
          //   var insolacion = Number(req.params.insolacion);
  
          var f1 = fecha1.split('-');
          var f2 = fecha2.split('-');
  
  
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
          var fechaFinal = (timedate2.getTime() + hora2) / 1000; */

        var proyecto = {
            lastation_id: "$station_id",
            timestamp: "$timestamp",
            fechaFormato: {
                $toDate: {
                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                }
            },

            mayorNum: {
                $cond:
                {
                    if: { $gte: [var_mayor, mayor] },
                    then: 1,
                    else: 0
                }
            },

            menorNum: {
                $cond:
                {//$and: [ { $lte: [var_menor, menor] },  { $ne: [var_menor, null] }]         if: { $lte: [var_menor, menor] },
                    if: { $and: [{ $lte: [var_menor, menor] }, { $ne: [var_menor, null] }] },
                    then: 1,
                    else: 0
                }
            },

            contadorNum: {
                $cond:
                {
                    if: {
                        $and: [{ $ne: [var_menor, null] }, { $ne: [var_menor, NaN] }, { $ne: [var_mayor, null] }, { $ne: [var_mayor, NaN] }]
                    },
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
            count: { $sum: "$contadorNum" },

            contadorMayor: { $sum: "$mayorNum" },
            contadorMenor: { $sum: "$menorNum" },

            //   avg_temp_avg: { $avg: "$temp_avg" },
            //   min_hum_lo: { $min: "$hum_lo" },
            //   max_hum_hi: { $max: "$hum_hi" },
            //last_hum_avg: { $avg: "$hum_last" },
            // avg_wind_speed_avg: { $avg: "$wind_speed_avg" },

            // timestamp: { $last: "$timestamp" },
            //hour: { $first: { "$hour": "$fechaFormato" } },
            //day: { $last: { "$dayOfMonth": "$fechaFormato" } },
            //month: { $first: { "$month": "$fechaFormato" } },
            //year: { $first: { "$year": "$fechaFormato" } },
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
        ]);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}

const eliminar = async (req, res) => {
    try {
        const { deletedCount } = await datoModel.deleteMany({
            $and: [
                { timestamp: { $gte: 1546400160, $lte: 1752705360 } },
                { station_id: "0185547" }
            ]
        }).exec();

        res.send({ data: deletedCount + " - Logs" });
    } catch (e) {
        httpError(res, e)
    }
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//                  home cuadros/mapa
const getUltimoDatoTodas = async (req, res) => {
    try {
        //https://stackoverflow.com/questions/61910358/how-to-group-and-get-doc-with-max-date-for-each-unique-value-in-mongodb
        var listAll = await datoModel.aggregate([
            {
                $match:
                {
                    "timestamp": {
                        "$gte": 1737946700
                    }

                    /*   $and: [
                          {
                              "timestamp": {
                                  "$gte": 1737946700
                                  //   $lte: fechaFinal
                              }
                          },
                          {
                              $or: [
                                  { "station_id": { "$eq": "130937" } },
                                  { "station_id": { "$eq": "146659" } },
                                  { "station_id": { "$eq": "147222" } },
                                  { "station_id": { "$eq": "147228" } },
  
                                  { "station_id": { "$eq": "---" } },
                              ]
                          }
                      ] */
                }
            },
            {
                $group: {
                    _id: '$station_id',
                    //    _id: "",
                    //  'result': { $last: '$$ROOT' }
                    doc: {
                        $max: {
                            timestamp: "$timestamp", station_id: "$station_id",
                            temp_last: "$temp_last", wind_speed_avg: "$wind_speed_avg",
                            solar_rad_avg: "$solar_rad_avg", hum_last: "$hum_last", rainfall_mm: "$rainfall_mm",
                        },
                    } // max works on first field in object                  
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

//                  revisar si esta optimizado o solo hace x veces la consulta
const getLastEstacion = async (req, res) => {
    //EL ultimo valor registrado de la estacion enviada
    try {
        var estacion_ide = req.params.station_id

        const listAll = await datoModel.find(
            { station_id: { $eq: estacion_ide } },
            {
                "_id": 0, "station_id": 1,
                "temp_last": 1, "wind_speed_avg": 1, "solar_rad_avg": 1, "hum_last": 1, "rainfall_mm": 1,
                'timestamp': 1,
            }
        ).sort({ timestamp: -1 }).limit(1);
        res.send({ data: listAll })
    } catch (e) {
        httpError(res, e)
    }
}
//              
const datosUnDIa = async (req, res) => {
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
                    _id: 0,
                    lastation_id: "$station_id",
                    timestamp: "$timestamp",
                    fechaFormato: {
                        $toDate: {
                            $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                        }
                    },

                    cooling_degree_days: "$cooling_degree_days",
                    heating_degree_days: "$heating_degree_days",

                    bar_absolute: "$bar_absolute",
                    bar_hi: "$bar_hi",
                    bar_sea_level: "$bar_sea_level",
                    bar_lo: "$bar_lo",
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

        ]);

        res.send({ data: listAll })


    } catch (e) {
        httpError(res, e)
    }
}
/////
const prue = async (req, res) => {
    try {

        var $or = [
            { $and: [{ '$eq': ['$station_id', '130937'] }, { '$gte': ['$timestamp', 1733836200] }] },
            { $and: [{ '$eq': ['$station_id', '146659'] }, { '$gte': ['$timestamp', 1733836200] }] },
            { $and: [{ '$eq': ['$station_id', '147222'] }, { '$gte': ['$timestamp', 1733836200] }] },
            { $and: [{ '$eq': ['$station_id', '147228'] }, { '$gte': ['$timestamp', 1733836200] }] },
        ]
        // console.log($or);

        var listAll = await datoModel.aggregate([
            {
                $match: { $expr: { $or: $or } }
            },
            {
                $group: {
                    _id: "$station_id",
                    timestamp: { $last: "$timestamp" },
                    temp_last: { $last: "$temp_last" },
                    wind_speed_avg: { $last: "$wind_speed_avg" },
                    solar_rad_avg: { $last: "$solar_rad_avg" },
                    hum_last: { $last: "$hum_last" },
                    rainfall_mm: { $last: "$rainfall_mm" },
                    count: { $sum: 1 },
                }
            },

        ]);

        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}
/////// prueba   //https://mongoosejs.com/docs/guide.html
const getLastEstacionesIN = async (req, res) => {
    try {
        //  var estaciones_ide = req.params.station_idArray.split("-")
        // console.log(estaciones_ide)
        //  var estaciones_nombre = req.params.station_nameArray.split("-")

        const searchArray = [1669871700, 1669872300, 1669872300, 1669871400];
        const searchArray2 = ["130937", "146659", "147222", "147228", "0"];

        /*     console.log(searchArray)
  
            const orArray = searchArray.map((searchValue) => {
             return {
                 timestamp: searchValue,
             }
         });
  
  
          const orArray = estaciones_ide.map((searchValue) => {
              return {
                  station_id: searchValue,
              }
          });
  
          console.log(orArray) 
 
        //  estaciones_ide = estaciones_ide.map(userId => new mongoose.Types.ObjectId(userId));
        // const listAll = await datoModel.find({ station_id: { $in: estaciones_ide } })

    
        var listAll = await datoModel.aggregate([
            {
                $project: {
                    lastation_id: "$station_id",
                    timestamp: "$timestamp",


                    //  station_nombre: { $add: [54] },

                    temp_hi: "$temp_hi",
                    temp_lo: "$temp_lo",
                    temp_avg: "$temp_avg",

                    hum_lo: "$hum_lo",
                    hum_hi: "$hum_hi",

                    rainfall_mm: "$rainfall_mm",

                    solar_rad_hi: "$solar_rad_hi",
                    solar_rad_avg: "$solar_rad_avg",

                    wind_speed_hi: "$wind_speed_hi",
                    wind_speed_avg: "$wind_speed_avg",
                }
            },
            {
                $match: {
                    $or: orArray

                    //  station_id: { $in: estaciones_ide }
                    // station_id: mongoose.Types.ObjectId(estaciones_ide)
                }
            },
            { $limit: 50 }
        ]);
*/

        const listAll = await datoModel.find(

            {
                "_id": 0, "station_id": 1, "temp_last": 1, "wind_speed_avg": 1,
                "station_nombre": 1, "solar_rad_avg": 1, "hum_last": 1, "rainfall_mm": 1, 'timestamp': 1
            }
        ).where('station_id').in(searchArray2).sort({ timestamp: -1 });
        //  .where('timestamp').in(searchArray2)



        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}
// 
const getBoletin = async (req, res) => {
    //Valores para el boletin de una estacion en determinado tiempo
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

        const myarray = [];
        myarray.unshift(fechaFinal);
        myarray.unshift(fechaInicio);

        var listAll = await datoModel.aggregate([
            {
                $project: {
                    lastation_id: "$station_id",
                    timestamp: "$timestamp",
                    fechaFormato: {
                        $toDate: {
                            $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                        }
                    },

                    temp_hi: "$temp_hi",
                    temp_lo: "$temp_lo",
                    temp_avg: "$temp_avg",

                    hum_lo: "$hum_lo",
                    hum_hi: "$hum_hi",

                    rainfall_mm: "$rainfall_mm",

                    solar_rad_hi: "$solar_rad_hi",
                    solar_rad_avg: "$solar_rad_avg",

                    wind_speed_hi: "$wind_speed_hi",
                    wind_speed_avg: "$wind_speed_avg",

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
                $bucket: {
                    groupBy: "$timestamp",
                    boundaries: [
                        myarray[0], myarray[1]
                    ],
                    default: "Other",
                    output: {
                        // "count": { $sum: 1 },

                        min_temp_lo: { $min: "$temp_lo" },
                        avg_temp_lo: { $avg: "$temp_lo" },
                        avg_temp_avg: { $avg: "$temp_avg" },
                        avg_temp_hi: { $avg: "$temp_hi" },
                        max_temp_hi: { $max: "$temp_hi" },


                        min_hum_lo: { $min: "$hum_lo" },
                        avg_hum_lo: { $avg: "$hum_lo" },
                        avg_hum_hi: { $avg: "$hum_hi" },


                        avg_rainfall_mm: { $sum: "$rainfall_mm" },
                        max_rainfall_mm: { $max: "$rainfall_mm" },

                        avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
                        avg_solar_rad_hi: { $avg: "$solar_rad_hi" },
                        max_solar_rad_hi: { $max: "$solar_rad_hi" },


                        avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
                        avg_wind_speed_hi: { $avg: "$wind_speed_hi" },
                        max_wind_speed_hi: { $max: "$wind_speed_hi" },


                        timestamp: { $last: "$timestamp" },
                        //timestampInicio: { $first: "$timestamp" },
                        //fechaenletra: { $last: "$fechaFormato" },
                        //fechaenletraInicio: { $first: "$fechaFormato" },
                    }
                }
            }
        ]);

        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}
//
const getDatosDetalle = async (req, res) => {
    try {
        //Valores de una estacion en tiempos exactos
        //  console.log("::::::::");
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        /*  console.log(f1[0]);//año
            console.log(f1[1]);//mes
            console.log(f1[2]);//dia
            console.log(f1[3]);//hora
            console.log(f1[4]);//minuto  
        */

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = (f1[3] * 3600 + (f1[4] * 60) + 0) * 1000;
        var hora2 = (f2[3] * 3600 + (f2[4] * 60) + 0) * 1000;

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;

        if (fechaInicio > fechaFinal) {
            var fechaResp = fechaInicio;
            fechaInicio = fechaFinal;
            fechaFinal = fechaResp;

            var fResp = [];
            fResp = f1;
            f1 = f2;
            f2 = fResp;
        }
        //  console.log(fechaInicio);
        //console.log(fechaFinal);

        var diasDiferencia = (fechaFinal - fechaInicio) / 3600 / 24;

        // console.log("dias: " + diasDiferencia);

        var segundos = 10000000;//numero alto por el for

        var soloUnDia = false;

        if (diasDiferencia < 1) {
            segundos = 3600 * 1 / 2;
            soloUnDia = true;
            //fin a las 00 de ese dia
        } else if (diasDiferencia >= 1 && diasDiferencia < 2) {
            segundos = 3600 * 1 / 2;
        } else if (diasDiferencia >= 2 && diasDiferencia < 4) {
            segundos = 3600 * 1;
        } else if (diasDiferencia >= 4 && diasDiferencia < 8) {//
            segundos = 3600 * 2;
        } else if (diasDiferencia >= 8 && diasDiferencia < 15) {
            segundos = 3600 * 3;
        } else if (diasDiferencia >= 15 && diasDiferencia < 368) {
            segundos = 3600 * 24;
        }

        // console.log("segundos: " + segundos);
        //   console.log(typeof f1[4]);
        var esNumero = false;
        if (!isNaN(parseFloat(f2[4])) && isFinite(f2[4])) {
            esNumero = true;
        }

        var minuto = 0;
        var minutoParteEntera = 0;

        if (esNumero) {
            minuto = parseInt(f2[4], 10);
            //   console.log("minutos antes de validar: " + minuto);
            if (minuto > 9) {
                minuto = parseInt(f2[4].charAt(1), 10);
                minutoParteEntera = parseInt(f2[4].charAt(0), 10);
            }
        }

        if (minuto >= 1 && minuto <= 4) {
            minuto = 0;
            //    console.log("minutos: " + minuto);
        } else if (minuto >= 6 && minuto <= 9) {
            minuto = 5;
            // console.log("minutos: " + minuto);
        }

        var minutoStr = minutoParteEntera.toString() + "" + minuto.toString();
        minuto = parseInt(minutoStr, 10);
        //    console.log("minuto final: " + minuto);

        var dateFinal = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);
        var timedateFinal = new Date(dateFinal);
        var horaFinal = (f2[3] * 3600 + (minuto * 60) + 0) * 1000;
        var nuevaFechaFinal = (timedateFinal.getTime() + horaFinal) / 1000;

        var arrayTimestamps = [];

        if (soloUnDia) {
            fechaInicio = (timedateFinal.getTime() + 0) / 1000;
            //   console.log("dia final fecha " + fechaInicio)
        }

        while (nuevaFechaFinal + 300 >= fechaInicio) {
            arrayTimestamps.push(nuevaFechaFinal)
            nuevaFechaFinal = nuevaFechaFinal - segundos;
        }

        //  console.log(arrayTimestamps);

        const listAll = await datoModel.find(
            {},
            {
                "_id": 0, "station_id": 1, 'timestamp': 1, "station_nombre": 1,

                "temp_hi": 1, "temp_lo": 1, "temp_avg": 1,
                "hum_hi": 1, "hum_lo": 1,
                "rainfall_mm": 1,
                "solar_rad_hi": 1, "solar_rad_avg": 1,
                "wind_speed_avg": 1, "wind_speed_hi": 1,
            }
        ).where('station_id').in(station_ide)
            .where('timestamp').in(arrayTimestamps).sort({ timestamp: -1 });

        res.send({ data: listAll.reverse() })
        ////////
    } catch (e) {
        httpError(res, e)
    }
}
// 
const getPrecipitacion = async (req, res) => {
    //Valores de precipitacion de una estacion en determinado tiempo bucket
    try {
        const myarray = [];
        var vueltas = 25;

        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate1 = new Date(date1);
        var timedate2 = new Date(date2);

        var hora1 = (f1[3] * 3600 + (f1[4] * 60) + 0) * 1000;
        var hora2 = (f2[3] * 3600 + (f2[4] * 60) + 0) * 1000;

        var fechaInicio = (timedate1.getTime() + hora1) / 1000;
        var fechaFinal = (timedate2.getTime() + hora2) / 1000;

        if (fechaInicio > fechaFinal) {
            var fechaResp = fechaInicio;
            fechaInicio = fechaFinal;
            fechaFinal = fechaResp;

            var fResp = [];
            fResp = f1;
            f1 = f2;
            f2 = fResp;
        }

        var diasDiferencia = (fechaFinal - fechaInicio) / 3600 / 24;

        var segundos = 0;//numero alto por el for
        segundos = (fechaFinal - fechaInicio) / vueltas;

        if (diasDiferencia < 1) {
            segundos = 3600 * 1;
        }

        var fechaFinalRespaldo = fechaFinal;

        for (let i = 0; i <= vueltas; i++) {
            myarray.unshift(fechaFinalRespaldo);
            fechaFinalRespaldo = fechaFinalRespaldo - segundos;
            // console.log("fecha final:" + new Date(fechaFinalRespaldo * 1000))
        }
        // console.log(myarray);

        var listAll = await datoModel.aggregate([
            {
                $project: {
                    lastation_id: "$station_id",
                    timestamp: "$timestamp",
                    fechaFormato: {
                        $toDate: {
                            $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                        }
                    },

                    rainfall_mm: "$rainfall_mm",

                }
            },
            {
                $match: {
                    $and: [
                        {
                            timestamp: {
                                $gte: fechaInicio - (86400 + 3600),//por el other
                                $lte: fechaFinal
                            }
                        },
                        { lastation_id: station_ide }
                    ]
                }
            },
            {
                $bucket: {
                    groupBy: "$timestamp",
                    boundaries: [
                        myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                        myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                        myarray[10], myarray[11], myarray[12], myarray[13], myarray[14],
                        myarray[15], myarray[16], myarray[17], myarray[18], myarray[19],
                        myarray[20], myarray[21], myarray[22], myarray[23], myarray[24],
                        myarray[25]
                    ],
                    default: "Other",
                    output: {
                        "count": { $sum: 1 },
                        //lluvia
                        avg_rainfall_mm: { $sum: "$rainfall_mm" },
                        //
                        timestamp: { $last: "$timestamp" },
                        timestampInicio: { $first: "$timestamp" },
                        fechaenletra: { $last: "$fechaFormato" },
                        fechaenletraInicio: { $first: "$fechaFormato" },
                    }
                }
            }
        ]);

        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}
//
const getTemp = async (req, res) => {
    try {
        var fecha1 = req.params.timestamp1;
        var fecha2 = req.params.timestamp2;
        var station_ide = req.params.station_ide;

        var f1 = fecha1.split(':');
        var f2 = fecha2.split(':');

        var date1 = Date.parse(f1[0] + "/" + f1[1] + "/" + f1[2]);
        var date2 = Date.parse(f2[0] + "/" + f2[1] + "/" + f2[2]);

        var timedate = new Date(date1);
        var timedate2 = new Date(date2);
        var hora = (f1[3] * 3600 + (f1[4] * 60) + 60) * 1000;
        var dias = (timedate2.getTime() - timedate.getTime()) / 1000 / 3600 / 24;
        //    console.log("times1: " + timedate2.getTime() + " times2: " + timedate.getTime());
        var fechaInicio = (timedate.getTime() + hora) / 1000;

        var fechaf = (timedate2.getTime() + hora) / 1000;
        var fechaFin = fechaf;
        var salto = 0;

        // console.log("dias: " + dias)
        const myarray = [];
        //
        if (dias <= 0) {
            fechaInicio = fechaf - 3600 * 1 * 25;
            //   // console.log("fechaInicio: " + fechaInicio + "dias: " + dias);
            // console.log("fechaFin: " + fechaFin);
            //  console.log(fechaInicio);
            var vueltas = 25;
            salto = 3600 * 1;

            for (let i = 0; i <= vueltas; i++) {
                myarray.unshift(fechaf);

                fechaf = fechaf - salto;
                //console.log("fecha final:" + new Date(fechaf * 1000))
            }

            var listAll = await datoModel.aggregate([
                {
                    $project: {
                        lastation_id: "$station_id",
                        timestamp: "$timestamp",
                        fechaFormato: {
                            $toDate: {
                                $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                            }
                        },
                        temp_hi: "$temp_hi",
                        temp_lo: "$temp_lo",
                        temp_avg: "$temp_avg",

                        hum_lo: "$hum_lo",
                        hum_hi: "$hum_hi",

                        rainfall_mm: "$rainfall_mm",

                        solar_rad_hi: "$solar_rad_hi",
                        solar_rad_avg: "$solar_rad_avg",

                        wind_speed_hi: "$wind_speed_hi",
                        wind_speed_avg: "$wind_speed_avg",
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                timestamp: {
                                    $gte: fechaInicio,
                                    $lte: fechaFin
                                }
                            },
                            { lastation_id: station_ide }
                        ]
                    }
                },
                {
                    $bucket: {
                        groupBy: "$timestamp",
                        boundaries: [myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                        myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                        myarray[10], myarray[11], myarray[12], myarray[13], myarray[14],
                        myarray[15], myarray[16], myarray[17], myarray[18], myarray[19],
                        myarray[20], myarray[21], myarray[22], myarray[23], myarray[24], myarray[25]],
                        // boundaries: [0, 10, 20, 30],
                        default: "Other",
                        output: {
                            "count": { $sum: 1 },
                            avg_temp_hi: { $max: "$temp_hi" },
                            avg_temp_lo: { $min: "$temp_lo" },
                            avg_temp_avg: { $avg: "$temp_avg" },
                            //
                            avg_hum_hi: { $max: "$hum_hi" },
                            avg_hum_lo: { $min: "$hum_lo" },
                            //no hay avg hum  
                            //lluvia
                            avg_rainfall_mm: { $sum: "$rainfall_mm" },
                            //
                            avg_solar_rad_hi: { $max: "$solar_rad_hi" },
                            avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
                            //
                            avg_wind_speed_hi: { $max: "$wind_speed_hi" },
                            avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
                            //
                            timestamp: { $last: "$timestamp" },
                            timestampInicio: { $first: "$timestamp" },
                            fechaenletra: { $last: "$fechaFormato" },
                            fechaenletraInicio: { $first: "$fechaFormato" },
                        }
                    }
                }
            ]);

            res.send({ data: listAll })
        } else if (dias >= 1 && dias <= 7) {
            fechaInicio = fechaf - 3600 * 8 * 24;
            // console.log("fechaInicio: " + fechaInicio + "dias: " + dias);
            //  console.log("fechaFin: " + fechaFin);
            var vueltas = 7 * 3 + 1;
            salto = 3600 * (24 / 3);

            for (let i = 0; i <= vueltas; i++) {
                myarray.unshift(fechaf);
                //   console.log("fecha final:" + new Date(fechaf * 1000))
                fechaf = fechaf - salto;
                //  console.log("fechafinal:"+fechaf)
            }

            var listAll = await datoModel.aggregate([
                {
                    $project: {
                        lastation_id: "$station_id",
                        timestamp: "$timestamp",
                        fechaFormato: {
                            $toDate: {
                                $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                            }
                        },
                        temp_hi: "$temp_hi",
                        temp_lo: "$temp_lo",
                        temp_avg: "$temp_avg",

                        hum_lo: "$hum_lo",
                        hum_hi: "$hum_hi",

                        rainfall_mm: "$rainfall_mm",

                        solar_rad_hi: "$solar_rad_hi",
                        solar_rad_avg: "$solar_rad_avg",

                        wind_speed_hi: "$wind_speed_hi",
                        wind_speed_avg: "$wind_speed_avg",
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                timestamp: {
                                    $gte: fechaInicio,
                                    $lte: fechaFin
                                }
                            },
                            { lastation_id: station_ide }
                        ]
                    }
                },
                {
                    $bucket: {
                        groupBy: "$timestamp",
                        boundaries: [myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                        myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                        myarray[10], myarray[11], myarray[12], myarray[13], myarray[14],
                        myarray[15], myarray[16], myarray[17], myarray[18], myarray[19],
                        myarray[20], myarray[21], myarray[22]],
                        // boundaries: [0, 10, 20, 30],
                        default: "Other",
                        output: {
                            "count": { $sum: 1 },
                            avg_temp_hi: { $max: "$temp_hi" },
                            avg_temp_lo: { $min: "$temp_lo" },
                            avg_temp_avg: { $avg: "$temp_avg" },
                            //
                            avg_hum_hi: { $max: "$hum_hi" },
                            avg_hum_lo: { $min: "$hum_lo" },
                            //no hay avg hum  
                            //lluvia
                            avg_rainfall_mm: { $sum: "$rainfall_mm" },
                            //
                            avg_solar_rad_hi: { $max: "$solar_rad_hi" },
                            avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
                            //
                            avg_wind_speed_hi: { $max: "$wind_speed_hi" },
                            avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
                            //
                            timestamp: { $last: "$timestamp" },
                            timestampInicio: { $first: "$timestamp" },
                            fechaenletra: { $last: "$fechaFormato" },
                            fechaenletraInicio: { $first: "$fechaFormato" },
                        }
                    }
                }
            ]);

            res.send({ data: listAll })
        } else if (dias >= 8 && dias <= 31) {

            //  fechaInicio = fechaf - 3600 * 32 * 24;
            // // console.log("fechaInicio: " + fechaInicio + "dias: " + dias);
            //  console.log("fechaFin: " + fechaFin);
            dateTextoInicio = "";
            dateTextoFin = "";
            var vueltas = 0;
            if (f2[1] == 1 || f2[1] == 3 || f2[1] == 5 || f2[1] == 7 || f2[1] == 8 || f2[1] == 10 || f2[1] == 12) {
                dateTextoInicio += f2[0] + "/" + f2[1] + "/1";
                dateTextoFin += f2[0] + "/" + f2[1] + "/31";
                vueltas = 32;
            } else if (f2[1] == 4 || f2[1] == 6 || f2[1] == 9 || f2[1] == 11) {
                dateTextoInicio += f2[0] + "/" + f2[1] + "/1";
                dateTextoFin += f2[0] + "/" + f2[1] + "/30";
                vueltas = 31;
            } else {
                dateTextoInicio += f2[0] + "/" + f2[1] + "/1";
                dateTextoFin += f2[0] + "/" + f2[1] + "/28";
                vueltas = 29;
            }

            var dateInicio = Date.parse(dateTextoInicio);
            var dateFinal = Date.parse(dateTextoFin);
            var timesInicio = new Date(dateInicio);
            var timesFinal = new Date(dateFinal);

            var timestampInicio = timesInicio.getTime() / 1000;
            var timestampFinal = (timesFinal.getTime() / 1000) + (f2[3] * 3600 + (f2[4] * 60) + 60);

            // console.log(timestampInicio);
            //console.log(timestampFinal);

            salto = 3600 * 24 * 1;
            fechaf = timestampFinal;
            for (let i = 0; i <= vueltas; i++) {
                myarray.unshift(fechaf);
                fechaf = fechaf - salto;
            }


            if (f2[1] == 1 || f2[1] == 3 || f2[1] == 5 || f2[1] == 7 || f2[1] == 8 || f2[1] == 10 || f2[1] == 12) {
                var listAll = await datoModel.aggregate([
                    {
                        $project: {
                            lastation_id: "$station_id",
                            timestamp: "$timestamp",
                            fechaFormato: {
                                $toDate: {
                                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                                }
                            },
                            temp_hi: "$temp_hi",
                            temp_lo: "$temp_lo",
                            temp_avg: "$temp_avg",
                            hum_lo: "$hum_lo",
                            hum_hi: "$hum_hi",
                            rainfall_mm: "$rainfall_mm",
                            solar_rad_hi: "$solar_rad_hi",
                            solar_rad_avg: "$solar_rad_avg",
                            wind_speed_hi: "$wind_speed_hi",
                            wind_speed_avg: "$wind_speed_avg",
                        }
                    },
                    {
                        $match: {
                            $and: [
                                {
                                    timestamp: {
                                        $gte: timestampInicio,
                                        $lte: timestampFinal
                                    }
                                },
                                { lastation_id: station_ide }
                            ]
                        }
                    },
                    {
                        $bucket: {
                            groupBy: "$timestamp",
                            boundaries: [myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                            myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                            myarray[10], myarray[11], myarray[12], myarray[13], myarray[14],
                            myarray[15], myarray[16], myarray[17], myarray[18], myarray[19],
                            myarray[20], myarray[21], myarray[22], myarray[23], myarray[24],
                            myarray[25], myarray[26], myarray[27], myarray[28], myarray[29],
                            myarray[30], myarray[31], myarray[32]],
                            default: "Other",
                            output: {
                                "count": { $sum: 1 },
                                avg_temp_hi: { $max: "$temp_hi" },
                                avg_temp_lo: { $min: "$temp_lo" },
                                avg_temp_avg: { $avg: "$temp_avg" },
                                avg_hum_hi: { $max: "$hum_hi" },
                                avg_hum_lo: { $min: "$hum_lo" },
                                avg_rainfall_mm: { $sum: "$rainfall_mm" },
                                avg_solar_rad_hi: { $max: "$solar_rad_hi" },
                                avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
                                avg_wind_speed_hi: { $max: "$wind_speed_hi" },
                                avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
                                timestamp: { $last: "$timestamp" },
                                timestampInicio: { $first: "$timestamp" },
                                fechaenletra: { $last: "$fechaFormato" },
                                fechaenletraInicio: { $first: "$fechaFormato" },
                            }
                        }
                    }
                ]);
                res.send({ data: listAll })
            } else if (f2[1] == 4 || f2[1] == 6 || f2[1] == 9 || f2[1] == 11) {
                var listAll = await datoModel.aggregate([
                    {
                        $project: {
                            lastation_id: "$station_id",
                            timestamp: "$timestamp",
                            fechaFormato: {
                                $toDate: {
                                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                                }
                            },
                            temp_hi: "$temp_hi",
                            temp_lo: "$temp_lo",
                            temp_avg: "$temp_avg",
                            hum_lo: "$hum_lo",
                            hum_hi: "$hum_hi",
                            rainfall_mm: "$rainfall_mm",
                            solar_rad_hi: "$solar_rad_hi",
                            solar_rad_avg: "$solar_rad_avg",
                            wind_speed_hi: "$wind_speed_hi",
                            wind_speed_avg: "$wind_speed_avg",
                        }
                    },
                    {
                        $match: {
                            $and: [
                                {
                                    timestamp: {
                                        $gte: timestampInicio,
                                        $lte: timestampFinal
                                    }
                                },
                                { lastation_id: station_ide }
                            ]
                        }
                    },
                    {
                        $bucket: {
                            groupBy: "$timestamp",
                            boundaries: [myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                            myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                            myarray[10], myarray[11], myarray[12], myarray[13], myarray[14],
                            myarray[15], myarray[16], myarray[17], myarray[18], myarray[19],
                            myarray[20], myarray[21], myarray[22], myarray[23], myarray[24],
                            myarray[25], myarray[26], myarray[27], myarray[28], myarray[29],
                            myarray[30], myarray[31]],
                            default: "Other",
                            output: {
                                "count": { $sum: 1 },
                                avg_temp_hi: { $max: "$temp_hi" },
                                avg_temp_lo: { $min: "$temp_lo" },
                                avg_temp_avg: { $avg: "$temp_avg" },
                                avg_hum_hi: { $max: "$hum_hi" },
                                avg_hum_lo: { $min: "$hum_lo" },
                                avg_rainfall_mm: { $sum: "$rainfall_mm" },
                                avg_solar_rad_hi: { $max: "$solar_rad_hi" },
                                avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
                                avg_wind_speed_hi: { $max: "$wind_speed_hi" },
                                avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
                                timestamp: { $last: "$timestamp" },
                                timestampInicio: { $first: "$timestamp" },
                                fechaenletra: { $last: "$fechaFormato" },
                                fechaenletraInicio: { $first: "$fechaFormato" },
                            }
                        }
                    }
                ]);
                res.send({ data: listAll })
            } else {
                var listAll = await datoModel.aggregate([
                    {
                        $project: {
                            lastation_id: "$station_id",
                            timestamp: "$timestamp",
                            fechaFormato: {
                                $toDate: {
                                    $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                                }
                            },
                            temp_hi: "$temp_hi",
                            temp_lo: "$temp_lo",
                            temp_avg: "$temp_avg",
                            hum_lo: "$hum_lo",
                            hum_hi: "$hum_hi",
                            rainfall_mm: "$rainfall_mm",
                            solar_rad_hi: "$solar_rad_hi",
                            solar_rad_avg: "$solar_rad_avg",
                            wind_speed_hi: "$wind_speed_hi",
                            wind_speed_avg: "$wind_speed_avg",
                        }
                    },
                    {
                        $match: {
                            $and: [
                                {
                                    timestamp: {
                                        $gte: timestampInicio,
                                        $lte: timestampFinal
                                    }
                                },
                                { lastation_id: station_ide }
                            ]
                        }
                    },
                    {
                        $bucket: {
                            groupBy: "$timestamp",
                            boundaries: [myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                            myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                            myarray[10], myarray[11], myarray[12], myarray[13], myarray[14],
                            myarray[15], myarray[16], myarray[17], myarray[18], myarray[19],
                            myarray[20], myarray[21], myarray[22], myarray[23], myarray[24],
                            myarray[25], myarray[26], myarray[27], myarray[28], myarray[29]],
                            default: "Other",
                            output: {
                                "count": { $sum: 1 },
                                avg_temp_hi: { $max: "$temp_hi" },
                                avg_temp_lo: { $min: "$temp_lo" },
                                avg_temp_avg: { $avg: "$temp_avg" },

                                avg_hum_hi: { $max: "$hum_hi" },
                                avg_hum_lo: { $min: "$hum_lo" },

                                avg_rainfall_mm: { $sum: "$rainfall_mm" },

                                avg_solar_rad_hi: { $max: "$solar_rad_hi" },
                                avg_solar_rad_avg: { $avg: "$solar_rad_avg" },

                                avg_wind_speed_hi: { $max: "$wind_speed_hi" },
                                avg_wind_speed_avg: { $avg: "$wind_speed_avg" },

                                timestamp: { $last: "$timestamp" },
                                timestampInicio: { $first: "$timestamp" },
                                fechaenletra: { $last: "$fechaFormato" },
                                fechaenletraInicio: { $first: "$fechaFormato" },
                            }
                        }
                    }
                ]);
                res.send({ data: listAll })
            }

        } else {
            fechaInicio = fechaf - 3600 * 365 * 24;
            //  // // console.log("fechaInicio: " + fechaInicio + "dias: " + dias);
            //console.log("fechaFin: " + fechaFin);
            var vueltas = 12;
            var yearFinal = f2[0];
            var monthFinal = f2[1] - 1;
            //  var mesesArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



            for (let i = 0; i < vueltas; i++) {
                // var fechaTextoFinal = yearFinal + "-" + (monthFinal + 1) + "-" + mesesArray[monthFinal];
                var fechaTextoInicial = yearFinal + "-" + (monthFinal + 1) + "-1";

                //var fechaDateFinal = new Date(fechaTextoFinal);
                var fechaDateInicial = new Date(fechaTextoInicial);

                //var fechaTimestampFinal = Math.round((fechaDateFinal.getTime() / 1000) + 18000 + 86100);
                var fechaTimestampInicial = Math.round((fechaDateInicial.getTime() / 1000));
                //console.log("timestamp fin: " + new Date(fechaTimestampFinal * 1000));
                ////    console.log("timestamp inicio: " + new Date(fechaTimestampInicial * 1000));
                ////  console.log("");
                //myarray.unshift(fechaTimestampFinal);
                myarray.unshift(fechaTimestampInicial);

                if (monthFinal <= 0) {
                    monthFinal = 11;
                    yearFinal = yearFinal - 1;
                }
                monthFinal--;
            }


            var listAll = await datoModel.aggregate([
                {
                    $project: {
                        lastation_id: "$station_id",
                        timestamp: "$timestamp",
                        fechaFormato: {
                            $toDate: {
                                $subtract: [{ $multiply: ["$timestamp", 1000] }, 18000000]
                            }
                        },
                        temp_hi: "$temp_hi",
                        temp_lo: "$temp_lo",
                        temp_avg: "$temp_avg",

                        hum_lo: "$hum_lo",
                        hum_hi: "$hum_hi",

                        rainfall_mm: "$rainfall_mm",

                        solar_rad_hi: "$solar_rad_hi",
                        solar_rad_avg: "$solar_rad_avg",

                        wind_speed_hi: "$wind_speed_hi",
                        wind_speed_avg: "$wind_speed_avg",
                    }
                },
                {
                    $match: {
                        $and: [
                            {
                                timestamp: {
                                    $gte: fechaInicio,
                                    $lte: fechaFin
                                }
                            },
                            { lastation_id: station_ide }
                        ]
                    }
                },
                {
                    $bucket: {
                        groupBy: "$timestamp",
                        boundaries: [myarray[0], myarray[1], myarray[2], myarray[3], myarray[4],
                        myarray[5], myarray[6], myarray[7], myarray[8], myarray[9],
                        myarray[10], myarray[11]],
                        // boundaries: [0, 10, 20, 30],
                        default: "Other",
                        output: {
                            "count": { $sum: 1 },
                            avg_temp_hi: { $max: "$temp_hi" },
                            avg_temp_lo: { $min: "$temp_lo" },
                            avg_temp_avg: { $avg: "$temp_avg" },
                            //
                            avg_hum_hi: { $max: "$hum_hi" },
                            avg_hum_lo: { $min: "$hum_lo" },
                            //no hay avg hum  
                            //lluvia
                            avg_rainfall_mm: { $sum: "$rainfall_mm" },
                            //
                            avg_solar_rad_hi: { $max: "$solar_rad_hi" },
                            avg_solar_rad_avg: { $avg: "$solar_rad_avg" },
                            //
                            avg_wind_speed_hi: { $max: "$wind_speed_hi" },
                            avg_wind_speed_avg: { $avg: "$wind_speed_avg" },
                            //
                            timestamp: { $last: "$timestamp" },
                            timestampInicio: { $first: "$timestamp" },
                            fechaenletra: { $last: "$fechaFormato" },
                            fechaenletraInicio: { $first: "$fechaFormato" },
                        }
                    }
                }
            ]);

            res.send({ data: listAll })
        }

    } catch (e) {
        httpError(res, e)
    }
}
///
const getLastEstaciones = async (req, res) => {
    //EL ultimo valor registrado de cada estacion enviada
    try {
        var estaciones_ide = req.params.station_idArray.split("-")

        var estaciones_nombre = req.params.station_nameArray.split("-")


        // Con concat, que guarda todo junto
        listSend = [];
        for (let i = 0; i < estaciones_ide.length; i++) {
            const listAll = await datoModel.find(
                { station_id: { $eq: estaciones_ide[i] } },
                {
                    "_id": 0, "station_id": 1, "temp_last": 1, "wind_speed_avg": 1,
                    "station_nombre": 1, "solar_rad_avg": 1, "hum_last": 1, "rainfall_mm": 1, 'timestamp': 1
                }
            ).sort({ timestamp: -1 }).limit(1);

            if (listAll.length > 0) {
                for (let j = 0; j < listAll.length; j++) {
                    listAll[j].station_nombre = estaciones_nombre[i]
                }
                const listResp = listSend
                listSend = listResp.concat(listAll)
            }
        }
        res.send({ data: listSend })
    } catch (e) {
        httpError(res, e)
    }
}
//Otra prueba
const mongooseprueba = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        // const ObjectId = mongoose.Types.ObjectId;
        // const ids = ['6631bc2d46ca9ff44c47008f', '6631bc2d46ca9ff44c470091'].map(id => ObjectId(id));
        const ids = [1669871748, 1669871700];

        // const pipeline = [{ $match: { _id: { $in: ids } } }];
        const pipeline = [{ $match: { timestamp: { $in: ids } } }];

        //  datoModel.aggregate(pipeline, (err, docs) => console.log({ err, docs }));
        var listAll = await datoModel.aggregate(pipeline);
        res.send({ data: listAll })

    } catch (e) {
        httpError(res, e)
    }
}


module.exports = {
    createItem, getLastDate,
    datosGroup, fechasInicioFin, multigroup, getLastDatos, datosGdc, datosInsolacion, datosReporte, datosEva1, controlCalidadTemp,

    eliminar,

    // getUltimoDatoTodas, getLastEstacion, datosUnDIa, getDatosDetalle, getBoletin,
    //prue, getPrecipitacion, getLastEstacionesIN, getTemp, getLastEstaciones, mongooseprueba,
}