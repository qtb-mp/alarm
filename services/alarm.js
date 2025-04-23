// 一键报警
export const alarmAction = () => {
  const app = getApp();
  const userInfo = app.globalData.userInfo;
  if(!userInfo?.OfficerID){
    wx.showToast({
      title: '请先登录',
    });
    setTimeout(()=>{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }, 1500)
    return;
  }
  wx.getLocation({
    type: 'wgs84',
    success (res) {
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/call_the_police',
        method: 'POST',
        data: {
          OfficerID:userInfo?.OfficerID,
          LocationLat:res.latitude,
          LocationLng:res.longitude
        },
        success: (res) => {
          if (res.data.code === 200) {
            wx.showToast({
              title: '报警成功',
            })
          } else {
            wx.showToast({
              title: res.data.message || '报警失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          });
        }
      });
    },
    fail(err){
      console.log(err);
    }
   })
}
