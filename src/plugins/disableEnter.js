import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
export default class disableEnterKey extends Plugin {
	init() {
		this.editor.editing.view.document.on( 'enter', event => {
			event.stop();
		} );
	}
}
