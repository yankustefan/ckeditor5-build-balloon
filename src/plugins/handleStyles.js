/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs,dot-notation */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { calculateRgbBrightness, convertToHex, convertToRGB } from './colorTools';

export default class handleStyles extends Plugin {
	init() {
		const editor = this.editor;
		const conversion = editor.conversion;

		// allow any style
		editor.model.schema.extend( '$text', {
			allowAttributes: [
				'spanStyles'
			]
		} );

		// Overwrite default handling for color style.
		//  Add an upcast (view-to-model) converter for fontColor/color attribute of a span.
		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'span',
				styles: {
					'background-color': /[\s\S]+/
				}
			},
			model: {
				key: 'fontBackgroundColor',
				value: viewElement => {
					return viewElement.getStyle( 'background-color' );
				}
			},
			converterPriority: 'high'
		} );

		// Add an downcast (model-to-view) converter for fontColor/color attribute of a span.

		conversion.for( 'downcast' ).attributeToElement( {
			model: 'fontBackgroundColor',
			view: ( modelAttributeValue, conversionApi ) => {
				// console.log('downcast - backgroundColor',modelAttributeValue);
				// #auto
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'span', {
					style: `background-color:${ ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null }`
				}, { priority: 11 } );
			},
			converterPriority: 'high'
		} );

		// Overwrite default handling for color style.
		//  Add an upcast (view-to-model) converter for fontColor/color attribute of a span.
		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'span',
				styles: {
					'color': /[\s\S]+/
				}
			},
			model: {
				key: 'fontColor',
				value: viewElement => {
					return viewElement.getStyle( 'color' );
				}
			},
			converterPriority: 'high'
		} );

		// Add an downcast (model-to-view) converter for fontColor/color attribute of a span.

		conversion.for( 'dataDowncast' ).attributeToElement( {
			model: 'fontColor',
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'span', {
					style: `color:${ ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null }`
				}, { priority: 11 } );
			},
			converterPriority: 'high'
		} );

		conversion.for( 'editingDowncast' ).attributeToElement( {
			model: 'fontColor',
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				const newValue = ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null;
				const element = writer.createAttributeElement( 'span', {
					style: `color:${ ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null }`
				}, { priority: 11 } );
				if ( newValue ) {
					const brightness = calculateRgbBrightness( convertToRGB( modelAttributeValue ) );
					if ( brightness > 220 ) {
						writer.addClass( 'ta-bright-text', element );
					}
				}
				return element;
			},
			converterPriority: 'high'
		} );

		// font size
		/*
		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'span',
				styles: {
					'font-size': /[\s\S]+/
				}
			},
			model: {
				key: 'fontSize',
				value: viewElement => {
					return viewElement.getStyle( 'font-size' );
				}
			},
			converterPriority: 'high'
		} );
		conversion.for( 'dataDowncast' ).attributeToElement( {
			model: 'fontSize',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					style: `font-size:${ modelAttributeValue }`
				}, { priority: 11 } );
			},
			converterPriority: 'high'
		} );
		conversion.for( 'editingDowncast' ).attributeToElement( {
			model: 'fontSize',
			view: ( modelAttributeValue, viewWriter ) => {
				const element = viewWriter.createAttributeElement(
					'span',
					{
						style: `font-size:${ modelAttributeValue }`
					},
					{ priority: 11 }
				);
				if (
					modelAttributeValue
				) {
					const sizeValue = parseInt( modelAttributeValue );
					if ( sizeValue ) {
						let sizeClassName;
						if ( sizeValue <= 16 ) {
							sizeClassName = 'ta-font-size-medium';
						} else if ( sizeValue <= 20 ) {
							sizeClassName = 'ta-font-size-l';
						} else if ( sizeValue <= 24 ) {
							sizeClassName = 'ta-font-size-xl';
						} else {
							sizeClassName = 'ta-font-size-xxl';
						}
						if ( sizeClassName ) {
							viewWriter.addClass( sizeClassName, element );
						}
					}
				}
				return element;
			},
			converterPriority: 'high'
		} );
		*/

		// Add an upcast (view-to-model) converter for style attribute of a span.
		conversion.for( 'upcast' )
			.elementToAttribute( {
				view: {
					name: 'span',
					styles: true
				},
				model: {
					key: 'spanStyles',
					value: viewElement => {
						const styles = viewElement.getStyle();
						// Filter out color and italic  style, to avoid duplicates as these styles are handled by editor plugins.
						if (
							styles &&
							(
								styles.color ||
								styles[ 'font-style' ] ||
								styles[ 'font-weight' ] ||
								styles[ 'text-decoration' ] ||
								styles[ 'background' ] ||
								styles[ 'background-color' ]
							)
						) {
							return Object.keys( styles ).reduce(
								( accumulator, key ) => {
									return (
										key !== 'color' &&
										key !== 'background' &&
										key !== 'background-color' &&
										key !== 'font-style' &&
										key !== 'font-weight' &&
										key !== 'text-decoration'
									) ? accumulator + key + ':' + styles[ key ] + ';' : accumulator;
								},
								''
							);
						} else {
							return viewElement.getAttribute( 'style' );
						}
					}
				},
				converterPriority: 'high'
			} );

		// Add a downcast (model-to-view) converter for style attribute of a span.
		// This attribute should support all the styles not supported by native plugins
		conversion.for( 'downcast' ).attributeToElement( {
			model: 'spanStyles',
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				const element = writer.createAttributeElement(
					'span',
					{
						'style': `${ modelAttributeValue }`
					},
					{ priority: 11 }
				);
				return element;
			},
			converterPriority: 'high'
		} );

	}
}