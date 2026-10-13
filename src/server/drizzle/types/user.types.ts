export const UserType = {
  MASTER: "MASTER",
  USER: "USER",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

export const UserTypes = Object.values(UserType) as [UserType, ...UserType[]];
