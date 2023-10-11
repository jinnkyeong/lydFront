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
            <div class="title-medium">산책날짜</div>
          </v-col>
        </v-row>
        <!-- 선택 -->
        <v-row justify="center" no-gutters>
          <v-col>
            <v-select
              v-model="result.month"
              :items="monthList"
              label="월"></v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="result.day"
              :items="dayList"
              label="일"></v-select>
          </v-col>
        </v-row>

        <!-- <v-row justify="center" no-gutters>
          <v-select
            v-model="result.weekday"
            :items="weekdayList"
            label="요일"></v-select>
        </v-row> -->
          <!-- 버튼 -->
          <v-row justify="center" no-gutters style="height: 40px"></v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block size="large" @click="clickSubmit" color="primary">
              <span class="white text-regular"> 확인 </span>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block size="large" @click="clickCancel" color="grey">
              <span class="white text-regular"> 취소 </span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      monthList: Array(12)
        .fill()
        .map((v, i) => `${i + 1} 월`), // 1~12
      dayList: Array(31)
        .fill()
        .map((v, i) => `${i + 1} 일`), // 1~31
      // weekdayList: [
      //   '월요일',
      //   '화요일',
      //   '수요일',
      //   '목요일',
      //   '금요일',
      //   '토요일',
      //   '일요일',
      // ],
      result: {
        month: null,
        day: null,
        // weekday: null,
      },
    };
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
    },

    clickSubmit() {
      this.$store.commit('setOpen', false); // 창 닫기
      this.$store.commit('setDate', this.result);
    },
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
  },
  watch: {},
};
</script>

<style></style>
