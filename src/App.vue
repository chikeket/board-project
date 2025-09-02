<template>
  <div class="container">
    <h3>초간단 게시판</h3>
    <p v-if="!user.id">로그인을 진행하세요</p>

    <div v-else>
      <PostForm @add-post="addPost">
        <template v-slot:header>
          <div>Header</div>
        </template>
        <template #default>
          <p>이름없는 slot</p>
        </template>
        <template v-slot:footer>
          <div>&copy; since 1990</div>
        </template>
      </PostForm>
    </div>

    <hr />
    <PostList v-bind:posts="posts" />

    <a v-if="!user.id" @click="kakaoLogin">
      <img src="./assets/kakao_logo.png" />
    </a>

    <a v-else @click="kakaoOut">로그아웃</a>
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";

export default {
  name: "App",
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      user: { id: "", name: "" },

      // posts: [
      //   // {
      //   //   id: 1,
      //   //   title: "글등록연습",
      //   //   content: "잘등록됩니다.",
      //   //   date: new Date().toLocaleDateString(),
      //   // },
      // ],
    };
  },
  computed: {
    // 계산된 속성.
    posts() {
      return this.$store.getters.getBoardList;
    },
  },
  methods: {
    addPost(payload) {
      this.posts.push({
        id: this.posts.length + 1,
        title: payload.title,
        content: payload.content,
        date: new Date().toLocaleDateString(),
        uid: this.user.id,
      });
      console.log(this.posts);
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email", //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
        success: this.getKakaoAccount, // 로그인 성공시, 인증정보를 받기
      });
    },
    getKakaoAccount() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log(res);
          const kakao_account = res.kakao_account;
          const nickname = kakao_account.profile.nickname; //카카오 닉네임
          const email = kakao_account.email; //카카오 이메일
          console.log("nickname:", nickname);
          console.log("email:", email);

          //로그인 처리 구현
          this.user.id = email;
          this.user.name = nickname; //로그인 성공 시 uid값 업데이트
          this.$store.commit("setId", email);
          alert(nickname + "님 로그인 되었습니다.");
        },
        fail: (error) => console.log(error),
      });
    },
    kakaoOut() {
      window.Kakao.Auth.logout((response) => {
        //로그아웃
        console.log(response);
        this.user.id = "";
        this.user.name = "";
      });
    },
  },
  provide() {
    //컴포넌트가 너무 많을때는 전역으로 쉽게 쓰기위해 사용되는 함수
    return {
      user: this.user, // App.vue > PostList.vue > PostItem.vue
    };
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
