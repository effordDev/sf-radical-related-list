import { api, LightningElement } from 'lwc';

export default class RadicalPicklist extends LightningElement {
    @api label = ''
    @api placeholder = ''
    @api options = []
    @api value = ''
    @api context = ''
    @api contextName = ''
    @api fieldName = ''

    active = false

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

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();

        this.active = true
    }

    custom__handleChange(event) {
        event.preventDefault();

        this.active = false

        const { value } = event.target;

        const detail = {
            type: 'picklist-change',
            value,
			field: this.fieldName,
			relatedTo: this.context,
        }
        
        this.dispatchEvent(new CustomEvent('valuechange', {
            detail,
            composed: true,
            bubbles: true,
            cancelable: true,
        }))
    }
}