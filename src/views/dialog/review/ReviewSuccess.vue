<template>
  <v-dialog
    class="dialog"
    width="450"
    height="300"
    v-model="$store.state.just_state.open">
    <v-card>
      <v-card-title>
        <v-row no-gutters style="height: 40px"></v-row>
      </v-card-title>

      <v-card-text>
        <v-row justify="center" no-gutters style="height: 60px">
          <div>
            <div class="text-regular semi-bold">리뷰 작성이 완료되었습니다</div>
          </div>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px">
          <v-col class="text-center" cols="12" md="4" style>
            <v-btn
              @click="clickGo"
              size="large"
              color="primary"
              variant="tonal">
              리뷰확인
            </v-btn>
          </v-col>
          <v-col class="text-center" cols="12" md="4"></v-col>
          <v-col class="text-center" cols="12" md="4">
            <v-btn
              @click="clickClose"
              size="large"
              color="grey"
              variant="tonal">
              닫기
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" no-gutters style="height: 40px"> </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import reviewApi from '@/api/reviewApi';
import reservApi from '@/api/reservApi';

export default {
  created() {},

  data() {
    return {};
  },
  methods: {
    clickGo() {
      this.$router.push('/reviewDetail');
    },
    clickClose() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
  },
};
</script>

<style>
.card {
  border-top: 1px yellowgreen solid;
  border-bottom: 1px lightgrey solid;
}
</style>
