import { Route } from "../core/Route";
import { all } from "./authStrategies";

export default [    
    new Route()
        .path('/login')
        .method('post')
        .authStrategy(all)
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('No-auth handler');
        })
        .build(),
]