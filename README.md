# Vue Enterprise

## Introduction

This is a type of best practice for building a middle or large scale web application which is based on vue. 
It will ease your pain when you face a huge project.

Vue-Enterprise provides its own design pattern with several extra APIs, so maybe you should obey its rules and build your project in its design pattern.

There should not be much pain when you using it. If you feel bad about it, just do not use it.

### Features:

 - [x] Based on TypeScript.
 
 - [x] Lock the version of all third-part npm packages.

 - [x] Divide project into app modules (html page).
 
 - [x] Have its own design pattern for designing service and utils.
 
 - [x] Store (Vuex), Router (Vue-Router).
 
 - [ ] Two different ways to use Vue-Enterprise:
   - As a template.
   - As a library.

 - [x] Provide internal services such as Http, LocalStorage, Logger, ect.
 
## How to use it

You can use Vue-Enterprise in two ways:

1. Install Vue-Enterprise as a npm package and import to your project. You only use its api, and everything else is under your control.

2. Download this project as the template. Everything is prepared by us. Brand new start.

## Guide

### Initialize an app.

Your app will be made up of one or several pages, we call every single page the `App`.

If your app is a single-page-app, there will only be one `App` instance.

This example shows how to create an app instance to initialize your web app.

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

appIndex.start()
```

### App Component.

TODO: ...

### Internal services.

TODO: ...

### Create a class-based service and use it in AppComponent.

If you want to create a service by using the class, you can inject it to any AppComponent. Vue-Enterprise will help you to create an instance of your service automatically.

```typescript
// services.ts
// This is your custom service.

import { Inject } from 'vue-enterprise/decorator'
import { Http } from 'vue-enterprise/services'

@Inject(Http)
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
  providers: [User]  // Class User has been injected to this component.
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

You may have noticed that there is a decorator called `Inject` that decorates the class `User`.

The decorator `Inject` is designed to inject one class to another, and get an instance in automatic:

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

const tom = new Student()
tom.study.doHomework()
tom.study.learnEnglish()
```
