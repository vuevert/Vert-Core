<template>
  <div class="hero-information">
    <h3>{{heroName}}</h3>
    <div class="name">
      <span>Name: {{hero.name}}</span>
    </div>
    <div class="level">
      <span>Level: {{hero.level}}</span>
    </div>
    <div class="type">
      <span>Type: {{hero.type}}</span>
    </div>
    <div class="hp">
      <span>HP: {{hero.hp}}</span>
    </div>
    <div class="mp">
      <span>MP: {{hero.mp}}</span>
    </div>
    <div class="attack">
      <span>Attack: {{hero.attack}}</span>
    </div>
    <router-link to="/pothouse">
      <button class="back-button">Back</button>
    </router-link>
  </div>
</template>

<style scoped>
  .back-button {
    margin-top: 10px;
  }
</style>

<script lang="ts" src="./hero.ts"></script>
