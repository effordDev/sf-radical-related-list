import { api, wire, LightningElement } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RadicalNewRecord extends LightningElement {
    @api recordId = ''
    @api sobject = ''
    @api parentField = ''

    active = false

    selectedRecordTypeId = ''

    @wire(getObjectInfo, { objectApiName: '$sobject' }) 
    objectInfo;

    get recordTypeInfos() {
        return this.objectInfo?.data?.recordTypeInfos || {}
    }

    get recordTypeOptions() {

        if (!Object.keys(this.recordTypeInfos).length) {
            return []
        }

        return (Object.keys(this.recordTypeInfos))?.map(_id => {
            return {
                label: this.recordTypeInfos[_id].name,
                value: this.recordTypeInfos[_id].recordTypeId
            } 
        })
    }

    handleNewRecordClick() {
        this.active = true
    }
    handleRecordTypeChange(event) {
        this.selectedRecordTypeId = event.detail.value
    }
    handleClose() {
        this.active = false
    }
    handleSuccess(event) {
        
        this.dispatchEvent(
            new CustomEvent('refresh')
        )

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Record created',
                message: 'Record ID: ' + event.detail.id,
                variant: 'success',
            })
        );
    }
}