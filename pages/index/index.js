 
let a ;
let b ;

Page({

    data:{
        txt:"123"
    },
    getA(event){
        console.log(event.detail.value)
        a = event.detail.value;
    },
    getB(event) {
        console.log(event.detail.value)
        b = event.detail.value;
    },
    //获取用户信息
    onGotUserInfo(event){
        console.log(event.detail.userInfo);
    },
    getInput(e){
        console.log(e)
        console.log(e.detail.value)
        this.setData({
            txt :  e.detail.value
        })
        console.log("out :" + this.data.txt);
    },

    //获取用户openid
    getOpenid(){
        wx.cloud.callFunction({
            name:"pay",
            success(res){
                console.log("获取成功",res);
            },
            fail(err){
                console.log("获取失败", err);
            }
        })
    }
})
