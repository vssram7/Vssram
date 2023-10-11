global with sharing class fetchContacts { 

    // apex method to fetch contact records from salesforce database 
    @AuraEnabled(cacheable=true)
    global static list<Contact> getContacts(){        
            list<Contact> lstContact = [SELECT id,name,email,phone,title FROM Contact LIMIT 5000];
            return lstContact;        
    }
    
}