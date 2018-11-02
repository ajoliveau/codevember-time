import Vue from 'vue'
import Vuex from 'vuex'
import inventory from './modules/inventory'
import immutableInventory from './modules/immutableInventory'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		inventory,
        immutableInventory
	},
	strict: debug
})