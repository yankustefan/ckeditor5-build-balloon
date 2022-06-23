/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class wrapTextInSpan extends Plugin {
	init() {
		const editor = this.editor;
		const conversion = editor.conversion;

		/*
		const schema = editor.model.schema;
		schema.extend( '$text', { allowAttributes: [ 'emptySpan' ] } );
		// Handle empty spans
		//  Add an upcast (view-to-model) converter for empty span.
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: false,
				attributes: false
			},
			model: {
				key: 'emptySpan',
				value: true
			},
			converterPriority: 'high'
		} );
		// Add an downcast (model-to-view) converter for empty span.
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'emptySpan',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {},
					{ priority: 12 } );
			},
			converterPriority: 'high'
		} );
		 */

		// Add low-level converter only for data taken out of the editor.
		// It will wrap text into a span.
		conversion.for( 'dataDowncast' ).add( dispatcher => {
			dispatcher.on( 'insert:$text', ( evt, data, conversionApi ) => {
				// If text has any attributes stop processing as these attributes
				// will be converted to elements wrapping text in view.
				if (!data.item.getAttributes().next().done) {
					return;
				}
				if (!conversionApi.consumable.consume( data.item, 'insert' )) {
					return;
				}
				const viewWriter = conversionApi.writer;
				// create position in view based on range
				const viewPosition = conversionApi.mapper.toViewPosition( data.range.start );
				// create text in view based on input data
				const viewText = viewWriter.createText( data.item.data );
				// create wrapper span
				const span = viewWriter.createAttributeElement( 'span' );
				// insert view text at the specified view postion
				viewWriter.insert( viewWriter.createPositionAt( viewPosition.parent, 'end' ), viewText );
				// wrap view text in span
				viewWriter.wrap( viewWriter.createRangeOn( viewText ), span );
			}, { priority: 'low' } );
		} );
	}
}
