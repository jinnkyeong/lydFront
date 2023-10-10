<template>
  <v-form ref="form" lazy-validation>
    <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-container fluid>
          <v-row justify="center" class="mt-16" no-gutters>
            <h2>의뢰서 작성하기</h2>
          </v-row>

          <div class="pa-16 ma-16">
            <v-container>
              <div class="creteria">고객 정보</div>
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
              <!-- 도그워커에 대하여 원하는 관련 자격증 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">요구 관련 자격증</div>
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
              <!-- 금액 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">희망 이용금액(시간 당)</div>
                  <div class="field-top-desc">
                    <div>
                      이용금액은 고객과 도그워커 사이에서 정해지며,
                      loveyourdog에서는 이용금액에 대해 관여하지 않습니다.
                    </div>
                    <div>
                      다만 일반적으로 이용금액은 최소 10000원 ~ 최대 25000원
                      사이에서 정해집니다.
                    </div>
                  </div>
                </v-row>
                <v-row class="field-middle">
                  <v-text-field
                    v-model="info.price"
                    :rules="rules.price_rule"
                    variant="outlined"
                    prefix="시간 당"
                    suffix="원"
                    placeholder="숫자만 입력해주세요"
                    :disabled="disableFields()"></v-text-field>
                </v-row>
                <v-row class="field-middle">
                  <v-checkbox
                    v-model="average"
                    label="평균 이용금액으로 설정(15000원(임시))"></v-checkbox>
                </v-row>
              </v-container>
              <!-- 산책날짜 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">산책 날짜</div>
                </v-row>
                <v-row class="field-middle">
                  <v-select
                    v-model="info.month"
                    placeholder="선택해주세요"
                    :items="monthList"
                    variant="outlined"></v-select>
                  <div class="unit-mark">월</div>
                  <v-select
                    v-model="info.day"
                    placeholder="선택해주세요"
                    :items="dayList"
                    variant="outlined"></v-select>
                  <div class="unit-mark">일</div>
                </v-row>
              </v-container>
              <!-- 산책시간 -->
              <v-container class="field">
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

              <div class="creteria highlight highlight">강아지 정보</div>
              <!-- 강아지 이름 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">강아지 이름</div>
                </v-row>
                <v-row class="field-middle">
                  <v-text-field
                    v-model="info.dogName"
                    :rules="rules.dogname_rule"
                    variant="outlined"
                    placeholder="문자열로 입력해주세요"></v-text-field>
                </v-row>
              </v-container>
              <!-- 강아지 개월 수 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">강아지 나이(개월 단위)</div>
                  <div class="field-top-desc">
                    <div>강아지의 나이를 개월 단위로 입력해주세요.</div>
                    <div>
                      예를 들어 태어난 지 2년 4개월이 지난 경우 입력값은
                      28입니다.
                    </div>
                  </div>
                </v-row>
                <v-row class="field-middle">
                  <v-text-field
                    v-model="info.dogAge"
                    :rules="rules.dogage_rule"
                    variant="outlined"
                    suffix="개월"
                    placeholder="숫자만 입력해주세요"></v-text-field>
                </v-row>
              </v-container>
              <!-- 강아지 무게 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">강아지 무게(kg 단위)</div>
                  <div class="field-top-desc">
                    <div>
                      강아지의 무게를 kg 단위의 숫자로 최대 소숫점 아래
                      1자리까지 입력해주세요.
                    </div>
                    <div>
                      예를 들어 4kg인 경우 입력값은 4이고, 4.2kg인 경우 입력값은
                      4.2 입니다.
                    </div>
                  </div>
                </v-row>
                <v-row class="field-middle">
                  <v-text-field
                    v-model="info.dogWeight"
                    :rules="rules.dogweight_rule"
                    variant="outlined"
                    suffix="kg"
                    placeholder="숫자만 입력해주세요"></v-text-field>
                </v-row>
              </v-container>
              <!-- 강아지 견종 -->
              <v-container class="field">
                <v-row class="field-top">
                  <div class="field-top-label">견종</div>
                </v-row>
                <v-row class="field-middle">
                  <v-text-field
                    v-model="info.breed"
                    variant="outlined"
                    :rules="rules.breed_rule"
                    placeholder="문자열로만 입력해주세요"></v-text-field>
                </v-row>
              </v-container>
              <!-- 공격성 -->
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
              <!-- 건강상태 -->
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
              <!-- 소중대초대 -->
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

              <div class="creteria highlight optional">선택사항</div>

              <!-- 고객의 요청사항 -->
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
                      않으며, 요청사항은 도그워커의 효과적으로 산책을 하는 데에
                      도움이 됩니다)
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
              <v-row justify="center">
                <v-btn @click="clickSubmit" size="x-large" color="primary">
                  <span class="white pl-5 pr-5">의뢰하기</span>
                </v-btn>
              </v-row>
            </v-container>
          </div>
        </v-container>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
  </v-form>
