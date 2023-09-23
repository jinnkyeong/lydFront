<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <!-- 제목 -->
          <v-row>
            <div class="title mr-2">내 지원서 목록</div>
            <!-- 의뢰서 나열 -->
          </v-row>
          <v-spacer style="height: 100px" />
          <v-row no-gutters>
            <v-col v-for="(app, i) in apps" :key="i" cols="12" md="4">
              <div @click="selectApp(app.applicationId)">
                <div>
                  <Figure :appl="app" />
                </div>
                <div class="text-center mt-2 grey">
                  작성일 : {{ formatDateTime(app.createdAt) }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import applyApi from '@/api/applyApi';
import format from '@/utillFunction/format';
import Figure from '@/components/Figure.vue';

export default {
  components: {
    Figure,
  },
  created() {
    applyApi
      .getAppsByDwId(this.$store.state.login.dwId)
      .then((res) => {
        if (res.data.length > 0) {
          this.apps = res.data;
          console.log('this.apps', this.apps);
          // 이미지 출력
          for (let i = 0; i < this.apps.length; i++) {
            const dirName = this.apps[i].dirName;
            const fileName = this.apps[i].fileName;
            const extension = this.apps[i].extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;

              this.apps[i].imgUrl = imgUrl;
            }
          }
        } else {
          // 없으면
          console.log('제안 내역이 존재하지 않습니다');
          this.message = '제안 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      apps: [],
      message: '',
    };
  },
  methods: {
    selectApp(appId) {
      this.$store.commit('setAppId', appId);
      this.$router.push({ name: 'detailDw', query: { applicationId: appId } });
    },
    // 날짜 포맷(2023-08-19T20:11:29 -> 2023-08-19)
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
    // formatDateTime(dt) {
    //   // 2023-08-23T06:33:06 -> 2023년 8월 23일 6시 33분
    //   const date = dt.split('T')[0];
    //   const time = dt.split('T')[1];

    //   const year = date.split('-')[0];
    //   const month = date.split('-')[1];
    //   const day = date.split('-')[2];

    //   let apm = '오전';
    //   let hour;
    //   if (time.split(':')[0] > 12) {
    //     hour = time.split(':')[0] - 12;
    //     apm = '오후';
    //   } else {
    //     hour = time.split(':')[0];
    //   }
    //   const min = time.split(':')[1];

    //   return (
    //     year +
    //     '년 ' +
    //     month +
    //     '월 ' +
    //     day +
    //     '일 ' +
    //     apm +
    //     ' ' +
    //     hour +
    //     '시 ' +
    //     min +
    //     '분'
    //   );
    // },
    formatWeekday(week) {
      if (week) {
        return format.formatWeekday(week);
      }
    },
  },
};
</script>

<style>
.sentence {
  color: blueviolet;
}
</style>
