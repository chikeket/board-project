<template>
  <h3>{{ msg }}</h3>
  <slot name="header"></slot>
  <form @submit.prevent="handleSubmit" class="post-form">
    <div class="form-group">
      <label for="title">제목</label>
      <input type="text" id="title" v-model="title" required />
    </div>

    <div class="form-group">
      <label for="content">내용</label>
      <textarea id="content" v-model="content" rows="4" required></textarea>
    </div>
    <slot></slot>
    <button type="submit">글 등록</button>
  </form>
  <slot name="footer"></slot>
</template>
<script>
export default {
  data() {
    return {
      msg: "게시글 작성",
      title: "",
      content: "",
    };
  },
  emits: ["addPost"], // <- 여기에 이벤트 선언
  methods: {
    handleSubmit() {
      let post = {
        title: this.title,
        content: this.content,
      };
      this.$emit("add-post", post);
      // 입력 필드 초기화.
      this.title = "";
      this.content = "";
    },
  },
};
</script>

<style scoped>
.post-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
