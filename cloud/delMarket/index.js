// 云函数入口文件
const cloud = require('wx-server-sdk')
// cloud.init({
//     env: "cloudwx-dm78q"
// })
DB = cloud.database().collection("market");

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        return await DB.doc(event.id).remove()
    } catch (e) {
        console.error(e)
    }
}