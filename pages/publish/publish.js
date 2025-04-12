// pages/publish/publish.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    formData: {
      Title: '',
      Content: ''
    },
    submitting: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 标题变更
    onTitleChange(e) {
      this.setData({
        'formData.Title': e.detail.value
      });
    },

    // 内容变更
    onContentChange(e) {
      this.setData({
        'formData.Content': e.detail.value
      });
    },

    // 提交表单
    handleSubmit() {
      const { Title, Content } = this.data.formData;

      // 表单验证
      if (!Title.trim()) {
        wx.showToast({
          title: '请输入公告标题',
          icon: 'none'
        });
        return;
      }

      if (!Content.trim()) {
        wx.showToast({
          title: '请输入公告内容',
          icon: 'none'
        });
        return;
      }

      // 设置提交状态
      this.setData({ submitting: true });

      // 发送请求
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/community_announcement',
        method: 'POST',
        data: {...this.data.formData, Priority:'high'},
        success: (res) => {
          if (res.data.code === 200) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                // 延迟返回上一页
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000);
              }
            });
          } else {
            wx.showToast({
              title: res.data.message || '发布失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          });
        },
        complete: () => {
          this.setData({ submitting: false });
        }
      });
    }
  }
})