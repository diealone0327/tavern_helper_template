export const Schema = z.object({
  世界: z.object({
    日期: z.coerce.number().prefault(1),
    天气: z.string().prefault('晴'),
    季节: z.string().prefault('春天'),
    地点: z.string().prefault('家中'),
    时辰: z.string().prefault('子时'),
  }).prefault({}),
  陈婷婷: z.object({
    好感度: z.coerce.number().prefault(0),
    欲望: z.coerce.number().prefault(0),
    沉沦: z.coerce.number().prefault(0),
    戒备: z.coerce.number().prefault(100),
    状态: z.string().prefault('正常'),
  }).prefault({}),
  财富: z.object({
    铜钱: z.coerce.number().prefault(500),
    银子: z.coerce.number().prefault(2),
    金子: z.coerce.number().prefault(1),
  }).prefault({}),
  任务: z.object({
    当前任务: z.string().prefault('第二天在同一个房间醒来'),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
