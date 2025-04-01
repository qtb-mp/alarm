// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

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

  handleLogin() {
    const { username, password } = this.data;
    wx.switchTab({
      url: '/pages/index/index',
    })
    console.log(1111111, username, password);
    return;
    if (!username || !password) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 这里添加登录逻辑
    wx.showLoading({
      title: '登录中...',
    });

    // 示例登录请求
    wx.request({
      url: 'your-api-url/login',
      method: 'POST',
      data: {
        username,
        password
      },
      success: (res) => {
        if (res.data.code === 0) {
          wx.setStorageSync('token', res.data.token);
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          wx.showToast({
            title: res.data.message || '登录失败',
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

  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
})