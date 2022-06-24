import { Plugin } from 'ckeditor5/src/core';
import { calculateRgbBrightness, convertToHex, convertToRGB } from './colorTools';


const PRIORITY = 11;

// override converter to set the same priority
// and modify value
// and output as <span style="..." />
// leave almost upcast converter to native plugins or other
class OverrideStylesEditing extends Plugin {
    static get pluginName() {
        return 'OverrideStylesEditing';
    }

    init() {
        const editor = this.editor;
        const conversion = editor.conversion;
        const document = editor.model.document;

        // when one is set, remove other
        document.registerPostFixer(writer => underlinePostFixer(writer, document));
        document.registerPostFixer(writer => strikethroughPostFixer(writer, document));
        document.registerPostFixer(writer => superScriptPostFixer(writer, document));
        document.registerPostFixer(writer => subScriptPostFixer(writer, document));

        // bold
        conversion.for('downcast').attributeToElement({
            model: 'bold',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: 'font-weight: bold' },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // italic
        conversion.for('downcast').attributeToElement({
            model: 'italic',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: 'font-style: italic' },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // fontSize
        conversion.for('upcast').attributeToAttribute({
            model: {
                key: 'fontSize',
                value: viewElement => {
                    return viewElement.getStyle('font-size');
                }
            },
            view: {
                name: 'span',
                styles: { 'font-size': /[\s\S]+/ }
            }
        }, { priority: 'high' });

        conversion.for('downcast').attributeToElement({
            model: 'fontSize',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: `font-size: ${modelAttributeValue}` },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // fontFamily
        conversion.for('downcast').attributeToElement({
            model: 'fontFamily',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: `font-family: ${modelAttributeValue}` },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // fontColor
        conversion.for('downcast').attributeToElement({
            model: 'fontColor',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                const element = writer.createAttributeElement(
                    'span',
                    { style: `color: ${convertToHex(modelAttributeValue)}` },
                    { priority: PRIORITY }
                );
                
                const brightness = calculateRgbBrightness(convertToRGB(modelAttributeValue));
                if ( brightness > 220 ) {
                    writer.addClass('ta-bright-text', element);
                }
                return element;
            },
            converterPriority: 'high'
        });

        // backgroundColor
        conversion.for('downcast').attributeToElement({
            model: 'fontBackgroundColor',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: `background-color: ${convertToHex(modelAttributeValue)}` },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // strikethrough
        conversion.for('downcast').attributeToElement({
            model: 'strikethrough',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: 'text-decoration: line-through' },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // underline
        // TODO: conflict text-decoration with strikethrough
        conversion.for('upcast').attributeToAttribute({
            model: {
                key: 'underline',
                value: viewElement => {
                    return viewElement.getStyle('text-decoration');
                }
            },
            view: {
                name: 'span',
                styles: { 'text-decoration': /[\s\S]+/ }
            }
        }, { priority: 'high' });

        conversion.for('downcast').attributeToElement({
            model: 'underline',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                const value = modelAttributeValue === true
                    ? "underline solid"
                    : modelAttributeValue
                return writer.createAttributeElement(
                    'span',
                    { style: `text-decoration: ${value}` },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // subscript
        conversion.for('downcast').attributeToElement({
            model: 'subscript',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: 'vertical-align: sub' },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });

        // superscript
        conversion.for('downcast').attributeToElement({
            model: 'superscript',
            view: (modelAttributeValue, conversionApi) => {
                const { writer } = conversionApi;
                return writer.createAttributeElement(
                    'span',
                    { style: 'vertical-align: super' },
                    { priority: PRIORITY }
                );
            },
            converterPriority: 'high'
        });
    }
}

function superScriptPostFixer(writer, document) {
    return setExclusiveAttributeChange(writer, document, 'superscript', 'subscript');
}

function subScriptPostFixer(writer, document) {
    return setExclusiveAttributeChange(writer, document, 'subscript', 'superscript');
}

function underlinePostFixer(writer, document) {
    return setExclusiveAttributeChange(writer, document, 'underline', 'strikethrough');
}

function strikethroughPostFixer(writer, document) {
    return setExclusiveAttributeChange(writer, document, 'strikethrough', 'underline');
}

function setExclusiveAttributeChange(writer, document, setAttr, removeAttr) {
    const changes = document.differ.getChanges();
    let wasChanged = false;
    for (const entry of changes) {
        if (
            entry.type === 'attribute' &&
            entry.attributeKey === setAttr &&
            entry.attributeNewValue &&
            entry.attributeOldValue === null
        ) {
            for (const node of entry.range.getItems()) {
                if (
                    node &&
                    (node.is('text') || node.is('textProxy')) &&
                    node.hasAttribute(removeAttr)
                ) {
                    writer.removeAttribute(removeAttr, node);
                    wasChanged = true;
                }
            }
        }
    }
    return wasChanged;
}

export class OverrideStyles extends Plugin {
    static get requires() {
        return [ OverrideStylesEditing ];
    }

    static get pluginName() {
        return 'OverrideStyles';
    }
}

