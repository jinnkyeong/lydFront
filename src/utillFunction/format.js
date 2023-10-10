
export default {


  
  // 2023-08-23T06:33:06 -> 2023년 8월 23일 오전 6시 33분
  formatDateTime(dt) {
    const date = dt.split('T')[0];
    const time = dt.split('T')[1];

    const year = date.split('-')[0];
    let month;
    let day;
    if(date.split('-')[1].charAt(0)=='0'){
      month = date.split('-')[1].substr(1,1) // 09 -> 9
    } else {
      month =  date.split('-')[1] // 10 -> 10
    }
    if(date.split('-')[2].charAt(0)=='0'){
      day = date.split('-')[2].substr(1,1) // 09 -> 9
    } else {
      day =  date.split('-')[2] // 10 -> 10
    }
    let apm = '오전';
    let hour;
    if (time.split(':')[0] > 12) {
      hour = time.split(':')[0] - 12;
      apm = '오후';
    } else {
      hour = time.split(':')[0];
    }
    const min = time.split(':')[1];

    return (
      year +
      '년 ' +
      month +
      '월 ' +
      day +
      '일 ' +
      apm +
      ' ' +
      hour +
      '시 ' +
      min +
      '분'
    );
  },
  // 2023-08-23T06:33:06 -> 2023년 8월 23일
  formatDate(dt) {
  
    let date = dt.split('T')[0];
    let time = dt.split('T')[1];

    let year = date.split('-')[0];
    let month;
    let day;
    if(date.split('-')[1].charAt(0)=='0'){
      month = date.split('-')[1].substr(1,1) // 09 -> 9
    } else {
      month =  date.split('-')[1] // 10 -> 10
    }
    if(date.split('-')[2].charAt(0)=='0'){
      day = date.split('-')[2].substr(1,1) // 09 -> 9
    } else {
      day =  date.split('-')[2] // 10 -> 10
    }
    return (
      year +
      '년 ' +
      month +
      '월 ' +
      day +
      '일 ' 
    );
  },
  // 2023-08-23T06:33:06 -> 오전 6시 33분
  formatDTtoTime(dt){
    const time = dt.split('T')[1];
    let apm = '오전';
    let hour;
    if (time.split(':')[0] > 12) {
      hour = time.split(':')[0] - 12;
      apm = '오후';
    } else {
      hour = time.split(':')[0];
    }
    const min = time.split(':')[1];

    return (
      apm +
      ' ' +
      hour +
      '시 ' +
      min +
      '분'
    );
  },
  // Date -> 2021-05-30 15:47:29
  formatDateTimeForReq(dt){
    var year = dt.getFullYear();
    var month = ('0' + (dt.getMonth() + 1)).slice(-2);
    var day = ('0' + dt.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;
    // console.log(dateString);
    // 결과 : 2021-05-30
    var hours = ('0' + dt.getHours()).slice(-2); 
    var minutes = ('0' + dt.getMinutes()).slice(-2);
    var seconds = ('0' + dt.getSeconds()).slice(-2); 
    var timeString = hours + ':' + minutes  + ':' + seconds;
    // console.log(timeString);
    // 결과 : 15:47:29
    return dateString+" "+timeString
  },

  // start, end : 시작 및 종료 DateTime(string 타입)
  formatDuration(start, end){
    let result='';
    if (start && end) {
      const diffSec = new Date(end).getTime() - new Date(start).getTime(); // iso string -> date
      const diffHour = diffSec / (60 * 60 * 1000);
      const leftMin = (diffSec % (60 * 60 * 1000)) / (60 * 1000);
      const leftSec = (diffSec % (60 * 60 * 1000)) % (60 * 1000) / 1000;
      if(diffHour>=1){
        result += Math.round(diffHour)+"시간 "  
      }
      if(leftMin>=1){
        result += Math.round(leftMin)+"분 "
      }
      if(leftSec>=1){
        result += leftSec+"초" 
      }
    } else {
      console.log('가격,시작끝날짜 안들어옴');
    }
    
    return result
  },
  // 총가격
  totalPrice(price, start, end) {
    console.log('start', start)
    console.log('end', end)
    let tot;
    if (price && start && end) {
      const diffMSec = new Date(end).getTime() - new Date(start).getTime(); // iso string -> date
      const diffHour = diffMSec / (60 * 60 * 1000);
      const leftMin = (diffMSec % (60 * 60 * 1000)) / (60 * 1000);
      tot = price * diffHour + price * (leftMin / 60).toFixed(1);
    } else {
      console.log('가격,시작끝날짜 안들어옴');
    }
    return Math.round(tot);
  },

  // hour min ->  오후 1시 2분
  formatTime(hour, min) {
    let apm;
    let hourStr;
    if (hour > 12) {
      apm = '오후';
      hourStr = hour - 12;
    } else {
      apm = '오전';
      hourStr = hour;
    }
    return apm + ' ' + hourStr + '시 ' + min + '분';
  },
  // keyword -> certificate
  certificateConvert(certKey) {
    if (certKey) {
      switch (certKey) {
        case 'dw':
          return '도그워커';
        case 'trn':
          return '훈련사';
        case 'act':
          return '반려동물행동교정사';
        case 'lea':
          return '반려견지도사';
        case 'fun':
          return '반려동물장례지도사';
        case 'bre':
          return '애견브리더';
        case 'lec':
          return '펫시터강사';
        case 'sit':
          return '펫시터';
        case 'mut':
          return '동물매개활동관리사';
        case 'sty':
          return '애견미용사';
        case 'foo':
          return '반려동물식품관리사';

        default:
          break;
      }
    }
  },

  //예약상태
  formatStatus(status) {
    let result;
    switch (status) {
      case 0:
        result = '취소 완료';
        break;
      case 1:
        result = '예약 완료';
        break;
      case 2:
        result = '결제 완료';
        break;
      case 3:
        result = '산책 중';
        break;
      case 4:
        result = '산책 완료';
        break;
      case 5:
        result = '정산 중';
        break;
      case 6:
        result = '정산 완료';
        break;
      default:
        break;
    }
    return result;
  },
  formatWeekday(weekKey){
    switch (weekKey){
      case "sun" : return "일요일"
      case "mon" : return "월요일"
      case "tue" : return "화요일"
      case "wed" : return "수요일"
      case "thu" : return "목요일"
      case "fri" : return "금요일"
      case "sat" : return "토요일"
    }
  },
  formatWeekdayToKey(weekday){
    switch (weekday){
      case "일요일" : return "sun"
      case "월요일" : return "mon"
      case "화요일" : return "tue"
      case "수요일" : return "wed"
      case "목요일" : return "thu"
      case "금요일" : return "fri"
      case "토요일" : return "sat"
    }
  },
  convertFromCertificate(cert){
    switch (cert) {
      case '도그워커':
        return 'dw';
      case '훈련사':
        return 'trn';
      case '반려동물행동교정사':
        return 'act';
      case '반려견지도사':
        return 'lea';
      case '반려동물장례지도사':
        return 'fun';
      case '애견브리더':
        return 'bre';
      case '펫시터강사':
        return 'lec';
      case '펫시터':
        return 'sit';
      case '동물매개활동관리사':
        return 'mut';
      case '애견미용사':
        return 'sty';
      case '반려동물식품관리사':
        return 'foo';

      default:
        break;
    }
  },
  convertDogType(type){
    switch (type) {
      case '소형견':
          return 1
      case '중형견':
          return 2
      case '대형견':
          return 3
      case '초대형견':
          return 4
      default:
        break;
    }
  },
  convertDogAggr(aggr){
    switch (aggr) {
      case '매우 양호':
          return 1
      case '약간 양호':
          return 2
      case '보통':
          return 3
      case '약간 심함':
          return 4
      case '매우 심함':
          return 5
      default:
        break;              
    }
  },
  dogAggrConvert(aggrCode) {
    switch (aggrCode) {
      case 1:
        return '매우 양호';
      case 2:
        return '약간 양호';
      case 3:
        return '보통';
      case 4:
        return '약간 심함';
      case 5:
        return '매우 심함';
      default:
        return aggrCode;
    }
  },
  dogHealthConvert(healthCode) {
    switch (healthCode) {
      case 1:
        return '매우 나쁨';
      case 2:
        return '약간 나쁨';
      case 3:
        return '보통';
      case 4:
        return '약간 좋음';
      case 5:
        return '매우 좋음';
      default:
        return healthCode;
    }
  },
  dogTypeConvert(dogTypeCode) {
    if (dogTypeCode) {
      switch (dogTypeCode) {
        case 1:
          return '소형견';
        case 2:
          return '중형견';
        case 3:
          return '대형견';
        case 4:
          return '초대형견';
        default:
          return dogTypeCode;
      }
    }
  },
  // 'A' -> 초고수
  formatGrade(grade){
    if (grade) {
      switch (grade) {
        case 'A':
          return '초고수';
        case 'B':
          return '프로';
        case 'C':
          return '뉴비';
        default:
          return grade;
      }
    }
  }
}