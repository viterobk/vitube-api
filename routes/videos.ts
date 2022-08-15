import { Route } from "../core/Route";
import { user } from "./authStrategies";

export default [
    new Route()
        .method('get')
        .path('/videos')
        .authStrategy(user)
        .handler((_, context) => {
            
        })
        .build(),

    new Route()
        .method('get')
        .path('/videos/:videoid')
        .authStrategy(user)
        .handler((_, context) => {

        })
        .build(),

    new Route()
        .method('post')
        .path('/videos')
        .authStrategy(user)
        .handler((_, context) => {

        })
        .build(),
    
    new Route()
        .method('put')
        .path('/videos/:videoid')
        .authStrategy(user)
        .handler((_, context) => {

        })
        .build(),

    new Route()
        .method('delete')
        .path('/videos/:videoid')
        .authStrategy(user)
        .handler((_, context) => {

        })
        .build(),
];