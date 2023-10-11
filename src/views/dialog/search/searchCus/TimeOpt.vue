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
            <div class="title-medium">산책 시간</div>
          </v-col>
        </v-row>
        <!-- 선택 -->
        <div class="ml-2 pa-0 grey-little-light text-micro">시간 시간</div>
        <v-row justify="center" no-gutters>
          <v-col>
            <v-text-field
              class="pa-1"
              label="시작 시"
              v-model="result.startH"
              suffix="시">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="pa-1"
              label="시작 분"
              v-model="result.startM"
              suffix="분">
            </v-text-field>
          </v-col>
        </v-row>
        <div class="ml-2 pa-0 grey-little-light text-micro">종료 시간</div>
        <v-row justify="center" no-gutters>
          <v-col>
            <v-text-field
              class="pa-1"
              label="종료 시"
              v-model="result.endH"
              suffix="시">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="pa-1"
              label="종료 분"
              v-model="result.endM"
              suffix="분">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10">
            <span class="secondary-color">{{ message }}</span>
          </v-col>
          <v-spacer />
        </v-row>

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
      result: {
        startH: null,
        startM: null,
        endH: null,
        endM: null,
      },
      message: '',
    };
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
    },

    clickSubmit() {
      const date1 = new Date(
        `2022-05-04 ${this.result.startH}:${this.result.startM}:00`
      );
      const date2 = new Date(
        `2022-05-04 ${this.result.endH}:${this.result.endM}:00`
      );
      if (date1 < date2) {
        if (this.result.startH >= 24 || this.result.endH >= 24) {
          this.message = '시각은 0~23시 까지 입력할 수 있습니다';
          this.result.startH = null;
          this.result.startM = null;
          this.result.endH = null;
          this.result.endM = null;
        } else if (this.result.startM >= 24 || this.result.endM >= 60) {
          this.message = '분은 0~59시 까지 입력할 수 있습니다';
          this.result.startH = null;
          this.result.startM = null;
          this.result.endH = null;
          this.result.endM = null;
        } else {
          this.message = '';
          this.$store.commit('setTime', this.result);
          this.$store.commit('setOpen', false); // 창 닫기
        }
      } else {
        this.message =
          '시작 시각은 종료 시각보다 작은 숫자가 입력되어야 합니다.';
        this.result.startH = null;
        this.result.startM = null;
        this.result.endH = null;
        this.result.endM = null;
      }
    },
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
  },
};
</script>

<style></style>
