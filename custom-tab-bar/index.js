Component({
  data: {
    active: 'index',
    showDialog: false
  },
  methods: {
    onChange(e) {
      const value = e.detail.value;
      this.setData({ active: value });
      
      const routeMap = {
        index: '/pages/index/index',
        notice: '/pages/notice/notice',
        alarm: '/pages/alarm/alarm'
      };
      
      wx.switchTab({
        url: routeMap[value]
      });
    },
  }
}); 