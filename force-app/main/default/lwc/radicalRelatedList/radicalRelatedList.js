import { api, track, LightningElement } from 'lwc';

import getRecords from '@salesforce/apex/RadicalRelatedListHelper.getRecords'

export default class RadicalRelatedList extends LightningElement {
    @api recordId = ''
    @api headerName = ''
    @api subHeader = ''
    @api parentRecord = ''
    @api childRecordId = ''
    @api showNewButton = false
    @api showDeleteButton = false
    @api objectName = ''
    @api fieldsName = ''
    // @api isEditable = ''
    @api iconName = ''
    // @api fieldToWriteRecordIdTo = ''
    @api filter = ''
    @api orderByField = ''
    @api orderByDirection = ''
    
    @track draftValues = []
    @track recordsList = []
    lastSavedRecords = []

    config = {}
    isLoading = false

    connectedCallback() {
        console.log(this.filter)
        this.fetchRecords()
    }

    get fieldsList() {
        return this.config?.fieldsList || []
        // return [...this.config?.fieldsList, { label:'Edit' , value:'edit' }] || []
    }
    // get recordList() {
    //     return this.config?.recordList || []
    // }

    async fetchRecords(init) {
        try {
            this.isLoading = true

            this.config = await getRecords({
                parentRecordId: this.recordId,
                sObjectName: this.objectName,
                fieldsList: this.fieldsName,
                // isEdit: this.isEditable,
                grandParentRecordId: this.parentRecord,
                childRecordId: this.childRecordId,
                filter: this.filter,
                orderByField: this.orderByField,
                orderByDirection: this.orderByDirection
            })
    
            this.recordsList = this.config?.recordList || []
            
            this.lastSavedRecords = this.config?.recordList
            
            console.log(
                JSON.parse(JSON.stringify(this.config))
            )
        } catch (error) {
            console.error(error)
        } finally {
            this.isLoading = false
        }
    }

    handleRefresh() {
        console.log('refresh');
        this.fetchRecords()
    }

    handleDelete(event) {
        const deletedRecordId = event.detail.value

        this.recordsList = this.recordsList.filter(record => record.Id != deletedRecordId)
    }

    async handleSave(event) {
        this.draftValues = event.detail.draftValues

        await this.saveSobs(this.draftValues)
        await this.fetchRecords()
        console.log(JSON.parse(JSON.stringify(this.draftValues)))
        
        this.draftValues = []
    }

    handleCancel() {
        this.records = this.lastSavedRecords
    }

    handleCellChange(event) {
        
        // this.draftValues = event.detail.draftValues
        console.log(JSON.parse(JSON.stringify(event.detail.draftValues)))

        const updatedRow = event.detail.draftValues

        const match = x => x.Id === updatedRow.Id

        if (this.draftValues.some(match)) {
            this.draftValues.forEach(draft => {
                if (match(draft)) {
                    draft[field] = value
                }
            })
        } else {
            this.draftValues = [...this.draftValues, {
                Id: relatedTo,
                [field]: value
            }]
        }
    }
    
}