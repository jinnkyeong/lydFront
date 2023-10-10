<template>
  <v-form ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-spacer />
        <v-col cols="12" md="10">
          <v-containter>
            <v-row style="height: 200px"></v-row>
            <v-row justify="center" no-gutters style="height: 20px">
              <div class="title">의뢰서 수정하기</div>
            </v-row>
            <v-row style="height: 100px"></v-row>
            <!--전체-->
            <v-row no-gutters class="pa-16 ma-16">
              <v-container>
                <!-- 닉네임 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">닉네임</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-text-field
                      v-model="info.nick"
                      :rules="rules.nick_rule"
                      variant="outlined"
                      placeholder="문자열로 입력해주세요"></v-text-field>
                  </v-row>
                </v-container>
                <!-- 성별 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">성별</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-select
                      v-model="info.formatGen"
                      :items="['남성', '여성']"
                      placeholder="성별을 선택해주세요"
                      variant="outlined"></v-select>
                  </v-row>
                </v-container>
                <!-- 나이 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">태어난 연도</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-select
                      v-model="info.birthYear"
                      placeholder="태어난 연도"
                      :items="birthYears"
                      variant="outlined"></v-select>
                  </v-row>
                </v-container>
                <!-- 주소 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">주소</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-text-field
                      v-model="info.addrState"
                      variant="outlined"
                      readonly
                      placeholder="시 또는 도(중복가능)"></v-text-field>
                    <v-text-field
                      v-model="info.addrTown"
                      variant="outlined"
                      readonly
                      placeholder="시, 군 또는 구(중복가능)"></v-text-field>

                    <v-btn @click="SearchAddr"> 주소 찾기 </v-btn>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="info.addrDetail"
                      variant="outlined"
                      placeholder="상세주소"></v-text-field>
                  </v-row>
                </v-container>
                <!-- 산책날짜 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">산책 날짜</div>
                  </v-row>
                  <v-row justify="end">
                    <div>
                      <input
                        type="date"
                        class="form-control"
                        required
                        :min="todayDate"
                        v-model="inputDate" />
                    </div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-select
                      v-model="info.month"
                      readonly
                      placeholder="선택해주세요"
                      variant="outlined"></v-select>
                    <div class="unit-mark">월</div>
                    <v-select
                      v-model="info.day"
                      placeholder="선택해주세요"
                      readonly
                      variant="outlined"></v-select>
                    <div class="unit-mark">일</div>
                  </v-row>
                </v-container>
                <!-- 산책시간 -->
                <v-container class="field">
                  {{ timeMessage }}?
                  <v-row class="field-top">
                    <div class="field-top-label">산책 시간</div>
                  </v-row>
                  <v-row class="field-middle">
                    <div class="field-middle-label">시작 시간</div>
                    <v-select
                      v-model="info.startHour"
                      placeholder="선택해주세요"
                      :items="hourList"
                      variant="outlined"></v-select>
                    <div class="unit-mark">시</div>
                    <v-select
                      v-model="info.startMin"
                      placeholder="선택해주세요"
                      :items="minList"
                      variant="outlined"></v-select>
                    <div class="unit-mark">분</div>
                  </v-row>
                  <v-row class="field-middle">
                    <div class="field-middle-label">종료 시간</div>

                    <v-select
                      v-model="info.endHour"
                      placeholder="선택해주세요"
                      :items="hourList"
                      variant="outlined"></v-select>
                    <div class="unit-mark">시</div>
                    <v-select
                      v-model="info.endMin"
                      placeholder="선택해주세요"
                      :items="minList"
                      variant="outlined"></v-select>
                    <div class="unit-mark">분</div>
                  </v-row>
                </v-container>
                <!-- 자격증 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">희망하는 자격증</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-select
                      v-model="certificate"
                      placeholder="자격증을 선택하세요(중복가능)"
                      :items="[
                        '훈련사',
                        '도그워커',
                        '반려동물행동교정사',
                        '반려견지도사',
                        '반려동물장례지도사',
                        '애견브리더',
                        '펫시터강사',
                        '펫시터',
                        '동물매개활동관리사',
                        '애견미용사',
                        '반려동물식품관리사',
                      ]"
                      variant="outlined"></v-select>
                    <v-btn @click="selectCert"> 선택 </v-btn>
                  </v-row>
                  <v-row>
                    <Chip
                      :selectedList="formatCertificates"
                      @cancelChip="cancelChipCert" />
                  </v-row>
                </v-container>
                <!-- 금액 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">희망 이용금액</div>
                    <div class="field-top-desc">
                      이용금액은 고객과 도그워커 사이에서 정해지며,
                      loveyourdog에서는 이용금액에 대해 관여하지 않습니다. 다만
                      일반적으로 이용금액은 최소 10000원 ~ 최대 25000원 사이에서
                      정해집니다.
                    </div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-text-field
                      v-model="info.price"
                      :rules="rules.price_rule"
                      variant="outlined"
                      placeholder="숫자만 입력해주세요"
                      prefix="시간당"
                      suffix="원"
                      :disabled="disableFields()"></v-text-field>
                  </v-row>
                  <v-row class="field-middle">
                    <v-checkbox
                      v-model="average"
                      label="평균 이용금액으로 설정(15000원(임시))"></v-checkbox>
                  </v-row>
                </v-container>
                <!-- 반려견 이름 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">반려견 이름</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-text-field
                      v-model="info.dogName"
                      variant="outlined"
                      placeholder="문자열로 입력해주세요"></v-text-field>
                  </v-row>
                </v-container>
                <!-- 반려견 나이 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">반려견 나이</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-text-field
                      v-model="info.dogAge"
                      variant="outlined"
                      placeholder="문자열로 입력해주세요"></v-text-field>
                  </v-row>
                </v-container>
                <!-- 반려견 견종 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">반려견 견종</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-text-field
                      v-model="info.breed"
                      variant="outlined"
                      placeholder="문자열로 입력해주세요"></v-text-field>
                  </v-row>
                </v-container>
                <!-- 반려견 유형 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">반려견 유형(소/중/대형)</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-radio-group v-model="info.dogType" column>
                      <v-radio label="소형견" :value="1"></v-radio>
                      <v-radio label="중형견" :value="2"></v-radio>
                      <v-radio label="대형견" :value="3"></v-radio>
                      <v-radio label="초대형견" :value="4"></v-radio>
                    </v-radio-group>
                  </v-row>
                </v-container>
                <!-- 반려견 공격성 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">공격성</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-radio-group v-model="info.dogAggr" column>
                      <v-radio label="매우 약함" :value="1"></v-radio>
                      <v-radio label="약함" :value="2"></v-radio>
                      <v-radio label="보통" :value="3"></v-radio>
                      <v-radio label="강함" :value="4"></v-radio>
                      <v-radio label="매우 강함" :value="5"></v-radio>
                    </v-radio-group>
                  </v-row>
                </v-container>
                <!-- 반려견 건강상태 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">건강상태</div>
                  </v-row>
                  <v-row class="field-middle">
                    <v-radio-group v-model="info.dogHealth" column>
                      <v-radio label="매우 나쁨" :value="1"></v-radio>
                      <v-radio label="나쁨" :value="2"></v-radio>
                      <v-radio label="보통" :value="3"></v-radio>
                      <v-radio label="좋음" :value="4"></v-radio>
                      <v-radio label="매우 좋음" :value="5"></v-radio>
                    </v-radio-group>
                  </v-row>
                </v-container>
                <!-- 산책로 -->
                <!-- <v-container class="field">
                  <v-row class="mt-16">
                    <v-field-label ref_for="info.road"
                      >산책로 지정</v-field-label
                    >
                    <v-text-field
                      v-model="info.road"
                      variant="underlined"></v-text-field>
                  </v-row>
                </v-container> -->
                <!-- 유의할 점 -->
                <v-container class="field">
                  <v-row class="field-top">
                    <div class="field-top-label">요청사항</div>
                    <div class="field-top-desc">
                      <div>
                        담당 도그워커에게 특별히 당부하고 싶은 요청사항을
                        적어주세요!
                      </div>
                      <div>
                        (도그워커가 모든 요청사항을 완벽히 수행할 것을 보장하지
                        않으며, 요청사항은 도그워커의 효과적으로 산책을 하는
                        데에 도움이 됩니다)
                      </div>
                    </div>
                  </v-row>
                  <v-row justify="end">
                    <v-btn class="ma-5" color="primary" @click="addCusRequire">
                      추가
                    </v-btn>
                  </v-row>
                  <v-row class="field-middle" v-for="i in addCnt" :key="i">
                    <v-col cols="12" md="1">
                      <div class="field-middle-label">{{ i }}</div>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-text-field
                        v-model="info.cusRequires[i]"
                        variant="outlined"
                        counter
                        label="요청사항"
                        maxlength="100"
                        single-line></v-text-field>
                    </v-col>
                    <v-col cols="12" md="1">
                      <div @click="clickDelReq(i)">닫기</div>
                    </v-col>
                  </v-row>
                </v-container>

                <!-- 수정하기 : 해당 의뢰서 작성자의 id = 현재 유저의 id -->
                <v-container class="field">
                  <v-row class="mt-16">
                    <v-spacer />
                    <v-col cols="12" md="4">
                      <ConfirmMod @mod="modifyApp" />
                    </v-col>
                    <v-spacer />
                    <v-col cols="12" md="4">
                      <ConfirmDel @del="deleteApp" />
                    </v-col>
                    <v-spacer />
                  </v-row>
                </v-container>
              </v-container>
            </v-row>
            <v-row style="height: 200px"></v-row>
          </v-containter>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import commitApi from '@/api/commitApi';

