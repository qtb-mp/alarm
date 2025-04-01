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
        notice: '/pages/notice/notice'
      };
      
      if(value !== 'alarm'){
        wx.switchTab({
          url: routeMap[value]
        });
      }else{
        console.log(1111111111)
        this.setData({showDialog: true})
      }
    },
    handleConfirm(){
      this.setData({showDialog: false})
    },
    handleCancel(){
      this.setData({showDialog: false})
    }
  }
}); 