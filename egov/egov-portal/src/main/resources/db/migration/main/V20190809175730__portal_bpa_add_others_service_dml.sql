Insert into EGP_PORTALSERVICE (id,module,code,sla,version,url,isactive,name,userservice,businessuserservice,helpdoclink,createdby,createddate,lastmodifieddate,lastmodifiedby) values(nextval('seq_egp_portalservice'),(select id from eg_module where name='BPA'),'Others',null,0,'/bpa/application/citizen/others-form','true','Others','false','true','/bpa/application/citizen/others-form',1,now(),now(),1);