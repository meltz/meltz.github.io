Vue.mixin ({
    data() {
        return {
            jsonFiles: 'http://192.168.86.22:8080/includes/my-portfolio.json',
            // jsonFiles: 'https://meltz.github.io/includes/my-portfolio.json',
            myPortfolio: [],
            loading: true,
            errored: false,
            portfolioFolder: 'portfolio',
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

Vue.component('pagination', {
    props: ['selectedProject'],
    data() {
        return {
            selected: this.selectedProject.id,
            previous: this.selected + 1,
            next: this.selected - 1
        }
    },
    methods: {
        getPreviousProject() {
            return this.myPortfolio.filter(project => project.id === previous)
        },
        getNextProject() {
            return this.myPortfolio.filter(project => project.id === next)
        }
    },
    computed: {
        getTotalProject() {
            return this.myPortfolio.length
        },
    },
    template:
    `<div class="project-pagination">
        <div class="previous-btn">
            <span v-if="this.previous <= 1"><router-link :to="'/project/' + getPreviousProject.slug">Previous</router-link></span>
            <span v-else>No Previous</span>
        </div>
        <div class="next-btn">
            <span v-if="this.next >= this.getTotalProject"><router-link :to="'/project/' + getNextProject.slug">Next</router-link></span>
            <span v-else>No Next</span>
        </div>
    </div><!-- project-pagination -->`
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
                            <img :src="'/' + portfolioFolder + '/' + project.screen_name + '/' + project.screen_name + '-thumb.jpg'" :alt="project.name" class="img-fluid">
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
    computed: {
        filterProject() {
            return this.myPortfolio.filter(project => project.slug == this.$route.params.slug)
        },
    },
    template:
    `<div id="portfolio-project">

        <div class="container">

            <div v-if="filterProject && filterProject.length">

                <div v-for="project in filterProject">


                    <pagination selectedProject="project"></pagination>

                    <div class="project-detail">
                        <h3 class="name">{{ project.id + ' ' + project.name }}</h3>
                        <div v-if="project.desc" class="desc" v-html="project.desc"></div>
                        <p class="task">{{ project.task }}</p>
                        <p class="skills">{{ project.skills }}</p>
                        <a v-if="project.link" :href="project.link" target="_blank" class="link"><span class="link-text">Visit: {{ project.name }}</span></a>
                    </div><!--.project-detail-->

                    <div class="project-screens">
                        <div v-for="screen in project.screen_total">
                            <img :src="'/' + portfolioFolder + '/' + project.screen_name + '/' + project.screen_name + '-' + screen + '.jpg'" :alt="project.name" class="img-fluid">
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
            name: 'redirect-home',
            component: Home
        },
        {
            path: '/404',
            name: 'not-found',
            component: Home
        }
    ]
})

const app = new Vue ({
    router,
}).$mount('#app')