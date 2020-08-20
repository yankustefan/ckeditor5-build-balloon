export const namedColors = {
	'aliceblue': '#f0f8ff',
	'antiquewhite': '#faebd7',
	'aqua': '#00ffff',
	'aquamarine': '#7fffd4',
	'azure': '#f0ffff',
	'beige': '#f5f5dc',
	'bisque': '#ffe4c4',
	'black': '#000000',
	'blanchedalmond': '#ffebcd',
	'blue': '#0000ff',
	'blueviolet': '#8a2be2',
	'brown': '#a52a2a',
	'burlywood': '#deb887',
	'cadetblue': '#5f9ea0',
	'chartreuse': '#7fff00',
	'chocolate': '#d2691e',
	'coral': '#ff7f50',
	'cornflowerblue': '#6495ed',
	'cornsilk': '#fff8dc',
	'crimson': '#dc143c',
	'cyan': '#00ffff',
	'darkblue': '#00008b',
	'darkcyan': '#008b8b',
	'darkgoldenrod': '#b8860b',
	'darkgray': '#a9a9a9',
	'darkgreen': '#006400',
	'darkgrey': '#a9a9a9',
	'darkkhaki': '#bdb76b',
	'darkmagenta': '#8b008b',
	'darkolivegreen': '#556b2f',
	'darkorange': '#ff8c00',
	'darkorchid': '#9932cc',
	'darkred': '#8b0000',
	'darksalmon': '#e9967a',
	'darkseagreen': '#8fbc8f',
	'darkslateblue': '#483d8b',
	'darkslategray': '#2f4f4f',
	'darkslategrey': '#2f4f4f',
	'darkturquoise': '#00ced1',
	'darkviolet': '#9400d3',
	'deeppink': '#ff1493',
	'deepskyblue': '#00bfff',
	'dimgray': '#696969',
	'dimgrey': '#696969',
	'dodgerblue': '#1e90ff',
	'firebrick': '#b22222',
	'floralwhite': '#fffaf0',
	'forestgreen': '#228b22',
	'fuchsia': '#ff00ff',
	'gainsboro': '#dcdcdc',
	'ghostwhite': '#f8f8ff',
	'goldenrod': '#daa520',
	'gold': '#ffd700',
	'gray': '#808080',
	'green': '#008000',
	'greenyellow': '#adff2f',
	'grey': '#808080',
	'honeydew': '#f0fff0',
	'hotpink': '#ff69b4',
	'indianred': '#cd5c5c',
	'indigo': '#4b0082',
	'ivory': '#fffff0',
	'khaki': '#f0e68c',
	'lavenderblush': '#fff0f5',
	'lavender': '#e6e6fa',
	'lawngreen': '#7cfc00',
	'lemonchiffon': '#fffacd',
	'lightblue': '#add8e6',
	'lightcoral': '#f08080',
	'lightcyan': '#e0ffff',
	'lightgoldenrodyellow': '#fafad2',
	'lightgray': '#d3d3d3',
	'lightgreen': '#90ee90',
	'lightgrey': '#d3d3d3',
	'lightpink': '#ffb6c1',
	'lightsalmon': '#ffa07a',
	'lightseagreen': '#20b2aa',
	'lightskyblue': '#87cefa',
	'lightslategray': '#778899',
	'lightslategrey': '#778899',
	'lightsteelblue': '#b0c4de',
	'lightyellow': '#ffffe0',
	'lime': '#00ff00',
	'limegreen': '#32cd32',
	'linen': '#faf0e6',
	'magenta': '#ff00ff',
	'maroon': '#800000',
	'mediumaquamarine': '#66cdaa',
	'mediumblue': '#0000cd',
	'mediumorchid': '#ba55d3',
	'mediumpurple': '#9370db',
	'mediumseagreen': '#3cb371',
	'mediumslateblue': '#7b68ee',
	'mediumspringgreen': '#00fa9a',
	'mediumturquoise': '#48d1cc',
	'mediumvioletred': '#c71585',
	'midnightblue': '#191970',
	'mintcream': '#f5fffa',
	'mistyrose': '#ffe4e1',
	'moccasin': '#ffe4b5',
	'navajowhite': '#ffdead',
	'navy': '#000080',
	'oldlace': '#fdf5e6',
	'olive': '#808000',
	'olivedrab': '#6b8e23',
	'orange': '#ffa500',
	'orangered': '#ff4500',
	'orchid': '#da70d6',
	'palegoldenrod': '#eee8aa',
	'palegreen': '#98fb98',
	'paleturquoise': '#afeeee',
	'palevioletred': '#db7093',
	'papayawhip': '#ffefd5',
	'peachpuff': '#ffdab9',
	'peru': '#cd853f',
	'pink': '#ffc0cb',
	'plum': '#dda0dd',
	'powderblue': '#b0e0e6',
	'purple': '#800080',
	'rebeccapurple': '#663399',
	'red': '#ff0000',
	'rosybrown': '#bc8f8f',
	'royalblue': '#4169e1',
	'saddlebrown': '#8b4513',
	'salmon': '#fa8072',
	'sandybrown': '#f4a460',
	'seagreen': '#2e8b57',
	'seashell': '#fff5ee',
	'sienna': '#a0522d',
	'silver': '#c0c0c0',
	'skyblue': '#87ceeb',
	'slateblue': '#6a5acd',
	'slategray': '#708090',
	'slategrey': '#708090',
	'snow': '#fffafa',
	'springgreen': '#00ff7f',
	'steelblue': '#4682b4',
	'tan': '#d2b48c',
	'teal': '#008080',
	'thistle': '#d8bfd8',
	'tomato': '#ff6347',
	'turquoise': '#40e0d0',
	'violet': '#ee82ee',
	'wheat': '#f5deb3',
	'white': '#ffffff',
	'whitesmoke': '#f5f5f5',
	'yellow': '#ffff00',
	'yellowgreen': '#9acd32'
};

