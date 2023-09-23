<template>
  <v-container>
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">내 제안 목록</div>
            <!-- 의뢰서 나열 -->
          </v-row>
          <v-row>
            <div class="desc mt-7">
              <div>회원님께서 고객님께 산책서비스 이용을 제안한 목록입니다</div>
            </div>
          </v-row>
        </v-container>
        <v-row style="height: 100px" />
        <!-- 제안 나열 -->
        <v-container>
          <!-- tab -->
          <v-tabs
            v-model="tab"
            class="primary-color"
            align-tabs="center"
            fixed-tabs>
            <v-tab :value="'waiting'">
              <p>미수락 제안</p>
            </v-tab>
            <v-tab :value="'canceled'">
              <p>취소된 제안</p>
            </v-tab>
            <v-tab :value="'rejected'">
              <p>거절된 제안</p>
            </v-tab>
          </v-tabs>
          <!-- tab 선택 시 출력될 window -->
          <v-spacer style="height: 80px" />
          <v-window v-model="tab">
            <v-window-item v-for="t in tabList" :key="t" :value="t">
              <!-- waiting 탭이 열리면-->
              <v-container v-if="t === 'waiting'">
                <!-- 하나라도 있는 경우 -->
                <v-row
                  justify="center"
                  v-for="ofr in offerList"
                  :key="ofr"
                  class="list-box pa-2">
                  <!-- (의뢰한)고객 이미지 -->
                  <v-col cols="12" md="2">
                    <v-img
                      v-if="ofr.imgUrl"
                      class="ma-5"
                      :src="ofr.imgUrl"
                      height="100px"
                      width="150px"
                      aspect-ratio="4/3"
                      cover></v-img>
                    <v-img
                      v-if="!ofr.imgUrl"
                      class="ma-5"
                      src="@/assets/images/profile/profileImage.jpg"
                      height="100px"
                      width="150px"
                      aspect-ratio="4/3"
                      cover />
                  </v-col>
                  <v-spacer />
                  <!-- 정보 -->
                  <v-col cols="12" md="6">
                    <!-- 제안날짜 -->
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color highlight">
                        제안 날짜
                      </span>
                      <span class="pr-1">
                        {{ formatDateTime(ofr.offerCreatedAt) }}
                      </span>
                    </div>
                    <!-- 고객 닉네임 -->
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color"> 제안 대상</span>
                      <span class="pr-1">{{ ofr.cusNick }} 고객님</span>
                    </div>
                    <!-- 고객님 주소 -->
                    <div class="ma-1">
                      <span class="pl-3 grey-little-light pr-3"
                        ><font-awesome-icon icon="fa-solid fa-location-dot"
                      /></span>
                      <span class="pr-1">{{ ofr.addrState }}</span>
                      <span>{{ ofr.addrTown }}</span>
                    </div>
                    <div class="ma-1">
                      <span class="pl-3 grey-little-light pr-3">
                        <font-awesome-icon icon="fa-solid fa-calendar-days" />
                      </span>
                      <span class="pr-1">{{ ofr.month }} 월</span>
                      <span>{{ ofr.day }} 일</span>
                    </div>
                  </v-col>
                  <v-col align-self="center">
                    <ConfirmCancel
                      @cancel="cancelOffer"
                      :offerId="ofr.offerId" />
                  </v-col>
                  <!-- 버튼 -->
                  <v-spacer />
                  <v-col cols="12" md="1" align-self="center">
                    <div
                      @click="clickDetail(ofr.applicationId, ofr.commisionId)"
                      class="pd-5">
                      <font-awesome-icon
                        icon="fa-solid fa-chevron-right "
                        size="xl"
                        class="left-modify" />
                    </div>
                  </v-col>
                </v-row>
                <!-- 하나도 없는 경우 -->
                <v-row justify="center" style="height: 200px">
                  <v-col cols="12" md="8" align-self="center">
                    <div>{{ messageW }}</div>
                  </v-col>
                </v-row>
              </v-container>
              <!-- canceled 탭이 열리면-->
              <v-container v-if="t === 'canceled'">
                <!-- 하나라도 있는 경우 -->
                <v-row
                  justify="center"
                  v-for="ofr in canceledOfferList"
                  :key="ofr"
                  class="list-box">
                  <!-- (의뢰한)고객 이미지 -->
                  <v-col cols="12" md="2">
                    <v-img
                      v-if="ofr.imgUrl"
                      class="ma-5"
                      :src="ofr.imgUrl"
                      height="100px"
                      width="150px"
                      aspect-ratio="4/3"
                      cover></v-img>
                    <v-img
                      v-if="!ofr.imgUrl"
                      class="ma-5"
                      src="@/assets/images/profile/profileImage.jpg"
                      height="100px"
                      width="150px"
                      aspect-ratio="4/3"
                      cover />
                  </v-col>
                  <v-spacer />
                  <!-- 정보 -->
                  <v-col cols="12" md="6">
                    <!-- 제안날짜 -->
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color highlight">
                        제안 날짜
                      </span>
                      <span class="pr-1">
                        {{ formatDateTime(ofr.offerCreatedAt) }}
                      </span>
                    </div>
                    <!-- 고객 닉네임 -->
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color"> 제안 대상</span>
                      <span class="pr-1">{{ ofr.cusNick }} 고객님</span>
                    </div>
                    <!-- 고객님 주소 -->
                    <div class="ma-1">
                      <span class="pl-3 grey-little-light pr-3"
                        ><font-awesome-icon icon="fa-solid fa-location-dot"
                      /></span>
                      <span class="pr-1">{{ ofr.addrState }}</span>
                      <span>{{ ofr.addrTown }}</span>
                    </div>
                    <div class="ma-1">
                      <span class="pl-3 grey-little-light pr-3">
                        <font-awesome-icon icon="fa-solid fa-calendar-days" />
                      </span>
                      <span class="pr-1">{{ ofr.month }} 월</span>
                      <span>{{ ofr.day }} 일</span>
                    </div>
                  </v-col>
                  <!-- 버튼 -->
                  <v-spacer />
                  <v-col cols="12" md="2" align-self="center">
                    <div class="grey-little-light text-center mb-2">
                      <div>{{ formatDateTime(ofr.invalidatedAt) }}</div>
                      <div>문의 취소됨</div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="1" align-self="center">
                    <div
                      @click="clickDetail(ofr.applicationId, ofr.commisionId)"
                      class="pd-5">
                      <font-awesome-icon
                        icon="fa-solid fa-chevron-right "
                        size="xl"
                        class="left-modify" />
                    </div>
                  </v-col>
                </v-row>
                <!-- 하나도 없는 경우 -->
                <v-row justify="center" style="height: 200px">
                  <v-col cols="12" md="8" align-self="center">
                    <div>{{ messageC }}</div>
                  </v-col>
                </v-row>
              </v-container>
              <!-- rejected 탭이 열리면-->
              <v-container v-if="t === 'rejected'">
                <!-- 하나라도 있는 경우 -->
                <v-row
                  justify="center"
                  v-for="ofr in rejectedOfferList"
                  :key="ofr"
                  class="list-box">
                  <!-- (의뢰한)고객 이미지 -->
                  <v-col cols="12" md="2">
                    <v-img
                      v-if="ofr.imgUrl"
                      class="ma-5"
                      :src="ofr.imgUrl"
                      height="100px"
                      width="150px"
                      aspect-ratio="4/3"
                      cover></v-img>
                    <v-img
                      v-if="!ofr.imgUrl"
                      class="ma-5"
                      src="@/assets/images/profile/profileImage.jpg"
                      height="100px"
                      width="150px"
                      aspect-ratio="4/3"
                      cover />
                  </v-col>
                  <v-spacer />
                  <!-- 정보 -->
                  <v-col cols="12" md="6">
                    <!-- 제안날짜 -->
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color highlight">
                        제안 날짜
                      </span>
                      <span class="pr-1">
                        {{ formatDateTime(ofr.offerCreatedAt) }}
                      </span>
                    </div>
                    <!-- 고객 닉네임 -->
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color"> 제안 대상</span>
                      <span class="pr-1">{{ ofr.cusNick }} 고객님</span>
                    </div>
                    <!-- 고객님 주소 -->
                    <div class="ma-1">
                      <span class="pl-3 grey-little-light pr-3"
                        ><font-awesome-icon icon="fa-solid fa-location-dot"
                      /></span>
                      <span class="pr-1">{{ ofr.addrState }}</span>
                      <span>{{ ofr.addrTown }}</span>
                    </div>
                    <div class="ma-1">
                      <span class="pl-3 grey-little-light pr-3">
                        <font-awesome-icon icon="fa-solid fa-calendar-days" />
                      </span>
                      <span class="pr-1">{{ ofr.month }} 월</span>
                      <span>{{ ofr.day }} 일</span>
                    </div>
                  </v-col>

                  <!-- 버튼 -->
                  <v-spacer />
                  <v-col cols="12" md="1" align-self="center">
                    <div
                      @click="clickDetail(ofr.applicationId, ofr.commisionId)"
                      class="pd-5">
                      <font-awesome-icon
                        icon="fa-solid fa-chevron-right "
                        size="xl"
                        class="left-modify" />
                    </div>
                  </v-col>
                </v-row>
                <!-- 하나도 없는 경우 -->
                <v-row justify="center" style="height: 200px">
                  <v-col cols="12" md="8" align-self="center">
                    <div>{{ messageR }}</div>
                  </v-col>
                </v-row>
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
import offerApi from '@/api/offerApi';
import ConfirmCancel from '@/views/dialog/confirm/ConfirmCancel.vue';
export default {
  components: {
    ConfirmCancel,
  },
  mounted() {
    // dogwalker id -> offer list (status 1,4)
    // key 1: alive(1,4)  2: canceled(0)  3: rejected(3)
    // 미수락 제안 리스트
    offerApi
      .getOffers(this.$store.state.login.dwId, 'dogwalker', 1)
      // .getOffers(this.$store.state.item.appId, 'dogwalker', 1)
      .then((res) => {
        if (res.data.length > 0) {
          this.offerList = res.data;
          console.log('this.offerList', this.offerList);

          for (let i = 0; i < this.offerList.length; i++) {
            const dirName = this.offerList[i].cusDirName;
            const fileName = this.offerList[i].cusFileName;
            const extension = this.offerList[i].cusExtension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.offerList[i].imgUrl = imgUrl;
            }
          }
        } else {
          // 없으면
          console.log('부족');
          this.messageW = '제안 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // 취소 리스트
    offerApi
      .getOffers(this.$store.state.login.dwId, 'dogwalker', 2)
      .then((res) => {
        if (res.data.length > 0) {
          this.canceledOfferList = res.data;
          console.log('this.canceledOfferList', this.canceledOfferList);

          for (let i = 0; i < this.canceledOfferList.length; i++) {
            const dirName = this.canceledOfferList[i].cusDirName;
            const fileName = this.canceledOfferList[i].cusFileName;
            const extension = this.canceledOfferList[i].cusExtension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.canceledOfferList[i].imgUrl = imgUrl;
            }
          }
        } else {
          // 없으면
          console.log('부족');
          this.messageC = '취소된 제안 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // 거절 리스트
    offerApi
      .getOffers(this.$store.state.login.dwId, 'dogwalker', 3)
      .then((res) => {
        if (res.data.length > 0) {
          this.rejectedOfferList = res.data;
          console.log('this.rejectedOfferList', this.rejectedOfferList);
        } else {
          // 없으면
          console.log('부족');
          this.messageR = '거절된 제안 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      offerList: [],
      messageW: '',
      messageC: '',
      messageR: '',
      key: null, // key 1: alive(1,4)  2: canceled(0)  3: rejected(3)

      canceledOfferList: [],
      rejectedOfferList: [],

      // tab
      tab: null,
      tabList: ['waiting', 'canceled', 'rejected'],
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    // 문의의 양 당사자 app ofr 확인용
    clickDetail(appId, comId) {
      this.$store.commit('setAppId', appId);
      this.$store.commit('setComId', comId);
      this.$router.push('/dwInfo/dwInfoOffer/offerDetail');
      this.$store.commit('setOpen', true);
    },
    cancelOffer(cancel) {
      if (cancel) {
        offerApi
          .invalidateOffer(this.$store.state.item.offerId, 0) // 취소
          .then((res) => {
            console.log('invalidateOffer ', res.data);
            this.$router.push('/dwInfo/dwInfoOffer/cancelOfrSuccess'); // 거절 완료 창
            this.$store.commit('setOpen', true); // 거절 완료 창 열기
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style></style>
