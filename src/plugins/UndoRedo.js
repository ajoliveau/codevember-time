module.exports = {
	install(Vue) {
		const EMPTY_STATE = 'emptyState';
		Vue.mixin({
			data() {
				return {
					done: [],
					undone: [],
					newMutation: true
				}
			},
			created() {
				console.log('created');
				console.log(this);
				console.log(this.$store);
				this.$store.subscribe(mutation => {
					if (mutation.type !== EMPTY_STATE) {
						this.done.push(mutation);
					}
					if (this.newMutation) {
						this.undone = [];
					}
				});
			},
			methods: {
				redo() {
					let commit = this.undone.pop();
					this.newMutation = false;
					this.$store.commit(`${commit.type}`, commit.payload);
					this.newMutation = true;
				},
				undo() {
					this.undone.push(this.done.pop());
					this.newMutation = false;
					this.$store.commit(EMPTY_STATE);
					this.done.forEach(mutation => {
						this.$store.commit(`${mutation.type}`, mutation.payload);
						this.done.pop();
					});
					this.newMutation = true;
				}
			},
			computed: {
				canRedo() {
					return this.undone.length;
				},
				canUndo() {
					return this.done.length;
				}
			},
		});
	}
};
