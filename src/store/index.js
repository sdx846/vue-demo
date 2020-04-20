// import Vue from 'vue'
// import Vuex from 'vuex'

// import state from './state'
// import getters from './getters'
// import modules from './modules'
// import actions from './actions'
// import mutations from './mutations'

// Vue.use(Vuex)

// export default new Vuex.Store({
//     // state,
//     // getters,
//     // mutations,
//     // actions,
//     modules
// })
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      count:1
    },
    getters:{
      getCount(state){
        console.log(state);
        return state.count+5;
      },
    },
    mutations:{
      add(state){
        state.count=state.count+1;
      },
      reduce(state){
        state.count=state.count-1;
      },
    },
    actions:{
      addFun(context){
        context.commit('add');
      },
      reduceFun(context){
        context.commit('reduce');
      },
    },
})