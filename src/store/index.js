import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    passenger: [],
    extraCharge: {}
  },
  getters: {
    getPassengers: state => state.passenger,
    getExtraCharge: state => state.extraCharge,
  },
  mutations: {
    addPassenger(state, data){
      state.passenger.push(data)
    },
    addExtraCharge(state, data){
      state.extraCharge.name = data.name
      state.extraCharge.price = data.price
    },
    deleteExtraCharge(state){
      console.log('enter mutation');
      state.extraCharge.name = ''
      state.extraCharge.price = ''
      console.log(state.extraCharge);
    },
  },
  actions: {
    addPassenger({commit}, data){
      commit('addPassenger', data)
    },
    addExtraCharge({commit}, data){
      commit('addExtraCharge', data)
    },
    deleteExtraCharge({commit}){
      commit('deleteExtraCharge')
    },
  },
  modules: {
  }
})
