<template>
  <v-dialog
    class="dialog"
    width="450"
    height="700"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 20px">
          <v-col align-self="center" cols="12" md="11" sm="11"></v-col>
          <v-col align-self="end" cols="12" md="1" sm="1">
            <!-- 나가기 버튼 -->
            <button @click="clickClose">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
        <v-row justify="center" no-gutters>
          <div>산책 시간</div>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col>
            <v-text-field
              class="pt-16 pb-0"
              label="시작 시"
              v-model="result.startH"
              variant="outlined"
              suffix="시">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="pt-16 pb-0"
              label="시작 분"
              v-model="result.startM"
              variant="outlined"
              suffix="분">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-col>
            <v-text-field
              class="pt-5 pb-0"
              label="종료 시"
              v-model="result.endH"
              variant="outlined"
              suffix="시">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              class="pt-5 pb-0"
              label="종료 분"
              v-model="result.endM"
              variant="outlined"
              suffix="분">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer />
          <v-col cols="12" md="10"> {{ message }} </v-col>
          <v-spacer />
        </v-row>

        <v-row justify="center" no-gutters style="height: 40px"></v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block @click="clickSubmit">확인</v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block @click="clickCancel">취소</v-btn>
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
