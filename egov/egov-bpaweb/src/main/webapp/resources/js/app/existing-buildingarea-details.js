/*
 * eGov suite of products aim to improve the internal efficiency,transparency,
 *    accountability and the service delivery of the government  organizations.
 *
 *     Copyright (C) <2017>  eGovernments Foundation
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

jQuery(document).ready(function() {
	
	// on page load to calculate sum of floor, plinth and carpet area
	 $( ".existPlinthArea" ).trigger( "change" );
	 $( ".existCarpetArea" ).trigger( "change" );
	 $( ".existFloorArea" ).trigger( "change" );
	 
	 /*var existingBldgLen = $('.buildDetails').data('bldg-len')-1;
		if(existingBldgLen > 0)
	        for(var i = 0; i < existingBldgLen; i++)
	            validateAndCalculateTotalOfFloorDetails('#existingBuildingAreaDetails'+i, i);*/
	  
	var tbody;
	var table;
	var row = '<tr>'+
	'<td class="text-center"><span class="serialNoForExistBuild text-center">{{sno}}</span><input type="hidden" class="orderNoForExistBuild" data-sno name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].orderOfFloor"/></td>'+
	'<td ><select name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].floorDescription" data-first-option="false" id="existingBuildingFloorDetailsUpdate[{{idx}}]floorDescription" class="form-control exist-floor-details-mandatory existFloorDescription clear-details" required="required" maxlength="128" > <option value="">Select</option><options items="${buildingFloorList}" /></select></td>'+
	'<td class="text-right"><input type="text" class="form-control table-input text-center patternvalidation existFloorNumber exist-floor-details-mandatory clear-details" name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].floorNumber" data-pattern="number" required="required" id="existingBuildingFloorDetailsUpdate[{{idx}}]floorNumber" maxlength="3" /></td>'+
	'<td ><select name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].subOccupancy" data-first-option="false" id="existingBuildingFloorDetailsUpdate[{{idx}}]occupancy" class="form-control exist-floor-details-mandatory existOccupancy" required="required" maxlength="128" > <option value="">Select</option><options items="${occupancyList}" /></select></td>'+
	'<td class="text-right"><input type="text" class="form-control table-input text-right patternvalidation existPlinthArea nonzero exist-floor-details-mandatory decimalfixed" data-pattern="decimalvalue" name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].plinthArea" id="existingBuildingFloorDetailsUpdate[{{idx}}]plinthArea" required="required" maxlength="10" /></td>'+
	'<td class="text-right"><input type="text" class="form-control table-input text-right patternvalidation existFloorArea nonzero exist-floor-details-mandatory decimalfixed" data-pattern="decimalvalue" name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].floorArea" id="existingBuildingFloorDetailsUpdate[{{idx}}]floorArea" maxlength="10" required="required" /></td>'+
	'<td class="text-right"><input type="text" class="form-control table-input text-right patternvalidation existCarpetArea exist-floor-details-mandatory decimalfixed" data-pattern="decimalvalue" name="existingBuildingDetails[0].existingBuildingFloorDetailsUpdate[{{idx}}].carpetArea" id="existingBuildingFloorDetailsUpdate[{{idx}}]carpetArea" maxlength="10" required="required" value=""  /></td>'+
	'<td class="text-center"><a href="javascript:void(0);" class="btn-sm btn-danger" id="deleteExistBuildFloorRow" ><i class="fa fa-trash"></i></a></td>'+
	'</tr>';
	
	$(document).on('click','.addExistBuildFloorRow', function() {
		var selectedBldgIdx = $(this).parent().data('exst-bldg-idx');
		tbody = $('#existingBuildingAreaDetails'+selectedBldgIdx).children('tbody');
		table = tbody.length ? tbody : $('#existingBuildingAreaDetails'+selectedBldgIdx);
		if(validateExistBuildFloorOnAdd('existingBuildingAreaDetails'+selectedBldgIdx)){
			var idx=$(tbody).find('tr').length;
			var sno=idx+1;
			//Add row
			var row={
			       'sno': sno,
			       'idx': idx
			   };
			addRowFromObject1(row);
			patternvalidation();
			generateSnoForExistingBuilding('existingBuildingAreaDetails'+selectedBldgIdx);
			loadFloorlist("existingBuildingDetails["+selectedBldgIdx+"].existingBuildingFloorDetailsUpdate["+idx+"].floorDescription");
			loadSubOccupancies("existingBuildingDetails["+selectedBldgIdx+"].existingBuildingFloorDetailsUpdate["+idx+"].subOccupancy");
		}
	});
	
	function addRowFromObject1(rowJsonObj)
	{
		table.append(row.compose(rowJsonObj));
	}
	
	String.prototype.compose = (function (){
		   var re = /\{{(.+?)\}}/g;
		   return function (o){
		       return this.replace(re, function (_, k){
		           return typeof o[k] != 'undefined' ? o[k] : '';
		       });
		   }
	}());
	
	function loadFloorlist(selectBoxName){
		var floorList = $('#buildingFloorListForExistingBuild').val();
		var floorListStringArry = floorList.substring(1, floorList.length-1);
		var floorDesc = floorListStringArry.split(',');
					$.each(floorDesc, function(index, floorDesc) {
						$('select[name="'+selectBoxName+'"]').append($('<option>').val(floorDesc).text(floorDesc));
					});
		}
	
	function loadSubOccupancies(selectBoxName) {
    	var occupancies = [];
    	$.each($("#occupancyapplnlevel option:selected"), function(idx){
    		occupancies.push($(this).text());
        });
		 $.ajax({
				url: "/bpa/getsuboccupancies/by-occupancy?occupancies="+occupancies,     
				type: "GET",
				async: false,
				dataType: "json",
				success: function (response) {
					$('select[name="'+selectBoxName+'"]').empty();
					$('select[name="'+selectBoxName+'"]').append($("<option value=''>Select </option>"));
					var occFirst;
					$.each(response, function(index, subOcc) {
						if(subOcc && subOcc.occupancy.name)
							occFirst = subOcc.occupancy.name;
						$('select[name="'+selectBoxName+'"]').append($('<option>').val(subOcc.id).text(subOcc.name));
					});
				}, 
				error: function (response) {
				}
			});
		}
	
	$(document).on('blur','.existFloorNumber', function() {
		var tableId = $(this).closest('table').attr('id');
		var rowObj = $(this).closest('tr');
		validateUniqueDetailsForExistBuild(tableId, rowObj.index(),$(rowObj).find('.existFloorDescription').val(), $(rowObj).find('.existFloorNumber').val(), $(rowObj).find('.existOccupancy').val());
	}); 
	
	$(document).on('blur','.existFloorDescription', function() {
		var tableId = $(this).closest('table').attr('id');
		var selectedBldgIdx = $('#'+tableId).data('exst-bldg-idx');
		var rowObj = $(this).closest('tr');
		if(!$("#occupancyapplnlevel").val()) {
			$('#existingBuildingAreaDetails'+selectedBldgIdx).find('select').val('');
			bootbox.alert($("#mainOccupancyReq").val());
			return false;
		}
		if($(rowObj).find('.existFloorDescription').val() && $(rowObj).find('.existFloorDescription').val() == 'Cellar Floor') {
			$(rowObj).find('.existFloorNumber').data('pattern','numerichyphen');
		} else {
			$(rowObj).find('.existFloorNumber').data('pattern','number');
		}
		patternvalidation();
		$(rowObj).find('.existFloorNumber').val('');
		validateUniqueDetailsForExistBuild(tableId, rowObj.index(),$(rowObj).find('.existFloorDescription').val(), $(rowObj).find('.existFloorNumber').val(), $(rowObj).find('.existOccupancy').val());
	});
	
	$(document).on('blur','.existOccupancy', function() {
		var tableId = $(this).closest('table').attr('id');
		var rowObj = $(this).closest('tr');
		validateUniqueDetailsForExistBuild(tableId, rowObj.index(),$(rowObj).find('.existFloorDescription').val(), $(rowObj).find('.existFloorNumber').val(), $(rowObj).find('.existOccupancy').val());
	});
	
});


