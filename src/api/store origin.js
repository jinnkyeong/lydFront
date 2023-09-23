// import { createStore } from 'vuex'
// import api from '@/api'
// import router from '@/router/index'
// //import Cookies from 'js-cookie'
// import createPersistedState from "vuex-persistedstate";



// const store = createStore({
   
//     state () {
//         return {  // state 보관
//             // login(현재 유저) 관련
//             accessToken: '',
//             dogwalkerId:null,
//             customerId:null,
//             // pop over menu 출력용
//             usernick:'',
//             goalCnt:null,

//             userType: '',
//             open: false,
//             appId:'',
//             comId:'',

//             // search 관련
//             selectedCertificates:[],
//             selectedPrices:{},
//             selectedAges:[],
//             selectedGender:null,
//             selectedDates:{},
//             selectedWeekdays:[],
//             selectedDogTypes:[],
//             selectedDogAggrs:[],
//             selectedTime:{},

            


//             alert:false,
//             alert_setting :{
//                 type : '', // success, info, warning, error
//                 title : '',
//                 text : ''
//             },

//             urlKey : '',
//             // 상세보기 -> 문의하기,제안하기 넘어갈때 사용
//             items : {},



//             // reservation 관련
//             reservId : null,
//         }
//     },
    
//     mutations:{
//         setAtkAuth(state, newAccessToken) {
//             if (newAccessToken) {
//                 state.accessToken = newAccessToken
//             }
//         },
//         setUserType(state, newUserType){
//             console.log('setUserType',newUserType)
//             if(newUserType){
//                 state.userType = newUserType
//             }
//         },
//         // pop over menu 관련
//         setGoalCnt(state, cnt){ // cnt : 산책횟수 또는 산책이용횟수
//             state.goalCnt = cnt
//         },
//         setUsernick(state, usernick){
//             state.usernick = usernick
//         },
//         setOpen(state, open){
//             console.log("setOpen",open)
//             state.open = open
//         },
        
//         setCertificates(state,list){
//             if(list!=null){
//                 state.selectedCertificates = list
//             }
//         },
//         setAges(state,list){
//             if(list!=null){
//                 state.selectedAges = list
//             }
//         },
//         setPrices(state,obj){
//             if(obj!=null){
//                 state.selectedPrices = obj
//             }
//         },
//         setGender(state,gender){
//             if(gender){
//                 state.selectedGender = gender
//             }
//         },
//         setDate(state,obj){
//             if(obj!=null){
//                 state.selectedDates = obj
//             }
//         },
      
//         setAppId(state,newAppId){
//             if(newAppId){
//                 state.appId = newAppId
//             }
//             // localStorage.setItem('applicationId',state.appId);
//         },
//         setComId(state,newComId){
//             if(newComId){
//                 state.comId = newComId
//             }
//             // localStorage.setItem('commisionId',state.comId);

//         },
//         dogwalkerId(state,newDwId){
//             if(newDwId){
//                 state.dogwalkerId = newDwId
//             }
//         },
//         customerId(state,newCusId){
//             if(newCusId){
//                 state.customerId = newCusId
//             }
//         },
//         // localstoage에 state 값을 저장(로그인 성공 시)
//         saveStateToStorage(state) {
//             localStorage.setItem("login.dogwalkerId", state.dogwalkerId);
//             localStorage.setItem("login.customerId", state.customerId);
//             localStorage.setItem("login.accessToken", state.accessToken);
//             localStorage.setItem("login.usernick", state.usernick);
//             localStorage.setItem("login.goalCnt", state.goalCnt);
//         },
//         // localstoage에서 state로 읽어오기(App.vue mounted 시)
//         readStateFromStorage(state) {
//             if (localStorage.getItem("login.dogwalkerId") != null) {
//                 console.log('localStorage에 dogwalkerId있음')
//                 state.dogwalkerId = localStorage.getItem("login.dogwalkerId");
//             } else {
//                 console.log('localStorage에 dogwalkerId없음')
//             }
//             if (localStorage.getItem("login.customerId") != null) {
//                 console.log('localStorage에 customerId 있음')
//                 state.customerId = localStorage.getItem("login.customerId");

//             } else {
//                 console.log('localStorage에 customerId 없ㅇㅁ')
//             }
//             if (localStorage.getItem("login.accessToken") != null) {
//                 console.log('localStorage에 accessToken 있을')

//                 state.accessToken = localStorage.getItem("login.accessToken");
//             }else {
//                 console.log('localStorage에 accessToken 없음')
//             }
//             if(localStorage.getItem("login.usernick")!=null){
//                 state.usernick = localStorage.getItem("login.usernick")
//             }
//             if(localStorage.getItem("login.goalCnt")!=null){
//                 state.goalCnt = localStorage.getItem("login.goalCnt")
//             }
        
//         },
//         // localstoage, state 초기화
//         reset(state) {
//             state.dogwalkerId = ''; // state 초기화
//             state.customerId = '';
//             state.accessToken = '';
//             state.usernick = '';
//             state.goalCnt = null;

