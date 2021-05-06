import { User } from '../data/models'

export async function checkUserType(id, userType) {
    if (!id) return false;

    let user = await User.findOne({
        attributes: ['userType'],
        where: { id },
        raw: true
    });

    return user && user.userType === userType;
}