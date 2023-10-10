<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="11">
        <!-- 제목 -->
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">예약 내역</div>
            <!-- 의뢰서 나열 -->
          </v-row>
        </v-container>
        <v-row style="height: 100px" />

        <!-- 예약 나열 -->
        <v-container>
          <!-- tab -->
          <v-tabs v-model="tab" color="primary" align-tabs="center" fixed-tabs>
            <v-tab :value="'canceled'">
              <span class="text-regular semi-bold">취소 완료</span>
            </v-tab>
            <v-tab :value="'reserved'">
              <span class="text-regular semi-bold">예약 완료</span>
            </v-tab>
            <v-tab :value="'priced'">
              <span class="text-regular semi-bold">결제 완료</span>
            </v-tab>
            <v-tab :value="'walking'">
              <span class="text-regular semi-bold">산책 중</span>
            </v-tab>
            <v-tab :value="'walked'">
              <span class="text-regular semi-bold">산책 완료</span>
            </v-tab>
          </v-tabs>

          <!-- tab 선택 시 출력될 window -->
          <v-spacer style="height: 80px" />
          <v-window v-model="tab">
            <v-window-item v-for="t in tabList" :key="t" :value="t">
              <v-container v-if="t === 'canceled'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div class="text-regular grey">
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.applicationDto.applicationId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover />
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.applicationDto.nick }} 도그워커와의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-3 primary-color"> 예약날짜 </span>
                        <span class="pr-1">
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3">
                        <span class="pa-3">
                          <h3 class="grey-title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <v-container v-if="t === 'reserved'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    justify="center"
                    v-if="message"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div class="text-regular grey">
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.applicationDto.applicationId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                      <v-img
                        v-if="!rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.applicationDto.nick }} 도그워커와의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-3 highlight"> 예약날짜 </span>
                        <span class="pr-1">
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3">
                        <span class="pa-3">
                          <h3 class="grey-title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <v-container v-if="t === 'priced'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div class="text-regular grey">
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.applicationDto.applicationId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.applicationDto.nick }} 도그워커와의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-3 highlight"> 예약날짜 </span>
                        <span class="pr-1">
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3">
                        <span class="pa-3">
                          <h3 class="grey-title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <v-container v-if="t === 'walking'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div class="text-regular grey">
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.applicationDto.applicationId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                      <v-img
                        v-if="!rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.applicationDto.nick }} 도그워커와의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-3 highlight"> 예약날짜 </span>
                        <span class="pr-1">
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3">
                        <span class="pa-3">
                          <h3 class="grey-title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
              <v-container v-if="t === 'walked'">
                <v-container>
                  <!-- 아무것도 없는 경우 -->
                  <v-row
                    v-if="message"
                    justify="center"
                    class="list-box"
                    style="height: 300px">
                    <v-col align-self="center" cols="12" md="5">
                      <div class="text-regular grey">
                        {{ message }}
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 예약 내역이 있는 경우 -->
                  <v-row
                    justify="center"
                    v-for="rs in reservList"
                    :key="rs"
                    class="list-box">
                    <!-- 고객 이미지 -->
                    <v-col
                      cols="12"
                      md="2"
                      @click="clickImg(rs.applicationDto.applicationId)">
                      <v-img
                        v-if="rs.imgUrl"
                        :src="rs.imgUrl"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                      <v-img
                        v-if="!rs.imgUrl"
                        src="@/assets/images/profile/profileImage.jpg"
                        height="140px"
                        aspect-ratio="1"
                        cover></v-img>
                    </v-col>
                    <v-spacer />

                    <!-- 예약 정보 -->
                    <v-col
                      cols="12"
                      md="6"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-user" />
                        </span>
                        <span class="pr-1">
                          {{ rs.applicationDto.nick }} 도그워커와의 예약
                        </span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-location-dot" />
                        </span>
                        <span class="pr-1">{{
                          rs.commisionDto.addrState
                        }}</span>
                        <span>{{ rs.commisionDto.addrTown }}</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-calendar-days" />
                        </span>
                        <span class="pr-1">{{ rs.commisionDto.month }} 월</span>
                        <span>{{ rs.commisionDto.day }} 일</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-5">
                          <font-awesome-icon icon="fa-solid fa-clock" />
                        </span>
                        <span class="pr-3 secondary-color">시작</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.startHour }} 시
                        </span>
                        <span class="pr-3"
                          >{{ rs.commisionDto.startMin }} 분</span
                        >
                        <span class="pr-3 secondary-color">종료</span>
                        <span class="pr-1"
                          >{{ rs.commisionDto.endHour }} 시</span
                        >
                        <span>{{ rs.commisionDto.endMin }} 분</span>
                      </div>
                      <div class="ma-1">
                        <span class="pl-3 pr-3 highlight"> 예약날짜 </span>
                        <span class="pr-1">
                          {{ formatDateTime(rs.reservCreatedAt) }}
                        </span>
                      </div>
                    </v-col>
                    <!-- 예약상태 -->
                    <v-col
                      align-self="center"
                      cols="12"
                      md="4"
                      @click="clickDetail(rs.reservationId)">
                      <div class="ma-3">
                        <span class="pa-3">
                          <h3 class="grey-title">
                            {{ formatStatus(rs.status) }}
                          </h3>
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
            </v-window-item>
          </v-window>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import reservApi from '@/api/reservApi';
