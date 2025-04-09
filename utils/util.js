// 格式化时间
export const formatTime = (timeStr) => {
  return timeStr.substring(0, 16).replace('T', ' '); // 示例格式化
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}