declare module 'express-session' {
    interface SessionData {
        user: {
            [key: string]: any;
        };
    }
}
declare const router: import("express-serve-static-core").Router;
export default router;
