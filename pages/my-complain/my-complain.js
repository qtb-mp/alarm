import { formatTime } from '../../utils/util';

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
    complainList: [],
    loading: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.loadComplainList();
    },

    // 加载投诉列表
    loadComplainList() {
      if (this.data.loading) return;
      this.setData({ loading: true });
      const userInfo = getApp().globalData.userInfo;
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/my_complaints_suggestions',
        method: 'GET',
        data: {
          SubmitterID: userInfo.OfficerID,
        },
        success: (res) => {
          if (res.data.code === 200) {
            const newList = res.data.records || [];
            // 格式化时间
            const formattedList = newList.map(item => {
              return {
                ...item,
                SubmitTime: formatTime(item.SubmitTime),
                HandleTime: item.HandleTime ? formatTime(item.HandleTime) : ''
              };
            });
            this.setData({
              complainList: formattedList,
            });
          } else {
            wx.showToast({
              title: res.data.message || '加载失败',
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
          this.setData({ loading: false });
        }
      });
    },
  }
})