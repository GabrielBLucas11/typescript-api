import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import usersControllers from "./controllers/users.controllers";
import usersMiddleware from "./middleware/users.middleware";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from 'express-validator';

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
                body('email').isEmail(),
                body('password')
                    .isLength({ min: 5 })
                    .withMessage('Must include password (5+ characters)'),
                bodyValidationMiddleware.verifiBodyFieldsErrors,
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
            body('email').isEmail(),
            body('password')
                    .isLength({ min: 5 })
                    .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            bodyValidationMiddleware.verifiBodyFieldsErrors,
            usersMiddleware.validateSameEmailBelongToSameUser,
            usersControllers.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password')
                    .isLength({ min: 5 })
                    .withMessage('Must include password (5+ characters)')
                    .optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional,
            body('permissionFlags').isInt().optional(),
            bodyValidationMiddleware.verifiBodyFieldsErrors,
            usersMiddleware.validatePatchEmail,
            usersControllers.patch,
        ]);
            return this.app;
    }
}

