/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


export default class wrapTextInSpan extends Plugin {
	init() {
		
		const editor = this.editor;
		const model = editor.model;
		const conversion = editor.conversion;
		const document = model.document;

		model.schema.extend( '$text', { allowAttributes: 'emptySpan' } );

		// model.document.on('change:data', (eventInfo, batch) => {
		// 	console.log(eventInfo);
		// 	console.log(batch);
		// } );

		// upcast(view-to-model) conversion
		conversion.for('upcast').elementToAttribute({
			view: emptySpanMatcher,
			model: {
				key: 'emptySpan',
				value: true
			},
			converterPriority: 'low'
		} );

		// downcast(model-to-view) conversion
		conversion.for('downcast').attributeToElement({
			model: 'emptySpan',
			view: createViewEmptySpanElement,
			converterPriority: 'high'
		});

		document.registerPostFixer(writer => textInsertPostFixer(writer, document));
		document.registerPostFixer(writer => attributeChangePostFixer(writer, document));
		// document.registerPostFixer(writer => attributeOnPostFixer(writer, document));
		// document.registerPostFixer(writer => attributeOffPostFixer(writer, document));
		


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

function textInsertPostFixer(writer, document) {
	const changes = document.differ.getChanges();
	let wasChanged = false;
	
	for (const entry of changes) {
		if (
			entry.name === "$text" &&
			(entry.type === "insert" || entry.type === "remove")
		) {

			const { textNode, nodeBefore, nodeAfter } = entry.position;
			let insertedText;

			if (textNode) {
				insertedText = textNode;

			} else if (nodeBefore && nodeBefore.is("text")) {
				insertedText = nodeBefore;
			
			} else if (nodeAfter && nodeAfter.is("text")) {
				insertedText = nodeAfter;
			}

			if (insertedText && hasNoAttributes(insertedText)) {
				writer.setAttribute('emptySpan', true, insertedText);
				wasChanged = true;
			}
		}
	}
	return wasChanged;
}

// function attributeChangePostFixer(writer, document) {
// 	const changes = document.differ.getChanges();
// 	let wasChanged = false;

// 	for (const entry of changes) {
// 		if (entry.type === 'attribute' && entry.attributeKey !== 'emptySpan') {

// 			// console.log("change:entry", entry);

// 			// attribute on
// 			if (entry.attributeNewValue === true && entry.attributeOldValue === null) {
// 				console.log('on:entry', entry);
				
// 				const nodeBefore = entry.range.start.nodeBefore;
// 				const nodeAfter = entry.range.end.nodeAfter;

// 				if (nodeBefore && nodeBefore.is("text") && hasNoAttributes(nodeBefore)) {
// 					writer.setAttribute('emptySpan', true, nodeBefore);
// 					wasChanged = true;
// 				}

// 				if (nodeAfter && nodeAfter.is("text") && hasNoAttributes(nodeAfter)) {
// 					writer.setAttribute('emptySpan', true, nodeAfter);
// 					wasChanged = true;
// 				}
				
// 				for (const node of entry.range.getItems()) {
// 					if ((node.is('text') || node.is('textProxy'))) {
						
// 						if (hasStyleAttribute(node) && hasEmptySpanAttribute(node)) {
// 							writer.removeAttribute('emptySpan', node);
// 							wasChanged = true;
// 						}
						
// 						if (!hasStyleAttribute(node) && !hasEmptySpanAttribute(node)) {
// 							writer.setAttribute('emptySpan', true, node);
// 							wasChanged = true;
// 						}
						
// 						// console.log("hasEmptySpanAttribute", hasEmptySpanAttribute(node));
// 						// console.log("hasStyleAttribute", hasStyleAttribute(node));
// 						// for (const attr of node.getAttributeKeys()) {
// 						// 	console.log(attr);
// 						// }
// 						// writer.setAttribute('emptySpan', true, node);
// 					}
// 				}
// 			}
			
// 			// attribute off
// 			if (entry.attributeNewValue === null && entry.attributeOldValue === true) {
// 				console.log('off:entry', entry);
// 				for (const node of entry.range.getItems()) {
// 					if ((node.is('text') || node.is('textProxy'))) {
// 						if (hasStyleAttribute(node) && hasEmptySpanAttribute(node)) {
// 							writer.removeAttribute('emptySpan', node);
// 							wasChanged = true;
// 						}
// 						if (!hasStyleAttribute(node) && !hasEmptySpanAttribute(node)) {
// 							writer.setAttribute('emptySpan', true, node);
// 							wasChanged = true;
// 						}
// 					}
// 				}
				
// 			}
// 		}
// 	}

// 	return wasChanged;
// }

function attributeChangePostFixer(writer, document) {
	const changes = document.differ.getChanges();

	for (const entry of changes) {

		if (entry.type === 'attribute' && entry.attributeKey !== 'emptySpan') {

			// console.log("change:entry", entry);

			// attribute on
			if (entry.attributeNewValue === true && entry.attributeOldValue === null) {
				console.log('on:entry', entry);
				
				const nodeBefore = entry.range.start.nodeBefore;
				const nodeAfter = entry.range.end.nodeAfter;

				if (nodeBefore && nodeBefore.is("text") && hasNoAttributes(nodeBefore)) {
					writer.setAttribute('emptySpan', true, nodeBefore);
					return true;
				}

				if (nodeAfter && nodeAfter.is("text") && hasNoAttributes(nodeAfter)) {
					writer.setAttribute('emptySpan', true, nodeAfter);
					return true;
				}
				
				for (const node of entry.range.getItems()) {
					if ((node.is('text') || node.is('textProxy'))) {
						
						if (hasStyleAttribute(node) && hasEmptySpanAttribute(node)) {
							writer.removeAttribute('emptySpan', node);
							return true;
						}
						
						if (!hasStyleAttribute(node) && !hasEmptySpanAttribute(node)) {
							writer.setAttribute('emptySpan', true, node);
							return true;
						}
					}
				}
			}
			
			// attribute off
			if (entry.attributeNewValue === null && entry.attributeOldValue === true) {
				console.log('off:entry', entry);
				for (const node of entry.range.getItems()) {
					if ((node.is('text') || node.is('textProxy'))) {
						if (hasStyleAttribute(node) && hasEmptySpanAttribute(node)) {
							writer.removeAttribute('emptySpan', node);
							return true;
						}
						if (!hasStyleAttribute(node) && !hasEmptySpanAttribute(node)) {
							writer.setAttribute('emptySpan', true, node);
							return true;
						}
					}
				}
				
			}
		}
	}

	return false;
}

// function attributeOnPostFixer(writer, document) {
// 	const changes = document.differ.getChanges();
// 	for (const entry of changes) {
// 		if (entry.type === 'attribute' && entry.attributeKey !== 'emptySpan') {
// 			// attribute on
// 			if (entry.attributeNewValue === true && entry.attributeOldValue === null) {
// 				console.log('on:entry', entry);
				
// 				const nodeBefore = entry.range.start.nodeBefore;
// 				const nodeAfter = entry.range.end.nodeAfter;

// 				if (nodeBefore && nodeBefore.is("text") && hasNoAttributes(nodeBefore)) {
// 					writer.setAttribute('emptySpan', true, nodeBefore);
// 					return true;
// 				}

// 				if (nodeAfter && nodeAfter.is("text") && hasNoAttributes(nodeAfter)) {
// 					writer.setAttribute('emptySpan', true, nodeAfter);
// 					return true;
// 				}
				
// 				for (const node of entry.range.getItems()) {
// 					if ((node.is('text') || node.is('textProxy'))) {
						
// 						if (hasStyleAttribute(node) && hasEmptySpanAttribute(node)) {
// 							writer.removeAttribute('emptySpan', node);
// 							return true;
// 						}
						
// 						if (!hasStyleAttribute(node) && !hasEmptySpanAttribute(node)) {
// 							writer.setAttribute('emptySpan', true, node);
// 							return true;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}

// 	return false;
// }

// function attributeOffPostFixer(writer, document) {
// 	const changes = document.differ.getChanges();

// 	for (const entry of changes) {
// 		if (entry.type === 'attribute' && entry.attributeKey !== 'emptySpan') {
// 			console.log('off:entry', entry);
// 			if (entry.attributeNewValue === null && entry.attributeOldValue === true) {
// 				for (const node of entry.range.getItems()) {
// 					if ((node.is('text') || node.is('textProxy'))) {
// 						if (hasStyleAttribute(node) && hasEmptySpanAttribute(node)) {
// 							writer.removeAttribute('emptySpan', node);
// 							return true;
// 						}
// 						if (!hasStyleAttribute(node) && !hasEmptySpanAttribute(node)) {
// 							writer.setAttribute('emptySpan', true, node);
// 							return true;
// 						}
// 					}
// 				}
				
// 			}
// 		}
// 	}

// 	return false;
// }


function hasEmptySpanAttribute(textNode) {
	return textNode.hasAttribute("emptySpan")
}

function hasStyleAttribute(textNode) {
	for (const attr of textNode.getAttributeKeys()) {
		if (attr !== 'emptySpan') {
			return true;
		}
	}
	return false;
}

function hasNoAttributes(textNode) {
	return Array.from(textNode.getAttributeKeys()).length === 0
}