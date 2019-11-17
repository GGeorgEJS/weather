const request = require('request');

const forecast = (long, lang, callback) => {
    const url = `https://api.darksky.net/forecast/7703fb10344b2869aa875dd27d85a10b/${encodeURIComponent(long)},${encodeURIComponent(lang)}?lang=uk`;

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback(undefined, "internet no");
        } else if (body.error) {
            callback(undefined, "invalid coordinates");
        } else {
            callback({
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability
            });
        }
    })

}
module.exports = {
    forecast
}