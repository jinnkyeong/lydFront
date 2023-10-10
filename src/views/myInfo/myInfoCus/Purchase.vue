<template>
  <v-container>
    <!-- 제목 -->
    <v-row class="pl-10 pt-10 mt-10 pb-16 mb-16">
      <v-col>
        <div class="left-title">
          <h3>결제</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="8">
        <v-row>
          <v-divider
            vertical
            thickness="3"
            class="border-opacity-25"
            color="primary" />
          <v-col cols="12" md="4">
            <!-- 도그워커 정보 -->
            <v-container>
              <v-row>
                <span class="primary-color">도그워커 정보</span>
              </v-row>
              <v-row>
                <v-col>
                  <v-img
                    :src="reservation.imgUrl"
                    height="100px"
                    class="pa-5"
                    cover></v-img>
                </v-col>
                <v-col>
                  <div>도그워커 {{ reservation.applicationDto.nick }}</div>
                  <div>
                    <span>
                      {{
                        reservation.applicationDto.gen === 'm' ? '남성' : '여성'
                      }}
                      /
                    </span>
                    <span>
                      {{ getAge(reservation.applicationDto.birthYear) }}세
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-divider
            vertical
            thickness="3"
            class="border-opacity-25"
            color="primary" />
          <v-col cols="12" md="2">
            <!-- 강아지정보 -->
            <v-container>
              <v-row>
                <span class="primary-color">강아지 정보</span>
              </v-row>
              <v-row>
                <div>
                  {{ reservation.commisionDto.breed }}
                  ({{ dogTypeConvert(reservation.commisionDto.dogType) }})
                </div>
                <div>
                  <span class="mr-1">공격성</span>
                  <span>{{
                    dogAggrConvert(reservation.commisionDto.dogAggr)
                  }}</span>
                </div>
                <div>
                  <span class="mr-1">건강상태</span>
                  <span>{{
                    dogHealthConvert(reservation.commisionDto.dogHealth)
                  }}</span>
                </div>
              </v-row>
            </v-container>
          </v-col>
          <v-divider
            vertical
            thickness="3"
            class="border-opacity-25"
            color="primary" />
          <v-col cols="12" md="3">
            <!-- 산책일시 -->
            <v-container>
              <v-row>
                <span class="primary-color">산책 일시</span>
              </v-row>
              <v-row>
                <v-col>
                  <v-row>
                    <span> {{ reservation.commisionDto.month }}월 </span>
                    <span> {{ reservation.commisionDto.day }}일 </span>
                  </v-row>
                  <v-row>
                    <span class="secondary-color mr-1">시작</span>
                    <span> {{ reservation.commisionDto.startHour }}시 </span>
                    <span> {{ reservation.commisionDto.startMin }}분 </span>
                  </v-row>
                  <v-row>
                    <span class="secondary-color mr-1">종료</span>
                    <span> {{ reservation.commisionDto.endHour }}시 </span>
                    <span> {{ reservation.commisionDto.endMin }}분 </span>
                  </v-row>
                  <v-row>
                    <span class="semi-bold mr-2">총 산책시간</span>
                    <span>{{
                      formatDuration(
                        reservation.commisionDto.startHour,
                        reservation.commisionDto.startMin,
                        reservation.commisionDto.endHour,
                        reservation.commisionDto.endMin
                      )
                    }}</span>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-divider
            vertical
            thickness="3"
            class="border-opacity-25"
            color="primary" />
          <v-col cols="12" md="2">
            <!-- 시간당가격 -->
            <v-container>
              <v-row>
                <span class="primary-color"> 시간 당 가격 </span>
              </v-row>
              <v-row> {{ reservation.price }}원 </v-row>
            </v-container>
          </v-col>
          <v-divider
            vertical
            thickness="3"
            class="border-opacity-25"
            color="primary" />
        </v-row>
        <!-- 총결제금액 -->
        <v-row justify="end">
          <div class="square-grey-box pa-5 ma-4">
            <span class="title-regular mr-4">총결제금액</span>
            <span class="title-regular">{{ purchaseData.amount }}원</span>
          </div>
        </v-row>
      </v-col>
      <v-spacer />
    </v-row>
    <v-spacer style="height: 100px" />
    <!-- 주문자정보 -->
    <v-row>
      <v-container>
        <v-row>
          <v-col cols="12" md="2" />
          <v-col cols="12" md="6">
            <v-row>
              <div class="title-regular mb-2">주문자정보</div>
            </v-row>
            <v-row>
              <v-switch
                color="secondary"
                v-model="setCusInfo"
                label="의뢰자 기본정보를 주문자 정보로 활용합니다" />
            </v-row>
            <v-row>
              <v-text-field
                clearable
                v-model="purchaseData.buyer_tel"
                label="휴대폰번호"
                variant="solo-filled"
                :disabled="disableFields()"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                clearable
                v-model="purchaseData.buyer_email"
                label="이메일"
                variant="solo-filled"
                :disabled="disableFields()"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                clearable
                v-model="purchaseData.buyer_name"
                label="이름"
                variant="solo-filled"
                :disabled="disableFields()"></v-text-field>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-row>
    <v-spacer style="height: 100px" />

    <!-- 결제수단 -->
    <v-row>
      <v-container>
        <v-row>
          <v-col cols="12" md="2" />
          <v-col cols="12" md="8">
            <v-row>
              <div class="title-regular mb-2">결제수단</div>
            </v-row>
            <v-row>
              <v-radio-group v-model="paymentTypeId" column>
                <v-radio label="카드결제" value="1"></v-radio>
                <!-- <v-radio label="모바일결제" value="2"></v-radio> -->
                <v-radio label="카카오페이" value="3"></v-radio>
              </v-radio-group>
            </v-row>
            <!-- 카드결제 -->
            <!-- <v-row v-if="paymentTypeId == 1">
              <v-col>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="purchaseData.cardCompany"
                      label="카드사"
                      :items="companies"
                      variant="outlined"></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      clearable
                      v-model="purchaseData.cardNumber"
                      label="카드번호"
                      variant="solo-filled"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      clearable
                      v-model="purchaseData.expirationMonth"
                      label="만료 월(MM)"
                      variant="solo-filled"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      clearable
                      v-model="purchaseData.expirationYear"
                      label="만료 년도(YY)"
                      variant="solo-filled"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      clearable
                      v-model="purchaseData.secretCode"
                      label="결제 암호"
                      variant="solo-filled"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row> -->
            <!-- 카카오페이 -->
            <!-- <v-row v-if="paymentTypeId == 3" justify="center">
              <v-card width="300" height="200" variant="tonal">
                <v-card-title> 카카오페이 </v-card-title>
                <v-card-text> 준비중... </v-card-text>
              </v-card>
            </v-row> -->
            <!-- 휴대폰결제 -->
            <!-- <v-row v-if="paymentTypeId == 2" justify="center">
              <v-card width="300" height="200" variant="tonal">
                <v-card-title> 모바일결제 </v-card-title>
                <v-card-text> 준비중... </v-card-text>
              </v-card>
            </v-row> -->
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-row>

    <v-spacer style="height: 200px" />
    <v-row justify="center">
      <v-btn size="x-large" color="primary" @click="doPurchase">
        <span class="white pt-3 pb-3 pl-6 pr-6">결제하기</span>
      </v-btn>
    </v-row>
    <v-spacer style="height: 200px" />
  </v-container>
