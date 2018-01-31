# Vue-Enterprise

`Vue-Enterprise` 是针对基于 Vue 的中大型项目的一系列最佳实践与约束的工具集合，它将帮助您对项目进行统一、合理、高效的规划与工程管理。Vue-Enterprise 拥有一套自己的设计模式与开发范式，并提供了一些额外的 API 来帮助您完成您的设计工作。

在使用此工具时如果您感到困难和痛苦，这说明您的项目目前还没有达到需要使用此工具的程度和规模，请立刻停止使用。

## 特征：

 - [x] 基于 TypeScript.
 
 - [x] 将项目以 HTML 页面为单位划分为 App.
 
 - [x] 锁定所有第三方依赖 Npm Package 版本.
 
 - [x] 拥有设计 Service 与 Utils 的设计模式.
 
 - [x] Store (Vuex), Router (Vue-Router).
 
 - [ ] 两种使用方式：

   - 使用 Vue-Enterprise 的模板.

   - 将 Vue-Enterprise 作为类库使用.

 - [ ] 服务区分基础 (Basic) 和业务 (Business) 服务.

 - [ ] 区分服务类型（Class, Factory, Value）
  
 - [x] 提供诸如 Http、LocalStorage、Logger 等内部服务.

 - [ ] 插件系统.
 
 - [x] 可创建运行时的类型安全实例.

## 使用指南

### 初始化 App

您的 Web 程序将由一个或多个页面构成，我们将每个页面称之为 `App`，如果您的程序是 SPA，则只有一个 App。

下面的例子将指导您如何创建一个 App：

```html
<!-- 程序视图. -->

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
// 创建一个 App 实例来初始化一个页面。
// 项目入口文件.

import { App } from 'vue-enterprise/core'
import RootComponent from './root-component/index.vue'

const appIndex = new App({
  element: '#app-index',
  name: 'app-index',
  rootComponent: RootComponent
})

appIndex.start()
```

### AppComponent 是您的组件

TODO: ... 

### 内部服务

TODO: ...

### 最佳的方式来创建一个基于 Class 的服务，并方便地在 AppComponent 中使用

如果您在项目中已经以 `Class` 的方式创建了一个服务，您可以将这个类注入至 `AppComponent` 当中，程序将帮您自动在目标组件中创建类实例。

```typescript
// services.ts
// 这是您的业务服务.

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
  providers: [User]  // User 类已经注入至此组件中.
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

### 普通类中的依赖注入

您可能已经注意到，类型 `User` 中带有一个装饰器 `Inject`。

此装饰器的用途是将一个类注入到另一个类中并自动获取一个类型实例：

```typescript
import { Inject } from 'vue-enterprise/decorator'

class Study {
  learnEnglish () {}
  doHomework () {}
}

@Inject(Study)
class Student {
  constructor (public study: Study) {
    // 现在您可以使用:
    // this.study.learnEnglish()
    // this.study.doHomework()
  }
}

const tom = new Student()
tom.study.doHomework()
tom.study.learnEnglish()
```

### 创建类型安全的 Class 实例

对于系统中的关键数据，`类型安全`是程序稳定运行的基础保障，您可以使用 `vue-enterprise/data` 模块中的内置方法来创建类型安全实例.

类型安全的实例在进行属性赋值时会对比数据类型，若数据类型出现差异则忽略赋值操作，保留上一次的正确数据。

注：您可能需要在不支持 `Proxy` 的浏览器中引入 Polyfill.

```typescript
// 项目中定义了一个 Student 类.

import { Data } from 'vue-enterprise/data'

class Student {
  // Data 类中的静态方法 createTypeSecuredInstance 可以创建类型安全的类型实例.
  // 这里使用 Student 的静态方法封装创建操作.
  static create (param?: IStudent): Student {
    return Data.createTypeSecuredInstance(Student, param)
  }

  name: string = ''
  age: number = 0

  constructor (param?: IStudent) {
    if (param) {
      this.name = param.name
      this.age = param.age
    }
  }
}

interface IStudent {
  name: string
  age: any
}

// 使用静态方法创建一个 Student 实例，这个实例将不接受错误的类型赋值。
const johnSmith = Student.create({
  name: 'John Smith', age: 20
})

johnSmith.age = 21  // age: 21
johnSmith.name = 'Smithy'  // name: 'Smithy'
johnSmith.age = '22'  // Wow, age can not be a string!
                      // And there will be a warning in console.
console.log(johnSmith.age)  // 21
```
