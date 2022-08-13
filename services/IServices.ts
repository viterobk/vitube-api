import { AuthorizationService } from "./Authorization.service"
import { UsersService } from "./Users.service";
import { VideosService } from "./Videos.service";

export interface IServices {
    authorization: AuthorizationService;
    users: UsersService;
    videos: VideosService;
}