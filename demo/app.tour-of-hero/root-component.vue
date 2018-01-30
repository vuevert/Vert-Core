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

<script lang="ts" src="./root-component.ts"></script>
