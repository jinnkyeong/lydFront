<template color="grey">
  <v-container>
    <!-- 제목 -->
    <v-row no-gutters style="height: 300px">
      <div class="mt-16 ml-16">
        <h3 class="black">
          <span class="pr-2 icon">
            <font-awesome-icon
              icon="fa-solid fa-minus"
              rotation="90"
              size="xl" />
          </span>
          <span> 도그워커 찾기 </span>
        </h3>
      </div>
    </v-row>
    <v-spacer />
    <!-- select 결과 count -->
    <v-row no-gutters style="height: 10px">
      <v-spacer />
      <v-col cols="12" md="8">
        <span class="icons ml-5">
          <font-awesome-icon icon="fa-solid fa-user" />
        </span>
        <span class="ml-2 mr-1">{{ appCnt }}</span>
        <span> 명</span>
      </v-col>
      <v-spacer />
    </v-row>

    <!-- 필터 -->
    <v-row no-gutters justify="center" class="pt-3">
      <v-spacer />
      <v-col cols="12" md="8">
        <Filter @filteredApps="filteredApps" @filteredCnt="filteredCnt" />
      </v-col>
      <v-spacer />
    </v-row>

    <v-row justify="center" class="pt-16 mt-16">
      <v-col>
        <v-container>
          <!-- 정렬 -->
          <v-row>
            <v-container class="pl-10">
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
            </v-container>
          </v-row>
          <!-- 도그워커 전시 -->
          <v-row justify="center">
            <v-item-group>
              <v-container>
                <v-row>
                  <v-col v-for="app in apps" :key="app" cols="12" md="4">
                    <v-item>
                      <div
                        class="pt-15 pl-2 pr-2 ma-3"
                        @click="selectApp(app.applicationId, app.dogwalkerId)">
                        <Figure :appl="app"></Figure>
                      </div>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-row>
          <v-spacer style="height: 250px" />
          <!-- 페이지 -->
          <v-row justify="center">
            <v-pagination v-model="page" :length="page" rounded="circle" />
          </v-row>
          <v-spacer style="height: 200px" />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Filter from '@/components/Filter';
import Figure from '@/components/Figure';
import searchApi from '@/api/searchApi';
import format from '@/utillFunction/format';

