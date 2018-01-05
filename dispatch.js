

module.exports = (app) => {
  app.use('/api/v1/work', require('./routes/work'))
}