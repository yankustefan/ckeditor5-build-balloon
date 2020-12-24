import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class convertTagToStyle extends Plugin {
	init() {
		const editor = this.editor;
		const conversion = this.editor.conversion;

		// Italic
		// Overwrite default handling for italic; style.
		// Add an upcast (view-to-model) converter for italic/font-style:italic attribute of a span.
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: {
					'font-style': 'italic'
				}
			},
			model: {
				key: 'italic',
				value: viewElement => {
					const fontStyle = viewElement.getStyle( 'font-style' );
					if ( fontStyle && fontStyle === 'italic' || fontStyle === 'oblique' ) {
						return true;
					}
				}
			},
			upcastAlso: [
				'i',
				'em',
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

		// Add an downcast (model-to-view) converter for italic/font-style:italic attribute of a span.
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'italic',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					'style': 'font-style:italic;'
				}, { priority: 11 } );
			},
			converterPriority: 'high'
		} );

		// Bold
		conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				styles: {
					'font-weight': 'bold'
				}
			},
			model: {
				key: 'bold',
				value: viewElement => {
					const fontWeight = viewElement.getStyle( 'font-weight' );
					if ( fontWeight && fontWeight === 'bold' || Number( fontWeight ) >= 600 ) {
						return true;
					}
				}
			},
			upcastAlso: [
				'b',
				'strong',
				viewElement => {
					const fontWeight = viewElement.getStyle( 'font-weight' );
					if ( !fontWeight ) {
						return null;
					}

					if ( fontWeight && fontWeight === 'bold' || Number( fontWeight ) >= 600 ) {
						return {
							name: true,
							styles: [ 'font-weight' ]
						};
					}
				}
			],
			converterPriority: 'high'
		} );
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'bold',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					'style': 'font-weight:bold;'
				}, { priority: 11 } );
			},
			converterPriority: 'high'
		} );

		// Underline

		// conversion.for( 'downcast' ).attributeToElement( {
		// 	model: 'underline',
		// 	view: ( modelAttributeValue, viewWriter ) => {
		// 		return viewWriter.createAttributeElement( 'span', {
		// 			'style': 'text-decoration: underline;'
		// 		}, { priority: 11 } );
		// 	},
		// 	converterPriority: 'high'
		// } );

		conversion.for( 'upcast' ).attributeToAttribute( {
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

		conversion.for( 'downcast' ).attributeToElement( {
			model: 'underline',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true ||
					(
						attributeValue &&
						typeof attributeValue === 'string' &&
						attributeValue.startsWith('underline')
					)
				) ? 'underline' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration:' + value }, { priority: 11 } );
			},
			converterPriority: 'high'
		} );

		conversion.for( 'downcast' ).attributeToElement( {
			model: 'u',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true ||
					(
						attributeValue &&
						typeof attributeValue === 'string' &&
						attributeValue.startsWith('underline')
					)
				) ? 'underline' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration: ' + value } );
			},
			converterPriority: 'high'
		} );

		//Line-through

		conversion.for( 'downcast' ).attributeToElement( {
			model: 'strikethrough',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					'style': 'text-decoration: line-through;'
				}, { priority: 11 } );
			},
			converterPriority: 'high'
		} );

		conversion.for( 'upcast' ).attributeToAttribute( {
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

		conversion.for( 'downcast' ).attributeToElement( {
			model: 'strikethrough',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true ||
					(
						attributeValue &&
						typeof attributeValue === 'string' &&
						attributeValue.startsWith('line-through')
					)
				) ? 'line-through solid' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration:' + value }, { priority: 11 } );
			}
		}, { priority: 'high' } );

		conversion.for( 'downcast' ).attributeToElement( {
			model: 's',
			view: ( attributeValue, writer ) => {
				const value = (
					attributeValue === true  ||
					(
						attributeValue &&
						typeof attributeValue === 'string' &&
						attributeValue.startsWith('line-through')
					)
				) ? 'line-through solid' : attributeValue;
				return writer.createAttributeElement( 'span', { style: 'text-decoration: ' + value }, { priority: 11 } );
			}
		}, { priority: 'high' } );
	}
}

