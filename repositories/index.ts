import { UsersRepository } from "./Users.repository";
import { VideosRepository } from "./Videos.repository";

export interface IRepositories {
    users: UsersRepository;
    videos: VideosRepository;
}

export const getRepositories = (): IRepositories => {
    return {
        users: new UsersRepository(),
        videos: new VideosRepository(),
    };
}