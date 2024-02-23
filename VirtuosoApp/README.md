Follow this file strucutre

    Models: Define your data models here, corresponding to MongoDB documents (e.g., User, Artwork, Review).
    Views: In Flask, views handle the routing. You'll define your endpoints here.
    Controllers: These files will handle the business logic, interacting between the models and views.
    Services: For functionalities like authentication and recommendations.
    Utils: For database connections and other utilities.
    Tests: To store your tests for models, controllers, etc.
/backend
    /app
        __init__.py
        /models
            __init__.py
            user.py
            artwork.py
            review.py
        /views
            __init__.py
            routes.py
        /controllers
            __init__.py
            user_controller.py
            artwork_controller.py
            review_controller.py
        /services
            __init__.py
            auth_service.py
            recommendation_service.py
        /utils
            __init__.py
            database.py
    /tests
        __init__.py
        test_config.py
        /models
        /controllers
    config.py
    run.py




    Assets: Static files like images and global styles.
    Components: Reusable Vue components.
    Views: Vue components that represent pages.
    Services: JavaScript files to handle API calls and authentication.
    App.vue: The main component that acts as the application's layout.
    main.js: Entry point for the Vue application.
    router.js: Defines the routes for the application.
    store.js: Manages state with Vuex (if needed).
    Tests: Unit and end-to-end tests for your Vue components.
/frontend
    /src
        /assets
            /images
            /styles
        /components
            NavBar.vue
            ArtworkCard.vue
            ReviewForm.vue
        /views
            Home.vue
            ArtworkDetail.vue
            UserProfile.vue
        /services
            ApiService.js
            AuthService.js
        App.vue
        main.js
        router.js
        store.js
    /public
        index.html
    /tests
        /unit
        /e2e
    package.json
