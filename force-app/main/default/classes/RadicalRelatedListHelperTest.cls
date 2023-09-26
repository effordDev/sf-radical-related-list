@isTest
public with sharing class RadicalRelatedListHelperTest {
    @testsetup
    public static void setupData() {
        //Accounts
        list<Account> accountListToInsert = new list<Account>();
        		Account accObj1 = new Account();
        		accObj1.Name = 'Test Account1';
        	accountListToInsert.add(accObj1);
        insert accountListToInsert;
        
        //Opportunities
        Opportunity opp = new Opportunity();
            opp.Name = 'Test Opp';
            opp.Account = accObj1;
            opp.StageName = '2. Qualify the Hurt';
            opp.CloseDate = system.today();
        insert opp;
    }
    
    public static testmethod void test() {
        Account acct =[SELECT Id FROM Account limit 1];
        string myAcc = '{"Id":"'+acct.Id+'","Name":"test acc"}';
        Test.startTest();
        system.debug('acct--> '+acct);
        RadicalRelatedListHelper.ReturnWrapper result = RadicalRelatedListHelper.getRecords(
            acct.Id,'Opportunity',
            'Name,CloseDate,Probability,StageName,IQscore,Amount,IsPrivate',
            'true', '', '', '', ''
        );
        String saveResult1 = RadicalRelatedListHelper.saveRecord('Account',myAcc);

        RadicalRelatedListHelper.deleteRecord( acct.Id );
        Test.stopTest();
    }
}