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
              <span v-if="info.monthGoalCnt >= 12" class="red">
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
          <!-- 매너온도 -->
          <v-row no-gutters class="mt-7">
            <v-col cols="12" md="10">
              <v-progress-linear
                color="primary"
                v-model="info.temperture"
                striped
                rounded
                :min="0"
                :max="10"
                :height="27" />
            </v-col>
            <v-col cols="12" md="2">
              <v-tooltip :text="tempertureToolTip" location="bottom">
                <template v-slot:activator="{ props }">
                  <span v-bind="props">
                    <span class="ml-3 grey-little-light"> 매너온도 </span>
                    <span class="primary-color semi-bold">
                      {{ info.temperture }}
                    </span>
                  </span>
                </template>
              </v-tooltip>
            </v-col>

            <!-- 리뷰 보기 -->
            <span>
              <!-- <DwReviewList :dogwalkerNick="info.nick" /> -->
            </span>
          </v-row>
          <!-- 프로필 메세지 -->
          <v-row no-gutters class="mt-7">
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
      <!-- 의뢰서목록 -->
      <v-row>
        <v-container class="ma-3">
          <v-row>
            <div class="mr-5 text-regular">
              <span class="secondary-color mr-1">{{ info.nick }}</span>
              <span>님의 의뢰서</span>
            </div>
            <div class="mt-1">
              <CusComListVue :coms="coms" />
            </div>
          </v-row>
          <v-row class="mt-5">
            <v-col v-for="(com, i) in coms" :key="i" cols="12" md="3">
              <div
                v-if="i < 3"
                @click="selectCom(com.commisionId, com.dogwalkerId)">
                <FigureCus :comm="com"></FigureCus>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-divider thickness="2" class="mt-3 mb-3" />
      <!-- 게시물 -->
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import commitApi from '@/api/commitApi';

import format from '@/utillFunction/format';
import FigureCus from '@/components/FigureCus.vue';
// import DwAppList from '@/views/dialog/profile/DwAppList';
// import DwReviewList from '@/views/dialog/profile/DwReviewList';
import CusComListVue from '../dialog/profile/CusComList.vue';

export default {
  components: {
    FigureCus,
    CusComListVue,
    // DwReviewList,
  },
  created() {
    // profile 정보
    myInfoApi
      .getProfileByCusId(this.$store.state.item.userInfo.userId)
      .then((res) => {
        console.log('getProfileByCusId', res.data);
        this.info = res.data;
        // this.tp = this.info.temperture * 10;
        // 이미지 출력
        const urlfront = 'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
        if (this.info.dirName && this.info.fileName && this.info.extension) {
          this.info.imgUrl = `${urlfront}/${this.info.dirName}/${this.info.fileName}.${this.info.extension}`;
        }
        // 임시
        this.info.temperture = 9;
      })
      .catch((e) => {
        console.log(e);
      });

    // customer id -> commision list
    commitApi
      .getCmsByCusId(this.$store.state.item.userInfo.userId)
      .then((res) => {
        if (res.data.length > 0) {
          this.coms = res.data;
          console.log('this.coms', this.coms);
          // 이미지 출력
          for (let i = 0; i < this.coms.length; i++) {
            const dirName = this.coms[i].dirName;
            const fileName = this.coms[i].fileName;
            const extension = this.coms[i].extension;
            if (dirName && fileName && extension) {
              const urlfront =
                'https://lyd-bucket1.s3.ap-northeast-2.amazonaws.com';
              const imgUrl = `${urlfront}/${dirName}/${fileName}.${extension}`;
              this.coms[i].imgUrl = imgUrl;
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
        temperture: 5,
        profileMessage: '',
        grade: 'A',
        monthGoalCnt: 11,
        goalCnt: 30,
      },
      coms: [],
      tempertureToolTip:
        '고객 매너온도는 산책 종료 후 도그워커가 고객의 매너를 평가한 지표입니다.',
      fireToolTip: '이번 달 산책횟수가 12 이상으로 활발히 활동하는 회원입니다.',

      tp: 0,
    };
  },
  methods: {
    selectCom(comId) {
      this.$store.commit('setComId', comId);
      this.$router.push({ name: 'detailCus', query: { commisionId: comId } });
    },
    formatGrade(grade) {
      return format.formatGrade(grade);
    },
  },
};
</script>

<style></style>
