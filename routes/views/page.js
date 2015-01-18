var keystone = require('keystone'),
        async = require('async');

exports = module.exports = function(req, res) {

        var view = new keystone.View(req, res),
                locals = res.locals;

        // Init locals
        locals.section = 'page';
        locals.filters = {
                pageKey: req.params.key
        };
        locals.data = {
                pages: [],
        };
	// Load the posts
        view.on('init', function(next) {

                var q = keystone.list('Page').paginate({
                                page: req.query.page || 1,
                                perPage: 10,
                                maxPages: 10
                        })
                        .where('state', 'published')
                        .sort('order');

                if (locals.filters.pageKey) {
                        q.where('key').in([locals.filters.pageKey]);
                }

                q.populate('gallery').exec(function(err, results) {
                        locals.data.pages = results;
                        next(err);
                });

        });

        // Render the view
        view.render('page');
};