function validateUniqueDetailsForExistBuild(tableId, idx,floorDesc,level,occupancy){
	if(floorDesc && occupancy) {
		$('#'+tableId+' tbody tr').each(function(index){
			
			if(idx===index)
				return;
			
			var floorName  = $(this).find('*[name$="floorDescription"]').val().trim();
		    var floorNumber = $(this).find('*[name$="floorNumber"]').val().trim();
		    var occupancy1 = $(this).find('*[name$="subOccupancy"]').val().trim();
		    if(floorDesc === floorName && level === floorNumber && occupancy ===occupancy1) {
		    	$('#'+tableId+' tbody tr:eq('+idx+')').find('.clear-details').val('');
		    	bootbox.alert($("#floorCombination").val()+floorDesc+$("#levelValidate").val()+level+$("#occuptypemsg").val()+$(this).find('*[name$="occupancy"] option:selected').text()+$("#floorAlreadyExist").val());
			    return false;
		    }
		});
	}
}

var plinthAreaSum = 0;
var carpetAreaSum = 0;

$(document).on('change', '.existPlinthArea', function() {
    var totalPlinth = 0;
	var tableId = $(this).closest('table').attr('id');
	var selectedBldgIdx = $('#'+tableId).data('exst-bldg-idx');
    $("#"+tableId+" tbody tr").each(function () {
    	 if($(this).find('td:eq(4) input.existPlinthArea').val())
    		 totalPlinth +=  parseFloat($(this).find('td:eq(4) input.existPlinthArea').val());
    });
    var seviceTypeName = $( "#serviceType option:selected" ).text();
	if(totalPlinth && 'Huts and Sheds' != seviceTypeName) {
		$("#existTotalPlintArea"+selectedBldgIdx).val(totalPlinth.toFixed(2));
	}
    $("#"+tableId+" tfoot tr td:eq(4)").html(totalPlinth.toFixed(2));
});

