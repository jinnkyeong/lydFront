<template>
  <v-form ref="form" lazy-validation>
    <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-container>
          <v-row justify="center" class="mt-16" no-gutters>
            <h2>도그워커 지원하기</h2>
          </v-row>

          <div class="pa-16 ma-16">
            <!-- 이름 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">이름</div>
              </v-row>
              <v-row class="field-middle">
                <v-text-field
                  v-model="info.name"
                  :rules="rules.name_rule"
                  variant="outlined"
                  placeholder="문자열로 입력해주세요"></v-text-field>
              </v-row>
            </v-container>
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
            <!-- 생년도 -->
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
            <!-- 성별 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">성별</div>
              </v-row>
              <v-row class="field-middle">
                <v-select
                  v-model="info.gen"
                  :items="['남성', '여성']"
                  placeholder="성별을 선택해주세요"
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

                <v-btn @click="SearchAddr" color="primary" class="mt-7">
                  주소 찾기
                </v-btn>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="info.addrDetail"
                  variant="outlined"
                  placeholder="상세주소"></v-text-field>
              </v-row>
            </v-container>
            <!-- 거주지 외 활동가능지역 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">활동가능지역(거주지 외)</div>
              </v-row>
              <v-row class="field-middle">
                <v-select
                  v-model="state"
                  placeholder="시 또는 도"
                  :items="sidos"
                  variant="outlined"></v-select>
                <v-select
                  v-model="town"
                  placeholder="시, 군 또는 구"
                  :items="sigungus"
                  variant="outlined"></v-select>
                <v-btn @click="selectLoc" color="primary" class="mt-7">
                  선택
                </v-btn>
              </v-row>
              <v-row>
                <Chip
                  :selectedList="selectedLocStrings"
                  @cancelChip="cancelChipLoc" />
              </v-row>
            </v-container>
            <!-- 근무가능요일 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">근무가능요일</div>
              </v-row>
              <v-row class="field-middle">
                <v-select
                  v-model="weekday"
                  placeholder="요일을 선택하세요(중복가능)"
                  :items="[
                    '월요일',
                    '화요일',
                    '수요일',
                    '목요일',
                    '금요일',
                    '토요일',
                    '일요일',
                  ]"
                  variant="outlined"></v-select>
                <v-btn @click="selectWeek" color="primary" class="mt-7">
                  선택
                </v-btn>
              </v-row>
              <v-row>
                <Chip
                  :selectedList="info.weekdayNames"
                  @cancelChip="cancelChipWeek" />
              </v-row>
            </v-container>
            <!-- 관련 자격증 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">관련 자격증</div>
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
                <v-btn @click="selectCert" color="primary" class="mt-7">
                  선택
                </v-btn>
              </v-row>
              <v-row>
                <Chip
                  :selectedList="info.certificateKeywords"
                  @cancelChip="cancelChipCert" />
              </v-row>
            </v-container>
            <!-- 연락처 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">연락처</div>
              </v-row>
              <v-row class="field-middle">
                <v-text-field
                  v-model="info.phone"
                  :rules="rules.phone_rule"
                  variant="outlined"
                  placeholder="'-'로 구분하여 입력해주세요(예를 들어 010-0000-0000)"></v-text-field>
              </v-row>
            </v-container>

            <!-- 반려경험 유무 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">반려경험 유무</div>
              </v-row>
              <v-row class="field-middle">
                <v-radio-group v-model="info.adopted" column>
                  <v-radio label="있음" :value="true"></v-radio>
                  <v-radio label="없음" :value="false"></v-radio>
                </v-radio-group>
              </v-row>
            </v-container>
            <!-- 키웠던 동물 -->
            <v-container v-if="info.adopted" class="field">
              <v-row class="field-top">
                <div class="field-top-label">키웠던 동물</div>
              </v-row>
              <v-row class="field-middle">
                <v-radio-group v-model="info.adoptedWhich" column>
                  <v-radio label="고양이" value="1"></v-radio>
                  <v-radio label="강아지" value="2"></v-radio>
                  <v-radio label="그외" value="3"></v-radio>
                </v-radio-group>
              </v-row>
            </v-container>
            <!-- 반려기간 -->
            <v-container v-if="info.adopted" class="field">
              <v-row class="field-top">
                <div class="field-top-label">반려기간(월 단위)</div>
              </v-row>
              <v-row class="field-middle">
                <v-text-field
                  v-model="info.adoptedMonth"
                  variant="outlined"
                  suffix="월"
                  placeholder="반려기간을 월 단위로 숫자로 입력해주세요"></v-text-field>
              </v-row>
            </v-container>

            <!-- 희망하는 강아지 유형 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">희망하는 강아지 유형</div>
              </v-row>
              <v-row class="field-middle">
                <v-radio-group v-model="info.petType" column>
                  <v-radio label="소형견" value="1"></v-radio>
                  <v-radio label="중형견" value="2"></v-radio>
                  <v-radio label="대형견" value="3"></v-radio>
                  <v-radio label="초대형견" value="4"></v-radio>
                </v-radio-group>
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

            <!-- 입금계좌 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">입금계좌</div>
                <div class="field-top-desc">
                  산책 업무 수행 후 정산을 받을 입금계좌를 입력해주세요
                </div>
              </v-row>
              <v-row class="field-middle">
                <v-select
                  v-model="info.depositBank"
                  placeholder="입금계좌의 은행명을 선택해주세요"
                  :items="[
                    '신한은행',
                    'KEB하나은행',
                    'SC제일은행',
                    '농협',
                    '수협',
                    '한국산업은행',
                    '한국수출입은행',
                    '국민은행',
                    '외환은행',
                    '한국시티은행',
                    '경남은행',
                    '광주은행',
                    '대구은행',
                    '부산은행',
                    '전북은행',
                    '제주은행',
                    '기업은행',
                    '카카오뱅크',
                    '토스뱅크',
                  ]"
                  variant="outlined"></v-select>

                <v-text-field
                  v-model="info.depositAccount"
                  :rules="rules.account_rule"
                  variant="outlined"
                  placeholder="계좌번호를 입력해주세요(숫자만)"></v-text-field>
              </v-row>
            </v-container>

            <!-- 각오 -->
            <v-container class="field">
              <v-row class="field-top">
                <div class="field-top-label">각오의 한 마디!</div>
                <div class="field-top-desc">
                  고객들이 도그워커를 검색할 때 기본 정보와 함께 표시되는
                  문장이므로 신중하게 작성해주세요(한 줄 이내)
                </div>
              </v-row>
              <v-row class="field-middle">
                <v-text-field
                  v-model="info.sentence"
                  :rules="rules.sentence_rule"
                  variant="outlined"
                  placeholder="도그워커로서의 다짐을 적어 주세요!"></v-text-field>
              </v-row>
            </v-container>
            <v-row justify="center">
              <v-btn @click="clickSubmit" size="x-large" color="primary">
                <span class="white pl-5 pr-5">지원하기</span>
              </v-btn>
            </v-row>
          </div>
        </v-container>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
  </v-form>
