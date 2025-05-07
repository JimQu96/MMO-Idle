export const mineList=[
  {
    name:'灰色矿石',
    level:'Lv.01'
  },{
    name:'白银矿石',
    level:'Lv.10'
  },{
    name:'翠绿矿石',
    level:'Lv.20'
  },{
    name:'蔚蓝矿石',
    level:'Lv.30'
  },{
    name:'深紫矿石',
    level:'Lv.40'
  },{
    name:'绯红矿石',
    level:'Lv.50'
  },{
    name:'粉甜矿石',
    level:'Lv.60'
  },{
    name:'彩虹矿石',
    level:'Lv.70'
  }
]
export const forgeList=[
  {
    name:'灰色镐子',
    level:'Lv.01'
  },{
    name:'白银镐子',
    level:'Lv.10'
  },{
    name:'翠绿镐子',
    level:'Lv.20'
  },{
    name:'蔚蓝镐子',
    level:'Lv.30'
  },{
    name:'深紫镐子',
    level:'Lv.40'
  },{
    name:'绯红镐子',
    level:'Lv.50'
  },{
    name:'粉甜镐子',
    level:'Lv.60'
  },{
    name:'彩虹镐子',
    level:'Lv.70'
  }
]
export const menuCardMap={
  '采矿':{
    cardList:mineList
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
          },
          {
            key: '1-2',
            title: '锤子',
          },
        ],
      },
      {
        key: '2',
        title: '武器',
        children: [
          {
            key: '2-1',
            title: '镐子',
          },
        ],
      },
      {
        key: '3',
        title: '板甲',
        children: [
          {
            key: '3-1',
            title: '镐子',
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