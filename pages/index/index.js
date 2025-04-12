// index.js
import { alarmAction } from '../../services/alarm';

Page({
  data: {
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'index'
      });
    }
  },
  // 跳转页面
  gotoPage(e) {
    wx.navigateTo({
      url: e.mark.url,
    })
  },

  // 警务平台
  gotoDispose() {
    const userInfo = getApp().globalData.userInfo;
    if (userInfo.Permission === 'user') {
      wx.showToast({
        title: '您没有权限访问警务平台',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/dispose/dispose',
    })
  },

  // 一键报警
  handleAlarm() {
    wx.showModal({
      title: '提示',
      content: '您要一键报警吗？',
      success: (res) => {
        if (res.confirm) {
          alarmAction();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 退出登录
  logout() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})