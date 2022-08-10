import { Route } from "../core/Route";

export default [
    new Route()
        .path('/users')
        .method('get')
        .useAuth(true)
        .permission('admin')
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('Get users handler');
            return 'Here will be a list of users!';
        })
        .build(),
    
    new Route()
        .path('/users/:userid')
        .method('get')
        .useAuth(true)
        .permission('user')
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('Get user by ID handler');
        })
        .build(),

    new Route()
        .path('/users/:userid')
        .method('put')
        .useAuth(true)
        .permission('user')
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('Update user data handler');
        })
        .build(),

    new Route()
        .path('/users')
        .method('post')
        .useAuth(true)
        .permission('user')
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('Add user data handler');
        })
        .build(),
]