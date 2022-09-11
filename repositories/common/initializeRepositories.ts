import { AuthRepository } from "../Auth.repository";
import repositoryProvider from "./repositoryProvider";
import { UsersRepository } from "../Users.repository";
import { VideosRepository } from "../Videos.repository";

export const initializeRepositories = () => {
    repositoryProvider.initialize({
        auth: new AuthRepository(),
        users: new UsersRepository(),
        videos: new VideosRepository(),
    });
}