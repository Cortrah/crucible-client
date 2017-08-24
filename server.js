import hapi from 'hapi';
import { graphqlHapi } from 'apollo-server-hapi';
const server = new hapi.Server();
const HOST = 'localhost';
const PORT = 3000;
server.connection({
    host: HOST,
    port: PORT,
});
server.register({
    register: graphqlHapi,
    options: {
        path: '/graphql',
        graphqlOptions: { schema: myGraphQLSchema },
    },
});
