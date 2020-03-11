// pages/cloudpic/cloudpic.js
Page({
 
    data: {
        imgURL:'',
        videoURL:'',
        fileUrl:''
    },
    openExcel(){
        var that = this;
        console.log(this.data);
        console.log(that.data);
        //下载并打开excel文件
        wx.cloud.downloadFile({
            fileID: 'cloud://cloudwx-dm78q.636c-cloudwx-dm78q-1300838257/1577074756307.xls',//this.data.fileUrl,
            success:res=>{
                wx.openDocument({
                    filePath: res.tempFilePath,
                    success:function(res){
                        console.log("打开成功");
                    }
                })
            },
            fail(err){
                console.log(err)
            }
        })
    },
    //选择并上传excel文件
    selectExcel(){
        let that = this;
        wx.chooseMessageFile({
            count: 1,
            type: 'all',
            success(res) {
               console.log("选择文件:",res.tempFiles[0].path);
                wx.showLoading({
                    title: '请稍后',
                })
                wx.cloud.uploadFile({
                    cloudPath: new Date().getTime() + '.xls',
                    filePath: res.tempFiles[0].path, 
                    success(res) {
                        console.log("上传成功：", res);
                        wx.hideLoading();
                        that.setData({
                            fileUrl:res.fileID
                        })
                    },
                    fail(err) {
                        console.log("上传失败", err);
                    }
                })
            }
        })
    },
    //上传视频
    uploadVFile(fileUrl) {
        let that = this;
        wx.showLoading({
            title: '视频上传中',
        })
        wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + '.mp4',
            filePath: fileUrl,
            // name: 'file',
            // formData: {
            //     'user': 'test'
            // },
            success(res) {
                console.log("上传成功：", res);
                that.setData({
                    videoURL: res.fileID
                });
                wx.hideLoading();
            },
            fail(err) {
                console.log("上传失败", err);
            }
        })
    },
    //选择视频文件
    selectVideo(){
        console.log("1111")
        let that = this;
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                console.log(res);
                that.uploadVFile(res.tempFilePath);
            },
            fail(err){
                console.log(err);
            }
        })
    },
   
    //上传文件到云存储
    selectFile(){
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
               console.log("选择成功",res);
               that.uploadFile(res.tempFilePaths[0]);
              
            }
        })
    },
    uploadFile(fileUrl){
        let that = this;
        wx.showLoading({
            title: '图片上传中',
        })
        wx.cloud.uploadFile({
            cloudPath: new Date().getTime()+ '.jpg',  
            filePath: fileUrl,
            name: 'file',
            formData: {
                'user': 'test'
            },
            success(res) {
                console.log("上传成功：", res);
                that.setData({
                    imgURL: res.fileID
                });
                wx.hideLoading();
            },
            fail(err) {
                console.log("上传失败", err);
            }
        })
    }

})