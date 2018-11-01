<template>
	<div id="app">
		<div class="columns">
			<div class="column">				
				<ButtonResource resource="cardboard" label="Rummage in bins" cooldownTime=1000 ></ButtonResource>
				<br/>
				<ButtonResource resource="tape" label="Rummage in bins" cooldownTime=2000 ></ButtonResource>


			</div>
			<div class="column">

				<RocketBuilder></RocketBuilder>

			</div>
			
			<div class="column">
				Mission Planner Placeholder
			</div>
			<div class="column">
				<LaunchButton></LaunchButton>
			</div>
		</div>
	</div>
</template>

<script>

	import ButtonResource from './components/ButtonResource.vue'
	import RocketBuilder from './components/RocketBuilder.vue'
	import LaunchButton from './components/LaunchButton.vue'
	

	const TICK_RATE = 100; // Tick 10 times per second

	export default {
		name: 'App',
		data() {
			return {	
				cardboard: 0,
				tape: 0,				
				timeSinceLastTick: 0,
				lastFrameTime: 0,
				binders: []	
			}
		},
		methods: {	
			bind: function(id, fn) {
				this.binders.push({id: id, fn: fn});
			},
			unbind: function(id) {				
				for (let i = 0; i < this.binders.length; i++) {
					if (this.binders[i].id === id) {
						this.binders.splice(i, 1);
						break;
					}
				}
			},
			gameLoop: function(now) {																			
				// Main game loop

			},
			update: function(now) {   
				const deltaTime = now - this.lastFrameTime;

				this.timeSinceLastTick += deltaTime;

				if (this.timeSinceLastTick >= TICK_RATE) {	

					this.gameLoop();
					this.timeSinceLastTick = 0;
				}
				for(let i=0; i < this.binders.length; i++) this.binders[i].fn( deltaTime ); 

				this.lastFrameTime = now;  		
				requestAnimationFrame(this.update);                   
			},			
		},
		mounted: function()  {
			requestAnimationFrame(this.update);
			window.bind = this.bind;
			window.unbind = this.unbind;
		},
		components: {		
			ButtonResource,
			RocketBuilder,
			LaunchButton
		}
	}
</script>

<style>
#app {
	/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
	/*-webkit-font-smoothing: antialiased;*/
	/*-moz-osx-font-smoothing: grayscale;*/
	text-align: center;
	/*color: #2c3e50;*/
	margin-top: 60px;
}
</style>
