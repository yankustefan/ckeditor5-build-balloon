/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class wrapTextInSpan extends Plugin {
	init() {
		
		const editor = this.editor;
		const model = editor.model;
		const conversion = editor.conversion;
		const document = model.document;

		model.schema.extend( '$text', { allowAttributes: 'emptySpan' } );

		// upcast(view-to-model) conversion
		conversion.for( 'upcast' ).elementToAttribute({
			view: emptySpanMatcher,
			model: {
				key: 'emptySpan',
				value: true
			},
			converterPriority: 'low'
		} );

		// downcast(model-to-view) conversion
		conversion.for( 'downcast' ).attributeToElement({
			model: 'emptySpan',
			view: createViewEmptySpanElement,
			converterPriority: 'high'
		});

		document.registerPostFixer(writer => newTextInsertPostFixer(writer, document));
		// document.registerPostFixer( writer => {

		// 	for (const entry of document.differ.getChanges()) {
		// 		console.log("change:entry", entry);
		// 		console.log("insert:entry.position.nodeAfter", entry.position.nodeAfter);
				
		// 		if (entry.type === "insert" && entry.name === "$text" && entry.position.textNode) {
		// 			console.log("insert:entry", entry);
		// 			console.log("insert:entry.position", entry.position);
		// 			console.log("insert:entry.position.textNode", entry.position.textNode);

		// 			// console.log("entry.position.textNode.getAttributes()");
					
		// 			if (Array.from(entry.position.textNode.getAttributeKeys()).length === 0) {
		// 				writer.setAttribute('emptySpan', true, entry.position.textNode);
		// 			}
		// 			// return true;
		// 		}

		// 		if (entry.type === "attribute") {
		// 			console.log("attribute:entry", entry);
		// 			console.log("attribute:entry.position", entry.position);
		// 			console.log("entry.range.start.nodeBefore", entry.range.start.nodeBefore);
		// 			console.log("entry.range.start.nodeAfter", entry.range.start.nodeAfter);
					
		// 			if (
		// 				entry.range.start.nodeBefore &&
		// 				entry.range.start.nodeBefore.is('text') &&
		// 				Array.from(entry.range.start.nodeBefore.getAttributeKeys()).length === 0
		// 			) {
		// 				writer.setAttribute('emptySpan', true, entry.range.start.nodeBefore);
		// 			}
					
		// 			if (
		// 				entry.range.end.nodeAfter &&
		// 				entry.range.end.nodeAfter.is('text') &&
		// 				Array.from(entry.range.end.nodeAfter.getAttributeKeys()).length === 0
		// 			) {
		// 				writer.setAttribute('emptySpan', true, entry.range.end.nodeAfter);
		// 			}
		// 		}
		// 	}
		// });
		
		// Handle empty spans


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

function createViewEmptySpanElement(modelAttributeValue, { writer }) {
	if ( !modelAttributeValue ) return;
	const options = {
		priority: 11
	};
	return writer.createAttributeElement('span', {}, options);
}

function emptySpanMatcher(element) {
	if (element && element.name === 'span' && !element.getStyle()) {
		return { name: true }
	}
	return null;
}

function newTextInsertPostFixer(writer, document) {
	const changes = document.differ.getChanges();
	let wasChanged = false;
	
	for (const entry of changes) {
		if (entry.type === "insert" && entry.name === "$text") {
			
			console.log("entry.position.nodeBefore", entry.position.nodeBefore);
			console.log("entry.position.nodeAfter", entry.position.nodeAfter);
			console.log("entry.position.textNode", entry.position.textNode);
			
			const position = entry.position;
			let insertedText;

			if (position.textNode) {
				insertedText = position.textNode;

			} else if (position.nodeBefore && position.nodeBefore.is("text")) {
				insertedText = position.nodeBefore;
			
			} else if (position.nodeAfter && position.nodeAfter.is("text")) {
				insertedText = position.nodeAfter;
			}
			
			if (insertedText && Array.from(insertedText.getAttributeKeys()).length === 0) {
				writer.setAttribute('emptySpan', true, insertedText);
				wasChanged = true;
			}
		}
	}
	return wasChanged;
}

function isNotEmpyAttribute() {}
function checkAndFix( textNode, writer ) {}