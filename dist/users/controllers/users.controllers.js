"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// we import our newly created user services
const users_service_1 = __importDefault(require("../services/users.service"));
// we import the argon2 library for password hashing
const argon2_1 = __importDefault(require("argon2"));
// we use debug with a custom context as described in Part 1
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class UsersController {
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield users_service_1.default.list(100, 0);
            res.status(200).send(users);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById(req.body.id);
            res.status(200).send(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            const userId = yield users_service_1.default.create(req.body);
            res.status(201).send({ id: userId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.password) {
                req.body.password = yield argon2_1.default.hash(req.body.password);
            }
            log(yield users_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            log(yield users_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    removerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield users_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi91c2Vycy9jb250cm9sbGVycy91c2Vycy5jb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLDRDQUE0QztBQUM1Qyw4RUFBcUQ7QUFFckQsb0RBQW9EO0FBQ3BELG9EQUE0QjtBQUU1Qiw0REFBNEQ7QUFDNUQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzNELE1BQU0sZUFBZTtJQUNYLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN2RCxNQUFNLEtBQUssR0FBRyxNQUFNLHVCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUUsR0FBb0IsRUFBRSxHQUFxQjs7WUFDMUQsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekQsTUFBTSxNQUFNLEdBQUcsTUFBTSx1QkFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDbkQsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsR0FBRyxDQUFDLE1BQU0sdUJBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFSyxHQUFHLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxNQUFNLHVCQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3pELEdBQUcsQ0FBQyxNQUFNLHVCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9