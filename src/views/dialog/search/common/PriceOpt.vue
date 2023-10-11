<template>
  <v-dialog
    class="dialog"
    width="450"
    height="700"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-spacer style="height: 30px" />
      <v-card-text>
        <!-- 제목 -->
        <v-row no-gutters style="height: 60px">
          <v-spacer />
          <v-col cols="12" md="11">
            <div class="title-medium">시간당 가격</div>
            <div class="text-micro grey-little-light mt-2">
              시간당 가격의 최소~최대 금액을 입력해주세요
            </div>
          </v-col>
        </v-row>
        <!-- 선택 -->
        <v-row justify="center">
          <v-col>
            <v-text-field
              class="pb-0"
              label="최소금액"
              placeholder="숫자만 입력하세요"
              v-model="result.minPrice"
              :disabled="disableFields()"
              suffix="원">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col>
            <v-text-field
              class="pt-0"
              label="최대금액"
              placeholder="숫자만 입력하세요"
              v-model="result.maxPrice"
              :disabled="disableFields()"
              suffix="원"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10">
            <div class="text-micro secondary-color">{{ message }}</div>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row justify="center">
          <v-spacer />

          <v-col cols="12" md="10">
            <v-checkbox
              v-model="result.selectAverage"
              label="평균 이용금액으로 설정(15000원.x월x일x시 기준)"
              color="grey"></v-checkbox>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"></v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block @click="clickSubmit" color="primary">
              <span class="white text-regular"> 확인 </span>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block @click="clickCancel" color="grey">
              <span class="white text-regular"> 취소 </span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"></v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      result: {
        minPrice: null,
        maxPrice: null,
        selectAverage: false,
      },
      message: '',
      d: false,
    };
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
    },

    clickSubmit() {
      if (
        this.result.minPrice >= this.result.maxPrice &&
        !this.result.selectAverage
      ) {
        this.message = '최소금액에는 최대금액보다 큰 숫자가 입력될 수 없습니다';
        this.result.minPrice = null;
        this.result.maxPrice = null;
      } else {
        this.message = '';
        this.$store.commit('setPrice', this.result);
        this.$store.commit('setOpen', false); // 창 닫기
      }
    },
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
    disableFields() {
      if (this.result.selectAverage) {
        this.result.minPrice = null;
        this.result.maxPrice = null;
        this.message = '';
        return true;
      }
    },
  },
};
</script>

<style></style>
