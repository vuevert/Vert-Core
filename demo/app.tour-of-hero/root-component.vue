<template>
  <div class="tour-of-hero">
    <h1>Tour of hero</h1>
    <nav>
      <div>Destination</div>
      <hr>
      <div>
        <router-link to="/"><button>The World</button></router-link>
        <router-link to="/pothouse"><button>Pothouse</button></router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
  body {
    color: #2196F3;
  }

  button {
    padding: 5px 10px;
    background-color: #2196F3;
    color: #fff;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
  }

  button:active {
    transform: translate(1px, 1px);
  }
</style>

<script lang="ts" src="./root-component.ts"></script>
