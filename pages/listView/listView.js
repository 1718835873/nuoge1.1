// pages/listView/listView.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList:"",
        dataList2: ""
    },
    getDataByCloud:function(){
        let that = this;
        wx.cloud.callFunction({
            name:"getList",
            success(res){
                console.log("res:",res)
                that.setData({
                    dataList2:res.result.data
                })
            },
            fail(res) {
                console.log("res:", res)
            }
        })
    },
    getData:function(){
        let db = wx.cloud.database();
        let that = this;
        db.collection("student").get({
            success(res){
                console.log("获取成功", res);
                that.setData({
                    dataList:res.data
                })
            },
            fail(err){
                console.log("获取失败",err);
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})