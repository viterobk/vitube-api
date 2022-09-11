import Service from "./common/Service";

export class UsersService extends Service {
    async getUsers(options) {
        const { users } = this.getRepositories();
        return await users.findAll();
    }

    async getUserById(userId: string) {
        const { users } = this.getRepositories();
        return await users.findById(userId);
    }

    async addUser(user) {
        const { users: usersRepository } = this.getRepositories();
        const { auth: authService } = this.getServices();
        const { login, password, name } = user;
        const authId = await authService.addUser(login, password);

        return await usersRepository.create({
            authId,
            email: login,
            name,
        });
    }

    async deleteUser(userid: string) {
        const { users } = this.getRepositories();

        return await users.delete(userid);
    }
}