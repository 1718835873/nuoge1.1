// pages/testdb2/testdb2.js
let id = null;

Page({

    data: {

    },
    // getAllData: function() {
    //     //调用云函数
    //     wx.cloud.callFunction({
    //             // 云函数名称
    //             name: 'findAllMarket',
    //             // 传给云函数的参数
    //             data: {
    //                 a: 1111,
    //                 b: 2,
    //             },
    //         })
    //         .then(res => {
    //             console.log(res.result) // 3
    //         })
    //         .catch(console.error)
    // },

    getOpenId:function(){
        let that = this;
        wx.cloud.callFunction({
            name:'getopenid',
            data:{

            },
            success:function(res){
                console.log("获取成功",res);
                console.log(res.result.openid);
                that.refreshData();
            },
            fail: function (res) {
                console.log("获取失败", res);
            },
        })
    },
    refreshData:function(){
        console.log("刷新数据......")
    },
    getAllData:function(){
        wx.cloud.callFunction({
            name: 'findAllMarket',
            data: {
            },
        })
            .then(res => {
                console.log(res) 
            })
            .catch(console.error)
    },
    addData:function(){
        wx.cloud.callFunction({
            name: 'addMarket',
            data: {
                newData:{
                    name: "newName",
                    address: "address",
                    contact: "contact",
                    number: "number",
                    phone: "phone",
                    picturl: "newpicurl"
                }
            },
        })
            .then(res => {
                console.log(res)
            })
            .catch(console.error)
    },
    setId:function(event){
        console.log(event.detail.value);
        id = event.detail.value;
    },
    delData:function(){
        if(id == null){
            console.log("删除的id不能是null")
            return;
        }
        wx.cloud.callFunction({
            name: 'delMarket',
            data: {
               id:id
            },
        })
            .then(res => {
                console.log(res)
            })
            .catch(console.error)
    }

})