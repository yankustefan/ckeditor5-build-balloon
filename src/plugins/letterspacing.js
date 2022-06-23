import { Plugin } from 'ckeditor5/src/core';

const PRIORITY = 11;
const LETTER_SPACING = 'letterSpacing';

class LetterSpacingEditing extends Plugin {
	static get pluginName() {
		return 'LetterSpacingEditing';
	}

	init() {
		const editor = this.editor;

		editor.model.schema.extend('$text', { allowAttributes: LETTER_SPACING });
		editor.model.schema.setAttributeProperties(LETTER_SPACING, {
			isFormatting: true,
			copyOnEnter: true
		});

		editor.conversion.for('upcast').elementToAttribute({
		    view: {
				name: 'span',
				styles: { 'letter-spacing': /[\s\S]+/ }
			},
			model: {
				key: LETTER_SPACING,
				value: viewElement => {
					return viewElement.getStyle('letter-spacing');
				}
			},
			converterPriority: 'high'
		});

		editor.conversion.for('downcast').attributeToElement({
		    model: LETTER_SPACING,
			view: (modelAttributeValue, conversionApi) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement(
                    'span',
                    { style: `letter-spacing: ${ modelAttributeValue }` },
                    { priority: PRIORITY }
                );
			},
			converterPriority: 'high'
		});
	}
}

export class LetterSpacing extends Plugin {
	static get requires() {
		return [LetterSpacingEditing];
	}

	static get pluginName() {
		return 'LetterSpacing';
	}
}

