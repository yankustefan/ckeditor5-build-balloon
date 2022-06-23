import { Plugin } from 'ckeditor5/src/core';


const PRIORITY = 11;
const LINE_HEIGHT = 'lineHeight';

class LineHeightEditing extends Plugin {
	static get pluginName() {
		return 'LineHeightEditing';
	}

	init() {
		const editor = this.editor;

		// Allow italic attribute on text nodes.
		editor.model.schema.extend('$text', { allowAttributes: LINE_HEIGHT });
		editor.model.schema.setAttributeProperties(LINE_HEIGHT, {
			isFormatting: true,
			copyOnEnter: true
		});

		editor.conversion.for('upcast').elementToAttribute({
			view: {
				name: 'span',
				styles: { 'line-height': /[\s\S]+/ }
			},
			model: {
				key: LINE_HEIGHT,
				value: viewElement => {
					return viewElement.getStyle('line-height');
				}
			},
			converterPriority: 'high'
		});

		editor.conversion.for('downcast').attributeToElement({
			model: LINE_HEIGHT,
			view: (modelAttributeValue, conversionApi) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement(
					'span',
					{ style: `line-height: ${ modelAttributeValue }` },
					{ priority: PRIORITY }
				);
			},
			converterPriority: 'high'
		});
	}
}

export class LineHeight extends Plugin {
	static get requires() {
		return [LineHeightEditing];
	}

	static get pluginName() {
		return 'LineHeight';
	}
}