import searchApi from '@/api/searchApi';
import ConfirmMod from '@/views/dialog/confirm/ConfirmMod';
import ConfirmDel from '@/views/dialog/confirm/ConfirmDel';

import dayjs from 'dayjs';

export default {
  created() {
    //상세보기 데이터 가져오기
    commitApi
      .getCmById(this.$store.state.item.comId)
      .then((res) => {
        console.log('result : ', res.data);
        this.info = res.data;
        this.$store.commit('setItems', res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // 년도 데이터
    const thisYear = new Date().getFullYear();
    const array = Array(100)
      .fill()
      .map((v, i) => thisYear - i);
    this.birthYears = array;
    // 시간 데이터
    this.hourList = Array(24)
      .fill()
      .map((v, i) => i); // 0~23
    this.minList = Array(60)
      .fill()
      .map((v, i) => i); // 0~59
  },
  components: {
    ConfirmMod,
    ConfirmDel,
  },
  data() {
    return {
      info: {},
      birthYear: null,
      birthYears: [],
      // 입력형식검사
      rules: {
        name_rule: [
          // 한글 2~4자 이내
          (v) => !!v || '이름은 필수 입력사항입니다.',
          (v) => /^[가-힣]{2,4}$/.test(v) || '한글 2~4자 이내로 입력해주세요',
        ],
        nick_rule: [
          // 글자수만 제한 2~20
          (v) => !!v || '닉네임은 필수 입력사항입니다.',
          (v) =>
            /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/.test(v) ||
            '한글 또는 영문 2~20자 이내로 입력해주세요',
        ],

        phone_rule: [
          (v) => !!v || '전화번호는 필수 입력사항입니다.',
          (v) => /^[0-9]{9,11}$/.test(v) || '숫자로만 입력해주세요',
        ],
        price_rule: [
          (v) => !!v || '시간 당 가격은 필수 입력사항입니다.',
          (v) => /^[0-9]+$/.test(v) || '원 단위의 가격을 숫자로 입력해주세요',
        ],
        account_rule: [
          (v) => !!v || '입금계좌번호는 필수 입력사항입니다.',
          (v) => /^[0-9]+$/.test(v) || '숫자만 입력해주세요',
        ],
        sentence_rule: [
          (v) => !!v || '각오의 한 마디는 필수 입력사항입니다.',
          (v) =>
            /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{10,50}$/.test(v) ||
            '10자 이상 50자 이내로 입력해주세요',
        ],
      },
      inputDate: null,
      // dateMessage: '',
      hourList: null,
      minList: null,
      timeMessage: '',
    };
  },
  computed: {
    todayDate() {
      return dayjs().format('YYYY-MM-DD');
    },
  },
  methods: {
    modifyCom(mod) {
      console.log(this.info);
      console.log(mod);
      console.log(this.$store.state.item.comId); // string
      if (mod) {
        //null 체크
        searchApi
          .modifyCom(this.$store.state.item.comId, this.info)
          .then((res) => {
            console.log(res.data);
            // this.$router.push('detailDw')
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteCom(del) {
      if (del) {
        searchApi
          .deleteCom(this.$store.state.item.comId)
          .then((res) => {
            console.log(res.data);
            // this.$router.push('detailDw')
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    // 주소찾기
    SearchAddr() {
      //카카오 지도 발생
      new window.daum.Postcode({
        oncomplete: (data) => {
          //선택시 입력값 세팅
          console.log(data);
          this.info.addrState = data.sido;
          this.info.addrTown = data.sigungu;
        },
      }).open();
    },
    selectLoc() {
      // chip으로 출력용
      const keyword = this.state + ' ' + this.town;
      if (!this.selectedLocStrings.includes(keyword)) {
        this.selectedLocStrings.push(keyword); // 중복배제
      }
    },
    selectWeek() {
      const keyword = this.weekday;
      if (!this.formatWeekdays.includes(keyword)) {
        // 중복배제
        this.formatWeekdays.push(keyword);
      }
    },
    selectCert() {
      const cert = this.certificate;
      if (!this.formatCertificates.includes(cert)) {
        // 중복배제
        this.formatCertificates.push(cert);
      }
    },
    cancelChipLoc(one) {
      // 출력용 삭제
      if (this.selectedLocStrings.length > 0) {
        for (let i = 0; i < this.selectedLocStrings.length; i++) {
          if (this.selectedLocStrings[i] === one) {
            this.selectedLocStrings.splice(i, 1);
          }
        }
      }
    },
    cancelChipWeek(one) {
      if (this.formatWeekdays.length > 0) {
        for (let i = 0; i < this.formatWeekdays.length; i++) {
          if (this.formatWeekdays[i] === one) {
            this.formatWeekdays.splice(i, 1);
          }
        }
      }
    },
    cancelChipCert(one) {
      if (this.formatCertificates.length > 0) {
        for (let i = 0; i < this.formatCertificates.length; i++) {
          if (this.formatCertificates[i] === one) {
            this.formatCertificates.splice(i, 1);
          }
        }
      }
    },
    modifyApp(mod) {
      // 성별 - 키워드로 변환
      this.info.gen = this.info.formatGen === '남성' ? 'm' : 'f';
      delete this.info.formatGen;
      // 자격증 - 키워드로 변환
      this.info.certificateKeywords = []; // 초기화 필요
      for (let i = 0; i < this.formatCertificates.length; i++) {
        let key = format.convertFromCertificate(this.formatCertificates[i]);
        this.info.certificateKeywords.push(key); // 중복X
      }

      // 근무장소
      this.info.locations = []; // 초기화 필요
      for (let i = 0; i < this.selectedLocStrings.length; i++) {
        // if (!this.locationList.includes(this.selectedLocStrings[i])) {
        let strs = this.selectedLocStrings[i].split(' ');
        const locObj = {
          state: strs[0],
          town: strs[1],
        };
        this.info.locations.push(locObj); // 중복X
        // }
      }
      // 요일 - 키워드로 변환
      this.info.weekdayKeywords = []; // 초기화 필요
      for (let i = 0; i < this.formatWeekdays.length; i++) {
        let key = format.formatWeekdayToKey(this.formatWeekdays[i]);
        // if (!this.weekdayList.includes(key)) {
        this.info.weekdayKeywords.push(key);
        // }
      }
      console.log('this.info', this.info);
      if (mod) {
        this.$refs.form //입력형식검사
          .validate()
          .then((res) => {
            if (res.valid) {
              searchApi
                .modifyApp(this.$store.state.item.appId, this.info)
                .then((res) => {
                  console.log('modifyApp', res.data);

                  // 문의 수락 시 - 변경하여 수락 선택한 경우
                  if (
                    this.$store.state.item.changeApp ===
                    this.$store.state.item.appId
                  ) {
                    this.$store.commit('setOpen', true);
                    this.$router.push('/dwInfo/dwInfoInquiry/acceptChangeInq'); // 수락여부 확인 창으로
                    // 그냥 자기 지원서 변경한 경우
                  } else {
                    this.$router.push('detailDw');
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              alert('다시 입력하세요');
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    disableFields() {
      if (this.average) {
        this.info.price = 15000; // 임시로
        return true;
      } else {
        return false;
      }
    },

    deleteApp(del) {
      if (del) {
        searchApi
          .deleteApp(this.$store.state.item.appId)
          .then((res) => {
            console.log(res.data);
            this.$router.push('detailDw');
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  watch: {
    inputDate() {
      if (this.inputDate) {
        const date1 = new Date(this.inputDate);
        const date2 = new Date(this.todayDate);
        if (date1 < date2) {
          // 필요없을듯
          // this.dateMessage = '오늘 날짜 이전은 지정할 수 없습니다';
          this.inputDate =
            date2.getFullYear() +
            '-' +
            date2.getMonth() +
            '-' +
            date2.getDate();
          this.info.year = date2.getFullYear();
          this.info.month = date2.getMonth();
          this.info.day = date2.getDate();
        } else {
          // this.dateMessage = '';
          let arr = this.inputDate.split('-');
          this.info.year = arr[0];
          this.info.month = arr[1];
          this.info.day = arr[2];
        }
      }
    },
    endHour() {
      if (this.startHour) {
        if (this.startHour > this.endHour) {
          this.timeMessage = '시작시간은 종료시간보다 길어야 합니다';
        } else if (this.startHour === this.endHour) {
          if (this.startMin && this.endMin) {
            if (this.startMin >= this.endMin) {
              this.timeMessage = '시작시간은 종료시간보다 길어야 합니다';
            } else {
              return;
            }
          }
        } else {
          return;
        }
      }
    },
  },
};
</script>

<style></style>
