<template>
  <v-container>
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">받은 의뢰 내역</div>
            <!-- 의뢰서 나열 -->
          </v-row>
          <v-row>
            <div class="desc mt-7">
              <div>고객으로부터 먼저 의뢰를 받은 경우의 의뢰 목록입니다.</div>
              <div>의뢰를 수락하거나 거절할 수 있습니다.</div>
            </div>
          </v-row>
          <!-- 의뢰(문의) 나열 -->
          <v-row>
            <v-container>
              <v-spacer style="height: 50px" />

              <!-- 문의가 하나라도 있는 경우 -->
              <!-- 정렬 -->
              <v-row justify="end" no-gutters>
                <v-chip
                  class="ma-2"
                  :color="chipPriceColor"
                  size="large"
                  variant="outlined"
                  @click="clickSortPrice">
                  <div>가격순</div>
                  <div>
                    <font-awesome-icon
                      v-if="ascPrice === 2"
                      icon="fa-solid fa-arrow-up"
                      size="lg"
                      class="ml-2" />
                    <font-awesome-icon
                      v-if="ascPrice === 3"
                      icon="fa-solid fa-arrow-down"
                      size="lg"
                      class="ml-2" />
                  </div>
                </v-chip>
                <v-chip
                  class="ma-2"
                  :color="chipStarColor"
                  size="large"
                  variant="outlined"
                  @click="clickSortStar">
                  <div>별점순</div>
                  <div>
                    <font-awesome-icon
                      v-if="ascStar === 2"
                      icon="fa-solid fa-arrow-up"
                      size="lg"
                      class="ml-2" />
                    <font-awesome-icon
                      v-if="ascStar === 3"
                      icon="fa-solid fa-arrow-down"
                      size="lg"
                      class="ml-2" />
                  </div>
                </v-chip>
                <v-chip
                  class="ma-2"
                  :color="chipViewColor"
                  size="large"
                  variant="outlined"
                  @click="clickSortView">
                  <div>조회수순</div>
                  <div>
                    <font-awesome-icon
                      v-if="ascView === 2"
                      icon="fa-solid fa-arrow-up"
                      size="lg"
                      class="ml-2" />
                    <font-awesome-icon
                      v-if="ascView === 3"
                      icon="fa-solid fa-arrow-down"
                      size="lg"
                      class="ml-2" />
                  </div>
                </v-chip>
              </v-row>
              <v-spacer style="height: 50px" />

              <v-row no-gutters>
                <v-col
                  v-for="(com, i) in comList"
                  :key="i"
                  cols="12"
                  md="4"
                  align-self="center">
                  <div class="mt-5 mb-9">
                    <v-row
                      justify="center"
                      @click="clickDetail(com.applicationId, com.commisionId)">
                      <FigureCus :comm="com" />
                    </v-row>
                    <!-- 문의일자 -->
                    <v-row justify="center">
                      <div class="text-center mt-2 grey">
                        문의일자 : {{ formatDateTime(com.inquiryCreatedAt) }}
                      </div>
                    </v-row>
                    <!-- 버튼 -->
                    <v-row justify="center" class="mt-5">
                      <span class="mr-2">
                        <v-btn
                          @click="
                            clickAccept(
                              com.inquiryId,
                              com.applicationId,
                              com.commisionId
                            )
                          "
                          class="btnAnswer"
                          color="primary">
                          <span class="white"> 의뢰 수락 </span>
                        </v-btn>
                      </span>
                      <span class="ml-2">
                        <v-btn
                          @click="clickReject(com.inquiryId)"
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
              <v-row style="height: 200px" justify="center">
                <div>
                  <div class="text-regular grey">{{ message }}</div>
                </div>
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
// import ConfirmInquiry from '../confirm/ConfirmInquiry.vue';

