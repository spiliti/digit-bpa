/*
 * eGov suite of products aim to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) <2018>  eGovernments Foundation
 *
 *     The updated version of eGov suite of products as by eGovernments Foundation
 *     is available at http://www.egovernments.org
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see http://www.gnu.org/licenses/ or
 *     http://www.gnu.org/licenses/gpl.html .
 *
 *     In addition to the terms of the GPL license to be adhered to in using this
 *     program, the following additional terms are to be complied with:
 *
 *         1) All versions of this program, verbatim or modified must carry this
 *            Legal Notice.
 *
 *         2) Any misrepresentation of the origin of the material is prohibited. It
 *            is required that all modified versions of this material be marked in
 *            reasonable ways as different from the original version.
 *
 *         3) This license does not grant any rights to any user of the program
 *            with regards to rights under trademark law for use of the trade names
 *            or trademarks of eGovernments Foundation.
 *
 *   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */


jQuery(document).ready(function ($) {

	
	if($('#feePending').val() && $('#feePending').val() === 'true') {
		bootbox.alert($('#feePendingMsg').val());
	}
    //toggle between multiple tab
    jQuery('form').validate({
        ignore: ".ignore",
        invalidHandler: function (e, validator) {
            if (validator.errorList.length)
                $('#settingstab a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        }
    });


    var validator = $("#ownershipTransferForm").validate({
        highlight: function (element, errorClass) {
            $(element).fadeOut(function () {
                $(element).fadeIn();
            });
        }
    });

    if ($('#noJAORSAMessage') && $('#noJAORSAMessage').val())
        bootbox.alert($('#noJAORSAMessage').val());

    if ($('#invalidStakeholder').val())
        bootbox.alert($('#invalidStakeholder').val());

    function validateFormOnSave(button, validator) {
        if ($('#ownershipTransferForm').valid()) {
            document.getElementById("workFlowAction").value = button;
            return true;
        } else {
            return validateMandatoryAndFocus(validator);
        }
    }

    function validateFormOnSubmit(button, validator) {

        if ($('#ownershipTransferForm').valid() && validateUploadFilesMandatory()) {
            document.getElementById("workFlowAction").value = button;
            return true;
        } else {
            return validateMandatoryAndFocus(validator);
        }
    }

    function validateMandatoryAndFocus(validator) {
        $errorInput = undefined;

        $.each(validator.invalidElements(), function (index, elem) {

            if (!$(elem).is(":visible") && !$(elem).val() && index === 0
                && $(elem).closest('div').find('.bootstrap-tagsinput').length > 0) {
                $errorInput = $(elem);
            }

            if (!$(elem).is(":visible") && !$(elem).closest('div.panel-body').is(":visible")) {
                $(elem).closest('div.panel-body').show();
                console.log("elem", $(elem));
            }
        });

        if ($errorInput)
            $errorInput.tagsinput('focus');

        validator.focusInvalid();

        return false;
    }

    function removeDisabledAttribute() {
        $('#ownershipTransferForm').find(':input', ':select', ':textarea').each(function () {
            $(this).removeAttr("disabled");
        });
    }

    $('#buttonSave').click(function (e) {
        var button = $('#buttonSave').val();
        if (validateFormOnSave(button, validator)) {
            bootbox
                .dialog({
                    message: $('#saveAppln').val(),
                    buttons: {
                    	'confirm': {
                            label: 'Yes',
                            className: 'btn-primary',
                            callback: function (result) {
                                removeDisabledAttribute();
                                $('#ownershipTransferForm').trigger('submit');
                            }
                        },
                        'cancel': {
                            label: 'No',
                            className: 'btn-danger',
                            callback: function (result) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                    }
                });
        } else {
            e.preventDefault();
        }
        return false;
    });


    $('#buttonSubmit').click(function (e) {
        var button = $('#buttonSubmit').val();
        if (validateFormOnSubmit(button, validator)) {
            bootbox
                .dialog({
                    message: $('#submitAppln').val(),
                    buttons: {
                    	'confirm': {
                            label: 'Yes',
                            className: 'btn-primary',
                            callback: function (result) {
                                removeDisabledAttribute();
                                $('#ownershipTransferForm').trigger('submit');
                            }
                        },
                        'cancel': {
                            label: 'No',
                            className: 'btn-danger',
                            callback: function (result) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }
                        
                    }
                });
        } else {
            e.preventDefault();
        }
        return false;
    });
    
    $('#planPermitNumber').change(function() {
    	var permitNo = $(this).val();
    	if(permitNo) {
    		getApplicationByPermitNo(permitNo);
    		getRenewalAppByPermitNo(permitNo);
            getDocumentList();
    	}
	});
    
    function getApplicationByPermitNo(permitNo) {
		var isExist = false;
		$.ajax({
	        url: "/bpa/application/getownershipapplication",
	        type: "GET",
	        data: {
	            permitNumber : permitNo
	        },
	        cache : false,
	        async: false,
	        dataType: "json",
	        success: function (response) {
	            if(response) {
	            	if(response.notExistPermissionNo){
	            		$('.resetValues').val('');
	    			    bootbox.alert('For the entered plan permission number application details are not found. Please check if the plan permission number is correct.');
	                }
	            	else if(response.ocExists) {
	            		bootbox.alert('Occupancy Certificate is initiated for the entered plan permission number, hence cannot proceed' );
	            		$('.resetValues').val('');
	            		return false;
	            	}
	            	else if(response.ownershipNumber != null && response.ownershipNumber != permitNo){
	            		$('.resetValues').val('');
	        			bootbox.alert('For the entered plan permission number ownership is changed. Please enter '+response.ownershipNumber+
	        					' to proceed');
	            	}
	            	else if(response.inProgress){
	            		$('.resetValues').val('');
	        			bootbox.alert('For the entered plan permission number ownership workflow is in progress. Hence cannot proceed.');
	            	}
	            	else if(response.isPermit && response.status == 'Revocated'){
	            		$('.resetValues').val('');
	            		bootbox.alert('Permit application for entered plan permission number is revocated, hence cannot proceed.');
	            	}
	            	else if(response.isPermit && response.status!='Order Issued to Applicant'){
	            		$('.resetValues').val('');
	        			bootbox.alert('For the entered plan permission number permit workflow is in progress. Hence cannot proceed.');
	            	}
	            	else{
		            	isExist = true;
		            	$('#application').val(response.applicationId);
		            	$('#parent').val(response.parentId);
		                $('#serviceTypeDesc').val(response.serviceTypeDesc);
		                $('#serviceType').val(response.serviceTypeId);
		                $('#serviceTypeCode').val(response.serviceTypeCode);
		                $('#occupancy').val(response.occupancy);
		                $('#applicationType').val(response.applicationType);
		                $('.applicantName').val(response.applicantName);
		                $('#address').val(response.applicantAddress);
		                $('#applicationNumber').val(response.applicationNumber);
		                if(response.oldOwnershipNumber !=null){
		                	$('#ownpermitno').html('Old Ownership Number');
			                $('#edcrApplicationNumber').html('<a onclick="openPopup(\'/bpa/application/ownership/transfer/view/' + response.oldApplicationNo + '\')" href="javascript:void(0);">' + response.oldOwnershipNumber  + '</a>');
		                }else{
		                	$('#ownpermitno').html('Building Plan Permission No');
		                    $('#edcrApplicationNumber').html('<a onclick="openPopup(\'/bpa/application/details-view/by-permit-number/' + response.planPermissionNumber + '\')" href="javascript:void(0);">' + response.planPermissionNumber  + '</a>');
		                }
		                $('#planPermissionDate').val(response.planPermissionDate);
		                $('#extentInSqmts').val(response.plotArea);
	            	}
	            } else {
	            	$('.resetValues').val('');
	    			bootbox.alert('Application details are not available for the entered plan permission number.');
	            }
	        },
	        error: function (response) {
	            console.log("Error occurred while retrieving application details!!!!!!!");
	        }
	    });
		return isExist;
	}
    
    function getRenewalAppByPermitNo(permitNo) {
		$.ajax({
	        url: "/bpa/application/getrenewalapplication",
	        type: "GET",
	        data: {
	            permitNumber : permitNo
	        },
	        cache : false,
	        async: false,
	        dataType: "json",
	        success: function (response) {
	            if(response) {
            		    $('.resetValues').val('');
	        			bootbox.alert('For the entered plan permission number permit renewal workflow is in progress. Hence cannot proceed');
	        			return false;
	            	}
	            },
	        error: function (response) {
	            console.log("Error occurred while retrieving application details!!!!!!!");
	        }
	    });
	}

    
			function getDocumentList() {
				$
						.ajax({
							url : "/bpa/application/getdocumentlistbyservicetype",
							type : "GET",
							data : {
								serviceType : $('#serviceType').val(),
                                checklistType : 'OWNERSHIPDOCUMENTS'
							},
							dataType : "json",
							success : function(response) {
								$('#bpaDocumentsBody').empty();
								$
										.each(
												response,
												function(index, checklist) {
													$('#bpaDocumentsBody')
															.append(
																	'<div class="form-group">'
																			+ '<div class="col-sm-3 add-margin check-text"> <input type="hidden"  name="ownershipTransferDocuments['
																			+ index
																			+ '].document.serviceChecklist" value="'
																			+ checklist.id
																			+ '">'
																			+ '<input type="hidden"  name="ownershipTransferDocuments['
																			+ index
																			+ '].document.serviceChecklist.mandatory" value="'
																			+ checklist.mandatory
																			+ '">'
																			+ '<input type="hidden"  name="ownershipTransferDocuments['
																			+ index
																			+ '].document.serviceChecklist.description" value="'
																			+ checklist.checklistDesc
																			+ '">'
																			+ checklist.checklistDesc
																			+ (checklist.mandatory ? '<span class="mandatory"></span>'
																					: '')
																			+ '</div>'
																			/*+ '<div class="col-sm-2 add-margin "><input type="checkbox" name="ownershipTransferDocuments['
																			+ index
																			+ '].document.issubmitted" /></div>'*/
																			+ '<div class="col-sm-3 add-margin "><div class="input-group"><textarea class="form-control patternvalidation" data-pattern="string" maxlength="256" name="ownershipTransferDocuments['
																			+ index
																			+ '].document.remarks" /></div></div>'
																			+ '<div class="col-sm-6 add-margin "><div class="files-upload-container" data-allowed-extenstion="doc,docx,xls,xlsx,rtf,pdf,txt,zip,jpeg,jpg,png,gif,tiff" '
																			+ (checklist.mandatory ? "required"
																					: '')
																			+ '> <div class="files-viewer"> <a href="javascript:void(0);" class="file-add" data-unlimited-files="true" data-toggle="tooltip" data-placement="top" tittle="Test Tooltip" data-file-input-name="ownershipTransferDocuments['
																			+ index
																			+ '].document.files"> <i class="fa fa-plus" aria-hidden="true"></i></a></div></div>'
																			+ '</div>'
																			+ '</div>');
												})
							},
							error : function(response) {

							}
						});
			}
});

function openPopup(url) {
	window.open(url, 'window',
			'scrollbars=1,resizable=yes,height=800,width=1100,status=yes');

}
	