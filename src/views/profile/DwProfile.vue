<template>
  <v-spacer style="height: 100px" />
  <v-row>
    <v-spacer />
    <v-col cols="12" md="8">
      <v-row>
        <!-- 이미지 -->
        <v-col cols="12" md="4">
          <v-avatar class="profileImage" size="200px" @click="modProfile">
            <v-img v-if="info.imgUrl" :src="info.imgUrl" cover></v-img>
            <v-img
              v-if="!info.imgUrl"
              src="@/assets/images/profile/profileImage.jpg"
              cover />
          </v-avatar>
        </v-col>
        <!-- 정보 -->
        <v-col cols="12" md="8">
          <v-row no-gutters class="mt-2 mb-2">
            <!-- 닉네임 -->
            <v-col>
              <span class="title mr-4">{{ info.nick }}</span>
              <!-- 이메일 -->
              <span class="text-regular grey mr-5">{{ info.email }}</span>
              <span class="text-regular">
                <v-chip color="primary" size="large">
                  {{ formatGrade(info.grade) }}
                </v-chip>
              </span>
            </v-col>
          </v-row>
          <!-- 산책횟수 -->
          <v-row class="text-regular mt-2 mb-2" no-gutters>
            <span class="mr-10">
              <span class="mr-2">이번 달 산책횟수</span>
              <span class="mr-2 semi-bold">{{ info.monthGoalCnt }}</span>
              <span v-if="info.monthGoalCnt >= 5" class="red">
                <v-tooltip :text="fireToolTip">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props">
                      <font-awesome-icon icon="fa-solid fa-fire" />
                    </span>
                  </template>
                </v-tooltip>
              </span>
            </span>
            <span>
              <span class="mr-2">누적 산책횟수</span>
              <span class="semi-bold">{{ info.goalCnt }}</span>
            </span>

            <v-spacer />
          </v-row>
          <!-- 별점 -->
          <v-row no-gutters>
            <span class="mr-4">
              <v-rating
                :model-value="info.star / 2"
                color="amber"
                density="compact"
                half-increments
                readonly></v-rating>
            </span>
            <!-- 리뷰 보기 -->
            <span>
              <DwReviewList :dogwalkerNick="info.nick" />
            </span>
          </v-row>
          <!-- 프로필 메세지 -->
          <v-row no-gutters>
            <v-textarea
              class="ma-0 pa-0"
              no-resize
              rows="3"
              readonly
              :model-value="info.profileMessage" />
          </v-row>
        </v-col>
      </v-row>
      <v-divider thickness="4" color="primary" class="mt-3 mb-3" />
      <!-- 게시물 -->

      <v-divider thickness="2" class="mt-3 mb-3" />

      <!-- 지원서목록 -->
      <v-row>
        <v-container class="ma-3">
          <v-row>
            <div class="mr-5 text-regular">
              <span class="secondary-color mr-1">{{ info.nick }}</span>
              <span>님의 지원서</span>
            </div>
            <div class="mt-1">
              <DwAppList :apps="apps" />
            </div>
          </v-row>
          <v-row class="mt-5">
            <v-col v-for="(app, i) in apps" :key="i" cols="12" md="3">
              <div
                v-if="i < 3"
                @click="selectApp(app.applicationId, app.dogwalkerId)">
                <Figure :appl="app"></Figure>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import applyApi from '@/api/applyApi';

import format from '@/utillFunction/format';
import Figure from '@/components/Figure.vue';
import DwAppList from '@/views/dialog/profile/DwAppList';
import DwReviewList from '@/views/dialog/profile/DwReviewList';

export default {
  components: {
    Figure,
    DwAppList,
    DwReviewList,
  },
  created() {
    // profile 정보
    myInfoApi
      .getProfileByDwId(this.$store.state.item.userInfo.userId)
      .then((res) => {
        console.log('getProfileByDwId', res.data);
        this.info = res.data;
        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        if (this.info.dirName && this.info.fileName && this.info.extension) {
          this.info.imgUrl = `${urlfront}/${this.info.dirName}/${this.info.fileName}.${this.info.extension}`;
        }
        this.info.monthGoalCnt = 7;
      })
      .catch((e) => {
        console.log(e);
      });

    // dogwalker id -> applicaition list
    applyApi
      .getAppsByDwId(this.$store.state.item.userInfo.userId)
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
      info: {
        nick: '',
        email: '',
        // new
        star: 0,
        profileMessage: '',
        grade: '',
        monthGoalCnt: 0,
        goalCnt: 0,
      },
      apps: [],
      fireToolTip:
        '이번 달 산책횟수가 5회 이상으로 활발히 활동하는 회원입니다.',
    };
  },
  methods: {
    selectApp(appId) {
      this.$store.commit('setAppId', appId);
      this.$router.push({ name: 'detailDw', query: { applicationId: appId } });
    },
    formatGrade(grade) {
      return format.formatGrade(grade);
    },
  },
};
</script>

<style></style>
