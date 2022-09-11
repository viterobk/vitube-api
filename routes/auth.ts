import { Route } from "./common";
import { all } from "./authStrategies";

export default [
    new Route()
        .path('/register')
        .method('post')
        .authStrategy(all)
        .argsConverter((req, res) => ({ req }))
        .handler((req, context) => {
            console.log('No-auth handler');
        })
        .build(),

    new Route()
        .path('/confirm-email/:code')
        .method('post')
        .authStrategy(all)
        .argsConverter((req, res) => { req.params })
        .handler((code, context) => {
            return 'TODO';
        })
        .build(),

    new Route()
        .path('/login')
        .method('post')
        .authStrategy(all)
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('No-auth handler');
        })
        .build(),

    new Route()
        .path('/logout')
        .method('post')
        .authStrategy(all)
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('No-auth handler');
        })
        .build(),
]