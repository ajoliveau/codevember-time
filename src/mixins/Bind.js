export default {
    methods: {
        $bind(id, fn) {
            window.bind(id, fn);
        },
        $unbind(id) {
            window.unbind(id);
        }
    },
};