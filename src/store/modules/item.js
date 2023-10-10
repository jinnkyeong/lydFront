// app, com 등 한 아이템 선택 등 -> 새로고침 방지 필요
const state = {
  // id
  appId:'',
  comId:'',
  reservId : null,
  tempId:'',
  inquiryId : '',
  offerId : '',
  reviewId : '',
  // lecId: '',
  video : {
    url : '',
    title: '',
    lectureTypeId: null,
  },
  userInfo:{

  },


  // search 관련
  selectedCertificates:[],
  selectedPrice:{},
  selectedAges:[],
  selectedGender:null,
  selectedDate:{},
  selectedWeekdays:[],
  selectedDogTypes:[],
  selectedDogAggrs:[],
  selectedTime:{},

  // sort 기준
  orderStrs: [],

  // page
  page:1,

  // 조회수 관련
  views:{
    appView:{
        date : '',
        applicationIds:[]
    },
    
    comView:{
        date:'',
        commisionIds:[]
    },
    
  },

  // app,com 수정하기 관련
  exposeMB : false,

  // 지원서 수정해서 수락 관련
  changeApp: 0,

  // 리뷰상세보기용
  review: {
    reviewId:null,
    dogwalkerId:null,
    customerId:null,
    customerNick:'',
    context:'',
    dirName:'',
    fileName:'',
    extension:'',
    imgUrl:'',
    breed:'',
    addrState:'',
    addrTown:'',
    star:null,
    dogType:null,
    hour:null,
    min:null,
    month:null,
    day:null,
    commentCnt:null,
  }


}
const getters = {}
const mutations = {
  // id
  setAppId(state,appId){
    if(appId){
        state.appId = appId
    }
    // localStorage.setItem('applicationId',state.appId);
  },
  setComId(state,comId){
      if(comId){
          state.comId = comId
      }
      // localStorage.setItem('commisionId',state.comId);
  },
  setReservId(state,reserId){
    state.reservId = reserId
  },
  setInquiryId(state,inquiryId){
    state.inquiryId = inquiryId
  },
  setOfferId(state,offerId){
    state.offerId = offerId
  },
  setReviewId(state,reviewId){
    state.reviewId = reviewId
  },


  // search
  setCertificates(state,list){
    if(list!=null){
        state.selectedCertificates = list
    }
  },
  setAges(state,list){
      if(list!=null){
          state.selectedAges = list
      }
  },
  setPrice(state,obj){
      if(obj!=null){
          state.selectedPrice = obj
      }
  },
  setGender(state, gender){
      if(gender){
          state.selectedGender = gender
      }
  },
  setDate(state, obj){
      if(obj!=null){
          state.selectedDate = obj
      }
  },
  setWeekdays(state, list){
    state.selectedWeekdays = list
  },
  setDogTypes(state, list){
    state.selectedDogTypes = list
  },
  setDogAggrs(state, list){
    state.selectedDogAggrs = list
  },
  setTime(state, obj){
    state.selectedTime = obj
  },
  setTempId(state,tempId){
    if(tempId){
        state.tempId = tempId
    }
  },
  setOrderStrs(state, strs){
    state.orderStrs = strs
  },
  setPage(state, page){
    state.page = page
  },
  // setLecId(state, lecId){
  //   state.lecId = lecId
  // },

  setVideo(state, video){
    state.video.url = video.url,
    state.video.title = video.title,
    state.video.lectureTypeId = video.lectureTypeId

  },

  //조회수 관련
  addViewApp(state, appView){    
    state.views.appView.date = appView.date
    state.views.appView.applicationIds.push(appView.appId)
    const set = new Set(state.views.appView.applicationIds);
    const uniqueArr = [...set];
    state.views.appView.applicationIds = uniqueArr; // 중복제거
  },
  addViewCom(state, comView){
    state.views.comView.date = comView.date
    state.views.comView.commisionIds.push(comView.comId)
    const set = new Set(state.views.comView.commisionIds);
    const uniqueArr = [...set];
    state.views.comView.commisionIds = uniqueArr; // 중복제거
  },

  setExposeMB(state, mb){
    state.exposeMB = mb
  },
  changeApp(state, appId){
    state.changeApp =  appId
  },

  // 남이 프로필 보기
  setUserInfo(state, info){
    if(info.userId && info.userType){
      state.userInfo.userId = info.userId
      state.userInfo.userType = info.userType
    }
  },
  // 리뷰 상세보기용
  setReview(state, review){
    if(review){
      state.reviewId = review.reviewId
      state.dogwalkerId = review.dogwalkerId
      state.customerId = review.customerId
      state.customerNick = review.customerNick
      state.context = review.context
      state.dirName = review.dirName
      state.fileName = review.fileName
      state.extension = review.extension
      state.breed = review.breed
      state.addrState = review.addrState
      state.star = review.star
      state.dogType = review.dogType
      state.hour = review.hour
      state.min = review.min
      state.month = review.month
      state.day = review.day
      state.commentCnt = review.commentCnt
    }
  }


}
const actions = {
  updateOrders({state, commit}, directionProperty){
    let dirPro = directionProperty.split('/')

    let orderStrs = state.orderStrs
    // console.log("before orderStrs : ",orderStrs)
    if(state.orderStrs.length >= 1){
      for (let i = 0; i < state.orderStrs.length; i++) {
        if(state.orderStrs[i].includes(dirPro[1])){
          orderStrs.splice(i,1)
        }
      }
      orderStrs.push(`${dirPro[0]}/${dirPro[1]}`)
      console.log("after orderStrs : ",orderStrs)
      commit('setOrderStrs', orderStrs)
      
    } else {
      orderStrs.push(`${dirPro[0]}/${dirPro[1]}`)
      console.log("after orderStrs : ",orderStrs)

      commit('setOrderStrs', orderStrs)

    }

  },
  deleteOrders({state, commit}, directionProperty){
    let dirPro = directionProperty.split('/')
    let orderStrs = state.orderStrs

    for (let i = 0; i < state.orderStrs.length; i++) {
      if(state.orderStrs[i].includes(dirPro[1])){
        orderStrs.splice(i,1)
      }
    }
          console.log("del : ",orderStrs)

    commit('setOrderStrs', orderStrs)
  },
 

}
export default { state, getters, mutations, actions }