// Example : https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/products.js

const getDefaultState = () => {
  return {  	
	workers: {
		id: 3,
		step: 1,
		name: "Workers",
		amount: 1,
        cost: 15,
	}    
  }
}

const state = getDefaultState();

// getters
const getters = {}

// actions
const actions = {
	addResource({ state, commit}, resource) {
		commit('incrementResource', resource);
	},
    increaseCost({ state, commit}, resource) {
        commit('increaseCost', resource);
    }
}

// mutations
const mutations = {
	incrementResource(state, resource) {
		state[resource].amount += state[resource].step;
        state[resource].cost = Math.floor(state[resource].cost * 1.7);
	},	    
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}