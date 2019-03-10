import Vue from 'vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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

/* tslint:disable */
var fakeArray = { __proto__: [] };
var hasProto = fakeArray instanceof Array;
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
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
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
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
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
                    get: function () { return vm[key]; },
                    set: function (value) { vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}

/* tslint:disable */
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
    'errorCaptured',
    'serverPrefetch' // 2.6
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data: function () {
                        var _a;
                        return _a = {}, _a[key] = descriptor.value, _a;
                    }
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
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
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
        copyReflectionMetadata(Extended, Component);
    }
    return Extended;
}
var reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // `prototype` should not be overwritten
        if (key === 'prototype') {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if (process.env.NODE_ENV !== 'production' &&
            reservedPropertyNames.indexOf(key) >= 0) {
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

/* tslint:disable:variable-name no-shadowed-variable */
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
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
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
    if (options === void 0) { options = {}; }
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
    if (options === void 0) { options = {}; }
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

var ReflectionUtils = /** @class */ (function () {
    function ReflectionUtils() {
    }
    ReflectionUtils.getProvidersFromParams = function (target) {
        var result = Reflect.getMetadata('design:paramtypes', target);
        return (result || []).filter(function (item) {
            return typeof item === 'function' &&
                item !== Object &&
                item !== Function;
        });
    };
    return ReflectionUtils;
}());

var INJECTED_FLAG = 'Vert:Injected';
var INJECTED_PARAMS_METADATA_KEY = 'Vert:ParamTypes';
/**
 * Injectable decorator.
 */
function Injectable() {
    return function (Provider) {
        var types = Reflect.getMetadata('design:paramtypes', Provider);
        Reflect.defineMetadata(INJECTED_FLAG, true, Provider);
        Reflect.defineMetadata(INJECTED_PARAMS_METADATA_KEY, types, Provider);
    };
}
/**
 * Check whether a class is injected.
 *
 * @param target
 */
function checkIsInjected(target) {
    return Reflect.getMetadata(INJECTED_FLAG, target) === true;
}

/**
 * Standalone injector class.
 */
var Injector = /** @class */ (function () {
    function Injector() {
        /**
         * This map keeps singleton provider and its instance.
         */
        this.singletonMap = new WeakMap();
        /**
         * This map keeps scoped provider.
         */
        this.scopedMap = new WeakMap();
    }
    /**
     * Create a new class injector.
     *
     * @return {Injector}
     */
    Injector.create = function () {
        return new Injector();
    };
    /**
     * Check whether a class is injected.
     *
     * @param Provider
     */
    Injector.checkIsInjected = function (Provider) {
        if (!checkIsInjected(Provider)) {
            throw new Error("[@ver/core] \"" + Provider.name + "\" is not an injected class.");
        }
    };
    /**
     * Register target as singleton provider.
     *
     * @param {TConstructor} Provider
     */
    Injector.prototype.addSingleton = function (Provider) {
        Injector.checkIsInjected(Provider);
        if (this.scopedMap.has(Provider)) {
            throw new Error("[@vert/core] \"" + Provider.name + "\" has been registered as scoped provider.");
        }
        this.singletonMap.set(Provider, null);
        return this;
    };
    /**
     * Register target as scoped provider.
     *
     * @param {TConstructor} Provider
     */
    Injector.prototype.addScoped = function (Provider) {
        Injector.checkIsInjected(Provider);
        if (this.singletonMap.has(Provider)) {
            throw new Error("[@vert/core] \"" + Provider.name + "\" has been registered as singleton provider.");
        }
        this.scopedMap.set(Provider, null);
        return this;
    };
    /**
     * Get target instance from injector by providing provider.
     *
     * @param {{new(...args): T}} Provider
     * @return {T}
     */
    Injector.prototype.get = function (Provider) {
        var _this = this;
        var isSingletonProvider = this.singletonMap.has(Provider);
        var isScopedProvider = this.scopedMap.has(Provider);
        if (!isSingletonProvider && !isScopedProvider) {
            return null;
        }
        switch (true) {
            case isSingletonProvider: {
                var instance = this.singletonMap.get(Provider);
                if (!instance) {
                    var dependencyInstance = ReflectionUtils
                        .getProvidersFromParams(Provider)
                        .map(function (item) { return _this.get(item); });
                    instance = new (Provider.bind.apply(Provider, [void 0].concat(dependencyInstance)))();
                    this.singletonMap.set(Provider, instance);
                }
                return instance;
            }
            case isScopedProvider: {
                var dependencyInstance = ReflectionUtils
                    .getProvidersFromParams(Provider)
                    .map(function (item) { return _this.get(item); });
                var instance = new (Provider.bind.apply(Provider, [void 0].concat(dependencyInstance)))();
                return instance;
            }
            default:
                return null;
        }
    };
    /**
     * Check whether injector has registered this provider.
     *
     * @param target
     */
    Injector.prototype.has = function (target) {
        return this.scopedMap.has(target) || this.singletonMap.has(target);
    };
    return Injector;
}());

/**
 * Singleton injector holds all singleton instance.
 */
var GlobalInjector = /** @class */ (function () {
    function GlobalInjector() {
    }
    /**
     * Get target instance from injector by providing provider.
     *
     * @param {{new(...args): T}} Provider
     * @return {T}
     */
    GlobalInjector.get = function (Provider) {
        return GlobalInjector.injector.get(Provider);
    };
    /**
     * Register target as singleton provider into global injector.
     *
     * @param Provider
     */
    GlobalInjector.addSingleton = function (Provider) {
        GlobalInjector.injector.addSingleton(Provider);
    };
    /**
     * Register target as scoped provider into global injector.
     *
     * @param Provider
     */
    GlobalInjector.addScoped = function (Provider) {
        GlobalInjector.injector.addScoped(Provider);
    };
    /**
     * Check whether injector has registered this provider.
     *
     * @param Provider
     */
    GlobalInjector.has = function (Provider) {
        return GlobalInjector.injector.has(Provider);
    };
    GlobalInjector.injector = Injector.create();
    return GlobalInjector;
}());

var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, ['[@vert/core]'].concat(args));
    };
    Logger.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(console, ['[@vert/core]'].concat(args));
    };
    return Logger;
}());

