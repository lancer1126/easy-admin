/**
 * 登录请求对象
 */
export interface LoginData {
  tenantId?: string;
  username?: string;
  password?: string;
  rememberMe?: boolean;
  socialCode?: string;
  socialState?: string;
  source?: string;
  code?: string;
  uuid?: string;
  clientId: string;
  grantType: string;
}

/**
 * 登录响应
 */
export interface LoginResult {
  access_token: string;
}

/**
 * 租户
 */
export interface TenantVO {
  companyName: string;
  domain: any;
  tenantId: string;
}

export interface TenantInfo {
  tenantEnabled: boolean;
  voList: TenantVO[];
}

/**
 * 验证码返回
 */
export interface VerifyCode {
  captchaEnabled: boolean;
  uuid?: string;
  img?: string;
}
