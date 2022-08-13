import Service from "./Service";

export class UsersService extends Service {
    getUsers(options) {
        const { users: usersRepo } = this.getRepositories();
        return usersRepo.findAll(options)
    }
}