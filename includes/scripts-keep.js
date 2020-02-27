Vue.mixin ({
    data() {
        return {
            myProjects: [],
            loading: true,
            errored: false,
        }
    },
    mounted() {
        axios
            .get('http://192.168.86.22:8080/my-projects.json')
            .then(response => this.myProjects = response.data.projects)
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(()=> this.loading = false)
    }
})

const Home = {
    template:
    `<div id="projects-section">
        <div class="project" v-for="project in myProjects" :key="project.id">
            <p><strong>{{ project.name }}</strong></p>
            <router-link :to="'/project/' + project.id">
                <img :src="project.thumbnail" :alt="project.name" width="200">
            </router-link>
        </div>
    </div>`,
}

const Project = {
    computed: {
        filterProject() {
            return this.myProjects.filter(project => project.id == this.$route.params.id)
        }
    },
    template:
    `<div>
        <div v-if="filterProject && filterProject.length">
            <div v-for="project in filterProject">
                <p>Path {{ $route.params.id }}</p>
                <p>{{ project.id }}</p>
                <p>{{ project.name }}</p>
                <p><router-link to="/">Back</router-link></p>
            </div>
        </div>
        <div v-else>
            <p>404 Page not found</p>
            <p><router-link to="/">Back</router-link></p>
        </div>
    </div>`
}

const router = new VueRouter ({
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/project/:id',
            name: 'project',
            component: Project,
        },
        {
            path: '*',
            name: 'notfound',
            component: Home
        },
        {
            path: '/404',
            name: '404',
            component: Home
        }
    ]
})

const app = new Vue ({
    router,
}).$mount('#app')