const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGlrZXIiLCJhIjoiY2sydW1peTVzMTF6YjNicHZmN3Nuejh5NCJ9.LnGKc_RNvJ6XdsUi3JTsbg&limit=1`;
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback(undefined, "No internet")
        } else if (!body.features.length) {
            callback(undefined, "no such location");
        } else {
            callback({
                long: body.features[0].center[0],
                lang: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geoCode
}