$(document).on('change', '.existFloorArea', function() {
	var totalFloorArea = 0 ;
	var tableId = $(this).closest('table').attr('id');
	var rowObj = $(this).closest('tr');
    $("#"+tableId+" tbody tr").each(function () {
    	var rowPlinthArea = parseFloat($(this).find('td:eq(4) input.existPlinthArea').val());
    	var rowFloorArea = parseFloat($(this).find('td:eq(5) input.existFloorArea').val());
   	 	if(rowFloorArea > rowPlinthArea) {
   		 $(rowObj).find('.existFloorArea').val('');
   		 $( ".existPlinthArea" ).trigger( "change" );
   		 $( ".existFloorArea" ).trigger( "change" );
   		 $( ".existCarpetArea" ).trigger( "change" );
   		 bootbox.alert($("#floorareaValidate").val());
   		 return false;
   	 }
    	if(rowFloorArea)
    	 totalFloorArea +=  parseFloat($(this).find('td:eq(5) input.existFloorArea').val());
    });
    $("#"+tableId+" tfoot tr td:eq(5)").html(totalFloorArea.toFixed(2));
});

$(document).on('change', '.existCarpetArea', function() {
	 var tableId = $(this).closest('table').attr('id');
     var rowObj = $(this).closest('tr');
     var totalCarpet = 0;
     $("#"+tableId+" tbody tr").each(function () {
    	 var rowFloorArea = parseFloat($(this).find('td:eq(5) input.existFloorArea').val());
    	 var rowCarpetArea = parseFloat($(this).find('td:eq(6) input.existCarpetArea').val());
    	 if(rowCarpetArea > rowFloorArea) {
    		 $(rowObj).find('.existCarpetArea').val('');
    		 $( ".existPlinthArea" ).trigger( "change" );
    		 $( ".existFloorArea" ).trigger( "change" );
    		 $( ".existCarpetArea" ).trigger( "change" );
    		 bootbox.alert($("#carpetareaValidate").val());
    		 return false;
    	 }
    	 if($(this).find('td:eq(6) input.existCarpetArea').val())
    	 totalCarpet += parseFloat($(this).find('td:eq(6) input.existCarpetArea').val());
     });
    $("#"+tableId+" tfoot tr td:eq(6)").html(totalCarpet.toFixed(2));
     
});
	
function generateSnoForExistingBuilding(tableId)
{
	var idx=1;
	$('#'+tableId+ ' tbody tr').find('.serialNoForExistBuild').each(function(){
		$(this).text(idx);
		idx++;
	});
	
	$('#'+tableId+ ' tbody tr').find('.orderNoForExistBuild').each(function(i){
		$(this).val(++i);
	});
}

function validateExistBuildFloorOnAdd(tableId){
	
	var isValid=true;
    $('#'+tableId+' tbody tr').each(function(index){
    	var floorName  = $(this).find('*[name$="floorDescription"]').val();
    	var floorNumber  = $(this).find('*[name$="floorNumber"]').val();
	    var plinthArea = $(this).find('*[name$="plinthArea"]').val();
	    var floorArea = $(this).find('*[name$="floorArea"]').val();
	    var carpetArea = $(this).find('*[name$="carpetArea"]').val();
	    var occupancy  = $(this).find('*[name$="subOccupancy"]').val();
	    if(!floorName || !floorNumber || !plinthArea || !carpetArea || !floorArea || !occupancy) { 
	    	bootbox.alert($('#valuesCannotEmpty').val());
	    	isValid=false;
	    	return false;
	    } 
    });
   
    return isValid;
}

var deletedId = [];
$(document).on('click',"#deleteExistBuildFloorRow",function (){
	var tableId = $(this).closest('table').attr('id');
	var selectedBldgIdx = $('#'+tableId).data('exst-bldg-idx');
    var rowIndex = $(this).closest('td').parent()[0].sectionRowIndex;
    if($(this).data('record-id'))
    	deletedId.push($(this).data('record-id'));
    
    $('#existDeletedFloorIds'+selectedBldgIdx).val(deletedId);
	$(this).closest('tr').remove();	
	
	generateSnoForExistingBuilding(tableId);
	
	$("#"+tableId+" tbody tr").each(function() {
			$(this).find("input, select, hidden,textarea").each(function() {
				var index = $(this).closest('td').parent()[0].sectionRowIndex;
				if(index>=rowIndex){
					var increment = index++;
					$(this).attr({
						'name': function(_, name){
							var idxWithNameStr = name.match(/\d+(\D*)$/g)[0].replace(/\d+\]/g, increment+"]");
							return name.replace(/\d+(\D*)$/g, idxWithNameStr);
						},
						'id': function(_, id){
							if(id==undefined){
								return "";
							}
							return id.replace(/\d+(\D*)$/g, +increment);
						}
					});
				}
			});
	 });
	// on delete to re-calculate sum of plinth and carpet area
	  $( ".existFloorArea" ).trigger( "change" );
	  $( ".existPlinthArea" ).trigger( "change" );
	  $( ".existCarpetArea" ).trigger( "change" );
	//validateAndCalculateTotalOfFloorDetails(tableId, selectedBldgIdx);
	
});	