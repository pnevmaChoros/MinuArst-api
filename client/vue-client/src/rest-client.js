const restClient = Vue.createApp({
    data() {
        return {
            doctorInModal: {name: null},
            doctors: []
        }
    },

    async mounted(){
        this.doctors = await (await fetch('http://localhost:8060/doctor')).json();
    },

    methods: {
        async getDoctor(id) {
            this.doctorInModal = await (await fetch(`http://localhost:8060/doctor/${id}`)).json();
            let doctorInfoModal = new bootstrap.Modal(document.getElementById('doctorInfoModal'), {});
            doctorInfoModal.show();
        }
    }
}).mount('#app');