<template>
  <div class="author-panel-container">
    <h1>Author List</h1>
    <ul>
      <li v-for="item in authorList" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts" src="./author-panel.ts"></script>
