import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils'
import { CurrentPageReference } from 'lightning/navigation'

export default class PNavigationMixin extends NavigationMixin(LightningElement) {

    handleHomeClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home'
            }
        })
    }

    handleChatterClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'chatter'
            }
        })
    }

    handleNewRecordClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            }
        })
    }

    handleNewDefaultRecordClick() {
        const defaultValues = encodeDefaultFieldValues({
            FirstName: 'Aseesh',
            LastName: 'Podili'
        })
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        })
    }

    handleListViewClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'list'
            },
            state: { filterName: 'BirthdaysThisMonth' }
        })
    }

    handleFilesClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'ContentDocument',
                actionName: 'home'
            }
        })
    }

    handleRecordViewClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0035g00000thffkAAA',
                objectApiName: 'Contact',
                actionName: 'view'
            }
        })
    }

    handleRecordEditClick() {
        const defaultValues = encodeDefaultFieldValues({
            FirstName: 'Aseesh',
            LastName: 'Podili'
        })
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0035g00000thffkAAA',
                objectApiName: 'Contact',
                actionName: 'edit'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        })
    }

    handleTabClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Practice'
            }
        })
    }

    handleRecordRelationshipClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId: '0015g00000twuPKAAY',
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',
                actionName: 'view'
            }
        })
    }

    handleExternalUrlClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: "https://collaberadigital.com/"
            }
        })
    }

    handleLWCClick() {
        var defination = {
            componentDef: 'c:caseTaskScenario'
        }
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + btoa(JSON.stringify(defination))
            }
        })
    }

    @wire(CurrentPageReference)
    pageRef
    handleCurrentClick() {
        console.log(this.pageRef)
    }
}