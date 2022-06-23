import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class allowLrefAttribute extends Plugin {
	init() {
		const editor = this.editor;
		const conversion = editor.conversion;

		// Allow the "dataLref" attribute in the editor model.
		editor.model.schema.extend( '$text', { allowAttributes: 'dataLref' } );

		// Add an upacast (view-to-model) converter for 'data-lref' attribute of a span.
		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'span',
				attributes: { 'data-lref': true }
			},
			model: {
				key: 'dataLref',
				value: viewElement => viewElement.getAttribute( 'data-lref' )
			},
			converterPriority: 'high'
		} );

		// Add an downcast (model-to-view) converter for 'data-lref' attribute of a span.
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'dataLref',
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'span', {
						'data-lref': `${ modelAttributeValue }`
					},
					// { priority: 11 }
				);
			},
			converterPriority: 'high'
		} );

	}
}