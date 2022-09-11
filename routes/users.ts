import { Route } from "./common";
import { admin, user } from "./authStrategies";

export default [
    new Route()
        .path('/users')
        .method('get')
        .authStrategy(admin)
        .argsConverter((req, res) => req)
        .handler((req, context) => {
            console.log('Get users handler');
            return 'Here will be a list of users!';
        })
        .build(),
    
    new Route()
        .path('/users/:userid')
        .method('get')
        .authStrategy(user)
        .argsConverter((req, res) => req.params.userid)
        .handler((userId, context) => {
            console.log('Get user by ID handler');
        })
        .build(),

    new Route()
        .path('/users/:userid')
        .method('put')
        .authStrategy(user)
        .argsConverter((req, res) => req)
        .handler((req) => {
            console.log('Update user data handler');
        })
        .build(),

    new Route()
        .path('/users/:userid')
        .method('put')
        .authStrategy(user)
        .argsConverter((req, res) => req)
        .handler((req) => {
            console.log('Update user data handler');
        })
        .build(),

    new Route()
        .path('/users')
        .method('post')
        .authStrategy(user)
        .argsConverter((req, res) => req.body)
        .handler(async (userData, context) => {
            const { users } = context.services;
            await users.addUser(userData);
        })
        .build(),

    new Route()
        .path('/users/:userid')
        .method('delete')
        .authStrategy(user)
        .argsConverter((req, res) => req.params.userid as string)
        .handler(async (userid: string, context) => {
            const { users } = context.services;
            return await users.deleteUser(userid);
        })
        .build(),
]