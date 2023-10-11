<template>
  <v-dialog
    class="dialog"
    width="450"
    height="600"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card>
      <v-spacer style="height: 30px" />

      <v-card-text>
        <!-- 제목 -->
        <v-row no-gutters style="height: 60px">
          <v-spacer />
          <v-col cols="12" md="11">
            <div class="title-medium">성별</div>
          </v-col>
        </v-row>
        <!-- 선택 -->
        <v-row justify="center" no-gutters>
          <v-spacer />
          <v-col cols="12" md="11">
            <v-radio-group v-model="gender" column color="grey">
              <v-radio label="남성" value="m"></v-radio>
              <v-radio label="여성" value="f"></v-radio>
              <v-radio label="성별 무관" value="all"></v-radio>
            </v-radio-group>
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
