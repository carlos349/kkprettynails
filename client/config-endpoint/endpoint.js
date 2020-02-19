const server = 'localhost'
const portClient = '3389'
const endpointTarget = `http://${server}:4200`
const imgEndpoint = `${endpointTarget}/static/users/`


const endPoint =  { 
    imgEndpoint: imgEndpoint, 
    portClient:portClient, 
    endpointTarget:endpointTarget, 
    server:server 
}

module.exports = endPoint