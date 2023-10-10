<template>
  <v-container>
    <!-- 제목 -->
    <v-row>
      <v-col cols="12" md="11">
        <v-container>
          <v-row style="height: 50px"></v-row>
          <!-- 제목 -->
          <v-row>
            <div class="title mr-2">내 의뢰서 목록</div>
            <!-- 의뢰서 나열 -->
          </v-row>
          <v-spacer style="height: 100px" />
          <v-row no-gutters>
            <v-col v-for="(com, i) in coms" :key="i" cols="12" md="4">
              <div @click="selectCom(com.commisionId)">
                <div>
                  <FigureCus :comm="com" />
                </div>
                <div class="text-center mt-2 grey">
                  작성일 : {{ formatDateTime(com.createdAt) }}
                </div>
              </div>
            </v-col>
            <!-- 하나도 없는 경우 -->
            <!-- <v-row justify="center" style="height: 200px">
            <v-col cols="12" md="8" align-self="center">
              <div>{{ message }}</div>
            </v-col>
          </v-row> -->
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import myInfoApi from '@/api/myInfoApi';
import commitApi from '@/api/commitApi';
import FigureCus from '@/components/FigureCus';

export default {
  components: {
    FigureCus,
  },
  created() {
    commitApi
      .getCmsByCusId(this.$store.state.login.cusId)
      .then((res) => {
        if (res.data.length > 0) {
          this.coms = res.data;
          console.log(this.coms);
          // image
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
          console.log('부족');
          this.message = '제안 내역이 존재하지 않습니다';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data() {
    return {
      coms: [],
      message: '',
    };
  },
  methods: {
    selectCom(comId) {
      this.$store.commit('setComId', comId);
      this.$router.push({ name: 'detailCus', query: { commisionId: comId } });
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
    formatDateTime(dt) {
      return new Date(dt).toISOString().split('T')[0];
    },
  },
};
</script>

<style></style>
