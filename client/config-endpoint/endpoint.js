const server = 'localhost'
const imgEndpoint = `http://${server}:4200/static/users/`
const portClient = '3389'
const endpointTarget = `http://${server}:4200'`
const endPoint =  { 
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    endpointTarget:endpointTarget, 
    server:server 
}

module.exports = endPoint