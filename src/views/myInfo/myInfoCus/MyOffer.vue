<template>
  <v-container>
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">받은 의뢰제안 내역</div>
            <!-- 의뢰서 나열 -->
          </v-row>
          <v-row>
            <div class="desc mt-7">
              <div>
                도그워커로부터 먼저 의뢰 제안을 받은 경우의 제안 목록입니다.
              </div>
              <div>제안을 수락하거나 거절할 수 있습니다.</div>
            </div>
          </v-row>

          <!-- 제안 나열 -->
          <v-row>
            <v-container>
              <v-spacer style="height: 50px" />
              <!-- 정렬 -->
              <v-spacer style="height: 50px" />
              <v-row no-gutters>
                <!-- 하나라도 있는 경우 -->
                <v-col
                  v-for="ofr in offerList"
                  :key="ofr"
                  cols="12"
                  md="4"
                  align-self="center">
                  <!-- 도그워커 이미지 -->
                  <!-- <v-col cols="12" md="2">
                    <v-img :src="ofr.imgUrl" height="80px" cover></v-img>
                  </v-col>
                  <v-spacer />
                  <v-col cols="12" md="4">
                    <div class="ma-1">
                      <span class="pl-3 pr-3 secondary-color"> 제안 날짜 </span>
                      <span class="pr-1">
                        {{ formatDateTime(ofr.offerCreatedAt) }}
                      </span>
                    </div>
                    <div class="ma-1">
                      <span class="pl-3 pr-3">제안자</span>
                      <span class="pr-1">도그워커 {{ ofr.dwNick }}</span>
                    </div>
                    <div class="ma-1">
                      <span class="pl-3 pr-3">시간당 금액</span>
                      <span class="pr-1">{{ ofr.price }} 원</span>
                    </div>
                  </v-col>
                  <v-col cols="12" md="1" align-self="center">
                    <div>
                      <v-btn
                        @click="clickAccept(ofr.offerId, ofr.commisionId)"
                        class="btnAnswer"
                        variant="tonal"
                        color="primary"
                        block>
                        의뢰 수락
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="1" align-self="center">
                    <div>
                      <v-btn
                        @click="clickReject(ofr.offerId)"
                        class="btnAnswer ma-2"
                        variant="outlined"
                        color="grey"
                        block>
                        의뢰 거절
                      </v-btn>
                    </div>
                  </v-col>
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
                </v-col> -->
                  <!-- 문의가 하나도 없는 경우 -->
                  <!-- <v-row justify="center" style="height: 200px">
                  <v-col cols="12" md="8" align-self="center">
                    <div>{{ message }}</div>
                  </v-col>
                </v-row> -->
                  <div class="mt-5 mb-9">
                    <v-row
                      justify="center"
                      @click="clickDetail(ofr.applicationId, ofr.commisionId)">
                      <Figure :appl="ofr" />
                    </v-row>
                    <!-- 문의일자 -->
                    <v-row justify="center">
                      <div class="text-center mt-2 grey">
                        문의일자 : {{ formatDateTime(ofr.offerCreatedAt) }}
                      </div>
                    </v-row>
                    <!-- 버튼 -->
                    <v-row justify="center" class="mt-5">
                      <span class="mr-2">
                        <v-btn
                          @click="
                            clickAccept(
                              ofr.offerId,
                              ofr.applicationId,
                              ofr.commisionId
                            )
                          "
                          class="btnAnswer"
                          color="primary">
                          <span class="white"> 의뢰 수락 </span>
                        </v-btn>
                      </span>
                      <span class="ml-2">
                        <v-btn
                          @click="clickReject(ofr.offerId)"
                          class="btnAnswer"
                          color="grey">
                          <span class="white"> 의뢰 거절 </span>
                        </v-btn>
                      </span>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
              <!-- 문의가 하나도 없는 경우 -->
              <v-row justify="center" style="height: 200px">
                <v-col cols="12" md="8" align-self="center">
                  <div>{{ message }}</div>
                </v-col>
              </v-row>
              <v-spacer style="height: 250px" />
              <!-- 페이지 -->
              <v-row justify="center">
                <v-pagination v-model="page" :length="page" rounded="circle" />
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  <router-view name="dialog" />
</template>

<script>
import offerApi from '@/api/offerApi';
import Figure from '@/components/Figure.vue';

export default {
  components: {
    Figure,
  },
  mounted() {
    // cutomer id -> offer list (status 1,4)
    // key 1: alive(1,4)  2: canceled(0)  3: rejected(3)
    // 미수락 제안 리스트
    offerApi
      // .getOffers(this.$store.state.login.cusId, 'customer', 1)
      .getOffers(this.$store.state.login.cusId, 'customer', 1)
      .then((res) => {
        if (res.data.length > 0) {
          this.offerList = res.data;
          // 이미지 출력
          for (let i = 0; i < this.offerList.length; i++) {
            const dirName = this.offerList[i].dwDirName;
            const fileName = this.offerList[i].dwFileName;
            const extension = this.offerList[i].dwExtension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;

              this.offerList[i].imgUrl = imgUrl;
            }
            this.offerList[i].nick = this.offerList[i].dwNick;
          }
          console.log('this.offerList', this.offerList);
        } else {
          // 없으면
          console.log('부족');
          this.message = '제안 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  data() {
    return {
      offerList: [],
      message: '',

      key: null, // key 1: alive(1,4)  2: canceled(0)  3: rejected(3)
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
      this.$router.push('/cusInfo/cusInfoOffer/offerDetail');
      this.$store.commit('setOpen', true);
    },

    // 제안 수락 -> 예약처리(1->2)
    clickAccept(offerId, appId, comId) {
      // 제안 수락 창 -> 변경 여부 결정
      // 그냥 수락하면 예약 생성
      // 변경하는 경우 새로운 청약이 됨
      this.$store.commit('setAppId', appId); // 변경 선택 시 필요
      this.$store.commit('setComId', comId); // 변경 선택 시 필요
      this.$store.commit('setOfferId', offerId);
      this.$store.commit('setOpen', true);
      this.$router.push('/cusInfo/cusInfoOffer/acceptOfr'); // 수락여부 확인 창으로
    },
    // 제안 거절 -> 상태변경(1->3)
    clickReject(offerId) {
      this.$store.commit('setOfferId', offerId);
      this.$store.commit('setOpen', true);
      this.$router.push('/cusInfo/cusInfoOffer/rejectOfr'); // 수락여부 확인 창으로
    },
  },
};
</script>

<style></style>
