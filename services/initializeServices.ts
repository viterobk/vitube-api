import { AuthorizationService } from "./Authorization.service"
import serviceProvider from "./serviceProvider"
import { UsersService } from "./Users.service";
import { VideosService } from "./Videos.service";

export const initializeServices = () => {
    serviceProvider.initialize({
        authorization: new AuthorizationService(),
        users: new UsersService,
        videos: new VideosService,
    })
}