const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const StopSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subName: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    zoneName: {
        type: String
    },
    virtual: {
        type: Boolean,
        default: false
    },
    ticketZoneBorder: {
        type: Boolean,
        default: false
    },
    onDemand: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

StopSchema.statics.syncStops = async function() {
    const ztmApiUrl = "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json";
    
    try {
        console.log("Downloading stops from ZTM")
        const response = await fetch(ztmApiUrl);
        if (!response.ok) {
            throw new AppError(`ZTM API did not respond. Response status: ${response.status}`);
        }

        const data = await response.json();
        const formattedToday = new Date().toISOString().split('T')[0];
        const latestStopsData = data[formattedToday]?.stops;

        const bulkOps = latestStopsData
        .filter(stop => stop.stopId) // Pomiń dane bez `stopId`
        .map(stop => {
            const updateFields = {
            name: stop.stopName || stop.stopDesc,
            subName: (isNaN(Number(stop.subName)) || Number(stop.subName) > 20) ? null : stop.subName,
            latitude: stop.stopLat,
            longitude: stop.stopLon,
            type: stop.type,
            zoneName: stop.zoneName,
            virtual: Boolean(stop.virtual),
            ticketZoneBorder: Boolean(stop.ticketZoneBorder),
            onDemand: Boolean(stop.onDemand),
            };
            return {
            updateOne: {
                filter: { _id: stop.stopId.toString() },
                update: { $set: updateFields },
                upsert: true,
            },
            };
        });
        if (bulkOps.length > 0) {
            await Stop.bulkWrite(bulkOps);
          }
        console.log("Stops have been updated");
    } catch (error) {
        console.error("Unable to fetch data from ZTM reason: ", error);
    }
};

const Stop = mongoose.model("Stop", StopSchema);

module.exports = Stop
