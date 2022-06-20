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
		conversion.for('upcast').elementToAttribute({
			view: emptySpanMatcher,
			model: {
				key: 'emptySpan',
				value: true
			},
			converterPriority: 'low'
		});

		// conversion.for('upcast').add(wrapTextNodeBySpanDispatcher);

		// downcast(model-to-view) conversion
		conversion.for('downcast').attributeToElement({
			model: 'emptySpan',
			view: createViewEmptySpanElement,
			converterPriority: 'high'
		});

		document.registerPostFixer(writer => textInsertPostFixer(writer, document));
		document.registerPostFixer(writer => attributeChangePostFixer(writer, document));
	}
}


// function wrapTextNodeBySpanDispatcher(dispatcher) {
// 	dispatcher.on('text', ( evt, data, conversionApi ) => {
// 		if (data.viewItem.is('text') && data.viewItem.parent.name === 'p') {
// 			console.log("wrapTextNodeBySpanDispatcher:data", data);
// 		}
// 	},{ priority: 'low' })
// }

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

			} else if (isTextLikeNode(nodeBefore)) {
				insertedText = nodeBefore;
			
			} else if (isTextLikeNode(nodeAfter)) {
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


function attributeChangePostFixer(writer, document) {
	const changes = document.differ.getChanges();
	let wasChanged = false;

	for (const entry of changes) {

		if (entry.type === 'attribute' && entry.attributeKey !== 'emptySpan') {
			// attribute on
			// some styles have value which is not boolean (e.g. fontColor)
			if (entry.attributeNewValue && entry.attributeOldValue === null) {
				
				const nodeBefore = entry.range.start.nodeBefore;
				const nodeAfter = entry.range.end.nodeAfter;

				// when a part of text is set style, others should have emptySpan
				// so check before/after node to have style then if not
				// set emptySpan attrtibute
				// e.g.
				// red
				// => r<strong>e</strong>d
				// => <span>r</span><strong>e</strong><span>d</span>
				if (isTextLikeNode(nodeBefore) && hasNoAttributes(nodeBefore)) {
					writer.setAttribute('emptySpan', true, nodeBefore);
					wasChanged = true;
				}

				if (isTextLikeNode(nodeAfter) && hasNoAttributes(nodeAfter)) {
					writer.setAttribute('emptySpan', true, nodeAfter);
					wasChanged = true;
				}
				
				// emptySpan is set only when the text has no style
				// so when it already has, remove the attribute
				for (const node of entry.range.getItems()) {
					if (
						isTextLikeNode(node) &&
						hasStyleAttribute(node) &&
						hasEmptySpanAttribute(node)
					) {
						writer.removeAttribute('emptySpan', node);
						wasChanged = true;
					}
				}
			}

			// attribute off
			// when off attribute, if the text doesn't have any styles,
			// it should have emptySpan
			if (entry.attributeNewValue === null && entry.attributeOldValue) {
				for (const node of entry.range.getItems()) {
					if (
						isTextLikeNode(node) &&
						!hasStyleAttribute(node) &&
						!hasEmptySpanAttribute(node)
					) {
						writer.setAttribute('emptySpan', true, node);
						wasChanged = true;
					}
				}
			}
		}
	}
	return wasChanged;
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

function isTextLikeNode(node) {
	return node && (node.is('text') || node.is('textProxy'));
}

function hasEmptySpanAttribute(node) {
	return node.hasAttribute("emptySpan")
}

function hasStyleAttribute(node) {
	for (const attr of node.getAttributeKeys()) {
		if (attr !== 'emptySpan' && attr !== 'dataLref') {
			return true;
		}
	}
	return false;
}

function hasNoAttributes(node) {
	return Array.from(node.getAttributeKeys()).length === 0
}