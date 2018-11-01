// Example : https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/store/modules/products.js

import { mod } from '../../utils/mod';

const state = {
    payloads: [
    {
        id: 0,
        name: "None",
    },
    {
        id: 1,
        name: "Altimeter",
    },
    {
        id: 2,
        name: "Thermomether",
    },      
    {
        id: 3,
        name: "Video camera",
    }      
    ],
    rockets: [
    {
        id: 0,          
        name: "Cardboard rocket",
        resources: [
        {
            name: "Cardboard",
            shortName: "cardboard",
            count: 2,
        },
        {
            name: "Tape",
            shortName: "tape",
            count: 1,
        },
        ],              
        launches: 0,
        image: '/assets/cardboard-launch.gif',
        imageDuration: 4750,
        
    },
    {
        id: 1,          
        name: "Big cardboard rocket",
        resources: [
        {
            name: "Cardboard",
            shortName: "cardboard",
            count: 10,
        },
        {
            name: "Tape",
            shortName: "tape",
            count: 5,
        },
        ],              
        launches: 0,
        image: '/assets/cardboard-launch.gif',
        imageDuration: 4750,
        
    },
    {
        id: 2,          
        name: "Atlas Mercury",
        resources: [
        {
            name: "Cardboard",
            shortName: "cardboard",
            count: 10,
        },
        {
            name: "Tape",
            shortName: "tape",
            count: 5,
        },
        ],              
        launches: 0,
        image: '/assets/cardboard-launch.gif',
        imageDuration: 4750,
        
    },
    ],
    current: {
        payload: 0,
        rocket: 0
    },
    totalLaunches: 0,
} 


// getters
const getters = {
    currentRocket: state => {
        return state.rockets.filter(rocket => rocket.id == state.current.rocket)[0];
    },
    currentPayload: state => {
        return state.payloads.filter(payload => payload.id == state.current.payload)[0];
    }
}

// actions
const actions = {
    previousPayload({state, commit}) {
        commit('previousPayload');
    },
    nextPayload({state, commit}) {
        commit('nextPayload');
    },
    previousRocket({state, commit}) {
        commit('previousRocket');
    },
    nextRocket({state, commit}) {
        commit('nextRocket');
    }

}

// mutations
const mutations = {
    nextPayload(state) {
        state.current.payload = mod(state.current.payload + 1, state.payloads.length);
    },
    previousPayload(state) {
        state.current.payload = mod(state.current.payload - 1, state.payloads.length);
    },
    nextRocket(state) {
        state.current.rocket = mod(state.current.rocket + 1, state.rockets.length);
    },
    previousRocket(state) {
        state.current.rocket = mod(state.current.rocket - 1, state.rockets.length);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}