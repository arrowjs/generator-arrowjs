module.exports = {
    feature: {
        path: {
            folder: "/features",
            file: "feature.js"
        },
        controller: {
            path: {
                folder: "controllers",
                file: "*.js"
            }
        },
        view : {
            path :{
                folder: [
                    '/public',
                    'views'
                ]
            }
        },
        route: {
            path: {
                file: "route.js"
            }
        }
    }
};