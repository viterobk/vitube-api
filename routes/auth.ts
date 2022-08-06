import { Route } from "../core/Route";

export default [    
    new Route()
        .path('/login')
        .method('post')
        .useAuth(false)
        .argsConverter((req, res) => ({ req }))
        .handler((req) => {
            console.log('No-auth handler');
        })
        .build(),
]