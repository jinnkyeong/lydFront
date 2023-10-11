<template>
  <v-container class="text-center">
    <!-- 옵션 첫번째 줄 -->
    <v-row no-gutters justify="center">
      <!-- 자격증 -->
      <v-col cols="12" md="4" sm="3">
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
      <!-- 요일 -->
      <v-col align-self="center" cols="12" md="4" sm="3">
        <v-btn
          block
          variant="outlined"
          rounded="0"
          size="100px"
          class="filterOpt"
          color="grey"
          @click="openWeekdayOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
          </div>
          <div class="label text-regular black">산책 요일</div>
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
          @click="openDogAggrOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-signal" />
          </div>
          <div class="label text-regular black">강아지의 공격성</div>
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
          @click="openDogTypeOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-venus-mars" />
          </div>

          <div class="label text-regular black">소/중/대/초대형</div>
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
          @click="openTimeOpt">
          <div class="label text-regular label-icon primary-color">
            <font-awesome-icon icon="fa-solid fa-venus-mars" />
          </div>

          <div class="label text-regular black">산책 시간대</div>
        </v-btn>
      </v-col>
    </v-row>
    <div>
      <v-btn @click="resetCondition" variant="text" color="grey">
        검색 조건 해제
      </v-btn>
    </div>
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
      this.$router.push('certOpt_cus'); // 창 이동
    },
    openWeekdayOpt() {
      this.$store.commit('setWeekdays', []);
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('weekdayOpt_cus'); // 창 이동
    },
    openPriceOpt() {
      this.$store.commit('setPrices', {});
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('priceOpt_cus'); // 창 이동
    },
    openDogAggrOpt() {
      this.$store.commit('setDogAggrs', []);
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('dogAggrOpt_cus'); // 창 이동
    },
    openDogTypeOpt() {
      this.$store.commit('setDogTypes', {});
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('dogTypeOpt_cus'); // 창 이동
    },
    openTimeOpt() {
      this.$store.commit('setTime', {});
      this.$store.commit('setOpen', true); // 창 열기
      this.$router.push('timeOpt_cus'); // 창 이동
    },
    clickSearch() {
      this.opts = {
        dogTypes: this.$store.state.item.selectedDogTypes,
        dogAggrs: this.$store.state.item.selectedDogAggrs,
      };

      let certKeys = [];
      let ary = this.$store.state.item.selectedCertificates;
      console.log('ary.length', ary.length);
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
        console.log('certKeys.length', certKeys.length);
      }
      let opts = {};
      if (certKeys && certKeys.length > 0) {
        opts.certificateKeywords = certKeys;
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
        this.$store.state.item.selectedWeekdays &&
        this.$store.state.item.selectedWeekdays.length > 0
      ) {
        opts.weekdayNames = this.$store.state.item.selectedWeekdays;
      }
      if (this.$store.state.item.selectedTime.startHour) {
        opts.startHour = this.$store.state.item.selectedTime.startHour;
      }
      if (this.$store.state.item.selectedTime.startMin) {
        opts.startMin = this.$store.state.item.selectedTime.startMin;
      }
      if (this.$store.state.item.selectedTime.endHour) {
        opts.endHour = this.$store.state.item.selectedTime.endHour;
      }
      if (this.$store.state.item.selectedTime.endMin) {
        opts.endMin = this.$store.state.item.selectedTime.endMin;
      }
      if (this.$store.state.item.selectedDate.day) {
        opts.day = this.$store.state.item.selectedDate.day;
      }
      if (
        this.$store.state.item.selectedDogTypes &&
        this.$store.state.item.selectedDogTypes.length > 0
      ) {
        opts.dogTypes = this.$store.state.item.selectedDogTypes;
      }
      if (
        this.$store.state.item.selectedDogAggrs &&
        this.$store.state.item.selectedDogAggrs.length > 0
      ) {
        opts.dogAggrs = this.$store.state.item.selectedDogAggrs;
      }

      searchApi
        .searchCom(1, opts, this.$store.state.item.orderStrs)
        .then((res) => {
          console.log(res.data);
          let coms = res.data.content;
          // image
          for (let i = 0; i < coms.length; i++) {
            const dirName = coms[i].dirName;
            const fileName = coms[i].fileName;
            const extension = coms[i].extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              coms[i].imgUrl = imgUrl;
            }
          }
          this.$emit('filteredComs', coms);
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
