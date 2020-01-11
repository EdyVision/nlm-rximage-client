'use strict';

import apiUtil from './apiutil';

const nlmRxImageBaseUrl = 'http://rximage.nlm.nih.gov/api/rximage/1';

/**
 * NLM RxImage returns images per manufacturer of a drug given a name.
 * A name string is required.
 *
 * @param {String} name Drug Name
 * @returns {Promise} NLM RxImages
 */
module.exports.rxImageSearchByName = function(name) {
    return new Promise(async (resolve, reject) => {
        let result = {
            success: false,
            data: {}
        };

        // Only process the request if name exists
        if (name) {
            let nameArg = name ? 'name=' + name : '';

            // Format Request URL with name parameter
            let identifierSearchUrl = [nlmRxImageBaseUrl, '/rxbase?', nameArg].join('');

            await apiUtil
                .submitRequest(identifierSearchUrl)
                .then(response => {
                    if (response.statusCode == 200) {
                        result.data = remapImageResults(
                            response.data.nlmRxImages
                        );
                        result.success = true;
                    }
                })
                .catch(error => {
                    reject({
                        error: error
                    });
                });

            resolve(result);
        } else {
            reject({
                error: 'Drug name must be provided.'
            })
        }
    });
};

/**
 * NLM RxImage returns images per manufacturer of a drug given an NDC.
 * An NDC string is required.
 *
 * @param {String} ndc Drug NDC
 * @returns {Promise} NLM RxImages
 */
module.exports.rxImageSearchByNdc = function(ndc) {
    return new Promise(async (resolve, reject) => {
        let result = {
            success: false,
            data: {}
        };

        // Only process the request if ndc exists
        if (ndc) {
            let ndcArg = ndc ? 'ndc=' + ndc : '';

            // Format Request URL with NDC parameter
            let identifierSearchUrl = [nlmRxImageBaseUrl, '/rxbase?', ndcArg].join('');

            await apiUtil
                .submitRequest(identifierSearchUrl)
                .then(response => {
                    if (response.statusCode == 200) {
                        result.data = remapImageResults(
                            response.data.nlmRxImages
                        );
                        result.success = true;
                    }
                })
                .catch(error => {
                    reject({
                        error: error
                    });
                });

            resolve(result);
        } else {
            reject({
                error: 'Drug ndc must be provided.'
            })
        }
    });
};