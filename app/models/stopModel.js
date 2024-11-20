const StopModel = (() => {

    const ztmApiUrl = "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json";

    let stops = null;

    const findAll = async () => {
        try {
            if (stops == null) {
                stops = await fetchStopData(ztmApiUrl);
            }
            return stops;
        } catch (error) {
            throw new Error("Pobieranie danych z ztm się wybombiło!: ", error);
        }
    };

    return {
        findAll
    };
})();

async function fetchStopData(ztmApiUrl) {
    const response = await fetch(ztmApiUrl);
    if (!response.ok) {
        throw new Error(`ZTM api did not respond. Response status: ${response.status}`);
    }

    const data = await response.json();
    const [latestDate] = Object.keys(data).sort().reverse();
    const latestStopsData = data[latestDate]?.stops;
    stops = latestStopsData.map(stop => ({
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

    return stops;
}

module.exports = StopModel;