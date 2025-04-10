// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
import { alarmAction } from '../../services/alarm';

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 'index'
      });
    }
  },
// -----------------------------------

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onCallHelp() {
    // 报案求助
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },

  onPoliceService() {
    // 警务下沉
    wx.navigateTo({
      url: '/pages/police/police'
    });
  },

  onEmergencyCall() {
    // 一键呼警
    wx.makePhoneCall({
      phoneNumber: '110'
    });
  },

  // 跳转公告
  gotoDispose(){
    const userInfo = getApp().globalData.userInfo;
    if(userInfo.Permission === 'user') return;
    wx.navigateTo({
      url: '/pages/dispose/dispose',
    })
  },
  // 跳转页面
  gotoPage(e){
    wx.navigateTo({
      url: e.mark.url,
    })
  },

  // 一键报警
  handleAlarm(){
    wx.showModal({
      title: '提示',
      content: '您要一键报警吗？',
      success: (res)=>{
        if (res.confirm) {
          alarmAction();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
