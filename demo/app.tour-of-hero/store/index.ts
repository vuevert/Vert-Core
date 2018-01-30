import { Store } from '../../../src/core'

const store = new Store({
  state: {
    heroes: []
  },

  mutations: {
    SET_ALL_HEROES (state, payload) {
      state.heroes = payload
    }
  },

  actions: {
    setAllHeroes ({ commit }, payload) {
      commit('SET_ALL_HEROES', payload)
    }
  },

  getters: {
    getAllHeroes (state) {
      return state.heroes
    }
  }
})

export {
  store
}
