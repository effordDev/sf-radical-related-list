public with sharing class RadicalRelatedListHelper {

    public virtual class BaseException extends Exception {}
    public class myException extends BaseException {}

    @AuraEnabled
    public static void saveSobjects(List<Sobject> sobs){
        try {
            update sobs;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static ReturnWrapper getRecords(
        String parentRecordId, 
        String sObjectName, 
        String fieldsList, 
        String isEdit, 
        String grandParentRecordId, 
        String childRecordId, 
        String orderByField, 
        String orderByDirection
    ) {

        system.debug('parentRecordId: ' + parentRecordId);
        system.debug('sObjectName: ' + sObjectName);
        system.debug('fieldsList: ' + fieldsList);
        system.debug('isEdit: ' + isEdit);
        system.debug('grandParentRecordId: ' + grandParentRecordId);
        system.debug('childRecordId: ' + childRecordId);
        system.debug('orderByField: ' + orderByField);
        system.debug('orderByDirection: ' + orderByDirection);

        ReturnWrapper result = new ReturnWrapper();
        List<FieldWrapper> fieldsWP = new List<FieldWrapper>();
        // try {
            Set<String> fields = new Set<String>(fieldsList.deleteWhitespace().split(','));
            Schema.SObjectType objectName = Schema.getGlobalDescribe().get(sObjectName);
            Map<String,Schema.SObjectField> sObjectFieldMap = objectName.getDescribe().fields.getMap();
 
            if(objectName == null) {
                throw new MyException('Object API Name is Not Valid');
            }
 
            Boolean childObjectFlag = false;
            String relationshipName = '';
            for(Schema.ChildRelationship f : Id.valueof(parentRecordId).getSobjectType().getDescribe().getChildRelationships()) {
                if(String.valueof(f.getChildSObject()).toLowerCase() == sObjectName.toLowerCase()) {
                    childObjectFlag = true;
                    relationshipName = String.valueof(f.getField());
                }
            }
 
            if(!childObjectFlag) {
                throw new MyException('Object you selected is not a child object of this record. Object Name : ' + sObjectName);
            }

            Set<FieldDefinition> fieldDefinitionList = new Set<FieldDefinition>();

            // Query for fields by DeveloperName
            List<FieldDefinition> developerNameMatches = [
                SELECT DeveloperName, ExtraTypeInfo, QualifiedApiName  
                FROM FieldDefinition 
                WHERE EntityDefinitionId = : sObjectName
                AND DeveloperName IN : fields
            ];

            // Query for fields by QualifiedApiName
            List<FieldDefinition> qualifiedApiNameMatches = [
                SELECT DeveloperName, ExtraTypeInfo, QualifiedApiName  
                FROM FieldDefinition 
                WHERE EntityDefinitionId = : sObjectName
                AND QualifiedApiName IN : fields
            ];

            // Merge the results
            fieldDefinitionList.addAll(developerNameMatches);
            fieldDefinitionList.addAll(qualifiedApiNameMatches);

            Map<String, String> fieldApiExtraTypeInfoMap = new Map<String, String>();
            for (FieldDefinition fd : fieldDefinitionList) {
                if (fd.QualifiedApiName != null && fd.ExtraTypeInfo != null) {
                    fieldApiExtraTypeInfoMap.put(fd.QualifiedApiName, fd.ExtraTypeInfo);
                }
            }
 
            for(String field : fields) {

                Schema.DescribeFieldResult fieldDesc = sObjectFieldMap.get(field.trim().toLowerCase()).getDescribe();

                if(!sObjectFieldMap.keySet().contains(field.trim().toLowerCase())) {
                    throw new MyException('Fields API Name is Not Valid. Field : ' + field.trim());
                }
                if(String.valueof(fieldDesc.getType()) == 'LOCATION') {
                    throw new MyException('Geo Location Fields are not supported : Field ' + field.trim());
                }
                if(String.valueof(fieldDesc.getType()) == 'PICKLIST') {
                    fieldsWP.add(
                        new FieldWrapper(
                            fieldDesc.getLabel(), 
                            fieldDesc.getName(), 
                            String.valueof(fieldDesc.getType()), 
                            apexTypetoJSType.get(String.valueof(fieldDesc.getType())), 
                            fieldDesc.isUpdateable(), 
                            getPicklistValues(sObjectName, 
                            fieldDesc.getName())
                        )
                    );
                } else if (
                    String.valueof(fieldDesc.getType()) == 'STRING'
                    && fieldDesc.isCalculated() 
                    && fieldDesc.getCalculatedFormula().contains('IMAGE(')
                ) {
                    //is formula and iamge
                    fieldsWP.add(
                        new FieldWrapper(
                            fieldDesc.getLabel(), 
                            fieldDesc.getName(), 
                            'RICHTEXTAREA', 
                            'richtextarea', 
                            fieldDesc.isUpdateable(), 
                            null
                        )
                    );

                } else {

                    String dataType = '';
                    String ltngType = '';

                    system.debug(fieldApiExtraTypeInfoMap);
                    system.debug(fieldDesc.getName());

                    if (fieldApiExtraTypeInfoMap.containsKey(fieldDesc.getName())) {
                        dataType = fieldApiExtraTypeInfoMap.get(fieldDesc.getName()).toUpperCase();
                        ltngType = dataType;
                    } else {
                        dataType = String.valueof(fieldDesc.getType());
                        ltngType = apexTypetoJSType.get(String.valueof(fieldDesc.getType()));
                    }

                    fieldsWP.add(
                        new FieldWrapper(
                            fieldDesc.getLabel(), 
                            fieldDesc.getName(), 
                            dataType, 
                            ltngType.toLowerCase(), 
                            fieldDesc.isUpdateable(), 
                            null
                        )
                    );
                }
            }
 
            Boolean isGrandParentMatch = (grandParentRecordId != null && grandParentRecordId != '' && childRecordId != null && childRecordId != '') ? true : false; 

            String currentObjName = Id.valueof(parentRecordId).getSObjectType().getDescribe().getName();

            sObject grandParentRecord;
            String parentMatchId;
            
            if (isGrandParentMatch) {
                grandParentRecord = Database.query('SELECT Id, ' + grandParentRecordId + ' FROM ' + currentObjName + ' WHERE Id = \'' + parentRecordId + '\'' + ' LIMIT 1');
                parentMatchId = String.valueof(grandParentRecord.get(grandParentRecordId));
            }
            
            String query = 'SELECT ' + String.join(new List<String>(fields), ',');

            if(!fields.contains('id')) {
                query += ', id';
            }

            string sortOrder = !String.isBlank( orderByDirection ) ? orderByDirection : 'ASC';
            string orderBy = !String.isBlank( orderByField ) ? ' ORDER BY ' +orderByField + ' ' + sortOrder : '';
            if (isGrandParentMatch) {
                query += ' FROM ' + objectName + ' WHERE ' + childRecordId + ' = \''+ parentMatchId + '\'' + orderBy + ' LIMIT 49999';
            } else {
                query += ' FROM ' + objectName + ' WHERE '+ relationshipName + ' = \'' + parentRecordId + '\'' + orderBy + ' LIMIT 49999';
            }

            system.debug('query');
            system.debug(query);

            result.fieldsList = fieldsWP;
            result.recordList = Database.query(query);
            result.parentMatchId = parentMatchId;
            return result;
        // } catch (Exception err) {
        //     throw new AuraHandledException(err.getMessage());
        // }
    }
 
    private static List<PicklistOptions> getPicklistValues(String objectName, String fieldName) {
        List<PicklistOptions> picklistValues = new List<PicklistOptions>();
        List<Schema.PicklistEntry> ple = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap().get(fieldName).getDescribe().getPicklistValues();
        for(Schema.PicklistEntry pkValue : ple) {
            picklistValues.add( new PicklistOptions(pkValue.getLabel(), pkValue.getValue()) );
        }
        return picklistValues;
    }
 
    @AuraEnabled
    public static String saveRecord(String objectName, String recordData) {
        try {
            Map<String, Object> fieldMap = (Map<String, Object>)JSON.deserializeUntyped(recordData);
            Schema.SObjectType targetType = Schema.getGlobalDescribe().get(objectName);
            SObject newSobject = targetType.newSObject();
            for (String key : fieldMap.keySet()) {
                Object value = fieldMap.get(key);
                Schema.DisplayType valueType = targetType.getDescribe().fields.getMap().get(key).getDescribe().getType();
                if (value instanceof String && valueType != Schema.DisplayType.String) {
                    String svalue = (String)value;
                    if (valueType == Schema.DisplayType.Date)
                        newSobject.put(key, Date.valueOf(svalue));
                    else if(valueType == Schema.DisplayType.DateTime)
                        newSobject.put(key, DateTime.valueOf(svalue));
                    else if (valueType == Schema.DisplayType.Percent || valueType == Schema.DisplayType.Currency)
                        newSobject.put(key, svalue == '' ? null : Decimal.valueOf(svalue));
                    else if (valueType == Schema.DisplayType.Double)
                        newSobject.put(key, svalue == '' ? null : Double.valueOf(svalue));
                    else if (valueType == Schema.DisplayType.Integer)
                        newSobject.put(key, Integer.valueOf(svalue));
                    else if (valueType == Schema.DisplayType.Base64)
                        newSobject.put(key, Blob.valueOf(svalue));
                    else if (valueType == Schema.DisplayType.Time)
                        newSobject.put(key, Time.newInstance(Integer.valueOf(svalue.split(':')[0]), Integer.valueOf(svalue.split(':')[1]), 00, 00));
                    else
                        newSobject.put(key, svalue);
                }
                else
                    newSobject.put(key, value);
            }
            upsert newSobject;
            return 'success';
        } catch(Exception err) {
            system.debug(err.getMessage());
            throw new AuraHandledException(err.getMessage());
        }
    }

    @AuraEnabled
    public static void updateSobs(List<Sobject> sobs) {
        try {
            update sobs;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
 
    @AuraEnabled
    public static void deleteRecord( Id recordId ) {
        if( recordId != null ) {            
            Database.delete(recordId);
        }
    }

    public static Map<String, String> apexTypetoJSType = new Map<String, String> {
        'ID' => 'id',
        'PHONE' => 'tel',
        'URL' => 'url',
        'EMAIL' => 'email',
        'ADDRESS' => 'text',
        'TEXTAREA' => 'textarea',
        'STRING' => 'text',
        'REFERENCE' => 'reference',
        'MULTIPICKLIST' => 'text',
        'PICKLIST' => 'picklist',
        'BOOLEAN' => 'checkbox',
        'DATE' => 'date',
        'DATETIME' => 'datetime',
        'TIME' => 'time',
        'DOUBLE' => 'number',
        'INTEGER' => 'number',
        'CURRENCY' => 'number',
        'PERCENT' => 'number'
    };
    
    public class ReturnWrapper {
        @AuraEnabled public List<sObject> recordList;
        @AuraEnabled public List<FieldWrapper> fieldsList;
        @AuraEnabled public String parentMatchId {get;set;}
    }
    
    public class FieldWrapper {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        @AuraEnabled public String dataType;
        @AuraEnabled public String ltngType;
        @AuraEnabled public Boolean isEditable;
        @AuraEnabled public List<PicklistOptions> picklistValues;
        public FieldWrapper(String label, String value, String dataType, String ltngType, Boolean isEditable, List<PicklistOptions> picklistValues) {
            this.label = label;
            this.value = value;
            this.dataType = dataType;
            this.ltngType = ltngType;
            this.isEditable = isEditable;
            this.picklistValues = picklistValues;
        }
    }
 
    public class PicklistOptions {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
        public PicklistOptions(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}