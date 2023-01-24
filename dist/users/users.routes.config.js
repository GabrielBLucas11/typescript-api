"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controllers_1 = __importDefault(require("./controllers/users.controllers"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        // (we'll add the actual route configuration here next)
        this.app
            .route(`/users`)
            .get(users_controllers_1.default.listUsers)
            .post(users_middleware_1.default.validateRequiredUserBodyFields, users_middleware_1.default.validateSameEmailDoesntExist, users_controllers_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controllers_1.default.getUserById)
            .patch()
            .delete(users_controllers_1.default.removerUser);
        this.app.put(`/users/:userId`, [
            users_middleware_1.default.validateRequiredUserBodyFields,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controllers_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            users_middleware_1.default.validatePatchEmail,
            users_controllers_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBRXBFLHdGQUErRDtBQUMvRCxxRkFBNEQ7QUFFNUQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNYLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQUMsMkJBQWdCLENBQUMsU0FBUyxDQUFDO2FBQy9CLElBQUksQ0FDTCwwQkFBZSxDQUFDLDhCQUE4QixFQUM5QywwQkFBZSxDQUFDLDRCQUE0QixFQUM1QywyQkFBZ0IsQ0FBQyxVQUFVLENBQzFCLENBQUM7UUFFTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNILEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQUMsMEJBQWUsQ0FBQyxrQkFBa0IsQ0FBQzthQUN2QyxHQUFHLENBQUMsMkJBQWdCLENBQUMsV0FBVyxDQUFDO2FBQ2pDLEtBQUssRUFBRTthQUNQLE1BQU0sQ0FBQywyQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQiwwQkFBZSxDQUFDLDhCQUE4QjtZQUM5QywwQkFBZSxDQUFDLGlDQUFpQztZQUNqRCwyQkFBZ0IsQ0FBQyxHQUFHO1NBQ3ZCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLDBCQUFlLENBQUMsa0JBQWtCO1lBQ2xDLDJCQUFnQixDQUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBQ0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQXBDRCxrQ0FvQ0MifQ==