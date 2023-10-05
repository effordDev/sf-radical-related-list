import { api, track, LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from 'lightning/uiRecordApi';
// import updateSobs from '@salesforce/apex/RadicalRelatedListHelper.updateSobs';
import { updateRecord } from "lightning/uiRecordApi";

export default class RadicalDatatableRow extends LightningElement {
    @api recordId = ''
    @api fields = []
    @api record = {}
    @api childSobject = ''
    @api showDeleteButton = false
    // _record = {}
    updatedRecord = {}

    @track error = {}

    isSaving = false
    editState = false

    // @api get record() {
    //     return this._record
    // }
    // set record(value) {
    //     this._record = Object.assign({}, value)
    // }

    async handleSaveClick(event) {

        this.editState = false
        this.isSaving = true

        this.updatedRecord.Id = this.record.Id

        try {
            await updateRecord({
                fields: this.updatedRecord
            })

            this.dispatchEvent(
                new CustomEvent('refresh', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: this.record.Id
                    }
                })
            )

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

        this.record = Object.assign({}, this.record);

        console.log(JSON.parse(JSON.stringify(this.record)))
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

    async handleDeleteClick() {
        
        try {

            if (!await LightningConfirm.open({
                message: `Are you sure you want to delete ${this.record.Id}?`,
                // variant: 'headerless',
                label: 'Confirm deletion',
                theme: 'alt-inverse'
                // setting theme would have no effect
            })) {
                return
            }

            console.log('delete ', this.record.Id)

            this.isSaving = true
            
            await deleteRecord(this.record.Id)

            this.dispatchEvent(
                new CustomEvent('delete', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: this.record.Id
                    }
                })
            )
        } catch (error) {
            console.error(error)
        } finally {
            this.isSaving = false
        }
    }

    get isEdit() {
        return this.editState
    }
}