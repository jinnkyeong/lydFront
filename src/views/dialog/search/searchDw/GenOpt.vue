<template>
  <v-dialog
    class="dialog"
    width="450"
    height="600"
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
        <v-row justify="center" no-gutters style="height: 60px">
          <h3>성별</h3>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-spacer />
          <v-col cols="12" md="10">
            <v-radio-group v-model="gender" column color="grey">
              <v-radio label="남성" value="m"></v-radio>
              <v-radio label="여성" value="f"></v-radio>
              <v-radio label="성별 무관" value="all"></v-radio>
            </v-radio-group>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="ml-7 text-center" cols="12" md="4">
            <v-btn block @click="clickSubmit" color="primary">확인</v-btn>
          </v-col>
          <v-spacer />
          <v-col class="mr-7 text-center" cols="12" md="4">
            <v-btn block @click="clickCancel" color="grey">취소</v-btn>
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
      gender: 'm',
    };
  },
  methods: {
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
    },

    clickSubmit() {
      this.$store.commit('setOpen', false); // 창 닫기
      if (this.gender === 'all') {
        this.$store.commit('setGender', '');
      } else {
        this.$store.commit('setGender', this.gender);
      }
    },
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
  },
  watch: {},
};
</script>

<style></style>
