import { api, track, LightningElement } from 'lwc';
import updateSobs from '@salesforce/apex/RadicalRelatedListHelper.updateSobs';
import { updateRecord } from "lightning/uiRecordApi";

export default class RadicalDatatableRow extends LightningElement {
    @api recordId = ''
    @api fields = []
    @api record = {}

    updatedRecord = {}

    @track error = {}

    isSaving = false
    editState = false

    async handleSaveClick(event) {

        this.editState = false
        this.isSaving = true

        this.updatedRecord.Id = this.record.Id

        try {
            await updateRecord({
                fields: this.updatedRecord
            })
        } catch (error) {
            console.error(error)
        } finally {
            this.isSaving = false
        }
    }
    
    handleCancelClick(event) {
        // this.editState = this.editState ? false : true   
        this.editState = false
        console.log('cancel')
    }

    handleEditClick(event) {
        this.editState = true
        console.log('edit');
    }

    handleCellChange(event) {

        const { 
            fieldName, 
            rowId,
            value
        } = event.detail

        this.updatedRecord[fieldName] = value

        console.log(JSON.parse(JSON.stringify(this.updatedRecord)))
    }

    get isEdit() {
        return this.editState
    }
}