import { createPinia } from "pinia";

export const pinia = createPinia();

// Register Pinia globally
export const installPinia = (app) => {
    app.use(pinia);
};