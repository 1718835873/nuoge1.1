const db = wx.cloud.database().collection("student");
let name = 'ab';
let age = 10;
let birthday = '';
Page({


    data: {
        date: '2019-12-21',
        studentList: []
    },


    onLoad: function(options) {

    },
    getName: function(e) {
        //console.log(e)
        name = e.detail.value;
    },

    getAge: function(e) {
        age = e.detail.value;
    },

    bindDateChange: function(e) {
        console.log(e);
        this.setData({
            date: e.detail.value
        })
        birthday = e.detail.value;
    },

    addStudent: function() {
        // let that = this;
        // db.add({
        //     data: {

        //         name: name,
        //         age: age,
        //         birthday: birthday

        //     },
        //     success: function(res) {
        //         console.log(res);
        //         setTimeout(function() {
        //             that.selectStudentAll();
        //         }, 500)

        //     },
        //     fail(err) {
        //         console.log(err)
        //     }
        // });
        //
        db.add({
            data:{
                name: name,
                age: age,
                birthday: birthday
            }
        })
        .then( res => {
            console.log("ok", res);
            console.log("更新数据等.....")
            this.selectStudentAll();
        })
        .catch(console.log())
    },
    del: function(item) {
        //console.log(item)
        let _id = item.target.dataset.item._id;
        //console.log(_id);
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: function(sm) {
                //console.log("sm",sm);
                if (sm.confirm) {
                    // 用户点击了确定 可以调用删除方法了
                    db.where({
                        _id: _id
                    }).remove();
                    setTimeout(function() {
                        that.selectStudentAll();
                    }, 500)
                } else if (sm.cancel) {
                    //console.log('用户点击取消')
                }
            }
        });

    },
    selectStudentAll: function() {
        let that = this;
        db.get({
            success: function(res) {
                console.log(res);
                console.log(res.data.length)
                that.setData({
                    studentList: res.data
                })
            }
        })
    }

})