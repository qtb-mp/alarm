Page({
  data: {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
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

  onPasswordChange(e) {
    this.setData({
      password: e.detail.value
    });
  },

  onConfirmPasswordChange(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  handleRegister() {
    const { name, username, password, confirmPassword } = this.data;
    
    // 表单验证
    if (!name || !username || !password || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 密码一致性校验
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
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
      url: 'your-api-url/register',
      method: 'POST',
      data: {
        name,
        username,
        password
      },
      success: (res) => {
        if (res.data.code === 0) {
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