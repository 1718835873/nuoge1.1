// 云函数入口文件
const cloud = require('wx-server-sdk')
// cloud.init({
//     env: "cloudwx-dm78q"
// })
DB = cloud.database().collection("market");

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  

    return DB.add({
            // newData 字段表示需新增的 JSON 数据
            data: {
                name: event.newData.name,
                address: event.newData.address,
                contact: event.newData.contact,
                number: event.newData.number,
                phone: event.newData.phone,
                picturl: event.newData.picturl
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(console.error)


}