// https://css-tricks.com/converting-color-spaces-in-javascript/
export const isHexColor = string => {
	const pattern = /^#([\da-f]{3}){1,2}$/i;
	return pattern.test( string );
};
export const isRgbColor = string => {
	const pattern = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
	return pattern.test( string );
};
export const isRgbaColor = string => {
	const pattern = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	return pattern.test( string );
};
export const isHslColor = string => {
	const pattern = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
	return pattern.test( string );
};
export const isHslaColor = string => {
	const pattern = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	return pattern.test( string );
};

export const parseRgbString = value => {
	const sep = value.indexOf( ',' ) > -1 ? ',' : ' ';
	const rgb = value.substr( 4 ).split( ')' )[ 0 ].split( sep );
	return [ Number( rgb[ 0 ] ), Number( rgb[ 1 ] ), Number( rgb[ 2 ] ) ];
};

export const parseRgbaString = value => {
	const sep = value.indexOf( ',' ) > -1 ? ',' : ' ';
	const rgba = value.substr( 5 ).split( ')' )[ 0 ].split( sep );
	return [ Number( rgba[ 0 ] ), Number( rgba[ 1 ] ), Number( rgba[ 2 ] ), Number( rgba[ 3 ] ) ];
};

export const calculateRgbBrightness = rgbArray => {
	// luma, where 0 is the darkest and 255 is the lightest
	return 0.2126 * rgbArray[ 0 ] + 0.7152 * rgbArray[ 1 ] + 0.0722 * rgbArray[ 2 ]; // per ITU-R BT.709
};

export const convertHexToRGB = value => {
	const hex = value.substring( 1 ); // strip #
	const rgb = parseInt( hex, 16 ); // convert rrggbb to decimal
	const r = ( rgb >> 16 ) & 0xff; // extract red
	const g = ( rgb >> 8 ) & 0xff; // extract green
	const b = ( rgb >> 0 ) & 0xff; // extract blue
	return [ r, g, b ];
};

export const convertRgbToHex = value => {
	const rgb = parseRgbString( value );
	let r = ( rgb[ 0 ] ).toString( 16 );
	let g = ( rgb[ 1 ] ).toString( 16 );
	let b = ( rgb[ 2 ] ).toString( 16 );
	if ( r.length === 1 ) {
		r = '0' + r;
	}
	if ( g.length === 1 ) {
		g = '0' + g;
	}
	if ( b.length === 1 ) {
		b = '0' + b;
	}
	return '#' + r + g + b;
};

