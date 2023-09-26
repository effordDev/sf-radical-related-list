import LightningDatatable from 'lightning/datatable';
import picklistEdit from './picklistEdit.html'
import dateTimeEdit from './dateTimeEdit.html'
import textareaEdit from './textareaEdit.html'
import richTextareaEdit from './richTextareaEdit.html'
import checkboxEdit from './checkboxEdit.html'
import referenceEdit from './referenceEdit.html'

export default class RadicalDatatable extends LightningDatatable {

    constructor() {
        super();
    }

    static customTypes = {
        picklist: {
            template: picklistEdit,
            // template: picklist,
            // editTemplate: picklistEdit,
            // standardCellLayout: true,
            typeAttributes: [
                'label', 
                'placeholder', 
                'options', 
                'value', 
                'context', 
                'contextName',
                'context',
                'fieldName'
            ]
        },
        checkbox: {
            template: checkboxEdit,
            typeAttributes: [
                'label', 
                'placeholder', 
                'value', 
                'context', 
                'contextName',
                'context',
                'fieldName'
            ]
        },
        datetime: {
            template: dateTimeEdit,
            typeAttributes: [
                'label', 
                'placeholder', 
                'value', 
                'context', 
                'contextName',
                'context',
                'fieldName'
            ]
        },
        plaintextarea: {
            template: textareaEdit,
            typeAttributes: [
                'label', 
                'placeholder', 
                'value', 
                'context', 
                'contextName',
                'context',
                'fieldName'
            ]
        },
        richtextarea: {
            template: richTextareaEdit,
            typeAttributes: [
                'label', 
                'placeholder', 
                'value', 
                'context', 
                'contextName',
                'context',
                'fieldName',
                'editable',
            ]
        },
        // reference: {
        //     template: referenceEdit,
        //     typeAttributes: [
        //         'label', 
        //         'placeholder', 
        //         'value', 
        //         'childSobject',
        //         'context', 
        //         'contextName',
        //         'context',
        //         'fieldName',
        //         'editable',
        //     ]
        // },
    }
}