# Vert

Vert is the library to build Vue applications in OOP.

[![npm version](https://badge.fury.io/js/%40vert%2Fcore.svg)](https://badge.fury.io/js/%40vert%2Fcore)
[![Build Status](https://travis-ci.org/LancerComet/Vert-Core.svg?branch=master)](https://github.com/LancerComet/Vert-Core)

![vert-logo](https://raw.githubusercontent.com/LancerComet/Vert-Core/master/logo.png)

## Features

 - Build OOP Vue apps by using Angular-like grammar.
 - Pure TypeScript Experience.
 - Basically it's a service container for Vue.
 - Inject dependencies into Vue components directly.
 - Built-in service ([@vert/services](https://github.com/LancerComet/Vert-Services)).
 - Available for both [Vue-SSR](https://ssr.vuejs.org) and [Nuxt.js](https://github.com/nuxt/nuxt.js).

## Demo

You can check these out:

 - [vert-vue-ssr-template](https://github.com/LancerComet/vert-vue-ssr-template)
 - [vert-demo](https://github.com/LancerComet/Vert-Demo)

## Introduction

Vert is a library which is designed for building applications that are based on Vue in OOP. It provides some function and decorators to help you to achieve that goal. In General, it turns Vue into Angular.

If you don't feel good about it, please just stop reading. 😢

## Quick start

### Setup.

Install the necessaries:

```bash
npm install @vert/core reflect-metadata --save
```

Turn on `emitDecoratorMetadata` in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

Set alias for Vue in webpack:

```js
{
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```

Done!

### Now let's code.

First, let's build a vue component and make it be our root component:

```html
<!-- root-component.vue  -->

<template>
  <div class="root-component">
    <div>Hello, {{name}}!</div>
  </div>
</template> 

<script src="./root-component.ts"></script>
```

```typescript
// root-component.ts

import { Component } from '@vert/core'
import Vue from 'vue'

// Use @Component to make a class into a vue component.
@Component
export default class RootComponent extends Vue {
  name: string = ''  
}
```

Now in the entry file (such as `index.ts`, `main.ts` or `app.ts`), we need to create an instance of `App`:

```typescript
// index.ts

import 'reflect-metadata'  // You should import 'reflect-metadata' first.

import { App } from '@vert/core'
import RootComponent from './root-component.vue'  // Import root-component.vue

const app = new App({
  element: '#web-app',
  RootComponent
})

app.start()
```

Now, let's create a service to provide `name` for `RootComponent`:

```typescript
// service.employee.ts

import { Injectable } from '@vert/core'

/**
 * A simple http service.
 */
@Injectable()
class Http {
  async get (url) {}
}

/**
 * Employee service.
 *
 * @class EmployeeService
 */
@Injectable()
class EmployeeService {
  async getEmployee (id: number): Promise<{ data: IEmployee, error: Error }> {
    let data: IEmployee = null
    let error: Error = null

    try {
      data = await this.http.get('/employee/v1/' + id)
    } catch (err) {
      error = err
    }

    return {
      data, error
    }
  }

  constructor (
    private http: Http
  ) {}
}

export {
  EmployeeService
}

/**
 * An employee.
 *
 * @interface IEmployee
 */
interface IEmployee {
  id: number
  name: string
}
```

And update `root-component.ts`:

```typescript
// root-component.ts

import Vue from 'vue'
import { Component } from '@vert/core'
import { EmployeeService } from './service.employee'

@Component
export default class RootComponent extends Vue {
  name: string = ''

  private async getUserData () {
    const id = 10
    const { data, error } = await this.employeeSrv.getEmployee(id)
    if (!error) {
      this.name = data.name
    } else {
      // Handle error...
    }
  }

  created () {
    this.getUserData()
  }

  // Inject EmployeeService into component.
  constructor (
    private employeeSrv: EmployeeService
  ) {
    super()
  }
}
```

Finally, let's register our service to our app:

```typescript
// Entry file.
import 'reflect-metadata'  // You should import 'reflect-metadata' first.

import { App } from '@vert/core'
import { EmployeeService, Http } from './service.employee'  // Import services.
import RootComponent from './root-component.vue'  // Import root-component.vue

// Register services for the whole app.
App.addTransient(EmployeeService, Http)

const app = new App({
  element: '#web-app',
  RootComponent
})

app.start()
```

That's it! An oop-vue-app has been built, have a nice try!


## API


## Take care of yourself

I have done several projects with this tool, but however it is a very early version, so take care of yourself, leave me a issue if there is a bug.

## License

MIT
