<template>
  <div class="app-index">
    <h1>This is index app.</h1>
    <div>
      <h2>Author list</h2>
      <ul>
        <li v-for="item in authorList" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .app-index {
    color: gray;
  }
</style>


<script lang="ts" src="./index.ts"></script>
