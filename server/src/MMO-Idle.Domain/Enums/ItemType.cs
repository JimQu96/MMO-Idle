namespace MMOIdle.Domain.Enums;

/// <summary>
/// 表示游戏中物品的不同类型
/// </summary>
public enum ItemType
{
    /// <summary>
    /// 装备类型物品
    /// </summary>
    Equipment,
    /// <summary>
    /// 材料类型物品
    /// </summary>
    Material,
    /// <summary>
    /// 消耗品类型物品
    /// </summary>
    Consumable,
    /// <summary>
    /// 货币类型物品
    /// </summary>
    Currency,
    /// <summary>
    /// 其他类型物品
    /// </summary>
    Other
}