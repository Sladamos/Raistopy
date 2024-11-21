const mongoose = require("mongoose");

const StopSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
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
            throw new Error(`ZTM API did not respond. Response status: ${response.status}`);
        }

        const data = await response.json();
        const [latestDate] = Object.keys(data).sort().reverse();
        const latestStopsData = data[latestDate]?.stops;

        const stops = latestStopsData.map(stop => ({
            id: stop.stopId.toString(),
            name: stop.stopName,
            description: stop.stopDesc,
            latitude: stop.stopLat,
            longitude: stop.stopLon,
            type: stop.type,
            zoneName: stop.zoneName,
            virtual: Boolean(stop.virtual),
            ticketZoneBorder: Boolean(stop.ticketZoneBorder),
            onDemand: Boolean(stop.onDemand)
        }));

        for (const stop of stops) {
            await Stop.findOneAndUpdate({ id: stop.id }, stop, { upsert: true });
        }

        console.log("Stops have been updated");
    } catch (error) {
        console.error("Unable to fetch data from ZTM reason: ", error);
    }
};

const Stop = mongoose.model("Stop", StopSchema);

module.exports = Stop
