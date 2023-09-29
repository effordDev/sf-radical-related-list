import { api, track, LightningElement } from 'lwc';

export default class RadicalDate extends LightningElement {
    @api fieldName = ''
    // @api record = {}
    @api isEdit = false
    @track _record = {}

    @api get record() {
        return this._record
    }
    set record(value) {
        this._record = Object.assign({}, value)
    }

    get recordValue() {
        return this.record[this.fieldName]
    }
    get disabled() {
        return !this.isEdit
    }

    handleChange(event) {
        const value = event.detail.value

        this.record[this.fieldName] = value

        // console.log(JSON.parse(JSON.stringify(this.record)))

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