// pages/complain/complain.js
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
      Type: 'complaint', // 默认选择投诉
      ContactInfo: '',
      Content: ''
    },
    submitting: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 分类变更
    onTypeChange(e) {
      this.setData({
        'formData.Type': e.detail.value
      });
    },

    // 联系方式变更
    onContactInfoChange(e) {
      this.setData({
        'formData.ContactInfo': e.detail.value
      });
    },

    // 内容变更
    onContentChange(e) {
      this.setData({
        'formData.Content': e.detail.value
      });
    },

    // 提交表单
    submitForm() {
      const { ContactInfo, Content } = this.data.formData;

      // 表单验证
      if (!ContactInfo) {
        wx.showToast({
          title: '请填写联系方式',
          icon: 'none'
        });
        return;
      }

      if (!Content) {
        wx.showToast({
          title: '请填写内容',
          icon: 'none'
        });
        return;
      }

      // 设置提交中状态
      this.setData({
        submitting: true
      });

      const userInfo = getApp().globalData.userInfo;
      // 发送请求
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/complaints_suggestions',
        method: 'POST',
        data: {
          ...this.data.formData,
          SubmitterID: userInfo.OfficerID,
          SubmitterName: userInfo.Name
        },
        success: (res) => {
          if (res.data.code === 200) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success: () => {
                // 延迟跳转
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000);
              }
            });
          } else {
            wx.showToast({
              title: res.data.message || '提交失败',
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
          this.setData({
            submitting: false
          });
        }
      });
    }
  }
})