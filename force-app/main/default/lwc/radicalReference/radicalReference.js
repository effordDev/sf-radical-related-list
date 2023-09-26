import { api, wire, LightningElement } from 'lwc';
import { getRecord } from "lightning/uiRecordApi";

export default class RadicalReference extends LightningElement {

    @api label = ''
    @api value = ''
    @api childSobject = ''
    @api context = ''
    @api contextName = ''
    @api fieldName = ''

    active = false

    @wire(getRecord, { recordId: '$value', fields: '$fields' })
    record;

    // renderedCallback() {
    //     let container = this.template.querySelector('div.container');
        
    //     container?.focus();

    //     window.addEventListener('click', (evt) => {
    //         if (container == undefined){
    //             this.active = false;
    //         }
    //     });
    // }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();

        this.active = true

        // this.dispatchEvent(new CustomEvent('edit', {
        //     composed: true,
        //     bubbles: true,
        //     cancelable: true,
        //     detail: {
        //         data: { 
        //             context: this.context,
        //             value: this.value, 
        //             label: label, 
        //             name: this.childSobject 
        //         }
        //     }
        // }));
    }

    reset = (context) => {
        if (this.context !== context) {
            this.active = false;
        }
    }

    custom__handleChange(event) {
        event.preventDefault();

        this.value = event.target.value

        // this.active = this.value != null ? false : true;

        const detail = {
            type: 'reference-change',
            value: this.value,
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