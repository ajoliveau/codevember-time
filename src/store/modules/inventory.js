// Example : https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/products.js

const getDefaultState = () => {
  return {
  	money: {
		id: 1,
		name: "Money",
		amount: 0
	},
	electricity: {
		id: 2,
		name: "Electricity",
		amount: 0
	}
  }
}

const state = getDefaultState();

// getters
const getters = {}

// actions
const actions = {
	addResource({ state, commit}, {resource, count}) {
		commit('incrementResource', {resource, count});
	},
	removeResource({ state, commit}, {resource, count}) {
		commit('decrementResource', {resource, count});
	},
	resetInventoryState({commit}) {
		commit('emptyState');
	}

}

// mutations
const mutations = {
	incrementResource(state, {resource, count}) {
		state[resource].amount += count;
	},
	decrementResource(state, {resource, count}) {
		state[resource].amount -= count;
	},
	emptyState(state) {
		Object.assign(state, getDefaultState())
	}   
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}