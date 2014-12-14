var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
	map: { name: 'key' },
	autokey: { path: 'slug', from: 'key', unique: true }
});

Page.add({
	key: { type: String, required: true },
	title: { type: String, required: false },
	link: { type: String, required: false},
	order: { type: Number,required: true, default: 99},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	images: { type: Types.CloudinaryImages },
	content: {type: Types.Html, wysiwyg: true, height: 600 },
});


Page.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Page.register();
