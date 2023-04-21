/*
 *
 *
 */

const _                     = require('underscore');
const TabsComponent         = require('@/views/components/tabs');
const CampaignPending       = require('@/views/campaigns/pending');
const CampaignUnavailable   = require('@/views/campaigns/unavailable');

module.exports = function (params) {
    
    let that = this;
    
    // Reference parameters
    this.params = params;
    
    if (this.params.query && this.params.query.id) {
        // Get selected campaign id
        this.selected   = this.params.query.id;
        // Get campaigns collection
        this.campaigns  = window.$app.session.campaigns;
        // Get the selected campaign
        this.campaign   = this.campaigns.get(this.selected);
    }
    
    // Build tabs based on campaign type
    this.campaignType = this.campaign.get('campaign_name');
    this.campaignType = this.campaignType.replace(/\s+/g,'-').toLowerCase();
    
    switch (this.campaignType) {
        case 'product-upsell':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/product-upsell/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/product-upsell/user-activities'),
                }
            ];
            break;
        case 'request-customer-consent':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'welcome-basic':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'generate-subscribers':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'customer-survey':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'surveys',
                    name: 'Surveys',
                    url: 'campaigns/single?tab=surveys&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'product-review':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'back-in-stock':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'group-buying':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'giveaway':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'winback':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        case 'cart-abandonment':
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
            break;
        default:
            // Tabs Config
            this.tabs = [
                {
                    id: 'overview',
                    name: 'Overview',
                    url: 'campaigns/single?tab=overview&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                },
                {
                    id: 'user-activities',
                    name: 'User activities',
                    url: 'campaigns/single?tab=user-activities&id='+params.query.id,
                    controller: require('@/controllers/campaigns/winback/overview'),
                }
            ];
    }
    
    // Prepare tabs
    this.prepareTabs = function() {
        this.selectedTab = this.tabs[0];
        _.each(
            this.tabs,
            function (tab, index) {
                if (params.query) {
                    if (params.query.tab && params.query.tab == tab.id) {
                        this.selectedTab = this.tabs[index];
                    }
                }
            },
            this
        );
        this.selectedTab.className = 'active';
    };

    // Define child controller depending on the selected Tab
    this.initChildControler = function () {
        // Init the child controller for the tab content
        if (this.selectedTab.controller) {
            this.childController = new this.selectedTab.controller(this);
            this.view.$('#tabs-content').html(this.childController.view.$el);
        }
    };
    
    switch (this.campaign.get('status')) {
        case 'unavailable':
            this.view = new CampaignUnavailable({model:this.campaign});
            this.view.render();
            break;
        case 'pending':
            this.view = new CampaignPending({model:this.campaign});
            this.view.render();
            break;
        default:
            // Prepare tabs for current route
            this.prepareTabs();
            // Set the tabs to the controller view
            // Render the view
            this.view = new TabsComponent();
            this.view.tabs = this.tabs;
            this.view.render();
            // Init child controller
            this.initChildControler();
    }

    return this;
    
};
