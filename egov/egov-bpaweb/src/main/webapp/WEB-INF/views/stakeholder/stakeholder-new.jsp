<%--
  ~    eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
  ~    accountability and the service delivery of the government  organizations.
  ~
  ~     Copyright (C) 2017  eGovernments Foundation
  ~
  ~     The updated version of eGov suite of products as by eGovernments Foundation
  ~     is available at http://www.egovernments.org
  ~
  ~     This program is free software: you can redistribute it and/or modify
  ~     it under the terms of the GNU General Public License as published by
  ~     the Free Software Foundation, either version 3 of the License, or
  ~     any later version.
  ~
  ~     This program is distributed in the hope that it will be useful,
  ~     but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~     GNU General Public License for more details.
  ~
  ~     You should have received a copy of the GNU General Public License
  ~     along with this program. If not, see http://www.gnu.org/licenses/ or
  ~     http://www.gnu.org/licenses/gpl.html .
  ~
  ~     In addition to the terms of the GPL license to be adhered to in using this
  ~     program, the following additional terms are to be complied with:
  ~
  ~         1) All versions of this program, verbatim or modified must carry this
  ~            Legal Notice.
  ~            Further, all user interfaces, including but not limited to citizen facing interfaces,
  ~            Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
  ~            derived works should carry eGovernments Foundation logo on the top right corner.
  ~
  ~            For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
  ~            For any further queries on attribution, including queries on brand guidelines,
  ~            please contact contact@egovernments.org
  ~
  ~         2) Any misrepresentation of the origin of the material is prohibited. It
  ~            is required that all modified versions of this material be marked in
  ~            reasonable ways as different from the original version.
  ~
  ~         3) This license does not grant any rights to any user of the program
  ~            with regards to rights under trademark law for use of the trade names
  ~            or trademarks of eGovernments Foundation.
  ~
  ~   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
  ~
  --%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="/WEB-INF/taglib/cdn.tld" prefix="cdn" %>
<form:form role="form" action="/bpa/stakeholder/create" modelAttribute="stakeHolder"
	id="stakeHolderform" autocomplete="off" cssClass="form-horizontal form-groups-bordered"
	enctype="multipart/form-data">
	<ul class="nav nav-tabs" id="settingstab">
		<li class="active"><a data-toggle="tab" href="#applicant-info"
			data-tabidx=0><spring:message code='lbl.applicant.info'/></a></li>
		<li><a data-toggle="tab" href="#checklist-info" data-tabidx=1><spring:message code='title.documentdetail'/></a></li>
	</ul>
	<div class="tab-content">
		<div id="applicant-info" class="tab-pane fade in active">
			<div class="panel panel-primary" data-collapsed="0">
				<jsp:include page="stakeholder-form.jsp"></jsp:include>
			</div>
		</div>
		<div id="checklist-info" class="tab-pane fade">
			<div class="panel panel-primary" data-collapsed="0">
				<jsp:include page="checklist.jsp"></jsp:include>
			</div>
		</div>
	</div>
	<div class="text-center">
		<button type='submit' class='btn btn-primary' id="buttonSubmit">
			<spring:message code='lbl.create' />
		</button>
		<a href='javascript:void(0)' class='btn btn-default'
			onclick='self.close()'><spring:message code='lbl.close' /></a>
	</div>
</form:form>

		<input id="unblockLicense" type="hidden" value="<spring:message code='msg.confirm.unblock.licensee' />"/>
		<input id="blockLicense" type="hidden" value="<spring:message code='msg.confirm.block.licensee' />"/>
		<input id="updateLicenseInfo" type="hidden" value="<spring:message code='msg.confirm.updateinfo.license'/>"/>
	    <input type="hidden" id="uploadMsg" value="<spring:message code='msg.upload' />" />
        <input type="hidden" id="docNameLength" value="<spring:message code='msg.validate.docname.length' />" />
	    <input type="hidden" id="fileSizeLimit" value="<spring:message code='msg.validate.filesize.limit' />" />
	    <input type="hidden" id="validDocFormat" value="<spring:message code='msg.validate.docformat' />" />
	    <input type="hidden" id="liceExpiryDateGrterthanTodayDate" value="<spring:message code='msg.validate.license.expirydate.greaterthan.todaydate' />"/>
	    <input type="hidden" id="liceExpiryDateGrterthanIssueDate" value="<spring:message code='msg.validate.license.expirydate.greaterthan.licenseissue.date' />"/>
	    <input type="hidden" id="validMobileNumber" value="<spring:message code='msg.validate.mobilenumber' />"/>
	    <input type="hidden" id="validEmail" value="<spring:message code='msg.validate.email' />"/>
	    <input type="hidden" id="validAadhaar" value="<spring:message code='msg.validate.aadhaar' />"/>
	    <input type="hidden" id="validPan" value="<spring:message code='msg.validate.pan' />"/>
	    <input type="hidden" id="mobileNumberAlreadyExist" value="<spring:message code='msg.validate.mobilenumber.already.exist' />"/>
	    <input type="hidden" id="emailAlreadyExist" value="<spring:message code='msg.validate.email.already.exist' />"/>	    

<script
	src="<cdn:url value='/resources/global/js/bootstrap/bootstrap-datepicker.js' context='/egi'/>"></script>
<link rel="stylesheet"
	href="<cdn:url value='/resources/global/css/bootstrap/bootstrap-datepicker.css' context='/egi'/>">
<script
		src="<cdn:url value='/resources/global/js/jquery/plugins/datatables/moment.min.js' context='/egi'/>"></script>
<script src="<cdn:url value='/resources/js/app/stakeholder.js?rnd=${app_release_no}'/> "></script>
<script src="<cdn:url value='/resources/js/app/stakeholder-common.js?rnd=${app_release_no}'/> "></script>
<script src="<cdn:url value='/resources/js/app/documentsuploadvalidation.js?rnd=${app_release_no}'/> "></script>
