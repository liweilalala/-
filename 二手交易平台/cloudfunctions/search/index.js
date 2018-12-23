const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => await db.collection('goodData')
  .where({

  })
  .skip(0) // 跳过结果集中的前 10 条，从第 11 条开始返回
  .limit(10) // 限制返回数量为 10 条
  .get()