<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="11">
        <!-- 제목 -->
        <v-container>
          <v-row style="height: 50px"></v-row>
          <v-row>
            <div class="title">산책일지</div>
          </v-row>
        </v-container>
        <v-row style="height: 100px" />

        <!-- 의뢰서 나열 -->
        <v-row class="pt-3 mt-3">
          <v-col align-self="center">
            <v-container>
              <v-divider thickness="3" />
              <!-- 목차 -->
              <v-row class="text-center mt-3 mb-3" no-gutters>
                <v-col cols="12" md="8" align-self="center">
                  <span class="text-regular grey">산책정보</span>
                </v-col>
                <v-col cols="12" md="2" align-self="center">
                  <span class="text-regular grey">최종 수정일시</span>
                </v-col>
                <v-col cols="12" md="2" align-self="center">
                  <span class="text-regular grey">상태</span>
                </v-col>
              </v-row>
              <v-divider thickness="3" />
              <!-- 내용 -->
              <v-row
                class="pa-5 text-center"
                v-for="(d, index) in diaries"
                :key="index"
                @click="selectDiary(d.reservationId)">
                <!-- 도그워커 사진 -->
                <v-col cols="12" md="1" align-self="center">
                  <v-img
                    :src="d.dwImgUrl"
                    aspect-ratio="1"
                    class="pa-5"
                    cover></v-img>
                </v-col>
                <v-col cols="12" md="7" align-self="center">
                  <!-- 날짜 -->
                  <v-row>
                    <div class="mt-2 mb-2">
                      <span class="secondary-color mr-2">산책일</span>
                      <span>{{ formatDate(d.startDt) }}</span>
                    </div>
                  </v-row>
                  <!-- {{ typeof d.startDt }} -->
                  <!-- 시간 -->
                  <v-row>
                    <span
                      class="mr-2 secondary-color"
                      v-if="!d.startDt && !d.endDt"
                      >산책 수행 전</span
                    >
                    <span class="mr-2 secondary-color" v-if="d.startDt"
                      >시작</span
                    >
                    <span class="black" v-if="d.startDt">
                      {{ formatDTtoTime(d.startDt) }}
                    </span>
                    <span class="ml-3 mr-2 secondary-color" v-if="d.endDt">
                      종료
                    </span>
                    <span class="black" v-if="d.endDt">
                      {{ formatDTtoTime(d.endDt) }}
                    </span>
                  </v-row>
                </v-col>
                <v-col cols="12" md="2" align-self="center">
                  <div>
                    {{
                      d.diaryUpdatedAt
                        ? formatDate(d.diaryUpdatedAt)
                        : formatDate(d.diaryCreatedAt)
                    }}
                  </div>
                </v-col>
                <v-col cols="12" md="2" align-self="center">
                  <div class="grey text-regular primary-color semi-bold">
                    {{ d.diaryStatus === 2 ? '작성 중' : '작성 완료' }}
                  </div>
                </v-col>
                <v-divider class="mt-3" />
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <router-view name="dialog" />
</template>

<script>
import reservApi from '@/api/reservApi';
import format from '@/utillFunction/format';
export default {
  created() {
    reservApi
      // .getReservsByCusId(this.$store.state.login.cusId)
      .getDiariesByCusId(this.$store.state.login.cusId)
      .then((res) => {
        console.log(res.data);
        this.diaries = res.data;
        console.log('getDiariesByCusId', this.diaries);

        for (let i = 0; i < this.diaries.length; i++) {
          const dirName = this.diaries[i].dwDirName;
          const fileName = this.diaries[i].dwFileName;
          const extension = this.diaries[i].dwExtension;
          if (dirName && fileName && extension) {
            const urlfront =
              'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
            const dwImgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
            this.diaries[i].dwImgUrl = dwImgUrl;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      diaries: [
        {
          startDt: '',
        },
      ],
    };
  },
  methods: {
    selectDiary(reservId) {
      this.$store.commit('setReservId', reservId);
      this.$router.push('/cusInfo/cusInfoDiary/diaryDetail');
      this.$store.commit('setOpen', true);
    },
    formatDTtoTime(dt) {
      if (dt) {
        return format.formatDTtoTime(dt);
      }
    },
    formatDate(dt) {
      if (dt) {
        return format.formatDate(dt);
      }
    },
  },
};
</script>

<style></style>
