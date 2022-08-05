import { Route } from "../core/Route";

export default [
    new Route()
        .path('/auth')
        .method('post')
        .useAuth(true)
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('Auth handler');
        })
        .build(),
    
    new Route()
        .path('/noauth')
        .method('post')
        .useAuth(false)
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('No-auth handler');
        })
        .build()
]