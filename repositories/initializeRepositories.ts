import repositoryProvider from "./repositoryProvider";
import { UsersRepository } from "./Users.repository";
import { VideosRepository } from "./Videos.repository";

export const initializeRepositories = () => {
    repositoryProvider.initialize({
        users: new UsersRepository(),
        videos: new VideosRepository(),
    });
}