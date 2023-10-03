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
          <span> 도그워커 </span>
          <span class="primary-color">{{ appInfo.name }}</span>
          <span> 에게 산책문의를 하시겠습니까? </span>
        </h3>
      </v-container>

      <!-- 자신의 의뢰서 선택 -->
      <v-container class="mt-10">
        <div class="desc mb-2">
          도그워커에게 보여질 고객님의 의뢰서를 골라주세요.
        </div>
        <div>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">장소</th>
                <th class="text-left">날짜</th>
                <th class="text-left">시간</th>
                <th class="text-left">가격</th>
                <th class="text-left">작성일자</th>
                <th class="text-left">선택</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="com in commitList" :key="com">
                <td @click="selectCom(com.commisionId)">
                  {{ com.addrState }} {{ com.addrTown }}
                </td>
                <td @click="selectCom(com.commisionId)">
                  {{ com.month }}월 {{ com.day }}일
                </td>
                <td @click="selectCom(com.commisionId)">
                  {{ com.startHour }}시 {{ com.startMin }}분 ~
                  {{ com.endHour }}시 {{ com.endMin }}분
                </td>
                <td @click="selectCom(com.commisionId)">
                  {{ com.price }}
                </td>
                <td @click="selectCom(com.commisionId)">
                  {{ formatDate(com.createdAt) }}
                </td>
                <td>
                  <v-chip
                    v-if="datas.commisionId === com.commisionId"
                    color="primary">
                    선택됨
                  </v-chip>
                  <v-chip
                    v-if="datas.commisionId != com.commisionId"
                    color="secondary">
                    미선택
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-container>

      <!-- 보수가격 결정 -->
      <v-container class="mt-10">
        <div class="desc mb-2">문의 시 시간당 보수가격을 결정해주세요</div>

        <v-row no-gutters class="pt-3">
          <span class="text-regular">
            <span>도그워커 </span>
            <span class="primary-color">
              {{ appInfo.nick }}
            </span>
            <span> 님의 희망가격 </span>
          </span>
          <span class="mr-2 ml-2"> : </span>
          <span class="text-regular">{{ appInfo.price }} 원</span>
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
import inquiryApi from '@/api/inquiryApi';
import commitApi from '@/api/commitApi';
import format from '@/utillFunction/format';

export default {
  created() {
    this.appInfo = this.$store.state.just_state.items; // 문의 대상 app
    console.log('문의 대상 : ', this.appInfo);

    // 선택할 자신의 의뢰서 목록 출력
    // customerId(login input) -> commision list
    console.log('login - customerid : ', this.$store.state.login.cusId);
    commitApi
      .getCmsByCusId(this.$store.state.login.cusId)
      .then((res) => {
        this.commitList = res.data;
        console.log('commitList ', this.commitList);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    // 일단 여기서 해제...
    this.$store.commit('setExposeMB', false);
    console.log('여기서 해제...');
  },
  updated() {
    // (ComDetail에서)고른 의뢰서. (css, api post 목적으로 저장)
    if (this.$store.state.item.comId) {
      this.datas.commisionId = this.$store.state.item.comId;
    }
  },

  components: {},
  data() {
    return {
      appInfo: {}, // 문의 대상 app : 출력

      datas: {
        //  : post
        applicationId: null,
        commisionId: null, // 고른 자신의 commisionId
        price: null, // 문의 시 새로 입력한 가격
      },

      commitList: [], // commision list : 출력
    };
  },
  methods: {
    clickCancel() {
      this.$store.commit('setOpen', false); // 창 닫기
    },
    clickYes() {
      this.datas.applicationId = this.appInfo.applicationId;
      console.log('문의 전 체크 ', this.datas);
      inquiryApi
        .postInquiry(this.datas)
        .then((res) => {
          console.log('문의성공 ', res.data);
          // console.log('nick ? ', this.appInfo.nick);
          // 문의 완료 창으로
          this.$router.push({
            name: 'inquirySuccess',
            query: {
              dogwalkerNick: this.appInfo.nick,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    selectCom(comId) {
      // 의뢰보기 상세보기
      console.log('selectCom에 넘어온 comId : ', comId);
      this.$router.push({ name: 'comDetail', query: { comId: comId } });
    },
    formatDate(dt) {
      return format.formatDate(dt);
    },
  },
};
</script>

<style></style>
