import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
export default class allowAttribute extends Plugin {
	init() {
		const editor = this.editor;

		// Allow the "dataLref" attribute in the editor model.
		editor.model.schema.extend( '$text', { allowAttributes: 'dataLref' } );

		// Tell the editor that the model "dataLref" attribute converts into <a target="..."></a>
		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'dataLref',
			view: ( attributeValue, writer ) => {
				const element = writer.createAttributeElement( 'span', { 'data-lref': attributeValue }, { priority: 5 } );
				return element;
			},
			converterPriority: 'low'
		} );

		// Tell the editor that <span data-lref="..."></span> converts into the "dataLref" attribute in the model.
		editor.conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'span',
				key: 'data-lref'
			},
			model: 'dataLref',
			converterPriority: 'low'
		} );

	}
}

