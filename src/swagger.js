const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'My API',
        description: 'temple API'
    },
    host: 'https://apiaquila.herokuapp.com/',
    schemes: ['http']
}
const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')
})
