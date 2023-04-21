const navigation = [
    {
        name: 'Dashboard',
        icon: 'ai-dashboard',
        url: 'home',
        sidebar: 'show',
    },
    {
        name: 'Campaigns',
        icon: 'ai-send',
        url: 'campaigns',
        sidebar: 'show',
    },
    {
        name: 'Apps',
        icon: 'ai-gift',
        url: 'apps',
        sidebar: 'show',
        child: [
            {
                name: 'Raffle Giveaway',
                url: 'apps/raffle-giveaway',
            },
            {
                name: 'Review Manager',
                url: 'apps/review-manager',
            },
        ],
    },
    {
        name: 'Widgets',
        icon: 'ai-grid',
        url: 'widgets',
        sidebar: 'show',
    },
    {
        name: 'Customers',
        icon: 'ai-people-group',
        url: 'customers',
        sidebar: 'show',
    },
    {
        name: 'Pages',
        icon: 'ai-gift',
        url: 'pages',
        sidebar: 'hide',
        child: [
            {
                name: 'Not found',
                url: '404',
            },
            {
                name: 'Authorization required',
                url: '500',
            },
        ],
    },
    {
        name: 'User',
        icon: 'ai-gift',
        url: 'user',
        sidebar: 'hide',
        child: [
            {
                name: 'Profile',
                url: 'user/profile',
            },
            {
                name: 'Store settings',
                url: 'user/settings',
            },
            {
                name: 'Billing',
                url: 'user/billing',
            },
            {
                name: 'Support',
                url: 'user/support',
            },
        ],
    },
];

module.exports = navigation;
