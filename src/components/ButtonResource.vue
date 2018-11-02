<template>
	<div class="button-resource">
		<div class="text">{{ name }} : {{ amount }}</div>
		<div v-if="immutable" class="button" v-on:click="click">
			{{ this.label }}			
            Cost : {{ this.cost }}$
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'

	export default {
		name: 'ButtonResource',
		props: {
			resource: {
				type: String,
				required: true
			},			
			label: {
				type: String,
				required: true
			},
            immutable: {
                type: Boolean,
                required: false
            }
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState({
				name	(state) { 
                    return (this.immutable ?  state.immutableInventory[this.resource].name : state.inventory[this.resource].name) 
                },
				amount	(state) { 
                    return (this.immutable ?  state.immutableInventory[this.resource].amount : state.inventory[this.resource].amount) 
                },
                cost  (state) { 
                    return (this.immutable ?  state.immutableInventory[this.resource].cost : 0) 
                }
			})
		},
		methods: {
			click: function() {		
                if (this.$store.state.inventory.money.amount < this.cost) {
                    return;
                }
                const action = (this.immutable ? 'immutableInventory/addResource' : 'inventory/addResource');
                this.$store.dispatch('inventory/removeResource', {resource:'money', count: this.cost})
				this.$store.dispatch(action, this.resource)								
			},
		}
	}
</script>

<style>
.button-resource.button {
	background-color: initial!important
}
.cooldown {
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: -1;
	height: 100%;
	background-color: rgb(221, 221, 221);
	width: 0%;
}
</style>
