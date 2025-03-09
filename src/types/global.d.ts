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

  /**
   * 分页查询参数
   */
  declare interface PageQuery {
    pageNum: number;
    pageSize: number;
  }

  /**
   * 分页数据
   * T : 表单数据
   * D : 查询参数
   */
  declare interface PageData<T, D> {
    form: T;
    queryParams: D;
    rules: ElFormRules;
  }

  /**
   * 字典数据  数据配置
   */
  declare interface DictDataOption {
    label: string;
    value: string;
    elTagType?: ElTagType;
    elTagClass?: string;
  }
}

export {};
