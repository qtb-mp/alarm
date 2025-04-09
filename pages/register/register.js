Page({
  data: {
    Name: '',
    PhoneNumber: ''
  },

  onNameChange(e) {
    this.setData({
      name: e.detail.value
    });
  },

  onUsernameChange(e) {
    this.setData({
      username: e.detail.value
    });
  },

  handleRegister() {
    const { name, username } = this.data;
    
    // 表单验证
    if (!name || !username) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 显示加载中
    wx.showLoading({
      title: '注册中...',
    });

    // 发起注册请求
    wx.request({
      url: 'https://api.gamestrial.com/community_policing/register',
      method: 'POST',
      data: {
        Name:name,
        PhoneNumber:username,
      },
      success: (res) => {
        if (res.data.code === 200) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 2000);
            }
          });
        } else {
          wx.showToast({
            title: res.data.message || '注册失败',
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
        wx.hideLoading();
      }
    });
  },

  goToLogin() {
    wx.navigateBack({
      delta: 1
    });
  }
}); 