import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import usersControllers from "./controllers/users.controllers";
import usersMiddleware from "./middleware/users.middleware";

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        // (we'll add the actual route configuration here next)
        this.app
            .route(`/users`)
            .get(usersControllers.listUsers)
            .post(
            usersMiddleware.validateRequiredUserBodyFields,
            usersMiddleware.validateSameEmailDoesntExist,
            usersControllers.createUser
            );
        
        this.app.param(`userId`, usersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(usersMiddleware.validateUserExists)
            .get(usersControllers.getUserById)
            .patch()
            .delete(usersControllers.removerUser);

        this.app.put(`/users/:userId`, [
            usersMiddleware.validateRequiredUserBodyFields,
            usersMiddleware.validateSameEmailBelongToSameUser,
            usersControllers.put,
        ]);

        this.app.patch(`/users/:userId`, [
            usersMiddleware.validatePatchEmail,
            usersControllers.patch,
        ]);
            return this.app;
    }
}

