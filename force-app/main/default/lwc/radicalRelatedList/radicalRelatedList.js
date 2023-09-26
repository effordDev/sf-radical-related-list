import { api, track, LightningElement } from 'lwc';

import getRecords from '@salesforce/apex/RadicalRelatedListHelper.getRecords'
import saveSobjects from '@salesforce/apex/RadicalRelatedListHelper.saveSobjects'
export default class RadicalRelatedList extends LightningElement {
    @api recordId = ''
    @api headerName = ''
    @api subHeader = ''
    @api parentRecord = ''
    @api childRecordId = ''
    @api objectName = ''
    @api fieldsName = ''
    @api isEditable = ''
    @api iconName = ''
    @api fieldToWriteRecordIdTo = ''
    @api orderByField = ''
    @api orderByDirection = ''
    
    @track draftValues = []
    @track records = []
    lastSavedRecords = []

    config = {}
    isLoading = false
    isComponentLoaded = false

    // renderedCallback() {
    //     if (!this.isComponentLoaded) {
    //         /* Add Click event listener to listen to window click to reset the picklist selection 
    //         to text view if context is out of sync*/
    //         window.addEventListener('click', (evt) => {
    //             this.handleWindowOnclick(evt);
    //         });
    //         this.isComponentLoaded = true;
    //     }
    // }

    connectedCallback() {
        this.fetchRecords()
    }

    get fieldsList() {
        return this.config?.fieldsList || []
    }
    // get records() {
    //     return this.config?.recordList || []
    // }
    get cols() {
        return this.fieldsList.map(fieldData => {
            const item = {
                label: fieldData?.label,
                fieldName: fieldData?.value,
                type: fieldData?.ltngType,
                editable: fieldData?.isEditable
            }

            if (fieldData?.ltngType === 'picklist') {

                item.typeAttributes = {
                    placeholder: 'Select Value',
                    label: fieldData?.label,
                    value: { fieldName: fieldData?.value }, // default value for picklist,
                    fieldName: fieldData?.value,
                    options: fieldData.picklistValues,
                    context: { fieldName: 'Id' },
                    contextName: 'Id'
                }
            } else if (fieldData?.ltngType === 'datetime') {

                item.typeAttributes = {
                    label: fieldData?.label,
                    value: { fieldName: fieldData?.value }, // default value for picklist,
                    fieldName: fieldData?.value,
                    context: { fieldName: 'Id' },
                    contextName: 'Id'
                }
            } else if (fieldData?.ltngType === 'plaintextarea') {

                item.typeAttributes = {
                    label: fieldData?.label,
                    value: { fieldName: fieldData?.value }, // default value for picklist,
                    fieldName: fieldData?.value,
                    context: { fieldName: 'Id' },
                    contextName: 'Id'
                }
            } else if (fieldData?.ltngType === 'richtextarea') {

                item.typeAttributes = {
                    label: fieldData?.label,
                    value: { fieldName: fieldData?.value }, // default value for picklist,
                    fieldName: fieldData?.value,
                    context: { fieldName: 'Id' },
                    contextName: 'Id',
                    editable: fieldData.isEditable
                }
            } else if (fieldData?.ltngType === 'checkbox') {

                item.typeAttributes = {
                    label: fieldData?.label,
                    value: { fieldName: fieldData?.value }, // default value for picklist,
                    fieldName: fieldData?.value,
                    context: { fieldName: 'Id' },
                    contextName: 'Id',
                    editable: fieldData.isEditable
                }
            } else if (fieldData?.ltngType === 'reference') {

                item.typeAttributes = {
                    label: fieldData?.label,
                    value: { fieldName: fieldData?.value }, // default value for picklist,
                    fieldName: fieldData?.value,
                    childSobject: this.objectName,
                    context: { fieldName: 'Id' },
                    contextName: 'Id',
                    editable: fieldData.isEditable
                }
            }

            return item
        })
    }

    async fetchRecords(init) {
        try {
            this.isLoading = true

            this.config = await getRecords({
                parentRecordId: this.recordId,
                sObjectName: this.objectName,
                fieldsList: this.fieldsName,
                isEdit: this.isEditable,
                grandParentRecordId: this.parentRecord,
                childRecordId: this.childRecordId,
                orderByField: this.orderByField,
                orderByDirection: this.orderByDirection
            })
    
            this.records = this.config?.recordList || []
            
            this.lastSavedRecords = this.records
            
            console.log(
                JSON.parse(JSON.stringify(this.config))
            )
        } catch (error) {
            console.error(error)
        } finally {
            this.isLoading = false
        }
    }

    async saveSobs(sobs) {
        try {
            this.isLoading = true

            await saveSobjects({
                sobs
            })
        } catch (error) {
            console.error(error)
        } finally {
            this.isLoading = false
        }
    }

    async handleSave(event) {
        this.draftValues = event.detail.draftValues

        await this.saveSobs(this.draftValues)
        await this.fetchRecords()
        console.log(JSON.parse(JSON.stringify(this.draftValues)))
        
        this.draftValues = []
    }

    // handleWindowOnclick(context) {
    //     this.resetPopups('c-datatable-picklist', context);
    // }

    // resetPopups(markup, context) {
    //     let elementMarkup = this.privateChildren[markup];
    //     if (elementMarkup) {
    //         Object.values(elementMarkup).forEach((element) => {
    //             element.callbacks.reset(context);
    //         });
    //     }
    // }

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

    handleValueChange(event) {
        console.log(JSON.parse(JSON.stringify(event.detail)))

        if (!event?.detail?.type) {
            return
        }

        const {
            type,
            relatedTo,
            field,
            value
        } = event.detail

        if ([
            'picklist-change',
            'datetime-change',
            'textarea-change',
            'rich-textarea-change',
            'checkbox-change',
        ].includes(type)) {

            console.log(JSON.parse(JSON.stringify({
                type,
                relatedTo,
                field,
                value
            })))

            this.setClassesOnData(
                relatedTo,
                field,
                'slds-cell-edit slds-is-edited'
            );

            const match = x => x.Id === relatedTo

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
            
            this.records = this.records.map(record => {
                if (match(record)) {
                    record[field] = value
                }
                return record
            })

            console.log(JSON.parse(JSON.stringify(this.draftValues)))
            console.log(JSON.parse(JSON.stringify(this.records)))
        }
    }

    // handleEdit(event) {
    //     event.preventDefault();

    //     let dataRecieved = event.detail.data;

    //     this.handleWindowOnclick(dataRecieved.context);

    //     switch (dataRecieved.label) {
    //         case 'Stage':
    //             this.setClassesOnData(
    //                 dataRecieved.context,
    //                 'stageClass',
    //                 'slds-cell-edit'
    //             );
    //             break;
    //         default:
    //             this.setClassesOnData(dataRecieved.context, '', '');
    //             break;
    //     };
    // }

    setClassesOnData(id, fieldName, fieldValue) {
        this.records = JSON.parse(JSON.stringify(this.records));
        this.records.forEach(detail => {
            if (detail.Id === id) {
                detail[fieldName] = fieldValue;
            }
        });
    }
}