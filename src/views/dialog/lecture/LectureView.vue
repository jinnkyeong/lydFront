<template>
  <v-dialog
    class="dialog"
    width="700px"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <!-- 너버 - 임의로 정함 -->
    <v-card class="pa-5">
      <v-card-title>
        <div class="pa-2 ml-4">{{ $store.state.item.video.title }}</div>
        <v-divider thickness="4" color="primary" />
        <button @click="clickClose">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
      </v-card-title>
      <!-- 동영상 -->
      <v-card-text>
        <v-row justify="center">
          <iframe
            width="560"
            height="315"
            :src="$store.state.item.video.url"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
          picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </v-row>
      </v-card-text>
      <v-spacer style="height: 50px" />
    </v-card>
  </v-dialog>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
export default {
  created() {},
  components: {},
  data() {
    return {};
  },
  methods: {
    clickClose() {
      // 일단 완강한 것으로 처리
      const now = new Date();
      const info = {
        dogwalkerId: this.$store.state.login.dwId,
        lectureTypeId: this.$store.state.item.video.lectureTypeId,
        endAt: now,
      };
      console.log('info ', info);
      myInfoApi
        .postLecture(info)
        .then((res) => {
          console.log(res.data);
          this.$store.commit('setOpen', false); // 창 닫기
          this.$router.go(0);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style></style>
