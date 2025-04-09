import { alarmAction } from '../services/alarm';

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
    },
  }
}); 