import inquiryApi from '@/api/inquiryApi';
// import searchApi from '@/api/searchApi';
import format from '@/utillFunction/format';
import FigureCus from '@/components/FigureCus.vue';
export default {
  components: {
    // ConfirmInquiry,
    FigureCus,
  },
  mounted() {
    // dogwalker id -> inquiry list
    // key 1 2 3
    const info = {
      key: 1,
      userId: this.$store.state.login.dwId,
      userType: 'dogwalker',
    };
    inquiryApi
      .getInquiries(1, info, this.$store.state.item.orderStrs)
      .then((res) => {
        if (res.data.content.length > 0) {
          this.comList = res.data.content;
          this.comCnt = res.data.totalElements;

          for (let i = 0; i < this.comList.length; i++) {
            const dirName = this.comList[i].cusDirName;
            const fileName = this.comList[i].cusFileName;
            const extension = this.comList[i].cusExtension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.comList[i].imgUrl = imgUrl;
            }
          }
          console.log('inquirylist : ', this.comList);
        } else {
          // 없으면
          console.log('부족');
          this.message = '받으신 의뢰가 존재하지 않습니다';
        }

        // 정렬조건 초기화
        this.$store.dispatch('deleteOrders', 'DESC/price');
        this.$store.dispatch('deleteOrders', 'DESC/star');
        this.$store.dispatch('deleteOrders', 'DESC/view');
        // 필터 초기화
        this.$store.commit('setCertificates', []);
        this.$store.commit('setAges', []);
        this.$store.commit('setPrice', {});
        this.$store.commit('setGender', null);
        this.$store.commit('setDate', {});
        this.$store.commit('setWeekdays', []);
        this.$store.commit('setDogTypes', []);
        this.$store.commit('setDogAggrs', []);
        this.$store.commit('setTime', {});
        // 페이지 초기화
        this.$store.commit('setPage', 1);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      comList: [],
      message: '',

      // 정렬
      // 오름내림차순
      ascPrice: 1,
      ascView: 1,
      ascStar: 1,
      // chip 색 동적 부여
      chipPriceColor: 'grey',
      chipViewColor: 'grey',
      chipStarColor: 'grey',

      page: 1,
      // 필터링 결과 명 수
      comCnt: 0,
    };
  },
  methods: {
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    // 문의 수락 -> 예약처리(1->2)
    clickAccept(inquiryId, appId, comId) {
      // 문의 수락 창 -> 변경 여부 결정
      // 그냥 수락하면 예약 생성
      // 변경하는 경우 새로운 청약이 됨
      this.$store.commit('setAppId', appId); // 변경 선택 시 필요
      this.$store.commit('setComId', comId); // 변경 선택 시 필요
      this.$store.commit('setInquiryId', inquiryId);
      this.$store.commit('setOpen', true);
      this.$router.push('/dwInfo/dwInfoInquiry/acceptInq'); // 수락여부 확인 창으로
    },
    // 문의 거절 -> 상태변경(1->3)
    clickReject(inquiryId) {
      this.$store.commit('setInquiryId', inquiryId);
      this.$store.commit('setOpen', true);
      this.$router.push('/dwInfo/dwInfoInquiry/rejectInq'); // 수락여부 확인 창으로
    },
    // 문의의 양 당사자 app com 확인용
    clickDetail(appId, comId) {
      this.$store.commit('setAppId', appId);
      this.$store.commit('setComId', comId);
      this.$router.push('/dwInfo/dwInfoInquiry/inquiryDetail'); // 수락 완료 창
      this.$store.commit('setOpen', true); // 수락 완료 창 열기
    },
    // 정렬
    // 정렬조건 리스트 가지고 정렬 api
    getSortDatas() {
      console.log(
        'this.$store.state.item.page : ',
        this.$store.state.item.page
      );
      console.log(
        'this.$store.state.item.orderStrs : ',
        this.$store.state.item.orderStrs
      );
      const info = {
        key: 1,
        userId: this.$store.state.login.dwId,
        userType: 'dogwalker',
      };
      console.log('info', info);
      console.log('this.$store.state.item.page', this.$store.state.item.page);
      console.log(
        'this.$store.state.item.orderStrs',
        this.$store.state.item.orderStrs
      );
      inquiryApi
        .getInquiries(
          this.$store.state.item.page,
          info,
          this.$store.state.item.orderStrs
        )
        .then((res) => {
          console.log('res.data', res.data);
          this.comList = res.data.content;
          if (res.data.content.length > 0) {
            this.comCnt = res.data.totalElements;

            for (let i = 0; i < this.comList.length; i++) {
              const dirName = this.comList[i].cusDirName;
              const fileName = this.comList[i].cusFileName;
              const extension = this.comList[i].cusExtension;
              if (dirName && fileName && extension) {
                const urlfront =
                  'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
                const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
                this.comList[i].imgUrl = imgUrl;
              }
            }
          } else {
            // 없으면
            console.log('부족');
            this.message = '받으신 의뢰가 존재하지 않습니다';
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 가격 조건
    clickSortPrice() {
      if (this.ascPrice === 1) {
        this.ascPrice = 2;
        this.chipPriceColor = 'red';
        this.$store.dispatch('updateOrders', 'DESC/price');
      } else if (this.ascPrice === 2) {
        this.ascPrice = 3;
        this.chipPriceColor = 'blue';
        this.$store.dispatch('updateOrders', 'ASC/price');
      } else {
        //   // 가격 낮은 순
        this.ascPrice = 1;
        this.chipPriceColor = 'grey';
        this.$store.dispatch('deleteOrders', 'DESC/price');
      }
      this.getSortDatas();
    },
    // 조회수 조건
    clickSortView() {
      if (this.ascView === 1) {
        // 조회수 높은 순
        this.ascView = 2;
        this.chipViewColor = 'red';
        this.$store.dispatch('updateOrders', 'DESC/view');
      } else if (this.ascView === 2) {
        // 조회수 높은 순
        this.ascView = 3;
        this.chipViewColor = 'blue';
        this.$store.dispatch('updateOrders', 'ASC/view');
      } else {
        // 조회수 낮은 순
        this.ascView = 1;
        this.chipViewColor = 'grey';
        this.$store.dispatch('deleteOrders', 'DESC/view');
      }
      this.getSortDatas();
    },
    // 별점 조건
    clickSortStar() {
      if (this.ascStar === 1) {
        // 별점 높은 순
        this.ascStar = 2;
        this.chipStarColor = 'red';
        this.$store.dispatch('updateOrders', 'DESC/star');
      } else if (this.ascStar === 2) {
        // 별점 높은 순
        this.ascStar = 3;
        this.chipStarColor = 'blue';
        this.$store.dispatch('updateOrders', 'ASC/star');
      } else {
        // 별점 낮은 순
        this.ascStar = 1;
        this.chipStarColor = 'grey';
        this.$store.dispatch('deleteOrders', 'DESC/star');
      }
      this.getSortDatas();
    },
  },
  watch: {
    page() {
      this.$store.commit('setPage', this.page);
      this.getSortDatas();
    },
  },
};
</script>

<style></style>
