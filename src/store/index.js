import Vue from 'vue'
import Vuex from 'vuex'
import inventory from './modules/inventory'
import rockets from './modules/rockets'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: {
		inventory,
		rockets
	},
	strict: debug
})