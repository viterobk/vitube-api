const getUsers = (req, res, next) => {
    //TODO
    next();
}

const getUser = (req, res, next) => {
    //TODO
    next();
}

const putUser = (req, res, next) => {
    //TODO
    next();
}

const postUser = async (req, res, next) => {
    const { users } = req.context?.services;
    const userData = req.body;
    try {
        await users.addUser(userData);
        res.code(200).send('User added');
    } catch (e) {
        next(e);
    }
    next();
}

const deleteUser = async (req, res, next) => {
    const { users } = req.context.services;
    const { userId } = req.params;
    try {
        await users.deleteUser(userId);
        res.code(200).send('User deleted');
    } catch (e) {
        next(e);
    }
    next();
}

export default {
    getUsers,
    getUser,
    putUser,
    postUser,
    deleteUser,
}