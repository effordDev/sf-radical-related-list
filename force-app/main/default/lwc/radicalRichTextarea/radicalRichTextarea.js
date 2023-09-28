import { api, LightningElement } from 'lwc';

export default class RadicalRichTextarea extends LightningElement {
    @api fieldName = ''
    @api record = {}
    @api isEdit = false

    value = ''

    get recordValue() {
        return this.value || this.record[this.fieldName]
    }
    get disabled() {
        return !this.isEdit
    }

    handleChange(event) {
        this.value = event.detail.value

        this.dispatchEvent(
            new CustomEvent('cellchange', {
                bubbles: true,
                composed: true,
                detail: {
                    value: this.value,
                    rowId: this.record.Id,
                    fieldName: this.fieldName
                }
            })
        )
    }
}