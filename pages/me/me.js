// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName:'',
        loginOK:false
    },

    denglu:function(){
        wx.navigateTo({
            url: '../login/login',
        })
    },
    zhuce: function () {
        wx.navigateTo({
            url: '../reg/reg',
        })
    },

    onShow:function(){
        let user = wx.getStorageSync("user");
        if(user && user.userName){
            this.setData({
                loginOK:true,
                userName:user.userName
            })
        }else{
            this.setData({
                loginOK: false,
                userName: ''
            })
        }
    },
    //退出
    tuichu:function(){
        wx.setStorageSync("user", null);
        this.onShow();
    }

})