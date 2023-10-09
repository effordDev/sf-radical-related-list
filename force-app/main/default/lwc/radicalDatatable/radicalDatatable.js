import { api, track, LightningElement } from 'lwc';

export default class RadicalRelatedList extends LightningElement {
    @api recordId
    @api records = []
    @api fields = []
    @api lastSavedRecords = []
    @api childSobject = ''
    @api showDeleteButton = false

    // fixedWidth = 'fit-content'
    fixedWidth = 'width:15rem;'

    tableCol
    mouseDown = false
    _x = 0

    handleMouseUp(element) {
        this.mouseDown = false
    }
 
    handleMouseDown(element) {
        
        const currentElement = element.target

        console.log(currentElement.className.includes('radical_resizable__divider'))

        if (!currentElement.className.includes('radical_resizable__divider')) {
            return
        }

        let col = currentElement
        while (col.tagName !== "TH") {
            col = col.parentNode;
        }

        this.tableCol = col

        this.mouseDown = true
        this._x = element.clientX
    }
 
    handleMouseMove(element) {

        if (!element.which === 1 || !this.mouseDown) {
            return 
        }

        const diff = element.clientX - this._x

        if (diff === 0) {
            return 
        }

        const prevWidth = Number(this.tableCol.offsetWidth)
        
        const w = prevWidth + diff

        if (w <= 150) {
            return
        }
        this.tableCol.style.width = w + 'px'

        this._x = element.clientX 
    }
 
    handleDBLClickResizable() {
        console.log('dblclick')
    }
}