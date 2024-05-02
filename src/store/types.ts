export type UserType = {
  avatar?: string;
  username?: string;
  nickname?: string;
  roles?: Array<string>;
  verifyCode?: string;
  currentPage?: number;
  isRemembered?: boolean;
  loginDay?: number;
};
