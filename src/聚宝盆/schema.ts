export const Schema = z.object({
  主角: z.object({
     修为: z.enum(['炼气', '筑基', '金丹', '元婴', '化神', '炼虚', '合体', '大乘', '渡劫飞升']).prefault('炼气'),
     修为进度: z.coerce.number().prefault(1),
     灵根: z.string().prefault('废灵根(五行杂灵根)'),
    体质: z.string().prefault('无'),
    灵石: z.coerce.number().prefault(10),
    体质状态: z.string().prefault('正常'),
    穿着: z.string().prefault('一身洗得发白的粗布短打，脚穿草鞋'),
    随身法宝: z.string().prefault('无'),
  }).prefault({}),
  聚宝盆: z.object({
    今日已使用: z.coerce.boolean().prefault(false),
    已用次数: z.coerce.number().prefault(0),
    上次放置: z.string().prefault(''),
    孳生品级: z.string().prefault('凡器极品'),
  }).prefault({}),
  储物袋: z.object({
    物品清单: z.string().prefault('{"丹药":{},"法器":{},"材料":{},"符箓":{},"灵植":{},"杂物":{}}'),
    物品总览: z.string().prefault('空空如也'),
  }).prefault({}),
  关系: z.object({
    当前互动对象: z.string().prefault(''),
    当前角色好感度: z.coerce.number().prefault(0),
    当前角色关系标签: z.string().prefault('陌路'),
    当前角色修为: z.string().prefault(''),
    当前角色体质: z.string().prefault(''),
    当前角色状态描述: z.string().prefault(''),
   已结识角色: z.string().prefault('[]'),
   好感度概况: z.string().prefault('尚未与任何人建立深入关系'),
  }).prefault({}),
  任务: z.object({
    当前主线: z.string().prefault('熟悉聚宝盆'),
    当前支线: z.string().prefault(''),
    已完成任务: z.string().prefault('[]'),
  }).prefault({}),
  世界: z.object({
    天数: z.coerce.number().prefault(1),
    地点: z.string().prefault('青云宗·杂役院'),
    地区: z.string().prefault('东域'),
    事件标记: z.string().prefault(''),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
