<template>
  <v-container class="text-center">
    <!-- 옵션 첫번째 줄 -->
    <v-row no-gutters justify="center">
      <v-col no-gutters cols="12" md="4" sm="3">
        <v-btn
          block
          variant="outlined"
          rounded="0"
          size="100px"
          class="filterOpt"
          color="grey"
          @click="openCertOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-certificate" />
          </div>
          <div class="label text-regular black">자격증</div>
        </v-btn>
      </v-col>
      <v-col align-self="center" cols="12" md="4" sm="3">
        <v-btn
          block
          variant="outlined"
          rounded="0"
          size="100px"
          class="filterOpt"
          color="grey"
          @click="openDateOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
          </div>
          <div class="label text-regular black">산책 날짜</div>
        </v-btn>
      </v-col>
      <v-col align-self="center" cols="12" md="4" sm="3">
        <v-btn
          block
          variant="outlined"
          rounded="0"
          size="100px"
          class="filterOpt"
          color="grey"
          @click="openPriceOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-money-bill" />
          </div>
          <div class="label text-regular black">시간당 가격</div>
        </v-btn>
      </v-col>
    </v-row>
    <!-- 옵션 두번째 줄 -->
    <v-row no-gutters justify="center">
      <v-col align-self="center" cols="12" md="4" sm="3">
        <v-btn
          block
          variant="outlined"
          rounded="0"
          size="100px"
          class="filterOpt"
          color="grey"
          @click="openAgeOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-signal" />
          </div>

          <div class="label text-regular black">나이</div>
        </v-btn>
      </v-col>
      <v-col align-self="center" cols="12" md="4" sm="3">
        <v-btn
          block
          variant="outlined"
          rounded="0"
          size="100px"
          class="filterOpt"
          color="grey"
          @click="openGenOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-venus-mars" />
          </div>

          <div class="label text-regular black">성별</div>
        </v-btn>
      </v-col>
      <v-col align-self="center" cols="12" md="4" sm="3"></v-col>
    </v-row>
    <div>
      <v-btn @click="resetCondition" variant="text" color="grey">
        검색 조건 해제
      </v-btn>
    </div>
    <v-spacer />
    <!-- 찾기버튼(중앙) -->
    <v-row justify="center" class="pt-16 mt-10">
      <v-spacer />
      <v-col cols="12" md="5">
        <v-btn
          @click="clickSearch"
          rounded="lg"
          block
          size="100px"
          color="primary">
          <span class="ma-5 white">
            <h3>찾기</h3>
          </span>
          <span class="white">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="2xl" />
          </span>
        </v-btn>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
  <router-view name="dialog"></router-view>
</template>

<script>
import searchApi from '@/api/searchApi';

export default {
  components: {},
  data() {
    return {
      opts: {},
    };
  },
  methods: {
    openCertOpt() {
      this.$store.commit('setCertificates', []);
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('certOpt_dw'); // 창 이동
    },
    openDateOpt() {
      this.$store.commit('setDate', {});
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('dateOpt_dw'); // 창 이동
    },
    openPriceOpt() {
      this.$store.commit('setPrice', {});
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('priceOpt_dw'); // 창 이동
    },
    openAgeOpt() {
      this.$store.commit('setAges', []);
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('ageOpt_dw'); // 창 이동
    },
    openGenOpt() {
      this.$store.commit('setGender', {});
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('genOpt_dw'); // 창 이동
    },
    clickSearch() {
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
      searchApi
        .searchApp(1, opts, this.$store.state.item.orderStrs)
        .then((res) => {
          let apps = res.data.content;
          // console.log('filter componenet clickSearch : ', res.data);
          // image
          for (let i = 0; i < apps.length; i++) {
            const dirName = apps[i].dirName;
            const fileName = apps[i].fileName;
            const extension = apps[i].extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              apps[i].imgUrl = imgUrl;
            }
          }
          this.$emit('filteredApps', apps);
          this.$emit('filteredCnt', res.data.totalElements);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    resetCondition() {
      this.$store.commit('setCertificates', []);
      this.$store.commit('setDate', {});
      this.$store.commit('setPrice', {});
      this.$store.commit('setAges', []);
      this.$store.commit('setGender', {});
      this.$store.commit('setWeekdays', []);
      this.$store.commit('setDogTypes', []);
      this.$store.commit('setDogAggrs', []);
      this.$store.commit('setTime', {});
    },
  },
};
</script>

<style>
.label {
  display: inline;
}
.label-icon {
  padding-right: 10px;
}
</style>
