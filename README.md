# Vert

Vert is the library to build Vue applications in OOP.

[![npm version](https://badge.fury.io/js/%40vert%2Fcore.svg)](https://badge.fury.io/js/%40vert%2Fcore)
[![Build Status](https://travis-ci.org/LancerComet/Vert-Core.svg?branch=master)](https://github.com/LancerComet/Vert-Core)

![vert-logo](https://raw.githubusercontent.com/LancerComet/Vert-Core/master/logo.png)

## Features

 - Build Vue apps in OOP, use Angular-like grammar.
 - Pure TypeScript Experience.
 - Do stuff as ServiceContainer.
 - Inject dependencies into Vue component directly.
 - Built-in service ([@vert/services](https://github.com/LancerComet/Vert-Services)).
 - Available for both [Vue-SSR](https://ssr.vuejs.org) and [Nuxt.js](https://github.com/nuxt/nuxt.js).

## Demo

You can check these out:

 - [vert-vue-ssr-template](https://github.com/LancerComet/vert-vue-ssr-template)
 - [vert-demo](https://github.com/LancerComet/Vert-Demo)

## Introduction

Vert is a library which is designed for building applications that are based on Vue in OOP. It provides some function and decorators to help you to achieve that goal. In General, it turns Vue into Angular.

If you don't feel that good about it, please just stop - we are not here.

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

// Use @Component to make a class into a vue component constructor.
@Component
export default class RootComponent extends Vue {
  name: string = ''  
}
```

Now in the entry file (such as `index.ts`, `main.ts` or `app.ts`), we need to create an instance of `App`:

```typescript
// index.ts

import 'reflect-metadata'  // You should import 'refelct-metadata' first.

import { App } from '@vert/core'
import RootComponent from './root-component.vue'  // Import root-component.vue

const app = new App({
  element: '#web-app',
  RootComponent
})

app.start()
```

Then, let's create a service to provide `name` for `RootComponent`:

```typescript
// service.employee.ts

import { Injectable } from '@vert/core'

/**
 * A simple http service.
 */
@Injectable()
class Http {
  async get (url, query) {}
  async post (url, data) {}
}

/**
 * Employee service.
 *
 * @class EmployeeService
 */
@Injectable()
class EmployeeService {
  async getEmployee (name: string): Promise<{ data: IEmployee, error: Error }> {
    let data: IEmployee = null
    let error: Error = null

    try {
      data = await http.get('/employee/v1/data/' + name)
    } catch (err) {
      errro = err
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

  async private getJackData () {
    const { data, error } = await this.employeeSrv.getEmployee('jack')
    if (!error) {
      this.name = data.name
    } else {
      // Handle error...
    }
  }

  created () {
    this.getJackData()
  }

  // Inject EmployeeService into component.
  constructor (
    private employeeSrv: EmployeeService
  ) {
    super()
  }
}
```

Finally, let's create a file `startup.ts` (anything you like) to register our service to our app:

```typescript
// Create a new file called "startup.ts".

import { App, Injector } from '@vert/core'
import { EmployeeService, Http } from './service.employee'

const Services = [EmployeeService, Http]
const injector = Injector.create(...Services)
Services.forEach((Service: any) => {
  App.addSingleton(Service, injector.get(Service))
})
```

And import `startup.ts in `index.ts`:

```typescript
// index.ts

import 'reflect-metadata'
import './startup.ts'  // Import 'startup.ts'

import { App } from '@vert/core'
import RootComponent from './root-component.vue'  // Import root-component.vue

const app = new App({
  element: '#web-app',
  RootComponent
})

app.start()
```

That's it! Have a nice try!

## Documentation

Currently documentation files are stored in `docs/` folder and they are under heavy construction.

## Take care of yourself

I have done several projects with this tool, but however it is a very early version, so take care of yourself, leave me a issue if there is a bug.

## License

MIT
