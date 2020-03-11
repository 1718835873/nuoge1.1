Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName:"",
        userAccount:"",
        userPassword:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    getUserName: function(event) {
        this.setData({
            userName:event.detail.value
        })
        //console.log(this.data.userName);
    },
    getUserAccount: function(event) {
        this.setData({
            userAccount: event.detail.value
        })
        //console.log(this.data.userAccount);
    },
    getUserPassword:function(event){
        this.setData({
            userPassword: event.detail.value
        })
        //console.log(this.data.userPassword);
    },
    //注册
    zhuce:function(){
        console.log("注册....");
        //校验
        if(this.data.userName.length < 2){
            wx.showToast({
                icon:'none',
                title:"用户名需要2位以上"
            })
            return;
        }
        if (this.data.userAccount.length < 2) {
            wx.showToast({
                icon: 'none',
                title: "账号需要2位以上"
            })
            return;
        }
        if (this.data.userPassword.length < 2) {
            wx.showToast({
                icon: 'none',
                title: "密码需要2位以上"
            })
            return;
        }
        // console.log(this.data.userName + "-" + this.data.userAccount + "-" + this.data.userPassword);
        wx.cloud.database().collection('user').add({
            data:{
                userName: this.data.userName,
                userAccount: this.data.userAccount,
                userPassword: this.data.userPassword
            },
            success(res){
                console.log("注册成功",res);
                wx.showToast({
                    title: '注册成功',
                });
                //跳转到登录页面
                wx.redirectTo({
                    url: '../login/login',
                })
            },
            fail(err){
                console.log("注册失败",err);
                wx.showToast({
                    title: '注册失败',
                });

            }
        })


    }

})