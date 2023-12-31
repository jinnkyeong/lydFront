import api from '@/api'
import router from '@/router/index'
// 로그인,로그아웃,jwt 관련 모듈 - > localstorage에 저장 필요
const state = {
  // 로그인 과정
  userType: '',

  failLogin: '',
  // 소셜로그인
  socialDuplEmail: false,

  // 로그인 후 현재 유저 관련
  accessToken: '',
  dwId:null,
  cusId:null,
  adminId:null,
  accountType:'',

  // pop over menu 출력용
  usernick:'',
  goalCnt:null,
  userImgUrl:'',

  // 알람
  unreadAlarmCnt:0,
  alarmOpen:false,
  alarmList:[],


  // admin
  adminId:null,
}

const getters = {}

const mutations = {
  // 로그인 과정
  setUserType(state, newUserType){
      state.userType = newUserType
    
  },
  setAccessToken(state, newAccessToken) {
        state.accessToken = newAccessToken
    
  },
  setDwId(state,newDwId){
        state.dwId = newDwId
    
  },
  setCusId(state,newCusId){
        state.cusId = newCusId
    
  },
  setAccountType(state,type){
    state.accountType = type
  },


  // pop over menu 관련
  setGoalCnt(state, cnt){ // cnt : 산책횟수 또는 산책이용횟수
      state.goalCnt = cnt
  },
  setUsernick(state, usernick){
      state.usernick = usernick
  },
  setUserImgUrl(state, data){
    console.log('zz : ',data)
    const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
    if(data.dirName && data.fileName && data.extension){
      state.userImgUrl = `${urlfront}/${data.dirName}/${data.fileName}.${data.extension}`
    } else {
      state.userImgUrl = ''
    }
  },

  //admin
  setAdminId(state,adminId){
        state.adminId = adminId
  },
  // 알람
  setUnreadAlarmCnt(state, cnt){
    state.unreadAlarmCnt = cnt
  },
  setAlarmOpen(state){
    state.alarmOpen = !state.alarmOpen
  },
  setAlarmList(state, list){
    state.alarmList = list
  },
  failLogin(state, fail){
    state.failLogin = fail
  },
  // 소셜로그인
  socialDuplEmail(state, bool){
    state.socialDuplEmail = bool
  }
}


