import { Invites, UserInvitation, UserInvitationSettings } from '../data/models'

export async function isUserInvited(email, inviteCode) {
  let isInvited;
  if (inviteCode) {
    isInvited = await UserInvitation.findOne({
      attributes: ['id'],
      where: {
        email,
        inviteCode,
        status: "invited"
      }
    });
  } else {
    isInvited = await Invites.findOne({
      attributes: ['id'],
      where: {
        email,
        inviteStatus: "invited"
      }
    });
  }
  if (isInvited && isInvited.id) return true;
  else return false;
}

export async function changeInvitationStatus(email, registeredEmail, inviteCode) {
  if (inviteCode) {
    const invite = await UserInvitation.update({
      status: "joined",
      registeredEmail,
      registeredAt: new Date(),
      isUsed: true
    }, {
      where: {
        email,
        inviteCode,
        status: { $ne: 'cancelled' }
      }
    });
  } else {
    const invite = await Invites.update({
      inviteStatus: "completed",
      registeredEmail
    }, {
      where: {
        email
      }
    });
  }
}

export async function getMaxInviteCount() {
  const settings = await UserInvitationSettings.findOne({ attributes: ['maxInvites'] });
  if (settings && settings.maxInvites) return settings.maxInvites;
  else return 0;
}

export function getInviteCode() {
  let length = 8;
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}