<template>
  <div id="app">
    <h1>AAAAAAAAAAAAAAAAAAAAa</h1>
    <h1>{{ttt}} : <span v-if="isVisible"> {{visit}}</span></h1>
    <h2>{{tttVisit}}</h2>
      <button @click="visitCount()">Visit count
      </button>

    <input type="text" v-model="ttt">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
  ,data() {
    return {
      ttt : 'jns'
      ,visit:0
      ,isVisible: false
    }
  }
  ,methods: {
    visitCount() {
      this.visit ++;
      this.isVisible = (this.visit%2 == 0) ? true : false ;
    }
  }
  ,computed :{
    tttVisit() {
      return "Name "+this.ttt + " And Visit Count : "+ this.visit+" " ;
    }
  }
}
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
