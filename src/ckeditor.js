/* eslint-disable indent,no-mixed-spaces-and-tabs */
/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import List from '@ckeditor/ckeditor5-list/src/list';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

import Font from '@ckeditor/ckeditor5-font/src/font';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

import wrapTextInSpan from './plugins/wrapTextInSpan.js';
import allowAttribute from './plugins/allowAttribute.js';
import textColorButtons from './plugins/textColorButtons.js';

export default class BalloonEditor extends BalloonEditorBase {
}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
  Essentials,
  Bold,
  Italic,
  Indent,
  List,
  Paragraph,
  PasteFromOffice,

  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  RemoveFormat,
  textColorButtons,
  wrapTextInSpan,
  allowAttribute,
  Font
];

// Editor configuration.
BalloonEditor.defaultConfig = {
  toolbar: {
	items: [
	  'bold',
	  'italic',
	  'underline',
	  'strikethrough',
	  '|',
	  'taFontColorRed',
	  'taFontColorBlue',
	  'taFontColorSky',
	  'taFontColorGreen',
	  'taFontColorPink',
	  // 'taFontColorBlack',
	  'taFontColorRemove',
	  '|',
	  'fontColor',
	  'fontBackgroundColor',
	  '|',
	  'subscript',
	  'superscript',
	  '|',
	  'removeFormat',
	  'undo',
	  'redo'
	]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};
