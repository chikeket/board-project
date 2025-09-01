<template>
  <div class="container"></div>
  <h3>초간단 게시판</h3>
  <PostForm @add-post="addPost" />
  <PostList v-bind:posts="posts" />
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
      posts: [
        // {
        //   id: 1,
        //   title: "글등록연습",
        //   content: "잘등록됩니다.",
        //   date: new Date().toLocaleDateString(),
        // },
      ],
    };
  },
  methods: {
    addPost(payload) {
      this.posts.push({
        id: this.posts.length + 1,
        title: payload.title,
        content: payload.content,
        date: new Date().toLocaleDateString(),
      });
    },
  },
  provide() {
    //컴포넌트가 너무 많을때는 전역으로 쉽게 쓰기위해 사용되는 함수
    return {
      uid: "user01", // App.vue > PostList.vue > PostItem.vue
    };
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
