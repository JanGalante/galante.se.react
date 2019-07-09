exports.handler = (event, context, callback) => {
  console.log(`Console log... Hola me llamo Lambda Paco`)
  return callback(null, {
    statusCode: 200,
    body: 'Hola me llamo Paco Lambda',
  })
}
