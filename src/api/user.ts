export type UserResult = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 昵称 */
  nickname: string;
  /** 当前登录用户的角色 */
  roles: Array<string>;
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date;
};

/** 登录 */
export const getLogin = (data?: object): Promise<CommonResult> => {
  return new Promise(resolve => {
    // 模拟异步操作
    setTimeout(() => {
      resolve({
        success: true,
        code: 200,
        data: {
          avatar: "https://avatars.githubusercontent.com/u/44761321",
          username: "admin",
          nickname: "lancer",
          roles: ["admin"],
          accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
          refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
          expires: "2030/10/30 00:00:00"
        }
      });
    }, 100);
  });
};