const actions = {
  // login
  doLogin({state, commit}, payload) {
    console.log("dologin에서 state.userType : "+ state.userType)
    return api({
        method : 'post',
        url : '/api/login', 
        data :{ 
            email : payload.email,
            pwd : payload.pwd,
            userType : state.userType 
        },
        'Content-Type' : "application/json"
    })
    .then(res => {
        console.log('성공 데이터 : ',res.data)
        const accessToken = res.data.accessToken
        if (accessToken) {
            commit('setAccessToken', accessToken)
            commit('setDwId', res.data.dogwalkerId) // 도그워커면
            commit('setCusId', res.data.customerId) // 고객이면
            commit('setUsernick', res.data.usernick)
            commit('setGoalCnt', res.data.goalCnt)
            commit('setAccountType', "EMAIL")
            commit('setUserImgUrl', res.data)
            router.go('/')
        } 
    })
    .catch((e)=>{
        console.log('실패 ',e)
    })
  },
  doSocialLogin({state, commit}, code) {
    return api({
        method : 'post',
        url : `/api/auth/kakao`,
        data :{ 
          userType : state.userType, 
          code: code
        },
    })
    .then(res => {
      console.log('login 결과 : ',res.data)
        const accessToken = res.data.accessToken
        if (accessToken) {
            commit('setAccessToken', accessToken)
            commit('setDwId', res.data.dogwalkerId) // 도그워커면
            commit('setCusId', res.data.customerId) // 고객이면
            commit('setUsernick', res.data.usernick)
            commit('setGoalCnt', res.data.goalCnt)
            commit('setAccountType', "KAKAO")
            commit('setUserImgUrl', res.data)
            window.location.href = '/' // 이거 안하고 router.go(0) 하면 url에 code가 붙은 상태로 다시 요청가서 code 다시 사용했다는 에러발생(500)
        } 
    })
    .catch((e)=>{
        console.log('실패 ',e)
    })
  },
  setUserIdAfterSL({state, commit}) {
    console.log('setUserIdAfterSL : ')
    return api({
        method : 'post',
        url : `/api/auth/kakao/userId`,
        data:{
          userType: state.userType,
          accessToken: state.accessToken
        }
    })
    .then(res => {
      console.log('id가져오기 : ',res.data)
      if(res.data.dogwalkerId){
        commit('setDwId', res.data.dogwalkerId) // 도그워커면
        commit('setCusId', null) // 도그워커면
        commit('setUserType', 'dogwalker') // 도그워커면
      
      } else {
        commit('setCusId', res.data.customerId) // 고객이면
        commit('setDwId', null) // 고객이면
        commit('setUserType', 'customer') // 고객이면
      }
      // router.push('/')

    })
    .catch((e)=>{
        console.log('실패 ',e)
    })
  },
  // jwt 만료 -> 호출되어 재발급 -> 재요청
  doReissue({state, commit}, originalReq){
    // console.log("doreissue 메소드로 들오옴")
    // console.log("old : ",state.accessToken)
    // console.log('originalReq : ',originalReq)

    let userType;
    let userId;
    if(state.dwId){
        userType = 'dogwalker'
        userId = state.dwId
    } else if(state.cusId){
        userType = 'customer'
        userId = state.cusId
    } else {
        console.log("유저타입 확인 필요")
    }

    return api({
        method : 'post',
        url : `/api/auth/reissue`,
        data : {
            userType : userType, // 현재 유저 타입
            oldAtk : state.accessToken,
            userId : userId 
        }
    })
    .then((resData)=>{
        console.log("reissue 결과 : ",resData.data)
        commit('setAccessToken', resData.data.atk) // 새로 발급받은 atk를 state에 저장
        // commit('saveStateToStorage'); // 새로 발급받은 atk를 localstorage에 저장
        console.log('state atk : '+state.accessToken)

        console.log('재발급 끝 기존의 요청을 다시한다')
        originalReq.headers.Authorization = `Bearer ${state.accessToken}`
        console.log("일단.. localstorage에 어떻게 저장되는지확인")
        return api(originalReq);
    })
    .catch((e)=>{
        console.log(e)
    })

  },
  // logout
  doLogout({state, commit}){

    console.log("doLogout 메소드로 들오옴")
    return api({
        method : 'post',
        url : `/api/auth/logout`,
    })
    .then((resData)=>{
        console.log("logout 결과 : ", resData.data)
        if(state.dwId){
          commit('setDwId',null)
        }
        if(state.cusId){
          commit('setCusId',null)
        }
        if(state.adminId){
          commit('setAdminId',null)
        }
        if(state.accessToken){
          commit('setAccessToken','')
        }
        commit('setUserNick','')
        
        if(state.goalCnt){
          commit('setGoalCnt',null)
        }
        commit('setUserType','')
        commit('setUserNick','')
        commit('setAccountType','')
       
        router.push('/')
    })
    .catch((e)=>{
        console.log(e)
    })

  },
  // 관리자 로그인
  adminLogin({state, commit}, payload) {
    return api({
        method : 'post',
        url : '/api/admin-login', 
        data :{ 
            sign : payload.sign,
            pwd : payload.pwd,
        },
    })
    .then(res => {
        console.log('성공 데이터 : ',res.data)
        const accessToken = res.data.accessToken
        if (accessToken) {
            commit('setAccessToken', accessToken)
            commit('setAdminId', res.data.adminId)
            commit('setUserImgUrl', '')
            router.push('/admin/dwManage')
        } else {
            alert('로그인 실패. 다시 로그인해주세요') // 임시
            // router.push({ name: 'login' })
            //     .catch(err => {
            //         if (err.name != 'NavigationDuplicated') {
            //             throw err;
            //         }
            //     })
        }
    })
    .catch((e)=>{
        console.log('실패 ', e)
    })
  },



}
export default { state, getters, mutations, actions }