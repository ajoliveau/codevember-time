<template>
	<div class="button-resource">
		<div class="text">{{ name }} : {{ amount }}</div>
		<div class="button" v-on:click="click" :disabled="onCooldown">
			{{ this.label }}
			<div class="cooldown" v-bind:style="{ width: width + '%' }">                
			</div>
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
			cooldownTime: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				durationRemaining: 0,
				onCooldown: false,
				width: 0
			}
		},
		computed: {
			...mapState({
				name	(state) { return state.inventory[this.resource].name },
				amount	(state) { return state.inventory[this.resource].amount },				
			})
		},
		methods: {
			click: function() {
				if (this.onCooldown)
					return;

				this.onCooldown = true;
				this.durationRemaining = this.cooldownTime;
				this.width = 100;
				this.$bind(`Button${this.name}`, this.update);
				// this.$emit('bind', `Button${this.name}`, this.update );
				this.$store.dispatch('inventory/addResource', this.resource)								
			},
			update: function( deltaTime ) {
				this.durationRemaining -= deltaTime;
				if (this.durationRemaining <= 0) {
					this.$unbind(`Button${this.name}`);
					this.onCooldown = false;
					this.width = 0;
				} else {					
					this.width = this.durationRemaining / this.cooldownTime * 100;
				}
			}
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
