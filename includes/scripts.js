Vue.mixin ({
    data() {
        return {
            jsonFiles: 'http://192.168.86.22:8080/includes/my-portfolio.json',
            //jsonFiles: 'https://meltz.github.io/includes/my-portfolio.json',
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

Vue.component('topnav', {
    props: ['display','project'],
    data() {
        return {
            previousID: 0,
            previousSlug: '',
            nextID: 0,
            nextSlug: ''
        }
    },
    computed: {
        getPreviousID() {
            return this.previousID = this.project - 1
        },
        getPreviousSlug() {
            return this.previousSlug = this.myPortfolio.filter(project => project.id === this.previousID).map(filteredObj => filteredObj.slug)
        },
        getNextID() {
            return this.nextID = this.project + 1
        },
        getNextSlug() {
            return this.nextSlug = this.myPortfolio.filter(project => project.id === this.nextID).map(filteredObj => filteredObj.slug)
        },
        getTotalProject() {
            return this.myPortfolio.length
        },
    },
    template:
    `<nav id="top-nav-section" class="sticky-top">
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <router-link to="/" class="main-logo"><img src="../images/main-logo.png" alt=""></router-link>
                </div>
                <div class="col-6">
                    <div v-if="this.display" class="pagination justify-content-end">
                        <div class="previous-btn">
                            <div v-if="this.getPreviousID >= 1">
                                <router-link :to="'/project/' + this.getPreviousSlug" class="link"><img src="images/previous-btn.png" alt=""></router-link>
                            </div>
                            <div v-else>
                                <span class="link disabled-link"><img src="images/previous-btn.png" alt=""></span>
                            </div>
                        </div>
                        <div class="next-btn">
                            <div v-if="this.getNextID <= this.getTotalProject">
                                <router-link :to="'/project/' + this.getNextSlug" class="link"><img src="images/next-btn.png" alt=""></router-link>
                            </div>
                            <div v-else>
                                <span class="link disabled-link"><img src="images/next-btn.png" alt=""></span>
                            </div>
                        </div>
                    </div><!-- pagination -->
                </div>
            </div>
        </div>
    </nav><!-- #top-nav-section -->`
})

const Home = {
    computed: {
        latestProjects() {
            return this.myPortfolio.reverse()
        }
    },
    template:
    `<div id="main-section">
        <topnav :display="false"></topnav>
        <div id="portfolio-section">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div v-for="project in latestProjects" :key="project.id" class="col-sm-auto col-md-auto col-lg-auto">
                        <router-link :to="'/project/' + project.slug" :id="'p-' + project.id" class="project">
                            <img :src="'/' + portfolioFolder + '/' + project.screen_name + '/' + project.screen_name + '-thumb.jpg'" :alt="project.name" class="img-fluid thumbnail">
                            <div class="portfolio-content">
                                <h3>{{ project.name }}</h3>
                                <p class="task">{{ project.task }}</p>
                                <p class="skills">{{ project.skills }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div><!-- #portfolio-section -->
    </div><!-- #main-section -->`
}

const Project = {
    computed: {
        filterProject() {
            return this.myPortfolio.filter(project => project.slug == this.$route.params.slug)
        },
    },
    template:
    `<div id="main-section">
        <div v-if="filterProject && filterProject.length">
            <div v-for="project in filterProject">
                <topnav :display="true" :project="project.id"></topnav>
                <div id="project-section">
                    <div class="project-detail-section">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-12 col-md-8">
                                    <div class="project-detail">
                                        <h3 class="name">{{ project.name }}</h3>
                                        <div v-if="project.desc" class="desc" v-html="project.desc"></div>
                                        <p class="task">{{ project.task }}</p>
                                        <p class="skills">{{ project.skills }}</p>
                                        <a v-if="project.link" :href="project.link" target="_blank" class="link"><span class="link-text">Visit the site</span></a>
                                    </div><!-- .project-detail -->
                                </div>
                            </div>
                        </div>
                    </div><!-- .project-detail-section -->
                    <div class="project-screens-section">
                        <div v-for="screen in project.screen_total" class="screenshot">
                            <img :src="'/' + portfolioFolder + '/' + project.screen_name + '/' + project.screen_name + '-' + screen + '.jpg'" :alt="project.name" class="img-fluid">
                        </div>
                    </div><!-- .project-screens-section -->
                </div><!-- #project-section -->
            </div>
        </div>
        <div v-else>
            <p>404 Page not found</p>
            <p><router-link to="/">Back</router-link></p>
        </div>
    </div><!-- #main-section -->`
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
    methods: {
        getYear() {
            var today = new Date();
            return today.getFullYear();
        }
    }
}).$mount('#app')