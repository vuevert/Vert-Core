<template>
  <div class="pothouse-container">
    <h2>Pothouse</h2>
    <div>All heroes you can find:</div>
    <ul>
      <li v-for="item in heroes">
        <router-link :to="'/hero/' + item.name">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./pothouse.ts"></script>
