import Plugin from '@ckeditor/ckeditor5-core/src/plugin';


const PRIORITY = 11;
const LREF = 'dataLref';

export default class LrefEditing extends Plugin {
	init() {
		const editor = this.editor;
		const conversion = editor.conversion;

		editor.model.schema.extend('$text', { allowAttributes: LREF });
		editor.model.schema.setAttributeProperties(LREF, {
			isFormatting: true,
			copyOnEnter: true
		});

		conversion.for('upcast').attributeToAttribute({
			view: {
				name: 'span',
				attributes: { 'data-lref': true }
			},
			model: {
				key: LREF,
				value: viewElement => viewElement.getAttribute('data-lref')
			},
			converterPriority: 'high'
		} );

		conversion.for('downcast').attributeToElement({
			model: LREF,
			view: (modelAttributeValue, conversionApi) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement(
					'span',
					{ 'data-lref': `${ modelAttributeValue }`},
					{ priority: PRIORITY }
				);
			},
			converterPriority: 'high'
		});
	}
}


export class Lref extends Plugin {
	static get requires() {
		return [LrefEditing];
	}

	static get pluginName() {
		return 'Lref';
	}
}