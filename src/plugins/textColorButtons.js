/* eslint-disable no-mixed-spaces-and-tabs,indent */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class textColorButtons extends Plugin {

	init() {
		const editor = this.editor;
		const colors = [
			{
				key: 'taFontColorOrange',
				name: 'Orange',
				value: '#FF9900'
			},
			{
				key: 'taFontColorRed',
				name: 'Red',
				value: '#FF0000'
			},
			{
				key: 'taFontColorPink',
				name: 'Pink',
				value: '#FF00FF'
			},
			{
				key: 'taFontColorSky',
				name: 'Sky Blue',
				value: '#00B0F0'
			},
			{
				key: 'taFontColorBlue',
				name: 'Blue',
				value: '#0000FF'
			},
			{
				key: 'taFontColorYellowGreen',
				name: 'Yellow Green',
				value: '#92D050'
			},
			{
				key: 'taFontColorGreen',
				name: 'Green',
				value: '#008000'
				// },
				// {
				// key: 'taFontColorBlack',
				// name: 'Black',
				// value: '#cc0000'
			},
			{
				key: 'taFontColorDarkMagenta',
				name: 'Dark Magenta',
				value: '#8b008b'
			},
		];

		const fontColorCommand = 'fontColor';

		colors.forEach( ( color, index ) => {

			editor.ui.componentFactory.add( color.key, locale => {

				const view = new ButtonView( locale );

				view.set( {
					label: 'Font Color ' + color.name,
					icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="' + color.value + '" /></svg>',
					tooltip: true
					// keystroke: 'Ctrl+F+'+(1 + index)
				} );

				view.on( 'execute', () => {
					editor.execute( fontColorCommand, { value: color.value } );
					// view.focus();
				} );

				return view;
			} );

		} );

		editor.ui.componentFactory.add( 'taFontColorRemove', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Remove Font Color',
				icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.636 9.531l-2.758 3.94a.5.5 0 0 0 .122.696l3.224 2.284h1.314l2.636-3.736L8.636 9.53zm.288 8.451L5.14 15.396a2 2 0 0 1-.491-2.786l6.673-9.53a2 2 0 0 1 2.785-.49l3.742 2.62a2 2 0 0 1 .491 2.785l-7.269 10.053-2.147-.066z"/><path d="M4 18h5.523v-1H4zm-2 0h1v-1H2z"/></svg>',
				tooltip: true
			} );

			view.on( 'execute', () => {
				editor.execute( fontColorCommand );
			} );

			return view;
		} );

		// editor.keystrokes.set( 'Ctrl+Shift+C', ( keyEvtData, cancel ) => {
		//   console.log( 'Ctrl+Shift+C has been pressed' );
		//   console.log( 'Opening the color palette.' );
		//
		//   // We assume that you use BalloonToolbar. If you'd like to use a top toolbar, use editor.ui.view.toolbar.items;
		//   const balloonToolbar = editor.plugins.get( 'BalloonToolbar' );
		//   const toolbarItems = balloonToolbar.toolbarView.items;
		//   // Pass the toolbar item index here. 0 asssumes that Font Color dropdown is the first item in the toolbar.
		//   const fontColorDropdown = toolbarItems.get( 12 );
		//   console.log('fontColorDropdown', fontColorDropdown);
		//   balloonToolbar.show();
		//   fontColorDropdown.isOpen = true;
		// } );

	}
}
