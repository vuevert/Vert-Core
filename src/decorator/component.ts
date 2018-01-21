import Vue, { ComponentOptions } from 'vue'
import VueComponent from 'vue-class-component'
import { VueClass } from 'vue-class-component/lib/declarations'

function Component <V extends Vue> (options: ComponentOptions<V>): <VC extends VueClass<V>> (target: VC) => VC
function Component <VC extends VueClass<Vue>> (target: VC): VC
function Component (options) {
  return VueComponent(options)
}

export {
  Component
}
