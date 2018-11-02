<template>
	<div id="app">
		<div class="columns">
			<div class="column">				
				<ButtonResource resource="money" label="Sell things"></ButtonResource>
				<br/>
				<ButtonResource resource="electricity" label="Run windmill"></ButtonResource>
                <br/>
                <ButtonResource resource="workers" label="Hire Workers" immutable></ButtonResource>
                <br/><!-- 
                <div class="button" @click="undo()">Undo</div>
                <div class="button" @click="redo()">Redo</div>          -->
                 <div>{{ this.currentTime }}  / 0:{{ this.maxTime }}</div> 
                <vueSlider ref="slider" v-model="timeElapsed" height="8" tooltip="false" :max="maxTime" v-on:callback="onChange" v-on:drag-start="drag" v-on:drag-end="release"></vueSlider>

                <div v-if="end">
                    <div class="button" v-on:click="startAgain">
                        Be kind, Rewind
                    </div>

                </div>

			</div>
			<div class="column">

			</div>
			
		</div>
	</div>
</template>

<script>

	import ButtonResource from './components/ButtonResource.vue'	
	import vueSlider from 'vue-slider-component'

	const TICK_RATE = 1000; // Tick 10 times per second
    const EMPTY_STATE = 'inventory/emptyState';

	export default {
		name: 'App',
		data() {
			return {		
                paused: false,
                timeElapsed: 0,	
				timeSinceLastTick: 0,
                maxTimeElapsed: 0,
                countTimeElapsed: 0,
				lastFrameTime: 0,
                maxTime: 30,
                fixed: false,
                end: false,
                sliderUpdateRate: 0,
				binders: [],
                history: {
                    list: [],
                    current: 0

                },
                historyCurrent: 0,                
                newMutation: true
			}
		},
        computed: {
            currentTime() {
                const time = Math.round(this.countTimeElapsed);
                return (time >= 60 ? '1:00' : '0:' + Math.round(this.countTimeElapsed).toString().padStart(2, '0'));
            },          
        },
		methods: {	
            startAgain() {
                this.countTimeElapsed = this.timeElapsed = 0;
                this.paused = false;
                this.end = false;
                this.goToState(0);
            },
            onChange(e) {
                this.newMutation = true;
                if (this.timeElapsed >= this.maxTimeElapsed) {
                    this.timeElapsed = this.maxTimeElapsed;                    
                    this.fixed = true;
                    return false;
                }
                this.countTimeElapsed = this.timeElapsed;
                this.fixed = false;
                let stateToGo = Math.round(this.timeElapsed / this.maxTimeElapsed * this.history.list.length)
                this.goToState(stateToGo);
            },
            drag() {
                this.paused = true;
                this.maxTimeElapsed = this.timeElapsed;
            },
            release() {
                this.paused = false;
                this.end = false;
            },
            goToState(stateNumber){ 
                this.history.current = stateNumber;
                this.newMutation = false;
                this.$store.commit(EMPTY_STATE);
                for (var i = 0; i < this.history.current; i++) {
                    const mutation = this.history.list[i];
                    this.$store.commit(`${mutation.type}`, mutation.payload);
                }     
                this.newMutation = true;
            },
            redo() {
                if (this.history.current >= this.history.list.length) {
                    return;
                }                          
                let commit = this.history.list[this.history.current];
                this.history.current++;      
                this.newMutation = false;
                this.$store.commit(`${commit.type}`, commit.payload);
                this.newMutation = true;
            },
            undo() {
                if (this.history.list.length == 0) {
                    return;
                }                
                this.history.current --;
                this.newMutation = false;
                this.$store.commit(EMPTY_STATE);
                for (var i = 0; i < this.history.current; i++) {
                    const mutation = this.history.list[i];
                    this.$store.commit(`${mutation.type}`, mutation.payload);
                }                
                this.newMutation = true;
            },
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
                if (!this.paused) {
                    this.countTimeElapsed += 1;
                    this.$store.dispatch('inventory/addResource', {resource:'money', count:this.$store.state.immutableInventory.workers.amount})                     
                    if (this.countTimeElapsed >= this.maxTime) {
                        this.end = true;
                        this.paused = true;
                        this.countTimeElapsed = this.timeElapsed = this.maxTime;
                    }
                }                

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

            this.$bind('sliderAnim', (deltaTime) => {
                if (!this.paused) {
                    this.sliderUpdateRate += deltaTime;                
                    if (this.sliderUpdateRate >= 100) {
                        this.timeElapsed += this.sliderUpdateRate / 1000;
                        this.sliderUpdateRate = 0;
                    }                
                }
            })
		},
        created: function() {
            this.$store.subscribe(mutation => {              
                if (mutation.type !== EMPTY_STATE && mutation.payload !== 'workers') {
                    if (this.newMutation) {
                        if (this.history.list.length !== this.history.current) {
                            this.history.list.length = this.history.current;
                        }
                        this.history.list.push(mutation);
                        this.history.current ++;
                    }                    
                }                
            });
        },
		components: {		
			ButtonResource,	
            vueSlider		
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