//             localStorage.clear();
//             // localStorage.removeItem("login.dogwalkerId"); // 로컬스토리지 초기화
//             // localStorage.removeItem("login.customerId"); 
//             // localStorage.removeItem("login.accessToken"); 
//         },
//         setAlert(state,config){
//             state.alert = config.alert
//             state.alert_setting.type = config.type
//             state.alert_setting.title = config.title
//             state.alert_setting.text = config.text
//             console.log(state.alert)
//             console.log(state.alert_setting)
//         },
//         setUrlKey(state,urlKey){
//             if(urlKey){
//                 state.urlKey = urlKey
//             }
//         },
//         setItems(state, items){
//             console.log('store items  :',items)
//             state.items = items
            
//         },
//         saveStateToStorage(state) {
//             localStorage.setItem("login.dogwalkerId", state.dogwalkerId);
//             localStorage.setItem("login.customerId", state.customerId);
//             localStorage.setItem("login.accessToken", state.accessToken);
//         },

//         setWeekdays(state, weekdays){
//             if(weekdays){
//                 state.selectedWeekdays = weekdays
//             }
//         },
//         setDogAggrs(state, aggrs){
//             if(aggrs){
//                 state.selectedDogAggrs = aggrs
//             }
//         },
//         setDogTypes(state, types){
//             if(types){
//                 state.selectedDogTypes = types
//             }
//         },
//         setTime(state, time){
//             if(time){
//                 state.selectedTime = time
//             }
//         },


//         // myinfo - 예약내역
//         setReservId(state,reserId){
//             state.reservId = reserId
//         }

  
    
//     },
//     actions:{

//         doLogin({commit}, payload) {

//             console.log(this.state.userType)
//             console.log("input payload : ",payload)

//             return api({
//                 method : 'post',
//                 url : '/login', 
//                 data :{ 
//                     email : payload.email,
//                     pwd : payload.pwd,
//                     userType : this.state.userType // 제대로 넘어옴
//                 },
//                 'Content-Type' : "application/json"
//             })
//             .then(res => {
//                 console.log('성공 데이터 : ',res.data)
//                 const accessToken = res.data.accessToken
//                 console.log("넘어온 atk : ",accessToken)
//                 console.log("넘어온 dogwalkerId : ",res.data.dogwalkerId)
//                 console.log("넘어온 customerId : ",res.data.customerId)
//                 if (accessToken) {
//                     commit('setAtkAuth', accessToken)
//                     commit('dogwalkerId', res.data.dogwalkerId) // 도그워커면
//                     commit('customerId', res.data.customerId) // 고객이면
//                     commit('setUsernick', res.data.usernick)
//                     commit('setGoalCnt', res.data.goalCnt)
//                     commit('saveStateToStorage'); // atk,userId를 스토리지에 저장
//                     router.push('/')
//                 } else {
//                     alert('로그인 실패. 다시 로그인해주세요') // 임시
//                     // router.push({ name: 'login' })
//                     //     .catch(err => {
//                     //         if (err.name != 'NavigationDuplicated') {
//                     //             throw err;
//                     //         }
//                     //     })
//                 }
//             })
//             .catch((e)=>{
//                 console.log('실패 ',e)
//             })
//         },
//         doReadStateFromStorage({commit}) {
//             commit('readStateFromStorage');
//         },
//         doReissue({commit}, originalReq){
//             console.log("doreissue 메소드로 들오옴")
//             console.log("old : ",this.state.accessToken)
//             console.log('originalReq : ',originalReq)

//             let userType;
//             let userId;

//             if(this.state.dogwalkerId){
//                 userType = 'dogwalker'
//                 userId = this.state.dogwalkerId
//             } else if(this.state.customerId){
//                 userType = 'customer'
//                 userId = this.state.customerId
//             } else {
//                 console.log("유저타입 확인 필요")
//             }

//             return api({
//                 method : 'post',
//                 url : `/auth/reissue`,
//                 data : {
//                     userType : userType, 
//                     oldAtk : this.state.accessToken,
//                     userId : userId
//                 }
//             })
//             .then((resData)=>{
//                 console.log("reissue 결과 : ",resData.data)
//                 commit('setAtkAuth', resData.data.atk) // 새로 발급받은 atk를 state에 저장
//                 commit('saveStateToStorage'); // 새로 발급받은 atk를 localstorage에 저장
//                 console.log('state atk : '+this.state.accessToken)
//                 console.log('localstorage atk : '+localStorage.getItem('login.accessToken'))

//                 console.log('재발급 끝 기존의 요청을 다시한다')
//                 originalReq.headers.Authorization = `Bearer ${localStorage.getItem('login.accessToken')}`
//                 return api(originalReq);
                
                
//             })
//             .catch((e)=>{
//                 console.log(e)
//             })
 
//         },

//         doLogout({commit}){
//             console.log("doLogout 메소드로 들오옴")

//             // commit('reset') // 임시로 여기서
//             return api({
//                 method : 'post',
//                 url : `/auth/logout`,
//             })
//             .then((resData)=>{
//                 console.log("logout 결과 : ",resData.data)
//                 commit('reset') 

//             })
//             .catch((e)=>{
//                 console.log(e)
//             })

//         },


//     }
// })

// export default store;