</template>

<script>
import commitApi from '@/api/commitApi';
import Chip from '@/components/Chip';

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
  data() {
    return {
      info: {
        customerId: this.$store.state.login.cusId,
        name: '',
        nick: '',
        birthYear: null,
        gen: null,
        phone: null,
        addrState: '',
        addrTown: '',
        addrDetail: null,
        certificateKeywords: [],
        price: null,
        month: null,
        day: null,
        startHour: null,
        startMin: null,
        endHour: null,
        endMin: null,

        dogName: '',
        dogAge: null,
        dogWeight: null,
        dogType: null,
        dogAggr: null,
        dogHealth: null,
        breed: '',
        road: '',
        cusRequires: [],
      },
      monthList: Array(12)
        .fill()
        .map((v, i) => i + 1), // 1~12
      dayList: Array(31)
        .fill()
        .map((v, i) => i + 1), // 1~31
      hourList: Array(24)
        .fill()
        .map((v, i) => i + 1), // 1~24(=0)
      minList: Array(60)
        .fill()
        .map((v, i) => i + 1), // 1~60(=0)
      certificate: null,
      firstRequire: '',
      addCnt: 0,

      birthYear: null,
      birthYears: [],
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
        dogweight_rule: [
          (v) => !!v || '강아지 무게 필수 입력사항입니다.',
          (v) =>
            /^[0-9]+$/ | /^[0-9]+(.[0-9]+)?$/.test(v) ||
            '강아지 무게를 kg 단위로 소숫점 아래 한 자리 숫자로만 입력해주세요',
        ],
        dogage_rule: [
          (v) => !!v || '강아지 나이는 필수 입력사항입니다.',
          (v) => /^[0-9]+$/.test(v) || '개월 단위의 나이를 숫자로 입력해주세요',
        ],
        dogname_rule: [
          (v) => !!v || '강아지 이름은 필수 입력사항입니다.',
          (v) =>
            /^[가-힣]{2,10}$/.test(v) ||
            '이름을 한글로 2~10자 이내로 입력해주세요',
        ],
        breed_rule: [
          (v) => !!v || '견종은 필수 입력사항입니다.',
          (v) =>
            /^[가-힣]{2,20}$/.test(v) ||
            '이름을 한글로 2~20자 이내로 입력해주세요',
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
    selectCert() {
      const keyword = this.certificate;
      if (!this.info.certificateKeywords.includes(keyword)) {
        // 중복배제
        this.info.certificateKeywords.push(keyword);
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
    addCusRequire() {
      // if (this.addCnt <= 0) {
      // 아무것도 안 적은 상태
      // this.info.cusRequires.push(this.firstRequire); // 첫 요청사항
      // }
      this.addCnt++;
      // console.log('this.firstRequire : ', this.firstRequire);
      console.log('this.info.cusRequires : ', this.info.cusRequires);
    },
    clickSubmit() {
      // gen names -> gen keys
      this.info.gen = this.info.gen === '남성' ? 'm' : 'f';

      this.info.cusRequires.push(this.cusRequire); // 마지막 요청사항도 추가

      this.$refs.form //입력형식검사
        .validate()
        .then((res) => {
          if (res.valid) {
            commitApi
              .postCms(this.info)
              .then((res) => {
                console.log(res.data);
                this.$router.push('commitSuccess');
                this.$store.commit('setUsernick', this.info.nick);
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
    },
    disableFields() {
      if (this.average) {
        this.info.price = 15000; // 임시로
        return true;
      } else {
        return false;
      }
    },
    clickDelReq(index) {
      console.log('전 : ', this.info.cusRequires);
      this.addCnt -= 1;
      // this.info.cusRequires.splice(index, 1);
      this.info.cusRequires.splice(index, 1);
      console.log('후 : ', this.info.cusRequires);
    },
  },
};
</script>

<style>
.creteria {
  font-size: var(--font-regular);
  font-weight: var(--weight-regular);
  color: var(--color-primary);
}
.optional {
}
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
.field-middle-label {
  padding-top: 35px;
  padding-right: 20px;
  padding-left: 20px;
}
.v-text-field {
  padding: 20px;
}
.unit-mark {
  padding-top: 35px;
  padding-right: 20px;
}
</style>
