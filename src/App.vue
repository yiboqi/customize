<template>
    <div id="app">
      <Login/>
    </div>
</template>

<script>
import Index from './views/Index/Index'
import Login from './views/Login/Login'

export default {
  name: 'App',
  components: {
    Login,
    Index
  }
}
</script>

<style>
@import "assets/css/base.css";
#app{
  height: 100%;
}
</style>
