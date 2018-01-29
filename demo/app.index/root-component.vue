<template>
  <div class="app-container">
    <nav class="navigator">
      <span>Navigator:</span>
      <router-link to="/">Index</router-link>
      <router-link to="/author">Author Panel</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" src="./root-component.ts"></script>
