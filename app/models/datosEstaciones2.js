const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    station_id: {
        type: String
    },
    date: {
        type: Date
    },
    /*  station_nombre: {
         type: String
     }, */
    timestamp: {
        type: Number
    },
    wind_speed_avg: {
        type: Number
    },
    /*  dew_point_hi_at: {
         type: Number
     }, */
    uv_dose: {
        type: Number
    },
    wind_chill_last: {
        type: Number
    },
    solar_rad_hi: {
        type: Number
    },
    /*  dew_point_lo_at: {
         type: Number
     },
     thsw_index_hi_at: {
         type: Number
     }, */
    dew_point_last: {
        type: Number
    },
    rain_size: {
        type: Number
    },
    thsw_index_lo: {
        type: Number
    },
    uv_index_hi: {
        type: Number
    },
    thsw_index_hi: {
        type: Number
    },
    /* thsw_index_lo_at: {
        type: Number
    },
    solar_rad_hi_at: {
        type: Number
    }, */
    heat_index_hi: {
        type: Number
    },
    //  arch_int: {
    //    type: Number
    //},
    //  good_packets_streak: {
    //    type: Number
    //},
    wind_run: {
        type: Number
    },
    /*  rain_rate_hi_at: {
         type: Number
     }, */
    // tx_id: {
    //   type: Number
    //},
    temp_hi: {
        type: Number
    },
    temp_lo: {
        type: Number
    },
    wind_dir_of_prevail: {//esta rosa
        type: Number
    },
    thw_index_last: {
        type: Number
    },
    rain_rate_hi_clicks: {
        type: Number
    },
    rainfall_in: {
        type: Number
    },
    /*  wind_chill_lo_at: {
         type: Number
     }, */
    rainfall_mm: {
        type: Number
    },
    wet_bulb_last: {
        type: Number
    },
    /*   rain_rate_hi_in: {
          type: Number
      }, */
    hum_lo: {
        type: Number
    },
    heat_index_last: {
        type: Number
    },
    hum_hi: {
        type: Number
    },
    /*  heat_index_hi_at: {
         type: Number
     }, */
    rain_rate_hi_mm: {
        type: Number
    },
    rainfall_clicks: {
        type: Number
    },
    /*  wet_bulb_hi_at: {
         type: Number
     }, */
    solar_rad_volt_last: {
        type: Number
    },
    wind_speed_hi: {
        type: Number
    },
    /*  temp_last: {
         type: Number
     }, */
    temp_avg: {
        type: Number
    },
    hum_last: {
        type: Number
    },
    wind_chill_lo: {
        type: Number
    },
    wet_bulb_hi: {
        type: Number
    },
    /*  wind_speed_hi_at: {
         type: Number
     }, */
    // reception: {
    //    type: Number
    //},
    /*  wet_bulb_lo_at: {
         type: Number
     }, */
    solar_rad_avg: {
        type: Number
    },
    //  afc: {
    //    type: Number
    //},
    cooling_degree_days: {
        type: Number
    },
    //  rssi: {
    //    type: Number 
    //},
    wet_bulb_lo: {
        type: Number
    },
    wind_speed_hi_dir: {
        type: Number
    },
    /*   temp_lo_at: {
          type: Number
      }, */
    dew_point_hi: {
        type: Number
    },
    thw_index_lo: {
        type: Number
    },
    /*  uv_index_hi_at: {
         type: Number
     }, */
    dew_point_lo: {
        type: Number
    },
    solar_energy: {
        type: Number
    },
    //  resynchs: {
    //    type: Number
    //},
    /*   temp_hi_at: {
          type: Number
      }, */
    thw_index_hi: {
        type: Number
    },
    /*  hum_lo_at: {
         type: Number
     },
     thw_index_lo_at: {
         type: Number
     },
     thw_index_hi_at: {
         type: Number
     }, */
    thsw_index_last: {
        type: Number
    },
    /*  hum_hi_at: {
         type: Number
     }, */
    uv_index_avg: {//
        type: Number
    },
    uv_volt_last: {
        type: Number
    },
    heating_degree_days: {
        type: Number
    },
    /*  temp_in_lo_at: {
         type: Number
     },
     temp_in_hi: {
         type: Number
     },
     temp_in_hi_at: {
         type: Number
     },
     hum_in_hi: {
         type: Number
     },
     temp_in_last: {
         type: Number
     },
     temp_in_lo: {
         type: Number
     },
     hum_in_lo: {
         type: Number
     },
     hum_in_last: {
         type: Number
     },
     dew_point_in: {
         type: Number
     },
     hum_in_lo_at: {
         type: Number
     },
     heat_index_in: {
         type: Number
     },
     hum_in_hi_at: {
         type: Number
     }, */
    bar_absolute: {
        type: Number
    },
    /*  bar_hi_at: {
         type: Number
     }, */
    bar_sea_level: {
        type: Number
    },
    bar_lo: {
        type: Number
    },
    bar_hi: {
        type: Number
    },
    /*   bar_lo_at: {
          type: Number
      } */
}, {
    timestamps: false,
    versionKey: false
})


module.exports = mongoose.model('datosestaciones5', UserScheme)
