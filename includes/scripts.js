Vue.mixin ({
    data() {
        return {
            jsonFiles: 'http://192.168.86.22:8080/includes/my-portfolio.json',
            myPortfolio: [],
            loading: true,
            errored: false,
            portfolioFolder: 'portfolio'
        }
    },
    mounted() {
        axios
            .get(this.jsonFiles)
            .then(response => this.myPortfolio = response.data.projects)
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(()=> this.loading = false)
    }
})

const Home = {
    computed: {
        latestProjects() {
            return this.myPortfolio.reverse()
        }
    },
    template:
    `<div id="portfolio-section">
        <div class="row">
            <div class="col-12 col-md-3" v-for="project in latestProjects" :key="project.id">
                <div :id="'p' + project.id" class="project">
                    <router-link :to="'/project/' + project.slug">
                        <p>{{ project.id }}</p>
                        <img :src="portfolioFolder + '/' + project.ss_name + '/' + project.ss_name + '-thumb.jpg'" :alt="project.name" class="img-fluid">
                        <h3><strong>{{ project.name }}</strong></h3>
                        <p class="task">{{ project.task }}</p>
                        <p class="skills">{{ project.skills }}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div><!-- #portfolio-section -->`,
}

const Project = {
    computed: {
        filterProject() {
            return this.myPortfolio.filter(project => project.slug == this.$route.params.slug)
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
            path: '/project/:slug',
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