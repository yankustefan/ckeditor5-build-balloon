import { Plugin } from 'ckeditor5/src/core';

const PRIORITY = 11;
const TEXT_TRANSFORM = 'textTransform';

class TextTransformEditing extends Plugin {
	static get pluginName() {
		return 'TextTransformEditing';
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend('$text', { allowAttributes: TEXT_TRANSFORM });
		editor.model.schema.setAttributeProperties(TEXT_TRANSFORM, {
			isFormatting: true,
			copyOnEnter: true
		});

		editor.conversion.for('upcast').elementToAttribute({
			view: {
				name: 'span',
				styles: {
					'text-transform': /none|capitalize|uppercase|lowercase|initial|inherit/
				}
			},
			model: {
				key: TEXT_TRANSFORM,
				value: viewElement => {
					return viewElement.getStyle('text-transform');
				}
			},
			converterPriority: 'high'
		});

		editor.conversion.for('downcast').attributeToElement({
			model: TEXT_TRANSFORM,
			view: (modelAttributeValue, conversionApi) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement(
                    'span',
                    { style: `text-transform: ${ modelAttributeValue }` },
                    { priority: PRIORITY }
                );
			},
			converterPriority: 'high'
		});
	}
}

export class TextTransform extends Plugin {
	static get requires() {
		return [ TextTransformEditing ];
	}

	static get pluginName() {
		return 'TextTransform';
	}
}

