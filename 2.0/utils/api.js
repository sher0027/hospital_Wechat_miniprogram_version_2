// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import {
  http
} from './http'; // 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项

/*
首页
 */

function login(params) { // 登录接口
  http('/login', 'POST', params)
}

function search(params) { //首页搜索
  http('/mainSearch', 'POST', params)
}

function followList(params) { //关注团队列表
  http('/follow', 'POST', params)
}

function doctorTeam(params) { // 团队医生
  http('/teamDoctors', 'POST', params)
}

function followALL(params) { //全部关注过的团队
  http('/allFollow', 'POST', params)
}

function departmentList(params) { //获取所有的科室信息
  http('/getAllDepart', 'POST', params)
}

function departmentRecommend(params) { //获取所有的科室信息
  http('/getRecommendDepart', 'POST', params)
}

function doctorList(params) { // 获取科室医生接口
  http('/recommend?page=1&pageSize=65535', 'POST', params)
}

function hintNotice(params) { //判断是否有新消息
  http('/isNewMessage', 'POST', params)
}

function readHint(params) { //消息已读
  http('/changeReadStatus', 'POST', params)
}

/*
消息通知
 */

function SysHint(params) { //获取系统消息
  http('/getSysMessage?page=1&pageSize=65535', 'POST', params)
}

function DoctorHint(params) { //获取医生消息
  http('/getDoctorMessage?page=1&pageSize=65535', 'POST', params)
}

/*
病历
*/

function recordList(params) { //病历列表
  http('/record?pageIndex=1&pageSize=65535', 'POST', params)
}

function recordDetail(params) { // 病历详情
  http('/recordDetail', 'POST', params)
}

function importRecord(params) { //导入病历
  http('/addRecordForOrder?page=1&pageSize=5', 'POST', params)
}

function recordImported(params) { //导入的病历
  http('/submitRecords', 'POST', params)
}

function recordRelated(params) { //关联的病历记录
  http('/orderLinkRecords', 'POST', params)
}

function recordDepartment(params) { //所有有病历记录的科室
  http('/getDepartByRecord', 'POST', params)
}

function recordMatch(params) { //根据科室匹配病历
  http('/getRecordByDepart?page=1&pageSize=65535', 'POST', params)
}

function deleteRecord(params) { //删除病历
  http('/deleteRecord', 'POST', params)
}

/*
医生团队
 */
function doctorDetail(params) { // 医生详情
  http('/doctor', 'POST', params)
}

function hasFollowed(params) { // 判断关注状态
  http('/followOrNot', 'POST', params)
}

function follow(params) { // 关注医生
  http('/addFollow', 'POST', params)
}

function followCancel(params) { // 取消关注
  http('/cancelFollow', 'POST', params)
}

function banners(params) { //获取海报
  http('/getManner', 'POST', params)
}

function infoList(params) { // 获取出诊时间表接口
  http('/getTeamOutpatient', 'POST', params)
}

function knowledgeList(params) { // 获取科普知识接口
  http('/knows', 'POST', params)
}

function caseList(params) { //咨询案例
  http('/teamOrders?pageIndex=1&pageSize=65535', 'POST', params)
}

function flowList(params) { //统计数据
  http('/statisticData', 'POST', params)
}

function sharePic(params) { //分享二维码
  http('/teamQRCode', 'GET', params)
}

/*
订单
*/

function orderList(params) { //订单列表
  http('/getOrders', 'POST', params)
}

function orderMatch(params) { //根据订单状态匹配订单
  http('/getOrdersByType', 'POST', params)
}

function cancelOrder(params) { // 取消订单
  http('/cancelOrder', 'POST', params)
}

function deleteOrder(params) { //删除订单
  http('/deleteOrder', 'POST', params)
}

function resubmitOrder(params) { //重新提交订单
  http('/ragainOrder', 'POST', params)
}

function orderDetail(params) { //订单详情
  http('/orderBasic', 'POST', params)
}

/*
上传
*/

function addConsultation(params) { //咨询
  http('/createOrder', 'POST', params)
}

function getId(params) { //获取id（用于上传图片）
  http('/getId', 'GET', params)
}

function addRecord(params) { //上传病历
  http('/addRecord', 'POST', params)
}

function addMessage(params) { //联系客服
  http('/addMessage', 'POST', params)
}

/*
个人信息
 */

function userinfo(params) { // 个人信息接口
  http('/testPatientById', 'POST', params)
}

function avatar(params) { // 更新头像接口
  http('/getUserUpdatePhoto', 'PUT', params)
}

function editInfo(params) { // 修改信息接口
  http('/getUserUpdateInfo', 'PUT', params)
}


// 每一个接口定义一个函数，然后暴露出去，供逻辑代码调用
export default { // 暴露接口
  login,
  getId,
  followList,
  departmentList,
  departmentRecommend,
  doctorList,
  recordList,
  recordRelated,
  infoList,
  follow,
  banners,
  addConsultation,
  addRecord,
  editInfo,
  addMessage,
  recordDepartment,
  recordMatch,
  deleteRecord,
  followCancel,
  hasFollowed,
  doctorDetail,
  knowledgeList,
  doctorTeam,
  orderMatch,
  orderList,
  orderDetail,
  caseList,
  flowList,
  userinfo,
  avatar,
  recordDetail,
  recordImported,
  importRecord,
  deleteOrder,
  cancelOrder,
  resubmitOrder,
  SysHint,
  DoctorHint,
  search,
  sharePic,
  followALL,
  hintNotice,
  readHint
}