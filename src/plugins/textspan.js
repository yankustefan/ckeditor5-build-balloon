/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


const PRIORITY = 11;
const TEXT_SPAN = 'textSpan';

export default class TextSpanEditing extends Plugin {
	init() {
		const editor = this.editor;
		const model = editor.model;
		const conversion = editor.conversion;
		const document = model.document;

		model.schema.extend('$text', { allowAttributes: TEXT_SPAN });

		// upcast(view-to-model) conversion
		conversion.for('upcast').elementToAttribute({
			view: textSpanMatcher,
			model: {
				key: TEXT_SPAN,
				value: true
			},
			converterPriority: 'low'
		});

		// downcast(model-to-view) conversion
		conversion.for('downcast').attributeToElement({
			model: TEXT_SPAN,
			view: (modelAttributeValue, conversionApi) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement(
					'span',
					{},
					{ priority: PRIORITY }
				);
			},
			converterPriority: 'high'
		});

		document.registerPostFixer(writer => textInsertPostFixer(writer, document));
		document.registerPostFixer(writer => attributeChangePostFixer(writer, document));
	}
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

			} else if (isTextLikeNode(nodeBefore)) {
				insertedText = nodeBefore;
			
			} else if (isTextLikeNode(nodeAfter)) {
				insertedText = nodeAfter;
			}

			if (insertedText && hasNoAttributes(insertedText)) {
				writer.setAttribute(TEXT_SPAN, true, insertedText);
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

		if (entry.type === 'attribute' && entry.attributeKey !== TEXT_SPAN) {
			// attribute on
			// some styles have value which is not boolean (e.g. fontColor)
			if (entry.attributeNewValue && entry.attributeOldValue === null) {
				
				const nodeBefore = entry.range.start.nodeBefore;
				const nodeAfter = entry.range.end.nodeAfter;

				// when a part of text is set style, others should have emptySpan
				// so check before/after node to have style then if not
				// set textSpan attrtibute
				// e.g.
				// red
				// => r<strong>e</strong>d
				// => <span>r</span><strong>e</strong><span>d</span>
				if (isTextLikeNode(nodeBefore) && hasNoAttributes(nodeBefore)) {
					writer.setAttribute(TEXT_SPAN, true, nodeBefore);
					wasChanged = true;
				}

				if (isTextLikeNode(nodeAfter) && hasNoAttributes(nodeAfter)) {
					writer.setAttribute(TEXT_SPAN, true, nodeAfter);
					wasChanged = true;
				}
				
				// textSpan is set only when the text has no style
				// so when it already has, remove the attribute
				for (const node of entry.range.getItems()) {
					if (
						isTextLikeNode(node) &&
						hasStyleAttribute(node) &&
						hasTextSpanAttribute(node)
					) {
						writer.removeAttribute(TEXT_SPAN, node);
						wasChanged = true;
					}
				}
			}

			// attribute off
			// when off attribute, if the text doesn't have any styles,
			// it should have textSpan
			if (entry.attributeNewValue === null && entry.attributeOldValue) {

				const nodeBefore = entry.range.start.nodeBefore;
				const nodeAfter = entry.range.end.nodeAfter;

				if (isTextLikeNode(nodeBefore) && hasNoAttributes(nodeBefore)) {
					writer.setAttribute(TEXT_SPAN, true, nodeBefore);
					wasChanged = true;
				}

				if (isTextLikeNode(nodeAfter) && hasNoAttributes(nodeAfter)) {
					writer.setAttribute(TEXT_SPAN, true, nodeAfter);
					wasChanged = true;
				}

				for (const node of entry.range.getItems()) {
					if (
						isTextLikeNode(node) &&
						!hasStyleAttribute(node) &&
						!hasTextSpanAttribute(node)
					) {
						writer.setAttribute(TEXT_SPAN, true, node);
						wasChanged = true;
					}
				}
			}
		}
	}
	return wasChanged;
}

function textSpanMatcher(element) {
	if (element && element.name === 'span' && !element.getStyle()) {
		return { name: true }
	}
	return null;
}

function isTextLikeNode(node) {
	return node && (node.is('text') || node.is('textProxy'));
}

function hasTextSpanAttribute(node) {
	return node.hasAttribute(TEXT_SPAN)
}

function hasStyleAttribute(node) {
	for (const attr of node.getAttributeKeys()) {
		if (attr !== TEXT_SPAN && attr !== 'dataLref') {
			return true;
		}
	}
	return false;
}

function hasNoAttributes(node) {
	return Array.from(node.getAttributeKeys()).length === 0
}

export class TextSpan extends Plugin {
	static get requires() {
		return [TextSpanEditing];
	}

	static get pluginName() {
		return 'TextSpan';
	}
}

