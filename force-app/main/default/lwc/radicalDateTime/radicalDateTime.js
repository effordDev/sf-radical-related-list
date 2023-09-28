import { api, LightningElement } from 'lwc';

export default class RadicalDateTime extends LightningElement {
    @api fieldName = ''
    @api record = {}
    @api isEdit = false
    
    get recordValue() {
        return this.record[this.fieldName]
    }
    get disabled() {
        return !this.isEdit
    }

    handleChange(event) {
        console.log(event.detail.value)
        const value = event.detail.value

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