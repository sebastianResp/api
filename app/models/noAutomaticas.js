const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    station_id: {
        type: String
    },
    timestamp: {
        type: Number
    },
    TempOut: {
        type: Number
    },
    TempHi: {
        type: Number
    },
    TempLow: {
        type: Number
    },
    HumOut: {
        type: Number 
    },
    DewPt: {
        type: Number
    },
    WindSpeed: {
        type: Number
    },
    WindDir: {//
        type: String
    },
    WindRun: {
        type: Number
    },
    HiSpeed: {
        type: Number
    },
    HiDir: {
        type: String
    },
    WindChill: {
        type: Number
    },
    HeatIndex: {
        type: Number
    },
    THWIndex: {
        type: Number
    },
    THSWImdex: {
        type: Number
    },
    Bar: {
        type: Number
    },
    Rain: {
        type: Number
    },
    RainRate: {
        type: Number
    },
    SolarRad: {
        type: Number
    },
    SolarEnergy: {
        type: Number
    },
    HiSolarRad: {
        type: Number
    },
    Index: {
        type: Number
    },
    UVDose: {
        type: Number
    },
    UVUV: {
        type: Number
    },
    HiD_D: {
        type: Number
    },
    HeatD_D: {
        type: Number
    },
    CoolTemp: {
        type: Number
    },
    InHum: {
        type: Number
    },
    InDew: {
        type: Number
    },
    InHeat: {
        type: Number
    },
    InEMC: {
        type: Number
    },
    InDensity: {
        type: Number
    },
    InAirET: {
        type: Number
    },
    Samp: {
        type: Number
    },
    WindTx: {
        type: Number
    },
    WindRecept: {
        type: Number
    },
    ISSInt: {
        type: Number
    },
    temp_last: {
        type: Number
    },
}, {
    timestamps: false,
    versionKey: false
})


module.exports = mongoose.model('noautomaticas', UserScheme)
