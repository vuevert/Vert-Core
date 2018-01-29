# Vue Enterprise

## Introduction

This is a type of best practice for building a middle or large scale web application which is based on vue. 
It will ease your pain when you face a huge project

It provides its own design mode and several APIs. You may obey its rules and use its APIs instead of something else.

### Features:

 - [x] Based on TypeScript.

 - [x] Divide project into app modules (html page).
 
 - [ ] Service, Utils, Const, Store.
 
 - [ ] Two different ways to use:
   - Use the whole project as the template
   - Use core APIs as a toolkit.

 - [x] Service must be written in Class and imported by using DI.

 - [x] Provide internal services such as http, localStorage, ect.
 
## How to use it

You can use Vue-Enterprise in two ways:

1. Install Vue-Enterprise as a npm package and import to your project. You only use its api, and everything else is under your control.

2. Download this project as the template. Everything is prepared by us. Brand new start.

## Quick Start

```html
<!-- View of your app. -->

<html>
  <head>
    <title>App Index</title>
  </head>
  
  <body>
    <div id="app-index"></div>
  </body>
</html>
```

```typescript
// Bootstrap a project by creating a new instance of "App"
// in entry file.

import { App } from 'vue-enterprise/core'
import RootComponent from './root-component/index.vue'

const appIndex = new App({
  element: '#app-index',
  name: 'app-index',
  rootComponent: RootComponent
})

appIndex.boot()
```

## Guide

### Bootstrap an app.

Your app will consist of one or several pages, we call every single page `App`.

If your web app is a single-page-app, there will only be one `App` instance.

Create a instance to bootstrap your web app. Check "Quick Start" for more example.

### Internal services.

TODO: ...

### Create a class-based service and use it in AppComponent.

If you want to create a service by using class, you can use it in your component class by `Dependency Injection`.

Vue-Enterprise provides the decorators to help you to do DI and ICO stuffs:

```typescript
// services.ts
// This is your custom service.

import { Http } from 'vue-enterprise/services'

class User {
  async getUserInfoById (id: number) {
    const result = { data: null, error: null }

    try {
      const { data } = await this.http.get(`/api/v1/user?id=${id}`)
      result.data = data
    } catch (error) {
      result.error = error
    }
    
    return result
  }
  
  async deleteUserById (id: number) {
    const result = { data: null, error: null }
    
    try {
      const { data: isSucceed } = await this.http.post('/api/v1/delete', { id })
      result.data = isSucceed
    } catch (error) {
      result.error = error
    }
    
    return result
  }

  constructor (private http: Http) {}
}

export {
  User
}
```

```typescript
// root-component.ts

import { AppComponent, Component } from 'vue-enterprise/app-component'
import { User } from './services.ts'

@Component({
  providers: [User]
})
export default class RootComponent extends AppComponent {
  userId: number = null
  userInfo: {} = {}

  async fetchAuthorList () {
    const { data, error } = await this.user.getUserInfoById(this.userId)
    if (!error) {
      this.userInfo = data
    }
  }
  
  constructor (public user: User) {
    super()
  }
}
```

### Dependency Injection decorator

You can use `Inject` decorator to inject a class to another class:

```typescript
import { Inject } from 'vue-enterprise/decorator'

class Study {
  learnEnglish () {}
  doHomework () {}
}

@Inject(Study)
class Student {
  constructor (public study: Study) {
    // Now you can use:
    // this.study.learnEnglish()
    // this.study.doHomework()
  }
}
```