</template>

<script>
import format from '@/utillFunction/format';
import Chip from '@/components/Chip';
import applyApi from '@/api/applyApi';
export default {
  components: {
    Chip,
  },
  created() {
    // 년도 데이터
    const thisYear = new Date().getFullYear();
    const array = Array(100)
      .fill()
      .map((v, i) => thisYear - i);
    this.birthYears = array;
  },
  watch: {
    state() {
      // 시도 시군구 데이터
      applyApi
        .getZipcode()
        .then((res) => {
          if (this.sigungus.length > 0) {
            this.sigungus = [];
          }
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].sido === this.state) {
              this.sigungus.push(res.data[i].sigungu);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  data() {
    return {
      info: {
        dogwalkerId: this.$store.state.login.dwId,
        name: null,
        birthYear: null,
        gen: null,
        phone: null,
        // nick:null,
        addrState: '',
        addrTown: '',
        addrDetail: null,
        // interviewPassed:false,
        // appicationPassed:false,
        // passed:false,
        depositBank: null,
        depositAccount: null,
        certificateKeywords: [],
        adopted: false,
        adoptedWhich: null, // 1 고양이 2 강아지 3 그외
        adoptedMonth: null,
        petType: null, // 1소형 2중형 3대형 4초대형
        price: null,
        sentence: null,

        locations: [],
        weekdayNames: [], //sun,mon,tue,wed,thu,fri,sat
      },

      selectedLocStrings: [],
      weekday: null,
      certificate: null,
      state: null,
      town: null,
      birthYear: null,
      birthYears: [],
      sidos: [
        '서울특별시',
        '부산광역시',
        '대구광역시',
        '인천광역시',
        '광주광역시',
        '대전광역시',
        '울산광역시',
        '세종특별자치시',
        '경기도',
        '충청북도',
        '충청남도',
        '전라북도',
        '전라남도',
        '경상북도',
        '경상남도',
        '제주특별자치도',
        '강원특별자치도',
        '동해출장소',
        '강원특별자치도',
      ],
      sigungus: [],
      average: false,

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
    };
  },
  methods: {
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
      const keyword = this.state + ' ' + this.town;
      if (!this.selectedLocStrings.includes(keyword)) {
        // 중복배제
        this.selectedLocStrings.push(keyword); // chip으로 출력용
      }

      const locObj = {
        // 제출용
        state: this.state,
        town: this.town,
      };
      let isDupl = false;
      for (let i = 0; i < this.info.locations.length; i++) {
        if (JSON.stringify(this.info.locations[i]) === JSON.stringify(locObj)) {
          // 중복배제
          isDupl = true;
        }
      }
      if (!isDupl) {
        this.info.locations.push(locObj);
      }
    },
    selectWeek() {
      const keyword = this.weekday;
      if (!this.info.weekdayNames.includes(keyword)) {
        // 중복배제
        this.info.weekdayNames.push(keyword);
      }
    },
    selectCert() {
      const keyword = this.certificate;
      if (!this.info.certificateKeywords.includes(keyword)) {
        // 중복배제
        this.info.certificateKeywords.push(keyword);
      }
    },
    cancelChipLoc(one) {
      if (this.selectedLocStrings.length > 0) {
        for (let i = 0; i < this.selectedLocStrings.length; i++) {
          if (this.selectedLocStrings[i] === one) {
            this.selectedLocStrings.splice(i, 1);
            this.info.locations.splice(i, 1);
          }
        }
      }
    },
    cancelChipWeek(one) {
      if (this.info.weekdayNames.length > 0) {
        for (let i = 0; i < this.info.weekdayNames.length; i++) {
          if (this.info.weekdayNames[i] === one) {
            this.info.weekdayNames.splice(i, 1);
          }
        }
      }
    },
    cancelChipCert(one) {
      if (this.info.certificateKeywords.length > 0) {
        for (let i = 0; i < this.info.certificateKeywords.length; i++) {
          if (this.info.certificateKeywords[i] === one) {
            this.info.certificateKeywords.splice(i, 1);
          }
        }
      }
    },
    clickSubmit() {
      // gen names -> gen keys
      this.info.gen = this.info.gen === '남성' ? 'm' : 'f';

      // cert names -> cert keys
      let list = [];
      for (let i = 0; i < this.info.certificateKeywords.length; i++) {
        list.push(
          format.convertFromCertificate(this.info.certificateKeywords[i])
        );
      }
      this.info.certificateKeywords = list;
      this.$refs.form //입력형식검사
        .validate()
        .then((res) => {
          if (res.valid) {
            applyApi
              .postAppl(this.info)
              .then((res) => {
                console.log(res.data);
                this.$router.push('applySuccess');
                this.$store.commit('setUsernick', this.info.nick);
              })
              .catch((e) => {
                console.log(e);
              });
            // this.$router.push('/')
          } else {
            alert('다시 입력하세요');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    disableFields() {
      if (this.average) {
        this.info.price = 15000; // 임시로
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.field {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 80px;
  padding-bottom: 80px;
}
.field-top {
  border-top: 1px yellowgreen solid;
  display: block;
}
.field-top-label {
  padding: 10px;
  font-size: var(--font-regular);
  font-weight: var(--weight-regular);
}
.field-top-desc {
  padding: 5px;
}
.field-middle {
  border-top: 1px grey solid;
}
.v-text-field {
  padding: 20px;
}
</style>
