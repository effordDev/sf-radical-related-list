import { api, LightningElement } from 'lwc';

export default class RadicalDatatableCell extends LightningElement {

    @api recordId = ''
    @api childSobject = ''
    @api field = {}
    @api record = {}
    @api editState = false

    get fieldAPIName() {
        return this.field?.value
    }

    // get recordValue() {
    //     return this.record[this.fieldAPIName]
    // }
    get options() {
        return this.field?.picklistValues || []
    }
    get fieldIsUpdatable() {
        return this.field?.isEditable
    }
    get isEdit() {
        return this.editState && this.fieldIsUpdatable
    }
    get ltngType() {
        return this.field?.ltngType
    }
    get dataType() {
        return this.field?.dataType
    }
    get isText() {
        return this.ltngType === 'text' ||
        this.ltngType === 'tel' ||
        this.ltngType === 'email' 
    }
    get isNumber() {
        return this.ltngType === 'number' && this.dataType === 'DOUBLE'
    }
    get isCurrency() {
        return this.ltngType === 'number' && this.dataType === 'CURRENCY'
    }
    get isCheckbox() {
        return this.ltngType === 'checkbox'
    }
    get isDateTime() {
        return this.ltngType === 'datetime'
    }
    get isDate() {
        return this.ltngType === 'date'
    }
    get isPicklist() {
        return this.ltngType === 'picklist'
    }
    get isRichText() {
        return this.ltngType === 'richtextarea'
    }
    get isTextarea() {
        return this.ltngType === 'plaintextarea'
    }
    get isReference() {
        return this.ltngType === 'reference'
    }
}