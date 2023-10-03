<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col cols="12" md="6">
        <v-containter>
          <v-row style="height: 200px"></v-row>
          <v-row justify="center" no-gutters style="height: 20px">
            <div class="title">의뢰서 수정하기</div>
          </v-row>
          <v-row style="height: 100px"></v-row>
          <!--전체-->
          <v-row no-gutters>
            <v-container>
              <!-- 닉네임 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.nick">닉네임</v-field-label>
                  <v-text-field
                    v-model="info.nick"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 성별 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.gen">성별</v-field-label>
                  <v-text-field
                    v-model="info.gen"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 나이 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.age">나이</v-field-label>
                  <v-text-field
                    v-model="info.age"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 주소 -->
              <v-container>
                <v-row class="mt-16">
                  <v-label>주소</v-label>
                </v-row>
                <v-row class="mt-16">
                  <v-text-field
                    v-model="info.addrState"
                    variant="underlined"></v-text-field>
                  <v-text-field
                    v-model="info.addrTown"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 산책일시 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label>산책 날짜 및 시간</v-field-label>
                </v-row>
                <v-row>
                  <v-col
                    align-self="center"
                    cols="12"
                    md="2"
                    class="field-label-sub"
                    >산책 날짜</v-col
                  >
                  <v-col>
                    <v-text-field
                      v-model="info.month"
                      variant="underlined"
                      suffix="월"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="info.day"
                      variant="underlined"
                      suffix="일"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    align-self="center"
                    cols="12"
                    md="2"
                    class="field-label-sub"
                    >시작시간</v-col
                  >

                  <v-col>
                    <v-text-field
                      v-model="info.startHour"
                      variant="underlined"
                      suffix="시"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="info.startMin"
                      variant="underlined"
                      suffix="분"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    align-self="center"
                    cols="12"
                    md="2"
                    class="field-label-sub"
                    >종료시간</v-col
                  >

                  <v-col>
                    <v-text-field
                      v-model="info.endHour"
                      variant="underlined"
                      suffix="시"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="info.endMin"
                      variant="underlined"
                      suffix="분"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <!-- 자격증 -->
              <v-container>
                <v-row
                  v-for="(cert, index) in info.certificateKeywords"
                  :key="index"
                  class="mt-16">
                  <div v-if="index === 0">
                    <v-label>희망하는 자격증</v-label>
                  </div>
                  <v-text-field
                    v-model="info.certificateKeywords[index]"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 금액 -->
              <v-container>
                <v-row class="mt-16">
                  <v-text-field
                    v-model="info.price"
                    label="희망하는 시간당 보수금액"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 반려견 이름 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.dogName"
                    >반려견 이름</v-field-label
                  >
                  <v-text-field
                    v-model="info.dogName"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 반려견 나이 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.dogAge"
                    >반려견 나이</v-field-label
                  >
                  <v-text-field
                    v-model="info.dogAge"
                    variant="underlined"
                    suffix="개월"></v-text-field>
                </v-row>
              </v-container>
              <!-- 반려견 견종 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.breed"
                    >반려견 견종</v-field-label
                  >
                  <v-text-field
                    v-model="info.breed"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 반려견 유형 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.dogType"
                    >반려견 유형(소/중/대형)</v-field-label
                  >
                  <v-text-field
                    v-model="info.dogType"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 반려견 공격성 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.dogAggr"
                    >반려견 공격성</v-field-label
                  >
                  <v-text-field
                    v-model="info.dogAggr"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 반려견 건강상태 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.dogHealth"
                    >반려견 건강상태</v-field-label
                  >
                  <v-text-field
                    v-model="info.dogHealth"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 산책로 -->
              <v-container>
                <v-row class="mt-16">
                  <v-field-label ref_for="info.road">산책로 지정</v-field-label>
                  <v-text-field
                    v-model="info.road"
                    variant="underlined"></v-text-field>
                </v-row>
              </v-container>
              <!-- 유의할 점 -->
              <v-container>
                <v-row
                  v-for="(rq, index) in info.cusRequireDtos"
                  :key="index"
                  class="mt-16">
                  <div v-if="index === 1">
                    <v-label>요청사항</v-label>
                  </div>
                </v-row>
                <v-row v-for="(rq, index) in info.cusRequireDtos" :key="index">
                  <v-col cols="12" md="1">
                    {{ index + 1 }}
                  </v-col>
                  <v-col cols="12" md="11">
                    <v-text-field
                      v-model="rq.context"
                      variant="underlined"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <!-- 수정하기 : 해당 의뢰서 작성자의 id = 현재 유저의 id -->
              <v-container>
                <v-row class="mt-16">
                  <v-spacer />
                  <v-col cols="12" md="4">
                    <ConfirmMod @mod="modifyApp" />
                  </v-col>
                  <v-spacer />
                  <v-col cols="12" md="4">
                    <ConfirmDel @del="deleteApp" />
                  </v-col>
                  <v-spacer />
                </v-row>
              </v-container>
            </v-container>
          </v-row>
          <v-row style="height: 200px"></v-row>
        </v-containter>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import commitApi from '@/api/commitApi';

import searchApi from '@/api/searchApi';
import ConfirmMod from '@/views/dialog/confirm/ConfirmMod';
import ConfirmDel from '@/views/dialog/confirm/ConfirmDel';

export default {
  created() {
    //상세보기 데이터 가져오기
    commitApi
      .getCmById(this.$store.state.item.comId)
      .then((res) => {
        console.log('result : ', res.data);
        this.info = res.data;
        this.$store.commit('setItems', res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  components: {
    ConfirmMod,
    ConfirmDel,
  },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    modifyCom(mod) {
      console.log(this.info);
      console.log(mod);
      console.log(this.$store.state.item.comId); // string
      if (mod) {
        //null 체크
        searchApi
          .modifyCom(this.$store.state.item.comId, this.info)
          .then((res) => {
            console.log(res.data);
            // this.$router.push('detailDw')
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteCom(del) {
      if (del) {
        searchApi
          .deleteCom(this.$store.state.item.comId)
          .then((res) => {
            console.log(res.data);
            // this.$router.push('detailDw')
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>

<style></style>
