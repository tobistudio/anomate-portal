/*
 *
 *   Application bootstrap
 *
 *   The application bootstrap serve as an entry point
 *   Define controllers, helpers, events etc
 *
 */
 
const Backbone  = require('backbone');

// Bootstrap application
const appBoot = function ($app) {
    
    // Base configs
    $app.defaultController  = 'home';
    $app.container          = '#application-wraper';

    // Define the $app variable globaly to use in other modules
    window.$app = $app;

    const Signals   = require('@/system/signals');
    const Helpers   = require('@/system/helpers');
    const Routes    = require('@/routes');
    const BaseView  = require('@/views/baseview');
    
    // Backbone syn extend
    Backbone.sync   = require('@/system/sync');
    // Define helpers
    $app.helpers    = Helpers;
    // Define application signals globaly
    $app.signals    = new Signals();

    // Define routes, helpers, etc
    this.routesHandler = Routes;

    if (!$app.apiURL) {
        $app.helpers.throwError('You need to set the $app.apiURL. ');
    }

    // Controller loader
    this.loadControllers = function () {
        
        // Define the default controller
        this.defaultController = 'home';

        // Define routes
        this.routesHandler = new this.routesHandler();

        // Define controllers
        this.controllers = {
            
            // Home controllers
            'home'              : require('@/controllers/home'),
            'home::filter'      : require('@/controllers/home'),
            
            // Campaing controllers
            'campaigns'         : require('@/controllers/campaigns/index'),
            'campaigns::single' : require('@/controllers/campaigns/single'),
            
            // Customers controllers
            'customers'         : require('@/controllers/customers/index'),
            
            // Widgets listing controller
            'widgets'           : require('@/controllers/widgets'),

            // User controllers
            'user'              : require('@/controllers/user/index'),
            'user::profile'     : require('@/controllers/user/index'),
            'user::settings'    : require('@/controllers/user/index'),
            'user::billing'     : require('@/controllers/user/index'),
            'user::support'     : require('@/controllers/user/index'),
            
            // Pages controllers
            'pages'             : require('@/controllers/pages'),
            
            // Errors
            'errors::404'       : require('@/controllers/errors/404'),
            
        };
        
        //
        // On route change define and load the selected controller
        //
        
        this.routesHandler.on(
            'route:componnent',
            function (primaryController, secondaryController, params) {
                // Assign the default controller
                let controller = this.defaultController;
                // Set default controller
                if (primaryController) {
                    // Define primary selected controller
                    controller = primaryController;
                    // If controller/subcontroller
                    // Load the subcontroller
                    if (secondaryController) {
                        controller = controller + '::' + secondaryController;
                    }
                }
                // Init selected controller.
                this.initController(controller, params);
            },
            this
        );
        
        //
        // Init Route
        // 
        
        Backbone.history.start({ 
            pushState: true,
            root: "/app"
        });
        
        //
        // If the path is empty redirect to home
        //
        
        if (window.location.pathname=='/'||window.location.pathname=='') {
            // Init base route
            $app.helpers.navigate('/home',true);
        }
        
    };

    // Init Controllers
    this.initController = function (controller, query) {
        
        // if a selected controller is set
        // check and remove all the event liseners
        window.$app.signals.controller.off();

        // Define params
        this.selectedRoute = {
            controller: controller,
            query: $app.helpers.extractParams(query),
        };

        // Init componnents
        this.selectedController = this.controllers[this.selectedRoute.controller];

        if (this.selectedController == undefined) {
            this.selectedController = this.controllers['errors::404'];
        }

        if (typeof this.selectedController == 'function') {
            
            // Check if there is a child controller in the route.
            this.selectedRoute.controller = this.selectedRoute.controller.split('::');
            
            // Init controller
            this.selectedController = new this.selectedController(this.selectedRoute);
            
            // Append controller primary view to the app DOM container
            $app.baseView.container.$el.html(this.selectedController.view.$el);

            // Triggera a signal to update the selected sidebar
            window.$app.signals.system.trigger('update-navigations', this.selectedRoute);

            // fix scroll position
            window.scrollTo(0, 0);
            
        } else {
            
            console.log("The selected route isn't a constructor");
            
        }
        
    };

    //
    // On user sync init app views and load controllers
    // This is a listener to the session service
    //
    
    window.$app.signals.system.on(
        'user-sync',
        function (response) {
            // Define application view and init
            $app.baseView = new BaseView();
            // Init the base view
            // Header application container and footer.
            $app.baseView.init();
            // Load controllers
            this.loadControllers();
        },
        this
    );
    
    // 
    // Services loader
    // 
    this.loadServices = function () {

        //
        // Init session service
        //
        $app.session = require('@/system/services/session');
        $app.session = new $app.session();
        $app.session.init();

        return this;
        
    };

    // Bootstrap the application
    this.loadServices();
    
};

// Boot application using the config in the view
/*  
    // Example config
    const config = {
    	// APP / API url
    	appURL			: '{{ $root }}',
        apiURL			: '{{ $root }}api',
        
        // Temporary 
        apiURL_V1		: 'https://app.anomate.co/wp-json/anomate/v1/',
        
        // The csrf token is appened in to the request headers
        // Generated from laravel
        token			: '{{ csrf_token() }}',
        time			: '{{ $timestamp }}',
        
        // User tokens and data
        shop_id			: '{{ $shop_id }}',
        api_token		: '{{ $api_token }}',
        user			: '{{ $user }}'
    };
    
*/

appBoot(config);
