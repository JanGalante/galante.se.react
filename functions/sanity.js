exports.handler = (event, context, callback) => {
  console.log(`Console log... Hola me llamo Lambda Paco`)
  return callback(null, {
    statusCode: 400,
    body: 'Hola me llamo Lambda Paco',
  })
}
