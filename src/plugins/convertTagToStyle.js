import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class convertTagToStyle extends Plugin {
	init() {
		const editor = this.editor;

		// Italic
		editor.conversion.attributeToElement( {
			model: 'italic',
			view: {
				name: 'span',
				styles: {
					'font-style': 'italic'
				}
			},
			upcastAlso: [
				'i',
				viewElement => {
					const fontStyle = viewElement.getStyle( 'font-style' );

					if ( !fontStyle ) {
						return null;
					}

					if ( fontStyle === 'italic' || fontStyle === 'oblique' ) {
						return {
							name: true,
							styles: [ 'font-style' ]
						};
					}
				}
			],
			converterPriority: 'high'
		} );

		// Bold
		editor.conversion.attributeToElement( {
			model: 'bold',
			view: {
				name: 'span',
				styles: {
					'font-weight': 'bold'
				}
			},
			upcastAlso: [
				'i',
				viewElement => {
					const fontWeight = viewElement.getStyle( 'font-weight' );

					if ( !fontWeight ) {
						return null;
					}

					// Value of the `font-weight` attribute can be defined as a string or a number.
					if ( fontWeight === 'bold' || Number( fontWeight ) >= 600 ) {
						return {
							name: true,
							styles: [ 'font-weight' ]
						};
					}
				}
			],
			converterPriority: 'high'
		} );

		// Underline
		editor.model.schema.extend( '$text', { allowAttributes: 'underline' } );

		editor.conversion.for( 'upcast' ).attributeToAttribute( {
			model: {
				key: 'underline',
				value: viewElement => {
					return viewElement.getStyle( 'text-decoration' );
				}
			},
			view: {
				name: 'span',
				styles: {
					'text-decoration': /^underline.*/
				}
			}
		}, { priority: 'high' } );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'underline',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true
				) ? 'underline' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration:' + value } );
			},
			converterPriority: 'high'
		} );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'u',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true
				) ? 'underline' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration: ' + value } );
			},
			converterPriority: 'high'
		} );

		// Line-through

		editor.model.schema.extend( '$text', { allowAttributes: 'strikethrough' } );

		editor.conversion.for( 'upcast' ).attributeToAttribute( {
			model: {
				key: 'strikethrough',
				value: viewElement => {
					return viewElement.getStyle( 'text-decoration' );
				}
			},
			view: {
				name: 'span',
				styles: {
					'text-decoration': /^line-through.*/
				}
			}
		}, { priority: 'high' } );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'strikethrough',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true ||
					attributeValue === 'line-through'
				) ? 'line-through solid' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration:' + value } );
			}
		}, { priority: 'high' } );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 's',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true ||
					attributeValue === 'line-through'
				) ? 'line-through solid' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration: ' + value } );
			}
		}, { priority: 'high' } );
	}
}

