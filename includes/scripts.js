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
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-3" v-for="project in latestProjects" :key="project.id">
                    <div :id="'p' + project.id" class="project">
                        <router-link :to="'/project/' + project.slug">
                            <p>{{ project.id }}</p>
                            <img :src="portfolioFolder + '/' + project.screen_name + '/' + project.screen_name + '-thumb.jpg'" :alt="project.name" class="img-fluid">
                            <h3><strong>{{ project.name }}</strong></h3>
                            <p class="task">{{ project.task }}</p>
                            <p class="skills">{{ project.skills }}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- #portfolio-section -->`,
}

const Project = {
    methods: {
        totalProject() {
            return this.myPortfolio.length
        }
    },
    computed: {
        filterProject() {
            return this.myPortfolio.filter(project => project.slug == this.$route.params.slug)
        }
    },
    template:
    `<div id="portfolio-project">
        <div class="container">

        <div class="project-pagination">
            <router-link to="'"></router-link>
            <router-link to="'"></router-link>
        </div><!-- project-pagination -->


            <div v-if="filterProject && filterProject.length">

                <div v-for="project in filterProject">

                    <div class="project-detail">
                        <h3 class="name">{{ project.id + ' ' + project.name }}</h3>
                        <div v-if="project.desc" class="desc" v-html="project.desc"></div>
                        <p class="task">{{ project.task }}</p>
                        <p class="skills">{{ project.skills }}</p>
                        <a v-if="project.link" :href="project.link" target="_blank" class="link"><span class="link-text">Visit: {{ project.name }}</span></a>
                    </div><!--.project-detail-->

                    <div class="project-screens">
                        <div v-for="screen in project.screen_total">
                            <img :src="portfolioFolder + '/' + project.screen_name + '/' + project.screen_name + '-' + screen + '.jpg'" :alt="project.name" class="img-fluid">
                        </div>
                    </div><!--.project-screens-->


                </div>

            </div>
            <div v-else>
                <p>404 Page not found</p>
                <p><router-link to="/">Back</router-link></p>
            </div>
        </div>
    </div><!-- #portfolio-project -->`,
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