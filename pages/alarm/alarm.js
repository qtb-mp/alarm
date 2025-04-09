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
    pageNum: 1,
    pageSize: 10,
    hasMore: false,
    isRefreshing: false
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
    },

    onLoad() {
      this.loadNoticeList();
    },

    // 下拉刷新
    // onPullDownRefresh() {
    //   this.setData({
    //     isRefreshing: true,
    //     pageNum: 1,
    //     hasMore: true
    //   }, () => {
    //     this.loadNoticeList(true);
    //   });
    // },

    // 上拉加载更多
    // onReachBottom() {
    //   if (this.data.hasMore) {
    //     this.loadNoticeList();
    //   }
    // },

    // 加载公告列表
    loadNoticeList(isRefresh = false) {
      // const { pageNum, pageSize, noticeList } = this.data;
      const app = getApp();
      const userInfo = app.globalData.userInfo;
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/my_call_the_police_records',
        method: 'GET',
        data: {
          OfficerID:userInfo?.OfficerID,
          // pageNum,
          // pageSize
        },
        success: (res) => {
          if (res.data.code === 200) {
            const newList = res.data.records || [];
            
            this.setData({
              noticeList: newList.map(item => ({
                ...item,
                AlertTime: formatTime(item.AlertTime)
              })),
              // hasMore: newList.length === pageSize,
              // pageNum: isRefresh ? 2 : pageNum + 1
            });
          }
        },
        complete: () => {
          if (isRefresh) {
            this.setData({ isRefreshing: false });
            // wx.stopPullDownRefresh();
          }
        }
      });
    },

    // 点击公告项
    // onNoticeClick(e) {
    //   const notice = e.currentTarget.dataset.notice;
    //   wx.navigateTo({
    //     url: `/pages/notice/detail/detail?id=${notice.id}`
    //   });
    // },
  }
})