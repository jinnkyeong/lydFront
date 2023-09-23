<template>
  <v-container>
    <!-- 제목 -->
    <v-row class="pl-10 pt-10 mt-10 pb-16 mb-16">
      <v-col cols="12" md="4">
        <div class="left-title">
          <h3>예약 상세보기</h3>
        </div>
      </v-col>
    </v-row>

    <!-- 예약 나열 -->
    <v-row class="pt-3 mt-3">
      <v-spacer />

      <v-col cols="12" md="8">
        <!-- 0. 취소 -->
        <v-container v-if="this.info.status === 0">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div
                class="ma-5 pt-4 text-regular semi-bold text-center text-center">
                해당 예약은 취소되었습니다
              </div>
              <div>
                <!-- 예약정보 -->
                <v-row>
                  <v-spacer />
                  <v-col cols="12" md="8">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">도그워커 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.applicationDto.nick
                        }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">고객 닉네임</span>
                        </v-col>
                        <v-col cols="12" md="4">{{
                          info.commisionDto.nick
                        }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">산책 예정 일자</span>
                        </v-col>
                        <v-col
                          >{{ info.commisionDto.month }} 월{{
                            info.commisionDto.month
                          }}
                          일</v-col
                        >
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">시작 시간</span>
                        </v-col>
                        <v-col
                          >{{ info.commisionDto.startHour }}시
                          {{ info.commisionDto.startMin }}분
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">종료 시간</span>
                        </v-col>
                        <v-col
                          >{{ info.commisionDto.endHour }}시
                          {{ info.commisionDto.endMin }}분
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">고객 주소</span>
                        </v-col>
                        <v-col
                          >{{ info.commisionDto.addrState }}
                          {{ info.commisionDto.addrTown }}
                          {{ info.commisionDto.addrDetail }}</v-col
                        >
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <span class="label">최종 시간당 가격</span>
                        </v-col>
                        <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                      </v-row>
                    </v-container>
                  </v-col>
                  <v-spacer />
                </v-row>
                <!-- 취소정보 -->
                <v-row class="ma-7" no-gutters justify="center">
                  <div>
                    <span class="text-regular mr-3">취소일자</span>
                    <span class="text-regular">
                      {{ formatDateTime(info.canceledAt) }}
                    </span>
                  </div>
                  <!-- <div>
                    <div class="text-regular mr-3">취소자</div>
                    <div class="text-regular">
                      {{ formatDateTime(info.canceledAt) }}
                    </div>
                    <span class="">
                      {{ formatCancelerUserType(info.cancelerUserType) }}
                    </span>
                    <span class="">
                      {{ formatCancelerNick(info.cancelerUserType) }}sd
                    </span>
                  </div> -->
                </v-row>
              </div>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <!-- 1. 예약완료 -->
        <v-container v-if="this.info.status === 1">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-center">
                <div class="text-regular semi-bold">
                  예약이 완료되었습니다. 고객님의 결제를 기다리고 있습니다.
                </div>
                <div class="grey">
                  결제를 완료해야만 산책 서비스가 시작될 수 있습니다
                </div>
              </div>
              <!-- 예약정보 -->
              <v-row>
                <v-spacer />
                <v-col cols="12" md="8">
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">도그워커 닉네임</span>
                    </v-col>
                    <v-col cols="12" md="4">{{
                      info.applicationDto.nick
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">고객 닉네임</span>
                    </v-col>
                    <v-col cols="12" md="4">{{ info.commisionDto.nick }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">산책 예정 일자</span>
                    </v-col>
                    <v-col
                      >{{ info.commisionDto.month }} 월{{
                        info.commisionDto.month
                      }}
                      일</v-col
                    >
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">시작 시간</span>
                    </v-col>
                    <v-col
                      >{{ info.commisionDto.startHour }}시
                      {{ info.commisionDto.startMin }}분
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">종료 시간</span>
                    </v-col>
                    <v-col
                      >{{ info.commisionDto.endHour }}시
                      {{ info.commisionDto.endMin }}분
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">고객 주소</span>
                    </v-col>
                    <v-col
                      >{{ info.commisionDto.addrState }}
                      {{ info.commisionDto.addrTown }}
                      {{ info.commisionDto.addrDetail }}</v-col
                    >
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="label">최종 시간당 가격</span>
                    </v-col>
                    <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                  </v-row>
                </v-col>
                <v-spacer />
              </v-row>
              <!-- 예약정보 -->
              <v-row class="ma-7" no-gutters justify="center">
                <div class="text-regular mr-3">예약일자</div>
                <div class="text-regular">
                  {{ formatDateTime(info.reservCreatedAt) }}
                </div>
              </v-row>
              <!-- 결제버튼 -->
              <v-row>
                <v-spacer />
                <v-col cols="12" md="3">
                  <v-btn block color="primary" @click="clickPurchase">
                    <span class="white text-regular">결제하기</span>
                  </v-btn>
                </v-col>
                <v-spacer />
              </v-row>
              <v-spacer style="height: 50px" />
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <!-- 2. 결제완료 -->
        <v-container v-if="this.info.status === 2">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                고객님의 결제가 완료되었습니다.
              </div>
              <div class="card-data text-center">
                예약된 산책일시에 도그워커가 고객님 댁에 도착하여 산책이
                진행됩니다.
              </div>
              <div class="card-data text-center">
                산책 후 강아지를 고객님 댁으로 데려다 준 후 산책이 종료됩니다.
              </div>
              <div class="card-data text-center pb-16">
                산책 중 및 산책 종료 후 도그워커가 작성한 산책일지를
                확인해주세요
              </div>
              <!-- 예약정보 -->
              <v-row>
                <v-spacer />
                <v-col cols="12" md="8">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">도그워커 닉네임</span>
                      </v-col>
                      <v-col cols="12" md="4">{{
                        info.applicationDto.nick
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">고객 닉네임</span>
                      </v-col>
                      <v-col cols="12" md="4">{{
                        info.commisionDto.nick
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">산책 예정 일자</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.month }} 월{{
                          info.commisionDto.month
                        }}
                        일</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">시작 시간</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.startHour }}시
                        {{ info.commisionDto.startMin }}분
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">종료 시간</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.endHour }}시
                        {{ info.commisionDto.endMin }}분
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">고객 주소</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.addrState }}
                        {{ info.commisionDto.addrTown }}
                        {{ info.commisionDto.addrDetail }}</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">최종 시간당 가격</span>
                      </v-col>
                      <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-spacer />
              </v-row>
              <v-spacer style="height: 50px" />
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <!-- 3. 산책 중 -->
        <v-container v-if="this.info.status === 3">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                산책 수행 중입니다
              </div>

              <v-row>
                <v-spacer />
                <v-col cols="12" md="8">
                  <div>도그워커가 작성한 산책일지를 확인 해 주세요.</div>
                  <div>
                    <span class="highlight">산책 종료 후 1일 이내</span>에
                    산책일지 작성이 완료됩니다
                  </div>
                </v-col>
                <v-spacer />
              </v-row>

              <!-- 예약정보 -->
              <v-row>
                <v-spacer />
                <v-col cols="12" md="8">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">도그워커 닉네임</span>
                      </v-col>
                      <v-col cols="12" md="4">{{
                        info.applicationDto.nick
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">고객 닉네임</span>
                      </v-col>
                      <v-col cols="12" md="4">{{
                        info.commisionDto.nick
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">산책 예정 일자</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.month }} 월{{
                          info.commisionDto.month
                        }}
                        일</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">시작 시간</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.startHour }}시
                        {{ info.commisionDto.startMin }}분
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">종료 시간</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.endHour }}시
                        {{ info.commisionDto.endMin }}분
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">고객 주소</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.addrState }}
                        {{ info.commisionDto.addrTown }}
                        {{ info.commisionDto.addrDetail }}</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">최종 시간당 가격</span>
                      </v-col>
                      <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-spacer />
              </v-row>
              <!-- 산책일지 작성 -->
              <v-row class="ma-8">
                <v-spacer />
                <v-col align-self="center" cols="12" md="3">
                  <v-btn block color="primary" @click="showDiary">
                    <span> 산책일지 확인하기 </span>
                  </v-btn>
                </v-col>
                <v-col align-self="center" cols="12" md="9">
                  <span v-if="info.diaryStatus === 1" class="card-data">
                    산책일지가 일부분 작성되었습니다. 현재 상태를 확인할까요?
                  </span>
                  <span v-if="info.diaryStatus === 2" class="card-data">
                    <span>산책일지 작성이 완료되었습니다</span>
                    <span>{{
                      info.diaryUpdatedAt
                        ? formatDateTime(info.diaryUpdatedAt)
                        : formatDateTime(info.diaryCreatedAt)
                    }}</span>
                  </span>
                </v-col>
                <v-spacer />
              </v-row>
              <v-spacer style="height: 50px" />
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>

        <!-- 4.산책완료(내부적으로 정산중,정산완료도 포함) -->
        <v-container
          v-if="
            this.info.status === 4 ||
            this.info.status === 5 ||
            this.info.status === 6
          ">
          <v-spacer />
          <v-row class="ma-10" justify="center">
            <v-card width="800px" class="pa-4" color="blue_light">
              <div class="ma-5 pt-4 pb-4 text-regular semi-bold text-center">
                산책이 완료되었습니다.
              </div>
              <!-- 예약정보 -->
              <v-row>
                <v-spacer />
                <v-col cols="12" md="8">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">도그워커 닉네임</span>
                      </v-col>
                      <v-col cols="12" md="4">{{
                        info.applicationDto.nick
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">고객 닉네임</span>
                      </v-col>
                      <v-col cols="12" md="4">{{
                        info.commisionDto.nick
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">산책 예약 일자</v-col>
                      <v-col
                        >{{ info.commisionDto.month }} 월{{
                          info.commisionDto.month
                        }}
                        일</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">시작 시간</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.startHour }}시
                        {{ info.commisionDto.startMin }}분
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">종료 시간</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.endHour }}시
                        {{ info.commisionDto.endMin }}분
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">고객 주소</span>
                      </v-col>
                      <v-col
                        >{{ info.commisionDto.addrState }}
                        {{ info.commisionDto.addrTown }}
                        {{ info.commisionDto.addrDetail }}</v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <span class="label">최종 시간당 가격</span>
                      </v-col>
                      <v-col cols="12" md="4">{{ info.price }} 원</v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-spacer />
              </v-row>
              <!-- 산책일지 확인 -->
              <v-row class="ma-8">
                <v-col align-self="center" cols="12" md="3">
                  <v-btn block color="primary" @click="showDiary">
                    <span> 산책일지 확인하기 </span>
                  </v-btn>
                </v-col>
                <v-col align-self="center" cols="12" md="9">
                  <span v-if="info.diaryStatus === 1" class="card-data">
                    산책일지이 일부분 작성되었습니다. 현재 상태를 확인할까요?
                  </span>
                  <span v-if="info.diaryStatus === 2" class="card-data">
                    <span>산책일지 작성이 완료되었습니다</span>
                    <span>{{
                      info.diaryUpdatedAt
                        ? formatDateTime(info.diaryUpdatedAt)
                        : formatDateTime(info.diaryCreatedAt)
                    }}</span>
                  </span>
                </v-col>
              </v-row>
            </v-card>
            <!-- 리뷰작성버튼 - 정산완료 전에만 출력 -->
            <v-card
              v-if="this.info.status != 6"
              width="600px"
              class="mt-10"
              variant="tonal">
              <v-row>
                <v-container class="ma-5">
                  <v-row>
                    <v-col cols="12" md="9">
                      <span class="secondary-color text-regular semi-bold"
                        >산책 서비스에 만족하셨나요? 리뷰를 남겨주세요</span
                      >
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-btn @click="clickReview" color="primary"
                        >리뷰 작성하기</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-row>
            </v-card>
          </v-row>
          <v-spacer />
        </v-container>
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import reservApi from '@/api/reservApi';
import format from '@/utillFunction/format';

export default {
  created() {
    reservApi
      .getReservById(this.$store.state.item.reservId)
      .then((res) => {
        this.info = res.data;
        console.log('getReservById ', this.info);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    // 총가격 = 시간당가격 * 산책시간
    totalPrice(price, start, end) {
      return format.totalPrice(price, start, end);
    },
    formatCancelerUserType(type) {
      return type === 'dogwalker' ? '도그워커 ' : '고객 ';
    },
    formatCancelerNick(type) {
      if (type === 'dogwalker') {
        return this.info.applicationDto.nick;
      } else {
        return this.info.commisionDto.nick;
      }
    },
    clickReview() {
      this.$store.commit('setOpen', true);
      this.$router.push('/cusInfo/reservDetail/reviewForm');
    },
    // 결제하기
    clickPurchase() {
      this.$router.push('/cusInfo/purchase');
    },
    // 산책일지 확인하기
    showDiary() {
      this.$router.push('/cusInfo/cusInfoDiary/diaryDetail');
      this.$store.commit('setOpen', true);
    },
  },
};
</script>

<style></style>
