const axios = require('axios')
const _Emitter = require('raptor-pubsub');
module.exports = {
  onCreate () {
    this.state = {
      favorites: [],
      isEmptyString: false,
      searching: false,
      resultsList: null,
      resultsFull: null,
      doneSearching: false
    }
  },
  onMount () {
    this.subscribeTo(_Emitter)
      .on('handleFav', trackId => {
        const record = this.state.resultsList.find(x => String(x.trackId) === String(trackId))
        if (record) {
          const {favorites} = this.state
          favorites.unshift(record)
          return this.setState({
            favorites: favorites.concat([])
          })
        }
      })
  },
  onUpdate () {
    if (this.state.isEmptyString) {
      setTimeout(() => {
        this.setState({
          isEmptyString: false
        })
      }, 2000)
    }
  },
  handleSearch () {
    const keyword = $('#keyword').val()
    if (!keyword) {
      return this.setState({
        isEmptyString: true
      })
    }
    return this.exeSearch(keyword)
  },
  exeSearch (keyword) {
    this.setState({
      searching: true,
      resultsList: [],
      resultsFull: []
    })
    return axios.get(`https://itunes.apple.com/search?term=${keyword}`)
      .then(r => {
        if (r.data.hasOwnProperty('resultCount') && r.data.resultCount > 0) {
          const { results } = r.data;
          return this.setState({
            resultsList: results.slice(0, 10),
            resultsFull: results,
            searching: false,
            doneSearching: true
          })
        }
        return this.setState({
          searching: false,
          resultsList: [],
          resultsFull: [],
          doneSearching: true
        })
      }).catch(e => console.log(e))
  },
  loadMoreResults () {
    const { resultsFull } = this.state
    const resultsList = resultsFull.slice(0, 20)
    return this.setState({
      resultsList: resultsList.concat([])
    })
  }
}