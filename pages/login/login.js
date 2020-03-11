// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userAccount:"",
        userPassword:""
    },

    getUserAccount:function(e){
        this.setData({
            userAccount:e.detail.value
        })
    },
    getUserPassword: function (e) {
        this.setData({
            userPassword: e.detail.value
        })
    },

    login:function(e){
        if(this.data.userAccount.length < 2){
            wx.showToast({
                icon:"none",
                title:"用户账号长度大于2"
            })
            return;
        }
        if (this.data.userPassword.length < 2) {
            wx.showToast({
                icon: "none",
                title: "用户密码长度大于2"
            })
            return;
        }
        console.log(this.data.userAccount + "-" + this.data.userPassword);
        //登录
        let userPassword = this.data.userPassword;
         
        let userAccount = this.data.userAccount;

        wx.cloud.database().collection("user").where({
            userAccount: userAccount
        }).get({
            success(res){
                //console.log('成功',res);
                if (res.data && res.data[0] && (userPassword == res.data[0].userPassword )){
                    wx.showToast({
                        title: '登录成功',
                    });
                    //执行对应的跳转
                    let userName = res.data[0].userName;
                    // wx.navigateTo({
                    //     url: '../home/home?userName=' + userName ,
                    // })

                    wx.navigateTo({
                        url: '/pages/me/me',
                    })
                    //保存用户状态数据
                    wx.setStorageSync("user", res.data[0]);

                }else{
                    wx.showToast({
                        title: '用户名或密码错误',
                        icon:"none"
                    })
                }
               
            },
            fail(err){
                console.log('失败',err);
            }
        })
    }
      
})