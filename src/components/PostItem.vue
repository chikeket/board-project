<template>
  <div class="post-item">
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <small>작성일: {{ post.date }}</small>
    <p>작성자: {{ uid }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  props: {
    post: { type: Object, default: () => {} },
  },
  inject: ["uid"],
};
</script>

<style scoped>
.post-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8pe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
