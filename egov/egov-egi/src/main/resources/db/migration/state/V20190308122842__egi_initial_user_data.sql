
-----------------START--------------------

INSERT INTO eg_user (id, title, salutation, dob, locale, username, password, pwdexpirydate, mobilenumber, altcontactnumber, emailid, createddate, lastmodifieddate, createdby, lastmodifiedby, active, name, gender, pan, aadhaarnumber, type, version, guardian, guardianrelation,tenantId) 
VALUES (1, NULL, NULL, NULL, 'en_IN', 'egovernments', '$2a$10$uheIOutTnD33x7CDqac1zOL8DMiuz7mWplToPgcf7oxAI9OzRKxmK', '2020-12-31 00:00:00', NULL, NULL, NULL, '2010-01-01 00:00:00', '2015-01-01 00:00:00', 1, 1, true, 'Admin', NULL, NULL, NULL, 'SYSTEM', 0, NULL, NULL,'state');
INSERT INTO eg_user (id, title, salutation, dob, locale, username, password, pwdexpirydate, mobilenumber, altcontactnumber, emailid, createddate, lastmodifieddate, createdby, lastmodifiedby, active, name, gender, pan, aadhaarnumber, type, version, guardian, guardianrelation,tenantId) 
VALUES (2, NULL, 'MR.', NULL, 'en_IN', 'anonymous', 'XYZ', '2099-01-01 00:00:00', NULL, NULL, NULL, '2010-01-01 00:00:00', '2015-01-01 00:00:00', 1, 1, true, 'Anonymous', NULL, NULL, NULL, 'SYSTEM', 0, NULL, NULL,'state');
INSERT INTO eg_user (id, title, salutation, dob, locale, username, password, pwdexpirydate, mobilenumber,altcontactnumber, emailid, createddate, lastmodifieddate, createdby, lastmodifiedby, active, name, gender,pan, aadhaarnumber, type, version, guardian, guardianrelation,tenantId)
VALUES (3, NULL, 'MR.', NULL, 'en_IN', 'system', 'NONE', '2010-01-01 00:00:00', NULL, NULL,NULL, '2010-01-01 00:00:00', '2015-01-01 00:00:00', 1, 1, true, 'System', NULL, NULL, NULL, 'SYSTEM', 0, NULL, NULL,'state');

------------------END---------------------