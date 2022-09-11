import { AuthRepository } from "../Auth.repository";
import { UsersRepository } from "../Users.repository";
import { VideosRepository } from "../Videos.repository";

export interface IRepositories {
    auth: AuthRepository;
    users: UsersRepository;
    videos: VideosRepository;
}