var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Art Model
 * ==========
 */

var Art = new keystone.List('Art', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Art.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
        sold: {type: Boolean, default: false},
        price: {type: String, required: false},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'ArtCategory', many: true }
});

Art.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Art.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Art.register();
