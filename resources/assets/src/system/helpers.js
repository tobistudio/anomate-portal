/*
 *
 *   Helpers
 *
 *   All the methods that are for general purposes goes here.
 *   Acess globaly with windows.$app.methodName();
 *
 */
const Backbone  = require('backbone');
const _         = require('underscore');
const moment    = require('moment');

// Require plugins
// Add the ability to pause play jquery animations
require('@/system/plugins/accordion.js');
require('@/system/plugins/navigation.js');
require('@/system/plugins/modal.js');
require('@/system/plugins/tooltip.js');
require('@/system/plugins/popover.js');
require('@/system/plugins/rangeslider.js');
require('@/system/plugins/dropdown.js');
require('@/system/plugins/nice-select.js');
require('@/system/plugins/daterangepicker.js');

require('datatables.net-dt');
require('datatables.net-fixedheader-dt');
require('@/system/plugins/dataTables.bootstrap.js');

module.exports = {
    extractDomain : function(url) {
        url = url.replace(/(^\w+:|^)\/\//, '');
        url = url.toLowerCase();
        return url;
    },
    defineURL: function (path) {
        return path;
    },
    dateFormat: function (DTime) {
        DTime = moment(DTime).endOf('day').fromNow();
        return DTime;
    },
    // prettier-ignore
    productsName: function (model) {
        return (
            '<div class="table-icon">' +
                '<img src="'+model.get('icon')+'">' +
            '</div>' +
            model.get('name')
        );
    },
    // prettier-ignore
    campaignsName: function (model) {
        return (
            '<div class="table-icon">' +
                '<img src="'+model.get('icon')+'">' +
            '</div>' +
            '<a href="'+this.defineURL('campaigns/single?id=' + model.get('id'))+'">' +
                model.get('campaign_name')+
            '</a>'
        );
    },
    cmpStatus: function (status) {
        if (status == 'active') {
            status = '<div class="alert alert-success"> Active </div>';
        } else if (status == 'inactive') {
            status = '<div class="alert alert-danger"> Inactive </div>';
        } else if (status == 'pending') {
            status = '<div class="alert alert-warning"> Pending </div>';
        }
        return status;
    },
    calcPercentage: function (part, whole) {
        let percentage = (part * 100) / whole;
        if (isNaN(percentage)) {
            percentage = 0;
        }
        percentage = percentage.toFixed(2);
        return part + ' / ' + percentage + '%';
    },
    /*
     * Get query parameters
     */
    extractParams: function (url) {
        let request = {};
        if (url) {
            let pairs = url.substring(url.indexOf('?') + 1).split('&');
            for (let i = 0; i < pairs.length; i++) {
                if (!pairs[i]) continue;
                let pair = pairs[i].split('=');
                request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return request;
        }
    },
    checkCardType: function(numbers) {
        
        let validCardType = false;
        
        // Card validation regex
        let cardPatterns = {
            mastercard:/^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
            amex:/^3[47][0-9]{13}$/,
            visa:/^4[0-9]{12}(?:[0-9]{3})?$/,
            discovery:/^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
            maestro:/^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/,
            jcb:/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
            dinnersclub:/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/
        };
        
        _.each(cardPatterns,function(regex,key){
            if (regex.test(numbers)) {
                numbers = numbers.toString();
                validCardType = {
                    type:key,
                    ending:numbers.slice(-4)
                };
            }
        },this);
        
        return validCardType;
        
    },
    randomString: function (length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    scrollTo: function (offset) {
        let headerHeight = Backbone.$('.shop-header').height();
        Backbone.$([document.documentElement, document.body]).animate(
            {
                scrollTop: offset - headerHeight,
            },
            600
        );
    },
    defineOrderStatus: function (status) {
        status = {
            type: status,
            className: status,
        };
        return status;
    },
    padTo2Digits: function (num) {
        return String(num).padStart(2, '0');
    },
    /*
     * Navigation handler
     */
    navigate: function (path, event = true) {
        if (path == 404) {
            path = '/pages/404';
        }
        Backbone.history.navigate(path, event);
    },
    /*
     * Generate an aniamted placeholder to identify where the content will be shown
     */
    inlineLoadingAnimation: function () {
        return ''+
        '<div class="widget-preloading">'+
        	'<div></div>'+
        	'<div></div>'+
        	'<div></div>'+
        	'<div></div>'+
        '</div>';
    },
    throwError: function (msg) {
        throw msg;
    },
    progressLoader: function (action) {
        let ProgresBar = Backbone.$('.progress-loader');
        let LockScreen = Backbone.$('.progress-screen');

        let Timer = 600;

        if (action == 'start') {
            ProgresBar.addClass('animation-start');
            LockScreen.addClass('show');
        } else if (action == 'end') {
            // If the request is completed to fast
            // Delay the animation
            LockScreen.removeClass('show');
            setTimeout(function () {
                ProgresBar.addClass('animation-complete');
                // Remove animation classes after the animation is complete
                setTimeout(function () {
                    ProgresBar.removeClass('animation-start');
                    ProgresBar.removeClass('animation-complete');
                }, Timer);
            }, Timer);
        }
    },
};
