// pages/testdb/testdb.js

const DB = wx.cloud.database().collection("market");
let id = null;
let number = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: "",
        address: "",
        contact: "",
        number: "",
        phone: "",
        picturl: "",
        marketList:[]
    },
    getName: function(e) {
        this.name = e.detail.value;
    },
    getAddress: function(e) {
        this.address = e.detail.value;
    },
    getContact: function(e) {
        this.contact = e.detail.value;
    },
    getNumber: function(e) {
        this.number = e.detail.value;
    },
    getPhone: function(e) {
        this.phone = e.detail.value;
    },
    getPicturl: function(e) {
        this.picturl = e.detail.value;
    },
    clearInput: function() {
        console.log("kkkkk")
        this.name = "";
        this.address = "";
        this.contact = "";
        this.number = "";
        this.phone = "";
        this.picturl = "";
    },
    //查询
    getAllData:function(){
         
        DB.get().then(
            res=>{
                console.log("获取数据:",res);
                this.setData({
                    marketList:res.data
                })
            }
        ).catch(console.error)
    },
    //添加卖场数据
    addData: function() {

        DB.add({
            // data 字段表示需新增的 JSON 数据
            data: {
                name: this.name,
                address: this.address,
                contact: this.contact,
                number: this.number,
                phone: this.phone,
                picturl: this.picturl
            }
        })
        .then(res => {
            console.log(res);
            this.clearInput();
        })
        .catch(console.error)


        // DB.add({
        //     data:{
        //         name: this.name,
        //         address: this.address,
        //         contact: this.contact,
        //         number: this.number,
        //         phone: this.phone,
        //         picturl: this.picturl
        //     },
        //     success:function(res){
        //         console.log("添加成功",res);
        //         //清空输入框
        //         this.clearInput();
        //     },
        //     fail:function(res){
        //         console.log("添加失败",res)
        //     }
        // })
    },
    setId:function(e){
        id = e.detail.value
    },
    setNumber:function(e){
        number = e.detail.value
    },
    //根据id删除数据
    deleteData:function(){
        if (id == null){
            console.log("id不能为null");
            return;
        }
        DB.doc(id).remove()
            .then(res => {
                console.log(res);
                console.log(res.stats.removed);
                this.clearInput();
            }
            ).catch(console.error)
    },
    //根据id设置number值
    updataData:function(){
        if (id == null) {
            console.log("id不能为null");
            return;
        }
        if (number == null) {
            console.log("number不能为null");
            return;
        }
        DB.doc(id).update({
            data: {
                number: number
            }})
            .then(res => {
                console.log(res);
                this.clearInput();
            }
            ).catch(console.error)
    }

})