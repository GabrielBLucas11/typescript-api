import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import mongooseService from "../../common/service/mongoose.service";
import shortid from "shortid";
import debug from "debug";
import { limits } from "argon2";

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: {type: String, select: false},
        firstName: String,
        lastName: String,
        permissionFlags: Number,
    }, { id: false});

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Created new instance of UserDao');
    }

    async AddUser(usersFields: CreateUserDto){
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...usersFields,
            permissionFlags: 1,
        });
        await user.save();
        return userId;
    }

    async getUserByEmail(email: String) {
        return this.User.findOne({ email: email }).exec();
    }

    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId }).exec();
    }

    async updateUserById(userId: String, usersFields: PatchUserDto | PutUserDto) {
        const existingUser = await this.User.findOneAndUpdate(
            { _id: userId},
            { $set: usersFields},
            { new: true}
        ).exec();

        return existingUser;
    }

    async removeUserById(userId: String) {
        return this.User.deleteOne({ _id: userId }).exec();
    }

    async getUserByEmailWithPassword(email: String) {
        return this.User.findOne({ email: email})
            .select('_id email permissionFlags +password')
            .exec();
    }
}

export default new UsersDao();