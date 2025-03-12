import User from "../models/user.model";

export async function createUser(name: string, email: string, pass: string) {
    const result = await User.create({ name, email, password: pass });
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        password: result.password,
    };
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ email });
}

export async function getUserByID(userId: string) {
    return await User.findById(userId)
        .select("-password")
        .populate("videos")
        .exec();
}

export async function getAllUsers() {
    return await User.find({}).select("-password");
}
