import { api, LightningElement } from 'lwc';

export default class RadicalRichTextarea extends LightningElement {
    @api label = ''
    @api value = ''
    @api context = ''
    @api contextName = ''
    @api fieldName = ''
    @api isEditable = false

    active = false

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();

        this.active = true
    }

    handleChange(event) {
        this.value = event.detail.value
    }

    custom__handleChange(event) {
        event.preventDefault();

        this.active = false

        // const { value } = event.target;

        const detail = {
            type: 'rich-textarea-change',
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