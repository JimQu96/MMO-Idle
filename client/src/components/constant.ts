export const commonList=[
  {
    name:'灰色',
    level:'Lv.01'
  },{
    name:'白银',
    level:'Lv.10'
  },{
    name:'翠绿',
    level:'Lv.20'
  },{
    name:'蔚蓝',
    level:'Lv.30'
  },{
    name:'深紫',
    level:'Lv.40'
  },{
    name:'绯红',
    level:'Lv.50'
  },{
    name:'粉甜',
    level:'Lv.60'
  },{
    name:'彩虹',
    level:'Lv.70'
  }
]
export const menuCardMap={
  '采矿':{
    cardList:commonList
  },
  '锻造':{
    subMenu:[
      {
        key: '1',
        title: '工具',
        children: [
          {
            key: '1-1',
            title: '镐子',
            cardList: commonList
          },
          {
            key: '1-2',
            title: '小刀',
            cardList: commonList
          },
        ],
      },
      {
        key: '2',
        title: '武器',
        children: [
          {
            key: '2-1',
            title: '单手剑',
            cardList: commonList
          },
          {
            key: '2-2',
            title: '盾牌',
            cardList: commonList
          },
        ],
      },
      {
        key: '3',
        title: '板甲',
        children: [
          {
            key: '3-1',
            title: '头盔',
            cardList: commonList
          },
          {
            key: '3-2',
            title: '肩甲',
            cardList: commonList
          },
          {
            key: '3-3',
            title: '胸甲',
            cardList: commonList
          },
          {
            key: '3-4',
            title: '护腕',
            cardList: commonList
          },
          {
            key: '3-5',
            title: '腰带',
            cardList: commonList
          },
          {
            key: '3-6',
            title: '护手',
            cardList: commonList
          },
          {
            key: '3-7',
            title: '腿甲',
            cardList: commonList
          },
          {
            key: '3-8',
            title: '靴子',
            cardList: commonList
          },
        ],
      },
    ]
  }
}
export const userInfo={
  name:'毛里趴',
  mine:{
    level:'LV.10',
  },
  forge:{
    level:'LV.8',
  }
}