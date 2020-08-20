/* eslint-disable indent,no-trailing-spaces,no-mixed-spaces-and-tabs,dot-notation */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { calculateRgbBrightness, convertToHex, convertToRGB } from './colorTools';

export default class handleStyles extends Plugin {
	init() {
		const editor = this.editor;

		// allow any style
		editor.model.schema.extend( '$text', {
			allowAttributes: [
				'spanFontColor',
				'spanStyles'
			]
		} );

		editor.conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'span',
				styles: {
					'color': /[\s\S]+/
				}
			},
			model: {
				key: 'spanFontColor',
				value: viewElement => {
					return viewElement.getStyle( 'color' );
				}
			},
			converterPriority: 'high'
		} );

		editor.conversion.for( 'dataDowncast' ).attributeToElement( {
			model: 'spanFontColor',
			view: ( modelAttributeValue, viewWriter ) => {
				return viewWriter.createAttributeElement( 'span', {
					style: `color:${ ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null }`
				}, { priority: 7 } );
			},
			converterPriority: 'high'
		} );

		editor.conversion.for( 'editingDowncast' ).attributeToElement( {
			model: 'spanFontColor',
			view: ( modelAttributeValue, viewWriter ) => {
				const newValue = ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null;
				const element = viewWriter.createAttributeElement( 'span', {
					style: `color:${ ( modelAttributeValue ) ? convertToHex( modelAttributeValue ) : null }`
				}, { priority: 7 } );
				if ( newValue ) {
					const brightness = calculateRgbBrightness( convertToRGB( modelAttributeValue ) );
					if ( brightness > 220 ) {
						viewWriter.addClass( 'ta-bright-text', element );
					}
				}
				return element;
			},
			converterPriority: 'high'
		} );

		// Add an upcast (view-to-model) converter for style attribute of a span.
		editor.conversion.for( 'upcast' )
			.elementToAttribute( {
				view: {
					name: 'span',
					styles: true
				},
				model: {
					key: 'spanStyles',
					value: viewElement => {
						const styles = viewElement.getStyle();
						// filter out color style, to avoid duplicates ('cause color is handled natively)
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
		editor.conversion.for( 'dataDowncast' ).attributeToElement( {
			model: 'spanStyles',
			view: ( modelAttributeValue, viewWriter ) => {
				const element = viewWriter.createAttributeElement(
					'span',
					{
						'style': `${ modelAttributeValue }`
					}
				);
				return element;
			},
			converterPriority: 'high'
		} );

		editor.conversion.for( 'editingDowncast' ).attributeToElement( {
			model: 'spanStyles',
			view: ( modelAttributeValue, viewWriter ) => {
				const styleValue = ( modelAttributeValue ) ? modelAttributeValue.match( /font-size:\s?(.+?);/ ) : null;

				const element = viewWriter.createAttributeElement(
					'span',
					{
						'style': `${ modelAttributeValue }`
					}
				);

				if (
					styleValue &&
					styleValue[ 0 ] &&
					styleValue[ 1 ]
				) {
					const sizeValue = parseInt( styleValue[ 1 ] );
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

				return element;
			},
			converterPriority: 'high'
		} );
	}
}