export default {
  created() {
    // 고객이 로그인한 경우
    reservApi
      .getReservsByCusIdAndStatus(this.$store.state.login.cusId, 1)
      .then((res) => {
        this.tab = 'reserved';
        this.reservList = res.data;
        console.log('getReservsByDwId ', this.reservList);
        // 이미지 출력
        for (let i = 0; i < this.reservList.length; i++) {
          const dirName = this.reservList[i].applicationDto.dirName;
          const fileName = this.reservList[i].applicationDto.fileName;
          const extension = this.reservList[i].applicationDto.extension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;

            this.reservList[i].imgUrl = imgUrl;
          }
        }
        // console.log('after 작업 후 : ', this.reservList);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      // tab
      tab: null,
      tabList: ['canceled', 'reserved', 'priced', 'walking', 'walked'],
      reservList: [],
      message: '',
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
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

          break;
        default:
          break;
      }
      return result;
    },
    // 내용 clcik -> 예약 상세보기
    clickDetail(reservId) {
      this.$store.commit('setReservId', reservId);
      this.$router.push('/cusInfo/reservDetail');
    },
    // application 이미지 click -> DetailDw로
    clickImg(appId) {
      this.$store.commit('setAppId', appId);
      this.$router.push({ name: 'detailDw', query: { applicationId: appId } });
    },
  },
  watch: {
    tab() {
      let status;
      switch (this.tab) {
        case 'canceled':
          status = 0;
          break;
        case 'reserved':
          status = 1;
          break;
        case 'priced':
          status = 2;
          break;
        case 'walking':
          status = 3;
          break;
        case 'walked':
          status = 4;
          break;
        default:
          break;
      }

      reservApi
        .getReservsByCusIdAndStatus(this.$store.state.login.cusId, status)
        .then((res) => {
          this.reservList = res.data;
          console.log('getReservsByCusIdAndStatus ', this.reservList);
          // 이미지 출력
          for (let i = 0; i < this.reservList.length; i++) {
            const dirName = this.reservList[i].applicationDto.dirName;
            const fileName = this.reservList[i].applicationDto.fileName;
            const extension = this.reservList[i].applicationDto.extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.reservList[i].imgUrl = imgUrl;
            } else {
              const imgUrl = `@/assets/images/profile/profileImage.jpg`;
              this.reservList[i].imgUrl = imgUrl;
            }
          }

          if (this.reservList.length <= 0) {
            this.message = '해당 내역이 존재하지 않습니다';
          } else {
            this.message = '';
          }
          // console.log('after 작업 후 : ', this.reservList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
