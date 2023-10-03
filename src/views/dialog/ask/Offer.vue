<template>
  <v-dialog
    class="dialog"
    width="auto"
    transition="dialog-top-transition"
    v-model="$store.state.just_state.open">
    <v-card class="pa-10">
      <!-- 제목 -->
      <v-container>
        <h3 class="pt-6">
          <span class="primary-color">{{ comInfo.name }}</span>
          <span> 고객님에게 의뢰제안을 하시겠습니까? </span>
        </h3>
      </v-container>

      <!-- 자신의 의뢰서 선택 -->
      <v-container class="mt-10">
        <div class="desc mb-2">고객님에게 보여드릴 지원서를 골라주세요.</div>
        <div>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">각오</th>
                <th class="text-left">활동가능지역</th>
                <th class="text-left">근무가능요일</th>
                <th class="text-left">가격</th>
                <th class="text-left">작성일자</th>
                <th class="text-left">선택</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in appList" :key="app">
                <td @click="selectApp(app.applicationId)">
                  {{ app.sentence }}
                </td>
                <td @click="selectApp(app.applicationId)">
                  <div>{{ app.addrState }}{{ app.addrTown }}</div>
                  <div v-for="loc in app.locations" :key="loc">
                    {{ loc.state }} {{ loc.town }}
                  </div>
                </td>
                <td @click="selectApp(app.applicationId)">
                  <span v-for="w in app.weekdayNames" :key="w">
                    {{ w }}
                  </span>
                </td>
                <td @click="selectApp(app.applicationId)">
                  {{ app.price }}
                </td>
                <td @click="selectApp(app.applicationId)">
                  {{ formatDate(app.createdAt) }}
                </td>
                <td>
                  <v-chip
                    v-if="datas.applicationId === app.applicationId"
                    color="primary"
                    >선택됨</v-chip
                  >
                  <v-chip
                    v-if="datas.applicationId != app.applicationId"
                    color="secondary"
                    >미선택</v-chip
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-container>

      <!-- 보수가격 결정 -->
      <v-container class="mt-10">
        <div class="desc mb-2">제안 시 시간당 보수가격을 결정해주세요</div>

        <v-row no-gutters class="pt-3">
          <span class="text-regular">
            <span class="primary-color">
              {{ comInfo.nick }}
            </span>
            <span> 고객님의 희망가격 </span>
          </span>
          <span class="mr-2 ml-2"> : </span>
          <span class="text-regular">{{ comInfo.price }} 원</span>
        </v-row>

        <v-row no-gutters class="pt-3">
          <v-col cols="12" md="6">
            <v-text-field
              class="ma-0 pa-0"
              v-model="datas.price"
              variant="outlined"
              suffix="원"
              placeholder="희망가격을 입력해주세요(숫자만 입력가능)"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer style="height: 100px" />

      <v-row justify="center" class="text-center">
        <v-spacer />
        <v-col cols="12" md="3" align-self="center">
          <v-btn @click="clickYes" size="large" color="primary" block>
            <span class="white text-regular">예</span>
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="3" align-self="center">
          <v-btn @click="clickCancel" size="large" color="grey" block>
            <span class="white text-regular">아니오</span>
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
      <v-spacer style="height: 200px" />
    </v-card>
  </v-dialog>
</template>

<script>
import offerApi from '@/api/offerApi';
import applyApi from '@/api/applyApi';
import format from '@/utillFunction/format';

export default {
  created() {
    this.comInfo = this.$store.state.just_state.items; // 문의 대상 com
    console.log('문의 대상 : ', this.comInfo);

    // 선택할 자신의 지원서 목록 출력
    // dogwalekrId(login input) -> application list
    applyApi
      .getAppsByDwId(this.$store.state.login.dwId)
      .then((res) => {
        this.appList = res.data;
        console.log('appList ', this.appList);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  updated() {
    // (AppDetail에서)고른 지원서. (css, api post 목적으로 저장)
    if (this.$store.state.item.appId) {
      this.datas.applicationId = this.$store.state.item.appId;
    }
  },

  components: {},
  data() {
    return {
      comInfo: {}, // 제안 대상 com : 출력

      datas: {
        //  : post
        applicationId: null, // 고른 자신의 applicationId
        commisionId: null,
        price: null, // 제안 시 새로 입력한 가격
      },

      appList: [], // 자신의 applicaiton list : 출력
    };
  },
  methods: {
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
    // 제안하기
    clickYes() {
      this.datas.commisionId = this.comInfo.commisionId;
      offerApi
        .postOffer(this.datas, 1) // 단순 제안
        .then((res) => {
          console.log('제안성공 ', res.data);
          // 문의 완료 창으로
          this.$router.push({
            name: 'offerSuccess',
            query: {
              customerNick: this.comInfo.nick,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    selectApp(appId) {
      // 의뢰보기 상세보기
      this.$router.push({ name: 'appDetail', query: { appId: appId } });
    },
    formatDate(dt) {
      return format.formatDate(dt);
    },
  },
};
</script>

<style></style>
