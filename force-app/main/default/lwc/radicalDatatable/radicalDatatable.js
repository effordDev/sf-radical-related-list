import { api, track, LightningElement } from 'lwc';

export default class RadicalRelatedList extends LightningElement {
    @api recordId
    @api fields = []
    @api records = []
    @api lastSavedRecords = []
}