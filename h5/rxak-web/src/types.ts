export interface InsuranceType {
    user_name: string;
    age: number;
    sex: "M" | "F";
    // 保险期间
    bao_xian_qi_jian: "终身" | "至80周岁";
    // 交费期间
    jiao_fei_qi_jian: 5 | 10 | 15 | 20 | 30;
    // 交费方式
    jiao_fei_fang_shi: "年交";
    // 身故保险金
    shen_gu_bao_xian_jin: "方式一" | "方式二";
    // 基本保险金额（基本保险金的规则：x >= 10000 && x % 10000 == 0）
    ji_ben_bao_xian_jin_e: number;
    [k: string]: any;
}
