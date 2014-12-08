var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * ArtCategory Model
 * ==================
 */

var ArtCategory = new keystone.List('ArtCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

ArtCategory.add({
	name: { type: String, required: true },
        state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
        sequence: { type: Types.Number, required: true, default:999 }
});

ArtCategory.relationship({ ref: 'Art', path: 'categories' });

ArtCategory.register();
