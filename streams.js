const { Collection } = require("discord.js");

const streams = new Collection()

module.exports.newStream = function(id, stream) {
    streams.set(id, stream)
}
    
module.exports.stopStream =  function(id) {
    streams.get(id).end();
    streams.delete(id);
}
