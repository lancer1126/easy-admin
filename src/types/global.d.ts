declare global {
  declare interface BaseEntity {
    createBy?: any;
    createDept?: any;
    createTime?: string;
    updateBy?: any;
    updateTime?: any;
  }

  interface LayoutSetting {
    topNav: boolean;
    tagsView: boolean;
    fixedHeader: boolean;
    sidebarLogo: boolean;
    dynamicTitle: boolean;
    sideTheme: string;
    theme: string;
  }

  /**
   * 界面字段隐藏属性
   */
  interface FieldOption {
    key: number;
    label: string;
    visible: boolean;
    children?: Array<FieldOption>;
  }

  /**
   * 侧边栏配置选项
   */
  interface SidebarOption {
    opened?: boolean;
    hide?: boolean;
    withoutAnimation?: boolean;
  }
}

export {};
