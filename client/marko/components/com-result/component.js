const _Emitter = require('raptor-pubsub')
module.exports = {
  handleFav (ev, el) {
    const trackId = $(el).attr('data-trackId')
    return _Emitter.emit('handleFav', trackId)
  }
}