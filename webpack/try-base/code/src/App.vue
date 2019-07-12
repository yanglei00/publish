<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style  lang="less" scoped>
html{
    body{
        .example{
            color: red;
        }
    }
}
</style>