export const convertRgbaToHex = value => {
	const rgba = parseRgbaString( value );
	let r = ( rgba[ 0 ] ).toString( 16 );
	let g = ( rgba[ 1 ] ).toString( 16 );
	let b = ( rgba[ 2 ] ).toString( 16 );
	let a = Math.round( rgba[ 3 ] * 255 ).toString( 16 ).substring( 0, 2 );
	if ( r.length === 1 ) {
		r = '0' + r;
	}
	if ( g.length === 1 ) {
		g = '0' + g;
	}
	if ( b.length === 1 ) {
		b = '0' + b;
	}
	if ( a.length === 1 ) {
		a = '0' + a;
	}
	return '#' + r + g + b + a;
};

export const convertToRGB = value => {
	if ( namedColors[ value ] ) {
		return convertHexToRGB( namedColors[ value ] );
	} else if ( isHexColor( value ) ) {
		return convertHexToRGB( value );
	} else if ( isRgbColor( value ) ) {
		return parseRgbString( value );
	} else if ( isRgbaColor( value ) ) {
		const rgba = parseRgbaString( value );
		return [ rgba[ 0 ], rgba[ 1 ], rgba[ 2 ] ];
	} else {
		return [ 0, 0, 0 ];
	}
};

export const convertToHex = value => {
	if ( namedColors[ value ] ) {
		return namedColors[ value ];
	} else if ( isHexColor( value ) ) {
		return value;
	} else if ( isRgbColor( value ) ) {
		return convertRgbToHex( value );
	} else if ( isRgbaColor( value ) ) {
		return convertRgbaToHex( value );
		// todo: hsl does not work
		// } else if ( isHslColor( value ) ) {
		// 	const sep = value.indexOf( ',' ) > -1 ? ',' : ' ';
		// 	const hsl = value.substr( 4 ).split( ')' )[ 0 ].split( sep );
		// 	let h = hsl[ 0 ];
		// 	let s = hsl[ 1 ].substr( 0, hsl[ 1 ].length - 1 ) / 100;
		// 	let l = hsl[ 2 ].substr( 0, hsl[ 2 ].length - 1 ) / 100;
		// 	if ( h.indexOf( 'deg' ) > -1 ) {
		// 		h = h.substr( 0, h.length - 3 );
		// 	} else if ( h.indexOf( 'rad' ) > -1 ) {
		// 		h = Math.round( h.substr( 0, h.length - 3 ) * ( 180 / Math.PI ) );
		// 	} else if ( h.indexOf( 'turn' ) > -1 ) {
		// 		h = Math.round( h.substr( 0, h.length - 4 ) * 360 );
		// 	}
		// 	if ( h >= 360 ) {
		// 		h %= 360;
		// 	}
		// 	s /= 100;
		// 	l /= 100;
		// 	const c = ( 1 - Math.abs( 2 * l - 1 ) ) * s;
		// 	const x = c * ( 1 - Math.abs( ( h / 60 ) % 2 - 1 ) );
		// 	const m = l - c / 2;
		// 	let r = 0;
		// 	let g = 0;
		// 	let b = 0;
		// 	if ( 0 <= h && h < 60 ) {
		// 		r = c;
		// 		g = x;
		// 		b = 0;
		// 	} else if ( 60 <= h && h < 120 ) {
		// 		r = x;
		// 		g = c;
		// 		b = 0;
		// 	} else if ( 120 <= h && h < 180 ) {
		// 		r = 0;
		// 		g = c;
		// 		b = x;
		// 	} else if ( 180 <= h && h < 240 ) {
		// 		r = 0;
		// 		g = x;
		// 		b = c;
		// 	} else if ( 240 <= h && h < 300 ) {
		// 		r = x;
		// 		g = 0;
		// 		b = c;
		// 	} else if ( 300 <= h && h < 360 ) {
		// 		r = c;
		// 		g = 0;
		// 		b = x;
		// 	}
		//
		// 	r = Math.round( ( r + m ) * 255 ).toString( 16 );
		// 	g = Math.round( ( g + m ) * 255 ).toString( 16 );
		// 	b = Math.round( ( b + m ) * 255 ).toString( 16 );
		//
		// 	if ( r.length === 1 ) {
		// 		r = '0' + r;
		// 	}
		// 	if ( g.length === 1 ) {
		// 		g = '0' + g;
		// 	}
		// 	if ( b.length === 1 ) {
		// 		b = '0' + b;
		// 	}
		//
		// 	return '#' + r + g + b;
	} else {
		return value; // leave it as it is
	}
};
