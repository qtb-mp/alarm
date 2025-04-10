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
    loading: false,
    dialogVisible: false,
    responseText: '',
    currentComplainId: null,
    currentComplainIndex: null
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.loadComplainList();
    },

    // 加载投诉列表
    loadComplainList(isPullDownRefresh = false) {
      if (this.data.loading) return;
      this.setData({ loading: true });
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/my_complaints_suggestions',
        method: 'GET',
        data: {},
        success: (res) => {
          if (res.data.code === 200) {
            const newList = res.data.records || [];
            // 格式化时间
            const formattedList = newList.map(item => {
              return {
                ...item,
                SubmitTime: formatTime(item.SubmitTime)
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

    // 处理投诉
    handleComplain(e) {
      const id = e.currentTarget.dataset.id;
      const index = e.currentTarget.dataset.index;
      
      this.setData({
        dialogVisible: true,
        currentComplainId: id,
        currentComplainIndex: index,
        responseText: ''
      });
    },
    
    // 响应文本变更
    onResponseChange(e) {
      this.setData({
        responseText: e.detail.value
      });
    },

    // 取消处理
    onDialogCancel() {
      this.setData({
        dialogVisible: false,
        responseText: '',
        currentComplainId: null,
        currentComplainIndex: null
      });
    },

    // 提交处理结果
    onDialogConfirm() {
      const { responseText, currentComplainId } = this.data;
      
      if (!responseText.trim()) {
        wx.showToast({
          title: '请输入处理结果',
          icon: 'none'
        });
        return;
      }
      
      wx.request({
        url: 'https://api.gamestrial.com/community_policing/reply_complaints_suggestions',
        method: 'PUT',
        data: {
          ID: currentComplainId,
          Response: responseText
        },
        success: (res) => {
          if (res.data.code === 200) {
            // 更新本地数据
            const { complainList, currentComplainIndex } = this.data;
            complainList[currentComplainIndex].Status = 'resolved';
            complainList[currentComplainIndex].Response = responseText;
            
            this.setData({ complainList });
            
            wx.showToast({
              title: '处理成功',
              icon: 'success'
            });
          } else {
            wx.showToast({
              title: res.data.message || '处理失败',
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
          this.setData({
            dialogVisible: false,
            responseText: '',
            currentComplainId: null,
            currentComplainIndex: null
          });
        }
      });
    }
  }
})