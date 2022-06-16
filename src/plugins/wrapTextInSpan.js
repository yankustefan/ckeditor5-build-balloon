/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class wrapTextInSpan extends Plugin {
	init() {
		const editor = this.editor;
		const conversion = editor.conversion;
		const { document } = editor.model;

		const schema = editor.model.schema;
		schema.extend( '$text', { allowAttributes: [ 'emptySpan' ] } );

		document.registerPostFixer( writer => {

			for (const entry of document.differ.getChanges()) {
				console.log("change:entry", entry);
				
				if (entry.type === "insert" && entry.name === "$text" && entry.position.textNode) {
					console.log("insert:entry", entry);
					console.log("insert:entry.position", entry.position);
					console.log("insert:entry.position.textNode", entry.position.textNode);

					// console.log("entry.position.textNode.getAttributes()");
					
					if (Array.from(entry.position.textNode.getAttributeKeys()).length === 0) {
						writer.setAttribute('emptySpan', true, entry.position.textNode);
					}
					// return true;
				}

				if (entry.type === "attribute") {
					console.log("attribute:entry", entry);
					console.log("attribute:entry.position", entry.position);
					console.log("entry.range.start.nodeBefore", entry.range.start.nodeBefore);
					console.log("entry.range.start.nodeAfter", entry.range.start.nodeAfter);
					
					if (
						entry.range.start.nodeBefore &&
						entry.range.start.nodeBefore.is('text') &&
						Array.from(entry.range.start.nodeBefore.getAttributeKeys()).length === 0
					) {
						writer.setAttribute('emptySpan', true, entry.range.start.nodeBefore);
					}
					
					if (
						entry.range.end.nodeAfter &&
						entry.range.end.nodeAfter.is('text') &&
						Array.from(entry.range.end.nodeAfter.getAttributeKeys()).length === 0
					) {
						writer.setAttribute('emptySpan', true, entry.range.end.nodeAfter);
					}
				}
			}
		});
		
		// Handle empty spans
		//  Add an upcast (view-to-model) converter for empty span.
		conversion.for( 'upcast' ).elementToAttribute( {
			view: element => {
				if (element.name === 'span' && !element.getStyle()) {
					return { name: true }
				}
				return null
			},
			model: {
				key: 'emptySpan',
				value: true
			},
			// converterPriority: 'low'
		} );

		// Add an downcast (model-to-view) converter for empty span.
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'emptySpan',
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'span', {}, { priority: 11 });
			},
			converterPriority: 'high'
		} );

		// Add low-level converter only for data taken out of the editor.
		// It will wrap text into a span.
		// conversion.for( 'dataDowncast' ).add( dispatcher => {
		// 	dispatcher.on( 'insert:$text', ( evt, data, conversionApi ) => {
		// 		console.log(data);
		// 		// If text has any attributes stop processing as these attributes
		// 		// will be converted to elements wrapping text in view.
		// 		if (!data.item.getAttributes().next().done) {
		// 			return;
		// 		}
		// 		if (!conversionApi.consumable.consume( data.item, 'insert' )) {
		// 			return;
		// 		}
		// 		const viewWriter = conversionApi.writer;
		// 		// create position in view based on range
		// 		const viewPosition = conversionApi.mapper.toViewPosition( data.range.start );
		// 		// create text in view based on input data
		// 		const viewText = viewWriter.createText( data.item.data );
		// 		// create wrapper span
		// 		const span = viewWriter.createAttributeElement( 'span' );
		// 		// insert view text at the specified view postion
		// 		viewWriter.insert( viewWriter.createPositionAt( viewPosition.parent, 'end' ), viewText );
		// 		// wrap view text in span
		// 		viewWriter.wrap( viewWriter.createRangeOn( viewText ), span );
		// 	}, { priority: 'low' } );
		// } );
	}
}
