let expect = require('chai').expect;
let drugImageSearch = require('../lib/index');

describe('Search RXImage by Drug Name', function indexTest() {

    context('input missing - ', function() {
        it('should return a failure', async function() {
            let result;
            await drugImageSearch
                .rxImageSearchByName(null)
                .then(response => (result = response))
                .catch(reason => (result = reason));

            // Assert
            expect(result.error).to.contain("Drug name must be provided");
        });
    });

    context('input ok - ', function() {
        let name = 'Albuterol';

        it('should return a successful search', async function() {
            this.timeout(100000);
            let result;
            await drugImageSearch
                .rxImageSearchByName(name)
                .then(response => (result = response))
                .catch(reason => (result = reason));

            // Assert
            expect(result.data).to.not.eq(null);
        });
    });
});
