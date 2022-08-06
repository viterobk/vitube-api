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
        .path('/users')
        .method('put')
        .useAuth(true)
        .permission('user')
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('Update user data handler');
        })
        .build(),
]