</template>

<script>
import format from '@/utillFunction/format';
import myInfoApi from '@/api/myInfoApi';
import reservApi from '@/api/reservApi';
import purchaseApi from '@/api/purchaseApi';

export default {
  created() {
    // 자동 textfield 채우기
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.reservation = res.data;
        // 총 가격 저장
        this.purchaseData.amount = this.totalPrice(
          this.reservation.price,
          this.reservation.commisionDto.startHour,
          this.reservation.commisionDto.startMin,
          this.reservation.commisionDto.endHour,
          this.reservation.commisionDto.endMin
        );
        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        this.reservation.imgUrl = `${urlfront}/${this.reservation.dwDirName}/${this.reservation.dwFileName}.${this.reservation.dwExtension}`;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      // 자동 textfield 채우기 여부
      setCusInfo: false,
      // 자동 textfield 채우기로 가져온 정보
      reservation: {
        applicationDto: {},
        commisionDto: {},
      },
      // 아임포트에 전달할 데이터
      purchaseData: {
        merchant_uid: `mid_${new Date().getTime()}`, // 내가 정한 주문번호(재사용불가, DB에 저장)
        // amount: 500, // 결제금액
        name: 'loveyourdog 산책 서비스 결제', // 주문명
        buyer_name: '', // 구매자 이름
        buyer_tel: '', // 구매자 전화번호
        buyer_email: '', // 구매자 이메일
      },
      paymentTypeId: null,
    };
  },
  methods: {
    // 결제하기
    doPurchase() {
      if (
        !this.purchaseData.buyer_name ||
        !this.purchaseData.buyer_email ||
        !this.purchaseData.buyer_tel
      ) {
        alert('주문자 정보를 모두 입력해주세요');
        return;
      }

      // purchaseData에 결제수단 추가
      if (this.paymentTypeId == 1) {
        // === X (radio에서 받은 값은 string가 아닌가봄)
        // 카드결제
        this.purchaseData.pg = 'kcp.A52CY'; // PG사
        this.purchaseData.pay_method = 'card'; // 결제수단
      } else if (this.paymentTypeId == 2) {
        // 모바일 결제
      } else if (this.paymentTypeId == 3) {
        // 카카오페이
        this.purchaseData.pg = 'kakaopay';
        this.purchaseData.pay_method = 'kakaopay';
      } else {
        alert('결제수단을 선택해주세요'); // 결제수단 선택하도록 하기
        return;
      }

      const { IMP } = window;
      IMP.init('imp01225415'); // 내 가맹점 식별코드
      // 결제요청 -> 모듈열림
      IMP.request_pay(this.purchaseData, this.callback);
    },
    callback(purchaseRes) {
      console.log('response', purchaseRes);
      // 카드 결제 취소
      // error_msg: '사용자가 결제를 취소하셨습니다';
      // imp_uid: 'imp_408387462707';
      // merchant_uid: 'mid_1694410386898';
      // pay_method: 'card';
      // pg_provider: 'html5_inicis';
      // pg_type: 'payment';
      // success: false;
      // 카카오페이 결제성공
      // apply_num: '';
      // bank_name: null;
      // buyer_addr: '신사동 661-16';
      // buyer_email: 'example@example';
      // buyer_name: '홍길동';
      // buyer_postcode: '06018';
      // buyer_tel: '01012341234';
      // card_name: null;
      // card_number: '';
      // card_quota: 0;
      // currency: 'KRW';
      // custom_data: null;
      // imp_uid: 'imp_120201115635';
      // merchant_uid: 'mid_1694414200480';
      // name: '아임포트 결제 데이터 분석';
      // paid_amount: 500;
      // paid_at: 1694414256;
      // pay_method: 'point';
      // pg_provider: 'kakaopay';
      // pg_tid: 'T4feb5797514397723d5';
      // pg_type: 'payment';
      // receipt_url: 'https://mockup-pg-web.kakao.com/v1/confirmation/p/T4feb5797514397723d5/f6cd14562fb72265eb70cb4ec4165db316ee5806878d7cf9017986e2630a28b7';
      // status: 'paid';
      // success: true;
      const { success, merchant_uid, error_msg } = purchaseRes;
      if (success) {
        // 결제 검증
        purchaseApi.verifiy(purchaseRes.imp_uid).then((verifyRes) => {
          // imp_uid : 결제모듈이 열리면 아이포트에서 자동생성
          // console.log('검증결과 response : ', verifyRes);
          if (purchaseRes.paid_amount == verifyRes.data.response.amount) {
            // alert('결제 및 결제검증완료');
            // DB에 결제 결과 저장
            this.purchaseData.reservationId = this.reservation.reservationId; // 예약번호
            // 총가격
            // this.purchaseData.totPrice = this.totalPrice;
            this.purchaseData.paymentTypeId = this.paymentTypeId; // 결제수단 번호
            console.log('before ', this.purchaseData);
            purchaseApi
              .purchaseSuccess(this.purchaseData)
              .then((res) => {
                console.log(res.data);
                this.$router.push('/cusInfo/purchaseSuccess');
              })
              .catch((e) => {
                console.log(e);
                alert('결제에 실패하셨습니다 다시 시도해주세요');
                // this.$router.go(0);
              });
          } else {
            alert('결제 실패. 검증 결과 금액이 다릅니다');
          }
        });
      } else {
        alert(`결제(request_pay) 실패: ${error_msg}`);
      }
    },
    disableFields() {
      if (this.setCusInfo) {
        this.purchaseData.buyer_tel = this.reservation.commisionDto.phone;
        this.purchaseData.buyer_name = this.reservation.commisionDto.name;
        this.purchaseData.buyer_email = this.reservation.commisionDto.email;
        return true; // disable하기
      } else {
        this.purchaseData.buyer_tel = '';
        this.purchaseData.buyer_name = '';
        this.purchaseData.buyer_email = '';
        return false;
      }
    },
    getAge(birthYear) {
      let now = new Date(); // 현재 날짜 및 시간
      return now.getFullYear() - birthYear;
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
            break;
        }
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
          break;
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
          break;
      }
    },
    formatDTtoTime(dt) {
      if (dt) {
        return format.formatDTtoTime(dt);
      }
    },
    formatDate(dt) {
      if (dt) {
        return format.formatDate(dt);
      }
    },
    formatDuration(startHour, startMin, endHour, endMin) {
      if (startHour && startMin && endHour && endMin) {
        let date1 = new Date(2023, 1, 1, startHour, startMin);
        let date2 = new Date(2023, 1, 1, endHour, endMin);

        return format.formatDuration(date1.toISOString(), date2.toISOString());
      }
    },
    totalPrice(price, startHour, startMin, endHour, endMin) {
      if (price && startHour && startMin && endHour && endMin) {
        let date1 = new Date(2023, 1, 1, startHour, startMin);
        let date2 = new Date(2023, 1, 1, endHour, endMin);
        return format.totalPrice(
          price,
          date1.toISOString(),
          date2.toISOString()
        );
      }
    },
  },
};
</script>

<style></style>
