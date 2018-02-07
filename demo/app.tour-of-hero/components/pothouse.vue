<template>
  <div class="pothouse-container">
    <h2>Pothouse</h2>
    <div>All heroes you can find:</div>
    <ul class="hero-list">
      <li class="hero-item" v-for="item in heroes">
        <div class="hero-level">{{item.level}}</div>
        <div class="hero-name">
          <router-link :to="'/hero/' + item.name">{{item.name}}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .pothouse-container {
    color: #2196F3;
  }

  .hero-list {
    padding: 0;
    list-style: none;
  }

  .hero-list .hero-item {
    width: 160px;
    margin: 10px 0;
    font-size: 13px;
    border: 1px solid #2196F3;
    border-radius: 5px;
  }

  .hero-list .hero-item a {
    color: inherit;
    font-style: normal;
    text-decoration: none;
  }

  .hero-list .hero-item .hero-level,
  .hero-list .hero-item .hero-name {
    display: inline-block;
    padding: 5px 10px;
  }

  .hero-list .hero-item .hero-level {
    width: 20px;
    text-align: center;
    background-color: #2196F3;
    color: #fff;
  }
</style>

<script lang="ts" src="./pothouse.ts"></script>
