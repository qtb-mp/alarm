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
    noticeList: [],
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          active: 'notice'
        });
      }
      this.loadNoticeList();
    },

    onLoad() {
      this.loadNoticeList();
    },

    // 添加下拉刷新处理函数
    onPullDownRefresh() {
      // 重新加载数据
      this.loadNoticeList(true);
    },

    // 加载公告列表
    loadNoticeList(isPullDownRefresh = false) {
      if (this.data.loading) return;
      this.setData({ loading: true });
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/community_announcement',
        method: 'GET',
        success: (res) => {
          if (res.data.code === 200) {
            const newList = res.data.records || [];
            
            // 格式化时间
            const formattedList = newList.map(item => ({
              ...item,
              CreateTime: formatTime(item.CreateTime)
            }));
            
            this.setData({
              noticeList: formattedList,
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
          // 如果是下拉刷新，停止下拉刷新动画
          if (isPullDownRefresh) {
            wx.stopPullDownRefresh();
          }
        }
      });
    },

    onPublishClick() {
      wx.navigateTo({
        url: '/pages/publish/publish'
      });
    }
  }
})