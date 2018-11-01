<template>
	<div class="button-resource">
		<h2>Rocket Builder</h2>
        <div class="payload">
            Payload :                   
            <div class="payloadCurrent">
                <div class="text">{{ this.payload.name }}</div>                       
                <div class="arrow-nav" v-on:click="previousPayload">⟵ Previous</div> <div class="arrow-nav" v-on:click="nextPayload">Next ⟶</div>
            </div>
        </div>
        <div class="rocket">
            Rocket :                   
            <div class="rocketCurrent">
                <div class="text">{{ this.rocket.name }}</div>                       
                <div class="arrow-nav" v-on:click="previousRocket">⟵ Previous</div> <div class="arrow-nav" v-on:click="nextRocket">Next ⟶</div>
            </div>
        </div>
    </div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex'

	export default {
		name: 'RocketBuilder',
		props: {			
		},
		data() {
			return {			
			}
		},
		computed: {
			...mapGetters('rockets', {
				rocket: 'currentRocket',
                payload: 'currentPayload',
            })
		},
		methods: {
            previousPayload: function() {
                this.$store.dispatch('rockets/previousPayload');
            },
            nextPayload: function() {
                this.$store.dispatch('rockets/nextPayload');
            },
            previousRocket: function() {                
                this.$store.dispatch('rockets/previousRocket');
            },
            nextRocket: function() {
                this.$store.dispatch('rockets/nextRocket');
            }

		}
	}
</script>

<style>
.arrow-nav {
    display: inline;
    cursor: pointer;
}
</style>
