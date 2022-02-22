import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/main.pcss"
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App)

Sentry.init({
    app,
    dsn: "https://6364928b7c064381a6c4068c27e9d8cf@o1146886.ingest.sentry.io/6216503",
    logErrors: true,
    release: __SENTRY_RELEASE__,
    environment: import.meta.env.MODE, //production
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "my-site-url.com", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

app.use(router)
app.mount('#app')
