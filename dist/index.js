(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('vuex')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vuex'], factory) :
    (global = global || self, factory(global.Vert = {}, global.Vue, global.vuex));
}(this, function (exports, Vue, vuex) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /*
     * Basically AppComponent is doing nothing, it is just a game ruler.
     * This class will make all of your cooperator to extend same component constructor
     * and there will not be any problem that is caused by npm-package-version-problem.
     */
    var AppComponent = /** @class */ (function (_super) {
        __extends(AppComponent, _super);
        function AppComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AppComponent;
    }(Vue));

    /**
     * vue-class-component v6.1.2
     * (c) 2015-2017 Evan You
     * @license MIT
     */
    var hasProto = { __proto__: [] } instanceof Array;
    function createDecorator(factory) {
        return function (target, key, index) {
            var Ctor = typeof target === 'function'
                ? target
                : target.constructor;
            if (!Ctor.__decorators__) {
                Ctor.__decorators__ = [];
            }
            if (typeof index !== 'number') {
                index = undefined;
            }
            Ctor.__decorators__.push(function (options) {
                return factory(options, key, index);
            });
        };
    }
    function isPrimitive(value) {
        var type = typeof value;
        return value == null || (type !== 'object' && type !== 'function');
    }
    function warn(message) {
        if (typeof console !== 'undefined') {
            console.warn('[vue-class-component] ' + message);
        }
    }
    function collectDataFromConstructor(vm, Component) {
        var originalInit = Component.prototype._init;
        Component.prototype._init = function () {
            var _this = this;
            var keys = Object.getOwnPropertyNames(vm);
            if (vm.$options.props) {
                for (var key in vm.$options.props) {
                    if (!vm.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
            }
            keys.forEach(function (key) {
                if (key.charAt(0) !== '_') {
                    Object.defineProperty(_this, key, {
                        get: function () {
                            return vm[key];
                        },
                        set: function (value) {
                            return vm[key] = value;
                        },
                        configurable: true
                    });
                }
            });
        };
        var data = new Component();
        Component.prototype._init = originalInit;
        var plainData = {};
        Object.keys(data).forEach(function (key) {
            if (data[key] !== undefined) {
                plainData[key] = data[key];
            }
        });
        {
            if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
                warn('Component class must inherit Vue or its descendant class ' +
                    'when class property is used.');
            }
        }
        return plainData;
    }
    var $internalHooks = [
        'data',
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeDestroy',
        'destroyed',
        'beforeUpdate',
        'updated',
        'activated',
        'deactivated',
        'render',
        'errorCaptured'
    ];
    function componentFactory(Component, options) {
        if (options === void 0) { options = {}; }
        options.name = options.name || Component._componentTag || Component.name;
        var proto = Component.prototype;
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (key === 'constructor') {
                return;
            }
            if ($internalHooks.indexOf(key) > -1) {
                options[key] = proto[key];
                return;
            }
            var descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else if (descriptor.get || descriptor.set) {
                (options.computed || (options.computed = {}))[key] = {
                    get: descriptor.get,
                    set: descriptor.set
                };
            }
        });
        (options.mixins || (options.mixins = [])).push({
            data: function () {
                return collectDataFromConstructor(this, Component);
            }
        });
        var decorators = Component.__decorators__;
        if (decorators) {
            decorators.forEach(function (fn) {
                return fn(options);
            });
            delete Component.__decorators__;
        }
        var superProto = Object.getPrototypeOf(Component.prototype);
        var Super = superProto instanceof Vue
            ? superProto.constructor
            : Vue;
        var Extended = Super.extend(options);
        forwardStaticMembers(Extended, Component, Super);
        return Extended;
    }
    var reservedPropertyNames = [
        'cid',
        'super',
        'options',
        'superOptions',
        'extendOptions',
        'sealedOptions',
        'component',
        'directive',
        'filter'
    ];
    function forwardStaticMembers(Extended, Original, Super) {
        Object.getOwnPropertyNames(Original).forEach(function (key) {
            if (key === 'prototype') {
                return;
            }
            var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
            if (extendedDescriptor && !extendedDescriptor.configurable) {
                return;
            }
            var descriptor = Object.getOwnPropertyDescriptor(Original, key);
            if (!hasProto) {
                if (key === 'cid') {
                    return;
                }
                var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
                if (!isPrimitive(descriptor.value)
                    && superDescriptor
                    && superDescriptor.value === descriptor.value) {
                    return;
                }
            }
            if (process.env.NODE_ENV !== 'production'
                && reservedPropertyNames.indexOf(key) >= 0) {
                warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
                    'conflicts with reserved property name of Vue internal. ' +
                    'It may cause unexpected behavior of the component. Consider renaming the property.');
            }
            Object.defineProperty(Extended, key, descriptor);
        });
    }
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }

    /** vue-property-decorator verson 8.0.0 MIT LICENSE copyright 2018 kaorun343 */
    /**
     * decorator of an inject
     * @param from key
     * @return PropertyDecorator
     */
    function Inject(options) {
        return createDecorator(function (componentOptions, key) {
            if (typeof componentOptions.inject === 'undefined') {
                componentOptions.inject = {};
            }
            if (!Array.isArray(componentOptions.inject)) {
                componentOptions.inject[key] = options || key;
            }
        });
    }
    /**
     * decorator of a provide
     * @param key key
     * @return PropertyDecorator | void
     */
    function Provide(key) {
        return createDecorator(function (componentOptions, k) {
            var provide = componentOptions.provide;
            if (typeof provide !== 'function' || !provide.managed) {
                var original_1_1 = componentOptions.provide;
                provide = componentOptions.provide = function () {
                    var rv = Object.create((typeof original_1_1 === 'function' ? original_1_1.call(this) : original_1_1) || null);
                    for (var i in provide.managed) {
                        rv[provide.managed[i]] = this[i];
                    }
                    return rv;
                };
                provide.managed = {};
            }
            provide.managed[k] = key || k;
        });
    }
    /**
     * decorator of a prop
     * @param  options the options for the prop
     * @return PropertyDecorator | void
     */
    function Prop(options) {
        if (options === void 0) {
            options = {};
        }
        return createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        });
    }
    /**
     * decorator of a watch function
     * @param  path the path or the expression to observe
     * @param  WatchOption
     * @return MethodDecorator
     */
    function Watch(path, options) {
        if (options === void 0) {
            options = {};
        }
        var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
        return createDecorator(function (componentOptions, handler) {
            if (typeof componentOptions.watch !== 'object') {
                componentOptions.watch = Object.create(null);
            }
            var watch = componentOptions.watch;
            if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
                watch[path] = [watch[path]];
            }
            else if (typeof watch[path] === 'undefined') {
                watch[path] = [];
            }
            watch[path].push({ handler: handler, deep: deep, immediate: immediate });
        });
    }

    /* tslint:disable */
    var ReflectionUtils = /** @class */ (function () {
        function ReflectionUtils() {
        }
        ReflectionUtils.getProvidersFromParams = function (target) {
            return (Reflect['getMetadata']('design:paramtypes', target) || []).filter(function (item) {
                return typeof item === 'function' &&
                    item !== Object &&
                    item !== Function;
            });
        };
        return ReflectionUtils;
    }());

    /**
     * Standalone injector class.
     */
    var Injector = /** @class */ (function () {
        function Injector() {
            var Providers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                Providers[_i] = arguments[_i];
            }
            var _this = this;
            /**
             * Provider storage.
             */
            this.map = new WeakMap();
            for (var _a = 0, Providers_1 = Providers; _a < Providers_1.length; _a++) {
                var Provider = Providers_1[_a];
                var dependencies = ReflectionUtils.getProvidersFromParams(Provider)
                    .map(function (Dependency) {
                    var provider = _this.get(Dependency);
                    if (!provider) {
                        provider = InjectionUtils.createProviderInstance(Dependency);
                        _this.set(Dependency, provider);
                    }
                    return provider;
                });
                var provider = InjectionUtils.createProviderInstance(Provider, dependencies);
                this.set(Provider, provider);
            }
        }
        /**
         * Create a new class injector.
         *
         * @param {TProviders} Providers
         * @return {Injector}
         */
        Injector.create = function () {
            var Providers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                Providers[_i] = arguments[_i];
            }
            return new (Injector.bind.apply(Injector, [void 0].concat(Providers)))();
        };
        /**
         * Get target instance from injector by providing provider.
         *
         * @param {{new(...args): T}} Provider
         * @return {T}
         */
        Injector.prototype.get = function (Provider) {
            return this.map.get(Provider);
        };
        /**
         * Whether it holds target provider.
         *
         * @param Provider
         * @return {boolean}
         */
        Injector.prototype.has = function (Provider) {
            return this.map.has(Provider);
        };
        /**
         * Set a provider instance to cache,
         *
         * @param {{new(...args): T}} Provider
         * @param {T} instance
         */
        Injector.prototype.set = function (Provider, instance) {
            if (!this.has(Provider)) {
                this.map.set(Provider, instance);
            }
        };
        return Injector;
    }());

    // Global injector holds all instances which are created and injected manually.
    var globalInjector = Injector.create();
    // Auto injector holds all instances which are created by vert automatically.
    var autoInjector = Injector.create();
    // Assign registered providers.
    var registeredProviders = Injector.create();

    var InjectionUtils = /** @class */ (function () {
        function InjectionUtils() {
        }
        /**
         * Check whether target has been registered.
         *
         * @param target
         * @return {boolean}
         */
        InjectionUtils.checkProviderIsRegistered = function (target) {
            return registeredProviders.has(target);
        };
        /**
         * Mark a provider registered.
         *
         * @param Provider
         */
        InjectionUtils.registerProvider = function (Provider) {
            registeredProviders.set(Provider, true);
        };
        /**
         * Create a instance of a provider and save to global injector.
         *
         * @param {TProvider} Provider
         * @param {*} instance
         */
        InjectionUtils.saveToGlobalInjector = function (Provider, instance) {
            if (!instance) {
                instance = InjectionUtils.createProviderInstance(Provider);
            }
            globalInjector.set(Provider, instance);
        };
        /**
         * Create instance executing function.
         *
         * @param {TConstructor} Provider
         * @param {any[]} args
         * @return {any}
         */
        InjectionUtils.createProviderInstance = function (Provider, args) {
            if (args === void 0) { args = []; }
            if (!InjectionUtils.checkProviderIsRegistered(Provider)) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn("[@vert/core] Provider \"" + Provider.name + "\" is not registered.");
                }
                return;
            }
            return new (Provider.bind.apply(Provider, [void 0].concat(args)))();
        };
        /**
         * Class a class that has already been injected.
         *
         * @param {*} targetClass
         * @param {TProviders} Providers
         * @return {*}
         */
        InjectionUtils.createInjectedConstructor = function (targetClass, Providers) {
            // Return a new constructor.
            // This new constructor has no params so you can not get any info by using 'design:paramtypes'.
            var Constructor = function () {
                var providers = [];
                for (var _i = 0, Providers_1 = Providers; _i < Providers_1.length; _i++) {
                    var Provider = Providers_1[_i];
                    if (!InjectionUtils.checkProviderIsRegistered(Provider)) {
                        if (process.env.NODE_ENV === 'development') {
                            console.warn("[@vert/core] Provider \"" + Provider.name + "\" is not registered.");
                        }
                        providers.push(undefined);
                        continue;
                    }
                    var instance = globalInjector.get(Provider) || undefined;
                    providers.push(instance);
                }
                return new (targetClass.bind.apply(targetClass, [void 0].concat(providers)))();
            };
            Constructor.prototype = targetClass.prototype;
            Object.defineProperty(Constructor, 'name', {
                writable: true,
                configurable: true,
                value: targetClass.name
            });
            return Constructor;
        };
        return InjectionUtils;
    }());

    var componentId = 1;
    // Nuxt support.
    registerHooks([
        'beforeRouteEnter',
        'beforeRouteUpdate',
        'beforeRouteLeave',
        'asyncData',
        'fetch',
        'head',
        'layout',
        'meta',
        'middleware',
        'title',
        'transition',
        'scrollToTop',
        'validate'
    ]);
    function Component(param) {
        if (typeof param === 'function') {
            var Providers = ReflectionUtils.getProvidersFromParams(param);
            var Constructor = InjectionUtils.createInjectedConstructor(param, Providers);
            // Keep targetClass.__decorators__.
            // "__decorators__" is defined in vue-class-component, and it holds all customized decorators' data
            // such as @Prop, @Watch, .ect.
            keepDecorators(param, Constructor);
            return componentFactory(Constructor, {});
        }
        return function (targetClass) {
            param = param || {};
            var componentName = targetClass.prototype.constructor.name ||
                'AppComponent_' + componentId++;
            param = Object.assign({
                name: componentName
            }, param);
            var Providers = ReflectionUtils.getProvidersFromParams(targetClass);
            var Constructor = InjectionUtils.createInjectedConstructor(targetClass, Providers);
            keepDecorators(targetClass, Constructor);
            var ComponentConstructor = componentFactory(Constructor, param);
            return ComponentConstructor;
        };
    }
    /**
     * Function to keep targetClass.__decorators__.
     * "__decorators__" is defined in vue-class-component, and it holds all customized decorators' data
     * such as @Prop, @Watch, .ect.
     *
     * @link https://github.com/vuejs/vue-class-component/blob/master/src/component.ts#L59
     *
     * @param {*} targetClass
     * @param {*} Constructor
     */
    function keepDecorators(targetClass, Constructor) {
        if (targetClass['__decorators__']) {
            Constructor['__decorators__'] = targetClass['__decorators__'];
        }
    }

    var TypeUtils = /** @class */ (function () {
        function TypeUtils() {
        }
        TypeUtils.isUndefined = function (target) {
            return typeof target === 'undefined';
        };
        TypeUtils.isDefined = function (target) {
            return !TypeUtils.isUndefined(target);
        };
        TypeUtils.isFunction = function (target) {
            return typeof target === 'function';
        };
        return TypeUtils;
    }());

    var appId = 1;
    /**
     * App is the basic unit for a project.
     *
     * @description
     * Page is the root member for an app. Create an instance to initialize your app.
     *
     * @class App
     */
    var App = /** @class */ (function () {
        function App(option) {
            this._serviceInstances = {};
            option.services = option.services || [];
            this._element = option.element;
            this._name = option.name || 'DefaultApp' + appId++;
            this._router = option.router;
            this._store = option.store;
            this.initViewModel(option.RootComponent, option.created, option.mounted, option.beforeDestroy);
        }
        App.addSingleton = function (Provider, instance) {
            InjectionUtils.saveToGlobalInjector(Provider, instance);
        };
        Object.defineProperty(App.prototype, "name", {
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "store", {
            get: function () { return this._store; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "viewModel", {
            get: function () { return this._viewModel; },
            enumerable: true,
            configurable: true
        });
        App.prototype.initViewModel = function (RootComponent, created, mounted, beforeDestroy) {
            var option = {
                name: this.name,
                template: createViewModelTemplate("" + this.name),
                components: {
                    'root-component': RootComponent
                },
                provide: this._serviceInstances,
                created: function () {
                    TypeUtils.isFunction(created) && created(this);
                },
                mounted: function () {
                    TypeUtils.isFunction(mounted) && mounted(this);
                },
                beforeDestroy: function () {
                    TypeUtils.isFunction(beforeDestroy) && beforeDestroy(this);
                }
            };
            if (TypeUtils.isDefined(this._router)) {
                Object.assign(option, { router: this._router });
            }
            if (TypeUtils.isDefined(this._store)) {
                Object.assign(option, { store: this._store });
            }
            this._viewModel = new Vue(option);
        };
        /**
         * Start up this app.
         *
         * @memberof App
         */
        App.prototype.start = function () {
            if (this._element) {
                this._viewModel.$mount(this._element);
            }
        };
        return App;
    }());
    function createViewModelTemplate(id) {
        return "<div id=\"" + id + "\"><root-component></root-component></div>\n  ";
    }

    var isSupportProxy = true;
    try {
        var proxy = new Proxy({}, {
            set: function () {
                return true;
            }
        });
    }
    catch (error) {
        isSupportProxy = false;
        if (process.env.NODE_ENV === 'development') {
            console.warn('[@Vert/core] Your browser doesn\'t support Proxy.');
        }
    }
    var Data = /** @class */ (function () {
        function Data() {
        }
        Data.createTypeSafetyInstance = function (Constructor) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var obj = new (Constructor.bind.apply(Constructor, [void 0].concat(args)))();
            if (!isSupportProxy) {
                return obj;
            }
            return new Proxy(obj, {
                set: function (target, keyName, value, proxy) {
                    var newType = getType(value);
                    var correctType = getType(target[keyName]);
                    if (newType === correctType) {
                        Reflect.set(target, keyName, value);
                    }
                    else {
                        console.warn("[Warn] Incorrect data type was given to property \"" + String(keyName) + "\" on \"" + Constructor.name + "\":\n" +
                            ("       \"" + value + "\" (" + getTypeText(newType) + ") was given, but should be a " + getTypeText(correctType) + "."));
                    }
                    // Always return true to avoid error throwing.
                    return true;
                }
            });
        };
        return Data;
    }());
    function getType(target) {
        return Object.prototype.toString.call(target);
    }
    function getTypeText(fullTypeString) {
        return fullTypeString.replace(/\[object |\]/g, '');
    }

    /**
     * Injectable decorator.
     */
    function Injectable() {
        return function (Provider) {
            InjectionUtils.registerProvider(Provider);
        };
    }

    /*!
     * vuex-class v0.3.1
     * https://github.com/ktsn/vuex-class
     *
     * @license
     * Copyright (c) 2017 katashin
     * Released under the MIT license
     * https://github.com/ktsn/vuex-class/blob/master/LICENSE
     */
    var State = createBindingHelper('computed', vuex.mapState);
    var Getter = createBindingHelper('computed', vuex.mapGetters);
    var Action = createBindingHelper('methods', vuex.mapActions);
    var Mutation = createBindingHelper('methods', vuex.mapMutations);
    function namespace(namespace, helper) {
        function createNamespacedHelper(helper) {
            function namespacedHelper(a, b) {
                if (typeof b === 'string') {
                    var key = b;
                    var proto = a;
                    return helper(key, { namespace: namespace })(proto, key);
                }
                var type = a;
                var options = merge(b || {}, { namespace: namespace });
                return helper(type, options);
            }
            return namespacedHelper;
        }
        if (helper) {
            console.warn('[vuex-class] passing the 2nd argument to `namespace` function is deprecated. pass only namespace string instead.');
            return createNamespacedHelper(helper);
        }
        return {
            State: createNamespacedHelper(State),
            Getter: createNamespacedHelper(Getter),
            Mutation: createNamespacedHelper(Mutation),
            Action: createNamespacedHelper(Action)
        };
    }
    function createBindingHelper(bindTo, mapFn) {
        function makeDecorator(map, namespace) {
            return createDecorator(function (componentOptions, key) {
                if (!componentOptions[bindTo]) {
                    componentOptions[bindTo] = {};
                }
                // @ts-ignore
                var mapObject = (_a = {}, _a[key] = map, _a);
                componentOptions[bindTo][key] = namespace !== undefined
                    ? mapFn(namespace, mapObject)[key]
                    : mapFn(mapObject)[key];
                var _a;
            });
        }
        function helper(a, b) {
            if (typeof b === 'string') {
                var key = b;
                var proto = a;
                // @ts-ignore
                return makeDecorator(key, undefined)(proto, key);
            }
            var namespace = extractNamespace(b);
            var type = a;
            return makeDecorator(type, namespace);
        }
        return helper;
    }
    function extractNamespace(options) {
        var n = options && options.namespace;
        if (typeof n !== 'string') {
            return undefined;
        }
        if (n[n.length - 1] !== '/') {
            return n + '/';
        }
        return n;
    }
    function merge(a, b) {
        var res = {};
        [a, b].forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                res[key] = obj[key];
            });
        });
        return res;
    }

    /**
     * @vert/core
     *
     * @description
     * Vert is designed to build an OOP application which is based on Vue.
     *
     * @author LancerComet
     * @copyright LancerComet
     * @licence MIT
     */

    exports.AppComponent = AppComponent;
    exports.Component = Component;
    exports.Prop = Prop;
    exports.VueInject = Inject;
    exports.VueProvide = Provide;
    exports.Watch = Watch;
    exports.App = App;
    exports.Data = Data;
    exports.Injectable = Injectable;
    exports.Injector = Injector;
    exports.State = State;
    exports.Getter = Getter;
    exports.Action = Action;
    exports.Mutation = Mutation;
    exports.namespace = namespace;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
