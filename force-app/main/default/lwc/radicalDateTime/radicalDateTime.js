import { api, LightningElement } from 'lwc';

export default class RadicalDateTime extends LightningElement {
    @api label = ''
    @api value = ''
    @api context = ''
    @api contextName = ''
    @api fieldName = ''

    active = false

    // connectedCallback() {
    //     console.log(JSON.parse(JSON.stringify({
    //         label: this.label, 
    //         placeholder: this.placeholder, 
    //         value: this.value, 
    //         context: this.context, 
    //         contextName: this.contextName, 
    //         fieldName: this.fieldName, 
    //     })))
    // }

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
            type: 'datetime-change',
            value,
			field: this.fieldName,
			relatedTo: this.context,
        }
        
        this.dispatchEvent(
            new CustomEvent('valuechange', {
                detail,
                composed: true,
                bubbles: true,
                cancelable: true,
            })
        )
    }
}