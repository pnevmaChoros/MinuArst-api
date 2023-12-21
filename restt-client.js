const vue = Vue.createApp ({
    data() {
        return {
            doctorInModal: {name: null},
            doctors: []
        }
    },
    async created() {
        this.doctors = await (await fetch("http://localhost:8080/doctors")).json();
    },
    methods: {
        getDoctor: async function (id){
            this.doctorInModal = await (await fetch(`http://localhost:8080/doctors/${id}`)).json();
            let doctorInfoModal = new bootstrap.Modal(document.getElementById('doctorInfoModal'), {});
            doctorInfoModal.show();
        }
    }
}).mount('#app');

