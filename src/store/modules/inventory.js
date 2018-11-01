// Example : https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/products.js

const state = {
    cardboard: {
        id: 1,
        step: 2,
        name: "Cardboard",
        amount: 0
    },
    tape: {
        id: 2,
        step: 1,
        name: "Tape",
        amount: 0
    },
    budget: {
        id: 3,
        name: "Budget",
        amount: 0
    }    
}

// getters
const getters = {}

// actions
const actions = {
    addResource({ state, commit}, resource) {
        commit('incrementResource', resource);
    }

}

// mutations
const mutations = {
    incrementResource(state, resource) {
        state[resource].amount += state[resource].step;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}