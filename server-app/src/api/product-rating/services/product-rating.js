'use strict';

/**
 * product-rating service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-rating.product-rating');
