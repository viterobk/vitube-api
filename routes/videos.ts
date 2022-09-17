const getAllVideos = (req, res, next) => {
    //TODO
    next();
}

const getVideos = (req, res, next) => {
    //TODO
    next();
}

const getVideo = (req, res, next) => {
    //TODO
    next();
}

const putVideo = (req, res, next) => {
    //TODO
    next();
}

const postVideo = async (req, res, next) => {
    const { users } = req.context?.services;
    const userData = req.body;
    await users.addUser(userData);
    next();
}

const deleteVideo = async (req, res, next) => {
    const { users } = req.context.services;
    const { userId } = req.params;
    await users.deleteUser(userId);
    next();
}

export default {
    getAllVideos,
    getVideos,
    getVideo,
    putVideo,
    postVideo,
    deleteVideo,
}