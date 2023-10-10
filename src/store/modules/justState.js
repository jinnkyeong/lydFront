// 단순 state 변수

const state = {

  open: false,

  alert:false,
  alert_setting :{
      type : '', // success, info, warning, error
      title : '',
      text : ''
  },


  alarm_setting:{
    msgType : null,
    text : '',
    button_text : '',
    item : null,
  },
  alarm1:false,
  alarm2:false,
  alarm3:false,
  alarm4:false,
  alarm5:false,
  firstAlarms:[],
  secondAlarms:[],
  thirdAlarms:[],
  forthAlarms:[],
  fifthAlarms:[],
  


  items : {},

  // 회원가입 이메일 인증 관련
  complete : false,

  // 댓글 보기 용
  toggles:[],

  reply: 0,

  testInputs:[]

}
const getters = {}
const mutations = {
  setOpen(state, open){
    console.log('setopen ',open)
    state.open = open
  },
  setAlert(state,config){
    state.alert = config.alert
    state.alert_setting.type = config.type
    state.alert_setting.title = config.title
    state.alert_setting.text = config.text
    // console.log(state.alert)
    // console.log(state.alert_setting)
  },


  setAlarm(state, alarmConf){
    state.alarm_setting.msgType = alarmConf.msgType,
    state.alarm_setting.text = alarmConf.text,
    state.alarm_setting.button_text  = alarmConf.button_text,
    state.item = alarmConf.item
  },

  setItems(state, items){
    // console.log('store items  :',items)
    state.items = items
  },
  setComplete(state, complete){
    state.complete = complete
  },
  setAlarm1(state, a){
    state.alarm1 = a
  },
  setAlarm2(state, a){
    state.alarm2 = a
    console.log('state.alarm2 ',state.alarm2)
  },
  setAlarm3(state, a){
    state.alarm3 = a
  },
  setAlarm4(state, a){
    state.alarm4 = a
  },
  setAlarm5(state, a){
    state.alarm5 = a
  },
  setFirstAlarms(state,list){
    state.firstAlarms = list
  },
  setSecondAlarms(state,list){
    state.secondAlarms = list
  },
  setThirdAlarms(state,list){
    state.thirdAlarms = list
  },
  setForthAlarms(state,list){
    state.forthAlarms = list
  },
  setFifthAlarms(state,list){
    state.fifthAlarms = list
  },
  setToggles(state, toggle){
    let dupl = false;
    if(toggle.reviewId && toggle.commentId && toggle.bool){
      for (let i = 0; i < state.toggles.length; i++) {
        if(state.toggles[i].reviewId === toggle.reviewId &&
          state.toggles[i].parentId === toggle.parentId &&
          state.toggles[i].commentId === toggle.commentId ){
            state.toggles[i].bool = toggle.bool
            console.log('일치. true 변경')
            dupl = true
        }
      }
      if(!dupl){
        console.log('일치아님. 추가')
        state.toggles.push(toggle)
      }
    } else {
      console.log('toggle의 요소가 누락되었씁니다')
    }
    console.log('setToggles결과 : ',state.toggles)
  
  },
  setReply(state,reply){
    state.reply = reply
  },
  // 테스트
  addTestInput(state, input){
    // templist로 옮겨서 작업
    let tempList =  state.testInputs
    if(input){
      if(tempList.length <= 0){ // 처음 저장
        tempList.push(input)

      } else { // 데이터 존재
         // 이미 답이 있으면 제거
        for (let i = 0; i < tempList.length; i++) { 
          if(tempList[i].questionTypeId == input.questionTypeId){
            tempList.splice(i,1)
            break;
          }   
        }
        // 새로운 답 추가
        tempList.push(input)
      }
      // state에 다시 올리기
      state.testInputs = tempList
      console.log('addTestInput result : ',state.testInputs)
    }
  },

}
const actions = {
  doOpen({commit}, bool){
    commit('setOpen',bool)
  }
}
export default { state, getters, mutations, actions }