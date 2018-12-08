if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTIONNNNN!!!');
  module.exports = require('./configureStore.prod');
}else {
  console.log('DEVELOPMENT!!!');
  module.exports = require('./configureStore.dev');
}
