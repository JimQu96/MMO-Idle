namespace MMOIdle.Domain.Enums;

public enum ItemCategory
{
    /// <summary>
    /// 货币类型物品
    /// </summary>
    Currency = 0,
    /// <summary>
    /// 矿石类型物品
    /// </summary>
    Ore,
    /// <summary>
    /// 镐子类型物品，通常用于挖掘等操作
    /// </summary>
    Pickaxe,
    /// <summary>
    /// 锤子类型物品，可用于锻造、敲击等
    /// </summary>
    Hammer,
    /// <summary>
    /// 单手剑类型武器，可作为单手使用的近战武器
    /// </summary>
    OneHandedSword,
    /// <summary>
    /// 盾牌类型物品，用于防御
    /// </summary>
    Shield,
    /// <summary>
    /// 头部装备类型，如头盔
    /// </summary>
    Head,
    /// <summary>
    /// 肩部装备类型，如肩甲
    /// </summary>
    Shoulder,
    /// <summary>
    /// 胸部装备类型，如胸甲
    /// </summary>
    Chest,
    /// <summary>
    /// 腕部装备类型，如护腕
    /// </summary>
    Wrist,
    /// <summary>
    /// 腰部装备类型，如腰带
    /// </summary>
    Waist,
    /// <summary>
    /// 手部装备类型，如手套
    /// </summary>
    Hands,
    /// <summary>
    /// 腿部装备类型，如护腿
    /// </summary>
    Legs,
    /// <summary>
    /// 脚部装备类型，如靴子
    /// </summary>
    Feet
}