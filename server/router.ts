import { Express } from 'express';
import bodyParser from 'body-parser';

import { administrator } from '../middleware/administrator';
import { authorization } from '../middleware/authorization';
import { context } from '../middleware/context';

import auth from '../routes/auth';
import users from '../routes/users';
import videos from '../routes/videos';

export const registerRoutes = (app: Express) => {
    app
    // auth
    .post('/auth/login', bodyParser.json(), context, auth.login)
    .post('/auth/confirm-email/:code', context, auth.confirmEmail)
    .post('/auth/logout', context, authorization, auth.logout)

    // users
    .get('/users', context, authorization, administrator, users.getUsers)
    .get('/users/:userid', context, authorization, users.getUser)
    .put('/users/:userid', bodyParser.json(), context, authorization, users.putUser)
    .post('/users', bodyParser.json(), context, users.postUser)
    .delete('/users/:userid', context, authorization, users.deleteUser)

    // videos
    .get('/videos/all', context, authorization, administrator, videos.getAllVideos)
    .get('/videos', context, authorization, videos.getVideos)
    .put('/videos/:videoid', bodyParser.json(), context, authorization, videos.putVideo)
    .post('/videos', bodyParser.json(), context, authorization, videos.postVideo)
    .delete('/videos/:videoid', context, authorization, videos.deleteVideo); 
}