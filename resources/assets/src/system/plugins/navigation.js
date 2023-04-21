/**
 * Plugin Name : testimonials.JS
 * Version     : 2.1.1
 * Author      : ZeroWP Team
 * Author URL  : http://zerowp.com/
 * Plugin URL  : http://navigation.zerowp.com/
 * License     : MIT
 */

const jQuery = require('jquery');

(function ($) {
    'use strict';

    $.fn.navigation = function (options) {
        // Current testimonials instance
        let that = this;

        // Select all testimonialss that match a CSS selector
        if (this.length > 1) {
            this.each(function () {
                $(this).navigation(options);
            });
            return this;
        }

        let utils = {};

        let init = function () {
            that.create();
        };

        this.create = function () {
            this.active = false;

            this.toggleBTN = $(this).find('.toggle-wrap');
            this.navContainer = $(this).find('.header-navbar-links');

            this.toggleBTN.click(function () {
                that.toggleNavigation();
            });
        };

        this.toggleNavigation = function () {
            this.active = !this.active;

            this.toggleBTN.toggleClass('active');
            this.navContainer.toggleClass('visible');

            this.toggleScroll();
        };

        this.toggleScroll = function () {
            $('body').toggleClass('modal-open');
        };

        //"Constructor" init
        init();

        return this;
    };
})(jQuery);