var InjectionUtils = /** @class */ (function () {
    function InjectionUtils() {
    }
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
            Providers.forEach(function (Provider) {
                if (!GlobalInjector.has(Provider)) {
                    Logger.warn("Provider \"" + Provider.name + "\" hasn't been registered in global.");
                    providers.push(undefined);
                    return;
                }
                var instance = GlobalInjector.get(Provider);
                providers.push(instance);
            });
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
    if (targetClass.__decorators__) {
        Constructor.__decorators__ = targetClass.__decorators__;
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
    /**
     * Register target as a singleton provider in global.
     *
     * @static
     * @template T
     * @param {new (...args: any[]) => T} Provider
     */
    App.addSingleton = function (Provider) {
        GlobalInjector.addSingleton(Provider);
    };
    /**
     * Register target as a scoped provider in global.
     *
     * @static
     * @template T
     * @param {new (...args: any[]) => T} Provider
     */
    App.addScoped = function (Provider) {
        GlobalInjector.addScoped(Provider);
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
            render: function (h) { return h(RootComponent); },
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

/* tslint:disable */
var State = createBindingHelper('computed', mapState);
var Getter = createBindingHelper('computed', mapGetters);
var Action = createBindingHelper('methods', mapActions);
var Mutation = createBindingHelper('methods', mapMutations);
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
            var _a;
            if (!componentOptions[bindTo]) {
                componentOptions[bindTo] = {};
            }
            var mapObject = (_a = {}, _a[key] = map, _a);
            componentOptions[bindTo][key] = namespace !== undefined
                ? mapFn(namespace, mapObject)[key]
                : mapFn(mapObject)[key];
        });
    }
    function helper(a, b) {
        if (typeof b === 'string') {
            var key = b;
            var proto = a;
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

export { AppComponent, Component, Prop, Inject as VueInject, Provide as VueProvide, Watch, App, Data, Injector, Injectable, State, Getter, Action, Mutation, namespace };
