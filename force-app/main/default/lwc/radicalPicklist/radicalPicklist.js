import { api, track, LightningElement } from 'lwc';

export default class RadicalPicklist extends LightningElement {
    @api fieldName = ''
    @api options = []
    // @api record = {}
    @api isEdit = false

    @track _record = {}

    @api get record() {
        return this._record
    }
    set record(value) {
        this._record = Object.assign({}, value)
    }

    get opts() {

        if (Array.isArray(this.options)) {
            return this. options
        }
        
        const keys = Object.keys(this.options)

        if (!keys.length) {
            return []
        }

        return keys.map(key => {
            return this.options[key]
        })
    }

    get recordValue() {
        return this.record[this.fieldName]
    }
    get disabled() {
        return !this.isEdit
    }

    handleChange(event) {
        console.log(event.detail.value)
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