export default {
  components: {
    Filter,
    Figure,
  },
  created() {
    searchApi
      .searchApp(1) // 1 page
      .then((res) => {
        this.apps = res.data.content; // 내용
        this.appCnt = res.data.totalElements; // cnt
        // image
        for (let i = 0; i < this.apps.length; i++) {
          const dirName = this.apps[i].dirName;
          const fileName = this.apps[i].fileName;
          const extension = this.apps[i].extension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
            this.apps[i].imgUrl = imgUrl;
          }
        }
        console.log('this.apps : ', this.apps);

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
      apps: [],

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
      appCnt: 0,
    };
  },

  methods: {
    // 선택 시 상세보기
    selectApp(appId, dwId) {
      // localstorage에 이미 있는지 체크
      let isPresent = false;
      let today = new Date();
      let formatedToday = format.formatDate(today.toISOString()); // 오늘날짜

      // 1.기록자체 존재
      if (this.$store.state.item.views.appView.date) {
        console.log('1.기록자체 존재');
        // 1-1. 오늘날짜 기록 존재 -> 블랙리스트 검증
        if (this.$store.state.item.views.appView.date === formatedToday) {
          console.log('1-1. 오늘날짜 기록 존재');
          // 블랙리스트에 있다면 isPresent true 반환
          console.log(
            '길이 ',
            this.$store.state.item.views.appView.applicationIds.length
          );
          for (
            let i = 0;
            i < this.$store.state.item.views.appView.applicationIds.length;
            i++
          ) {
            if (
              this.$store.state.item.views.appView.applicationIds[i] == appId
            ) {
              isPresent = true;
              console.log('for문 isPresent', isPresent);
            }
          }
          console.log('for문 밖 isPresent', isPresent);
          // 블랙리스트에 없으면 조회수 증가
          if (!isPresent) {
            searchApi
              .addAppViewCnt(appId)
              .then((res) => {
                console.log('조회수 증가 결과 ', res.data);
                const appView = {
                  date: formatedToday,
                  appId: appId,
                };
                this.$store.commit('addViewApp', appView); // 블랙리스트추가
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            console.log('블랙리스트에 등록되어있어서 조회수 증가안함');
          }
          // 1-2. 이전날짜 기록 존재 -> <<블랙리스트초기화>>, 블랙리스트추가, 조회수 증가
        } else if (
          this.$store.state.item.views.appView.date !== formatedToday
        ) {
          console.log('1-2. 이전날짜 기록 존재');
          this.$store.commit('addViewApp', {}); //  블랙리스트초기화
          const appView = {
            date: formatedToday,
            appId: appId,
          };
          this.$store.commit('addViewApp', appView); // 블랙리스트추가
          searchApi
            .addAppViewCnt(appId) // 조회수 증가
            .then((res) => {
              console.log('조회수 증가 결과 ', res.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        // 2. 기록자체 부존재 : 블랙리스트추가, 조회수 증가
      } else if (!this.$store.state.item.views.appView.date) {
        console.log('2. 기록자체 부존재');
        const appView = {
          date: formatedToday,
          appId: appId,
        };
        this.$store.commit('addViewApp', appView); // 블랙리스트추가
        searchApi
          .addAppViewCnt(appId) // 조회수 증가
          .then((res) => {
            console.log('조회수 증가 결과 ', res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }

      // 상세보기로 이동
      this.$store.commit('setAppId', appId);
      // this.$store.commit('setTempId', dwId); // 리뷰용
      this.$router.push({ name: 'detailDw', query: { applicationId: appId } }); // 상세보기
    },
    // 필터링 결과 출력
    filteredApps(filteredApps) {
      this.apps = filteredApps;
    },
    filteredCnt(filteredCnt) {
      this.appCnt = filteredCnt;
    },

    // 정렬
    // 정렬조건 리스트 가지고 정렬 api
    getSortDatas() {
      let certKeys = [];
      let ary = this.$store.state.item.selectedCertificates;
      for (let i = 0; i < ary.length; i++) {
        switch (ary[i]) {
          case '도그워커':
            certKeys.push('dw');
            break;
          case '훈련사':
            certKeys.push('trn');
            break;
          case '반려동물행동교정사':
            certKeys.push('act');
            break;
          case '반려견지도사':
            certKeys.push('lea');
            break;
          case '반려동물장례지도사':
            certKeys.push('fun');
            break;
          case '애견브리더':
            certKeys.push('bre');
            break;
          case '펫시터강사':
            certKeys.push('lec');
            break;
          case '펫시터':
            certKeys.push('sit');
            break;
          case '동물매개활동관리사':
            certKeys.push('mut');
            break;
          case '애견미용사':
            certKeys.push('sty');
            break;
          case '반려동물식품관리사':
            certKeys.push('foo');
            break;
          default:
            break;
        }
      }

      let opts = {};
      if (certKeys && certKeys.length > 0) {
        opts.certificateKeywords = certKeys;
      }
      if (this.$store.state.item.selectedDate.month) {
        opts.month = this.$store.state.item.selectedDate.month;
      }
      if (this.$store.state.item.selectedDate.day) {
        opts.day = this.$store.state.item.selectedDate.day;
      }

      if (this.$store.state.item.selectedPrice.minPrice) {
        opts.minimalPrice = this.$store.state.item.selectedPrice.minPrice;
      }
      if (this.$store.state.item.selectedPrice.maxPrice) {
        opts.maximalPrice = this.$store.state.item.selectedPrice.maxPrice;
      }

      if (this.$store.state.item.selectedPrice.selectAverage) {
        opts.selectAverage = this.$store.state.item.selectedPrice.selectAverage;
      }
      if (
        this.$store.state.item.selectedAges &&
        this.$store.state.item.selectedAges.length > 0
      ) {
        opts.ages = this.$store.state.item.selectedAges;
      }
      if (
        this.$store.state.item.selectedGender === 'f' ||
        this.$store.state.item.selectedGender === 'm'
      ) {
        opts.gen = this.$store.state.item.selectedGender;
      }

      console.log(
        'this.$store.state.item.page : ',
        this.$store.state.item.page
      );
      console.log('opts : ', opts);
      console.log(
        'this.$store.state.item.orderStrs : ',
        this.$store.state.item.orderStrs
      );
      searchApi
        .searchApp(
          this.$store.state.item.page,
          opts,
          this.$store.state.item.orderStrs
        )
        .then((res) => {
          console.log('sortdata : ', res.data);
          this.apps = res.data.content; // 내용
          this.appCnt = res.data.totalElements; // cnt
          // image
          for (let i = 0; i < this.apps.length; i++) {
            const dirName = this.apps[i].dirName;
            const fileName = this.apps[i].fileName;
            const extension = this.apps[i].extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.apps[i].imgUrl = imgUrl;
            }
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
