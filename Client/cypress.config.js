import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "https://asinhonore-mern-e-commerce-app-remote.netlify.app/",
        watchForFileChanges: false,
        viewportHeight: 1000,
        viewportWidth: 1500
    },
});