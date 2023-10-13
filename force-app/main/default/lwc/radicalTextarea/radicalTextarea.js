import {api, track, LightningElement } from 'lwc';

export default class RadicalTextarea extends LightningElement {

    @api fieldName = ''
    // @api record = {}
    @api isEdit = false

    @track _record = {}

    show = false

    @api get record() {
        return this._record
    }
    set record(value) {
        this._record = Object.assign({}, value)
    }

    get recordValue() {
        return this.record[this.fieldName] || ''
    }
    get disabled() {
        return !this.isEdit
    }

    get disabledValue() {
        if (this.recordValue.length >= 50) {
            return this.recordValue?.substring(0, this.show ? this.recordValue.length : 50) + (!this.show && !!this.isTruncated && '...') || ''
        }
        return this.recordValue
    }

    get isTruncated() {
        return this.recordValue.length > 50
    }

    get showLabel() {
        return this.show ? 
        'Hide' :
        'Show More...'
    }

    handleShowMoreClick() {
        this.show = this.show ? false : true
    }

    handleChange(event) {

        const value = event.detail.value

        this.record[this.fieldName] = value

        this.dispatchEvent(
            new CustomEvent('cellchange', {
                bubbles: true,
                composed: true,
                detail: {
                    value,
                    rowId: this.record.Id,
                    fieldName: this.fieldName
                }
            })
        )
    }
}