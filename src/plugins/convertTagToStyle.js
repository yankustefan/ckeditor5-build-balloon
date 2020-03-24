import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class taConvertTagToStyle extends Plugin {
	init() {
		const editor = this.editor;

		// see: https://github.com/ckeditor/ckeditor5-basic-styles/tree/master/src

		// Bold

		// editor.conversion.for( 'downcast' ).attributeToElement( {
		// 	model: 'dataLref',
		// 	view: ( attributeValue, writer ) => {
		// 		const element = writer.createAttributeElement( 'span', { 'data-lref': attributeValue }, { priority: 5 } );
		// 		return element;
		// 	},
		// 	converterPriority: 'low'
		// } );

		editor.conversion.for( 'downcast' ).elementToElement( {
			model: 'bold',
			view: {
				name: 'span',
				styles: {
					'font-weight': 'bold'
				}
			},
			upcastAlso: [
				'b',
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
			converterPriority: 'low'
		} );

		/*

		// Italic

		editor.conversion.for( 'upcast' ).attributeToElement( {
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
			]
		}, { priority: 'high' } );

		// Underline

		editor.conversion.for( 'upcast' ).attributeToElement( {
			model: 'underline',
			view: {
				name: 'span',
				styles: {
					'text-decoration': 'underline'
				}
			},
			upcastAlso: [
				'u',
				viewElement => {
					const textDecoration = viewElement.getStyle( 'text-decoration' );

					if ( !textDecoration ) {
						return null;
					}

					// todo: allow for solid, wavy, dotted, dashed, double
					if (
						textDecoration === 'underline' ||
						textDecoration === 'underline solid'
					) {
						return {
							name: true,
							styles: [ 'text-decoration' ]
						};
					}
				}
			]
		}, { priority: 'high' } );

		// strikethrough

		editor.conversion.for( 'upcast' ).attributeToElement( {
			model: 'strikethrough',
			view: {
				name: 'span',
				styles: {
					'text-decoration': 'line-through'
				}
			},
			upcastAlso: [
				's',
				viewElement => {
					const textDecoration = viewElement.getStyle( 'text-decoration' );

					if ( !textDecoration ) {
						return null;
					}

					if ( textDecoration === 'line-through' ) {
						return {
							name: true,
							styles: [ 'text-decoration' ]
						};
					}
				}
			]
		}, { priority: 'high' } );

		*/
	}
}
