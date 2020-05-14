import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
export default class wrapTextInSpan extends Plugin {
	init() {
		const editor = this.editor;
		// const model = editor.model;
		const conversion = editor.conversion;

		// Add low-level converter only for data taken out of the editor.
		// It will wrap text into a span.
		conversion.for( 'dataDowncast' ).add( dispatcher => {
			dispatcher.on( 'insert:$text', ( evt, data, conversionApi ) => {
				// const parent = data.range.start.parent;

				// If text has any attributes stop processing as these attributes
				// will be converted to elements wrapping text in view.
				if ( !data.item.getAttributes().next().done ) {
					return;
				}

				if ( !conversionApi.consumable.consume( data.item, 'insert' ) ) {
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
