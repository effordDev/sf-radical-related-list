import { api, LightningElement } from 'lwc';

export default class RadicalPicklist extends LightningElement {
    @api fieldName = ''
    @api options = []
    @api record = {}
    @api isEdit = false

    connectedCallback() {
        // console.log(JSON.parse(JSON.stringify(this.options)));
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