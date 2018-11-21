const axios = require('axios');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');

//Lunch Type
const LunchType = new GraphQLObjectType({
    name: 'Lunch',
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        lunch_year: {type: GraphQLString},
        lunch_date_local: {type: GraphQLString},
        lunch_success: {type: GraphQLBoolean},
        rocket: {type: RocketType}
    })
});

//Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString}
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        lunches: {
            type: new GraphQLList(LunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches/')
                .then(res => res.data);
            }
        },
        lunch: {
            type: LunchType,
            args: {
                flight_number: {type: GraphQLInt}
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data);
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/rockets/')
                .then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})