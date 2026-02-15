define("screenjs/transaction",['app/populateDataUtils','jquery','screenjs/search'], function(populateDataUtils){

console.log('SCREENJS loaded screenjs initializing complete!');
let all_data;
return {	
		onBeforeSubmit: function(bulkcmd){
		
		clearMessages();
		if(!populateDataUtils.mandatory("membnk_tab","formScreen"))
		return false;
		
		const validCommands = new Set(["searchtxn1", "searchtxn2", "confirm_chbk", 			"raise_chargeback","save_chbk","raise_back","chbk_action","chargeback_accept","raise_repres","present_action","arbi_action","dclose_action",
		"confirm_repres","save_repres","raise_chbk","view_dispute_records","view_dispute_record","view_txn_records","view_txn_record","view_chargeback"
		,"pendinginitiate_payable","raise_payable","view_payable","view_inpay","rej_intpay","rej_rep","rej_cnf","cret_int","rej_chrbk","chrgbck_actiongrid",
		"chrgbck_action_view","chrgbck_action_accept","create_representment","raise_represment","aproveinapay_submit","represent_confirm","representment_accept",
		"view_representment_records","view_representment_record","rep_rejected_grid","rep_action_grid","rep_action_view","rep_action_accept","arbitration_grid",
		"raise_arbitration","arbitration_confirm","view_arbi_records","view_arbitration","arb_rejected_grid","arb_action_grid","back_inpay","aprove_inpay",
		"raise_inpay","fetch_disp","ip_dispute_records","ip_initiate_payable_record","ip_init_accept","ip_rejected_records_grid","ip_rejected_reprocess",
		"ip_rejected_confirm","rp_fetch_dispute","rp_app_grid","rp_app_grid_view","rp_accept","rp_rejected_reprocess","rp_rejected_confirm"]);

			if (validCommands.has(bulkcmd)) {
   			return true;
			}
			
	},
	
	

renderBackendFiles: function (field_id) {

    var $span = $("#" + field_id);
    var rawText = $span.text().trim();

    if (!rawText) return;

    var entries = rawText.split(",");
    $span.html(""); // clear existing text

    $.each(entries, function (index, item) {

        item = $.trim(item);

        var parts = item.split(" - ");
        var label = parts[0] || "";
        var urlPart = parts[1] || "";

        if (!urlPart) return;

        // convert download to view
        var filePath = urlPart.replace("../rest/file/download?", "../rest/file/view?");

        // extract file name
        var fileNameMatch = filePath.match(/originalFileName=([^&]+)/);
        var fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : "View File";

        // allow only specific types
        if (!/\.(pdf|jpeg|jpg)$/i.test(fileName)) return;

        var linkId = "display_file_" + index;

        var linkHtml = 
            (label ? label + " - " : "") +
            '<a href="' + filePath + '" id="' + linkId + '">' + fileName + '</a>';

        $span.append(linkHtml);

        if (index < entries.length - 1) {
            $span.append(", ");
        }

        // popup behavior
        $("#" + linkId).on("click", function (e) {
            window.open(
                filePath,
                "popUpWindow",
                "height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
            );
            e.preventDefault();
        });

    });
},




	
	
	
	onRenderComplete: function(){
	$(document).ready(function() {
  	SearchField('memberofi_fld');
  	SearchField('memberrfi_fld');
	});
	
	function clearTransDetail() {
    $('#trans_detail').find('input, textarea, select').val('');
    $('#trans_detail').find('input:checkbox, input:radio').prop('checked', false);
}


	
$("#chrgbk_tab tr:first").css('display', 'none');	
	
/*if (all_data && all_data.data && all_data.data.query0) {
    var row = all_data.data.query0[0];
console.log("all_data Enter",all_data);
    var hidepanels = {
        Initiatedate: "#Initiatepantable, #Initiatepantable2, #payable_detail",
        cbk_transdatetim: "#chargbackpan, #chargetable, #chargetable2",
        representdate_fld: "#presentpan, #presentable, #presentable2",
        arbitrationdate_fld: "#atributionpan, #arbitrationtable, #arbitrationtable2",
        closuredate_fld: "#dispclosepan, #dispclosetable, #dispclosetable2",
	 in_makerreson: "#dis_in_makerreson",
        in_chckerreson: "#dis_in_chckerreson",
        cbk_makerrson:"#dis_cbk_makerrson",
        cbk_checkerrson:"#dis_cbk_checkerrson"

    };

    $.each(hidepanels, function(key, panelIds) {
        if (!row[key] || row[key] === "") {
            $(panelIds).hide();
        }
    });
}
*/
if (all_data && all_data.data && all_data.data.query0) {
    var row = all_data.data.query0[0];
    console.log("all_data Enter", all_data);
    var hidepanels = {
    sample1: "#Initiatepan",
        Initiatedate: "#Initiatepantable, #Initiatepantable2, #payable_detail",
        cbk_transdatetim: "#chargbackpan, #chargetable, #chargetable2",
        representdate_fld: "#presentpan, #presentable, #presentable2",
        arbitrationdate_fld: "#atributionpan, #arbitrationtable, #arbitrationtable2",
        closuredate_fld: "#dispclosepan, #dispclosetable, #dispclosetable2",
        in_makerreson: "#dis_in_makerreson,#d_in_makerreson",
        in_chckerreson: "#dis_in_chckerreson,#d_in_chckerreson",
        cbk_makerrson: "#dis_cbk_makerrson",
        cbk_checkerrson: "#dis_cbk_checkerrson"
       
    };
    $.each(hidepanels, function (key, panelIds) {
        if (row.hasOwnProperty(key) && row[key] !== null && row[key] !== "") {
            $(panelIds).show();

        } else {
            $(panelIds).hide();
        }
    });
}

/*if (screenId === 'chargeback_src.null' || screenId === 'chargeback_src' || screenId === 'chargeback_src..null' || screenId === 'chargeback_src.') {

if (all_data && all_data.data && all_data.data.query0) {
    var row = all_data.data.query0[0];

    var hidepanels = {
        Initiatedate: "#Initiatepantable, #Initiatepantable2",
        cbk_transdatetim: "#chargbackpan, #chargetable, #chargetable2",

        representdate_fld: "#presentpan, #presentable, #presentable2",
        arbitrationdate_fld: "#atributionpan, #arbitrationtable, #arbitrationtable2",
        closuredate_fld: "#dispclosepan, #dispclosetable, #dispclosetable2",
	 in_makerreson: "#dis_in_makerreson",
        in_chckerreson: "#dis_in_chckerreson",
        cbk_makerrson:"#dis_cbk_makerrson",
        cbk_checkerrson:"#dis_cbk_checkerrson"

    };

    $.each(hidepanels, function(key, panelIds) {

        if (!row[key] || row[key] === "") {
            $(panelIds).hide();
        }
    });
}

}
*/


if (screenId === 'new_transdetail.null' || screenId === 'new_transdetail' || screenId === 'new_transdetail..null' || screenId === 'new_transdetail.') {

var rawValue = $("#currncy_amt").val();
    var amount = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
    var formattedAmount = "PHP " + amount.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
$("#currncy_amt,#disp_currncy_amt").text(formattedAmount);
var tempo=$('#txncount').val();
	//tempo=2;

			var arr = [];
			//var temp1=$('#sample1').val();
			//var temp2=$('#sample2').val();
			//var temp3=$('#sample3').val();
			//var temp4=$('#sample4').val();
			// var temp5=$('#sample5').val();
			// alert(temp1+ 'temp1');
			// alert(temp1+ 'temp1');
			// alert(temp3+ 'temp3');
			// alert(temp4+ 'temp4');
			// alert(temp5+ 'temp5');

	for(var k=1;k<=tempo;k++){
/*		let temp = "sample"+k;
	 alert(temp);
		temp = $("#"+temp).val();

		 alert(temp+' after assigning');
		if(temp !== null && temp.length !== 0){
			arr.push(temp);
			//alert(arr.length);
		}else{
			continue;
		}*/
var tableHtml = `<table border="0" lang="en" id="Initiatepantable" data-spine-container="form" class="table margin-spacer2" style="border-collapse: collapse; display: none;">
<tbody>
			<tr>
			<th style="text-align: left;    font-size: medium;"><lable>Case ${k}</lable></th>
			<th></th>
			</tr>
  <!-- 1. Initiate Payable Date & Time -->
  <tr>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_Initiatedate">
        <div class="fieldbox" id="d_Initiatedate">
          <label class="disp_Initiatedate field-label textview">Initiate Payable Date &amp; Time</label>
          <input type="hidden" id="Initiatedate" name="Initiatedate" data-spine-prop="Initiatedate">
          <span id="disp_Initiatedate"></span>
        </div>
        <div class="error-container" id="er_Initiatedate"></div>
      </div>
    </td>
    <!-- 2. Partial Flag -->
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_partialfilg">
        <div class="fieldbox" id="d_in_partialfilg">
          <label class="disp_in_partialfilg field-label textview">Partial Flag</label>
          <input type="hidden" id="in_partialfilg" name="in_partialfilg" data-spine-prop="in_partialfilg">
          <span id="disp_in_partialfilg"></span>
        </div>
        <div class="error-container" id="er_in_partialfilg"></div>
      </div>
    </td>
  </tr>
  <!-- 3. Txn Currency & 4. Payable Amount -->
  <tr>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_txncurrency">
        <div class="fieldbox" id="d_in_txncurrency">
          <label class="disp_in_txncurrency field-label textview">Txn Currency</label>
          <input type="hidden" id="in_txncurrency" name="in_txncurrency" data-spine-prop="in_txncurrency">
          <span id="disp_in_txncurrency"></span>
        </div>
        <div class="error-container" id="er_in_txncurrency"></div>
      </div>
    </td>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_payableamt">
        <div class="fieldbox" id="d_in_payableamt">
          <label class="disp_in_payableamt field-label textview">Payable Amount</label>
          <input type="hidden" id="in_payableamt" name="in_payableamt" data-spine-prop="in_payableamt">
          <span id="disp_in_payableamt"></span>
        </div>
        <div class="error-container" id="er_in_payableamt"></div>
      </div>
    </td>
  </tr>
  <!-- 5. OFI Account No & 6. Dispute Amount -->
  <tr>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_ofiacctno">
        <div class="fieldbox" id="d_in_ofiacctno">
          <label class="disp_in_ofiacctno field-label textview">OFI Account No</label>
          <input type="hidden" id="in_ofiacctno" name="in_ofiacctno" data-spine-prop="in_ofiacctno">
          <span id="disp_in_ofiacctno"></span>
        </div>
        <div class="error-container" id="er_in_ofiacctno"></div>
      </div>
    </td>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_disputeamt">
        <div class="fieldbox" id="d_in_disputeamt">
          <label class="disp_in_disputeamt field-label textview">Dispute Amount</label>
          <input type="hidden" id="in_disputeamt" name="in_disputeamt" data-spine-prop="in_disputeamt">
          <span id="disp_in_disputeamt"></span>
        </div>
        <div class="error-container" id="er_in_disputeamt"></div>
      </div>
    </td>
  </tr>
  <!-- 7. RFI Account No & 8. Dispute Reason -->
  <tr>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_rfiacctno">
        <div class="fieldbox" id="d_in_rfiacctno">
          <label class="disp_in_rfiacctno field-label textview">RFI Account No</label>
          <input type="hidden" id="in_rfiacctno" name="in_rfiacctno" data-spine-prop="in_rfiacctno">
          <span id="disp_in_rfiacctno"></span>
        </div>
        <div class="error-container" id="er_in_rfiacctno"></div>
      </div>
    </td>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_disputereason">
        <div class="fieldbox" id="d_in_disputereason">
          <label class="disp_in_disputereason field-label textview">Dispute Reason</label>
          <input type="hidden" id="in_disputereason" name="in_disputereason" data-spine-prop="in_disputereason">
          <span id="disp_in_disputereason"></span>
        </div>
        <div class="error-container" id="er_in_disputereason"></div>
      </div>
    </td>
  </tr>
  <!-- 9. Maker ID & 10. Maker Date -->
  <tr>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_makerid">
        <div class="fieldbox" id="d_in_makerid">
          <label class="disp_in_makerid field-label textview">Maker ID</label>
          <input type="hidden" id="in_makerid" name="in_makerid" data-spine-prop="in_makerid">
          <span id="disp_in_makerid"></span>
        </div>
        <div class="error-container" id="er_in_makerid"></div>
      </div>
    </td>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_makerdate">
        <div class="fieldbox" id="d_in_makerdate">
          <label class="disp_in_makerdate field-label textview">Maker Date</label>
          <input type="hidden" id="in_makerdate" name="in_makerdate" data-spine-prop="in_makerdate">
          <span id="disp_in_makerdate"></span>
        </div>
        <div class="error-container" id="er_in_makerdate"></div>
      </div>
    </td>
  </tr>
  <!-- 11. Checker ID & 12. Checker Date -->
  <tr>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_checkerid">
        <div class="fieldbox" id="d_in_checkerid">
          <label class="disp_in_checkerid field-label textview">Checker ID</label>
          <input type="hidden" id="in_checkerid" name="in_checkerid" data-spine-prop="in_checkerid">
          <span id="disp_in_checkerid"></span>
        </div>
        <div class="error-container" id="er_in_checkerid"></div>
      </div>
    </td>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_checkerdate">
        <div class="fieldbox" id="d_in_checkerdate">
          <label class="disp_in_checkerdate field-label textview">Checker Date</label>
          <input type="hidden" id="in_checkerdate" name="in_checkerdate" data-spine-prop="in_checkerdate">
          <span id="disp_in_checkerdate"></span>
        </div>
        <div class="error-container" id="er_in_checkerdate"></div>
      </div>
    </td>
  </tr>
  <!-- 13. Ageing & 14. Biller Name -->
  <tr>
    <!-- Ageing -->
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_ageing">
        <div class="fieldbox" id="d_in_ageing">
          <label class="disp_in_ageing field-label textview">Ageing</label>
          <input type="hidden" id="in_ageing" name="in_ageing" data-spine-prop="in_ageing">
          <span id="disp_in_ageing"></span>
        </div>
        <div class="error-container" id="er_in_ageing"></div>
      </div>
    </td>
    <!-- Biller Name -->
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_billername">
        <div class="fieldbox" id="d_in_billername">
          <label class="disp_in_billername field-label textview">Biller Name</label>
          <input type="hidden" id="in_billername" name="in_billername" data-spine-prop="in_billername">
          <span id="disp_in_billername"></span>
        </div>
        <div class="error-container" id="er_in_billername"></div>
      </div>
    </td>
  </tr>
<tr>

<td colspan="" class="odd" style="padding: 3px;">

<div class="my-displayfield-wrapper" id="dis_in_makerreson">

<div class="fieldbox" id="d_in_makerreson">

<label for="caption" class="disp_in_makerreson field-label textview">Maker Remark</label>

<input type="hidden" data-label="Maker Remark" class="" data-mandatory="Y" data-spine-prop="in_makerreson" name="in_makerreson" id="in_makerreson" data-spine-type="displayText" value="" data-rule-required="true">

<span type="text" id="disp_in_makerreson_1" name="disp_in_makerreson"></span></div>   

<div class="error-container" id="er_Initiatedate"></div>

</div>

</td>
<td colspan="" class="odd" style="padding: 3px;">       
</td>
</tr>

<tr>
<td colspan="" class="even" style="padding: 3px;">
<div class="my-displayfield-wrapper" id="dis_in_chckerreson">
<div class="fieldbox" id="d_in_chckerreson">
<label for="caption" class="disp_in_chckerreson field-label textview">Checker Remark</label>
<input type="hidden" data-label="Checker Remark" class="" data-mandatory="Y" data-spine-prop="in_chckerreson" name="in_chckerreson" id="in_chckerreson" data-spine-type="displayText" value="" data-rule-required="true">
<span type="text" id="disp_in_chckerreson" name="disp_in_chckerreson"></span>  
<div class="error-container" id="er_Initiatedate"></div>
</div>
</td>
<td colspan="" class="even" style="padding: 3px;">       
</td>
</tr>

<tr>
<td colspan="2" class="odd" style="padding: 3px;">
<div class="my-displayfield-wrapper" id="dis_in_indocment">
<div class="fieldbox" id="d_in_indocment">
<label for="caption" class="disp_in_indocment field-label textview">Documents</label>
<input type="hidden" data-label="Documents" class="" data-mandatory="Y" data-spine-prop="in_indocment" name="in_indocment" id="in_indocment" data-spine-type="displayText" value="" data-rule-required="true">
<span type="text" id="disp_in_indocment" name="disp_in_indocment"></span>
</div>   
<div class="error-container" id="er_Initiatedate"></div>
</div>
</td>

<td colspan="" class="odd" style="padding: 3px;">       
</td>
</tr>
</tbody>
</table>`;
// Append to the element with id 'panel3'
$('#panel4').append(tableHtml);
		$("#disp_Initiatedate").attr("id", "disp_Initiatedate_" + k);
$("#disp_in_partialfilg").attr("id", "disp_in_partialfilg_" + k);
$("#disp_in_txncurrency").attr("id", "disp_in_txncurrency_" + k);
$("#disp_in_payableamt").attr("id", "disp_in_payableamt_" + k);
$("#disp_in_ofiacctno").attr("id", "disp_in_ofiacctno_" + k);
$("#disp_in_disputeamt").attr("id", "disp_in_disputeamt_" + k);
$("#disp_in_rfiacctno").attr("id", "disp_in_rfiacctno_" + k);
$("#disp_in_disputereason").attr("id", "disp_in_disputereason_" + k);
$("#disp_in_makerid").attr("id", "disp_in_makerid_" + k);
$("#disp_in_makerdate").attr("id", "disp_in_makerdate_" + k);
$("#disp_in_checkerid").attr("id", "disp_in_checkerid_" + k);
$("#disp_in_checkerdate").attr("id", "disp_in_checkerdate_" + k);
$("#disp_in_ageing").attr("id", "disp_in_ageing_" + k);
$("#disp_in_billername").attr("id", "disp_in_billername_" + k);
$("#disp_in_makerreson").attr("id", "disp_in_makerreson_" + k);
$("#disp_in_chckerreson").attr("id", "disp_in_chckerreson_" + k);
$("#disp_in_indocment").attr("id", "disp_in_indocment_" + k);




    
    
	}
	
	
	
	
	
if (all_data && all_data.data && all_data.data.query0) {
    var row = all_data.data.query0[0];
    var hidepanels = {
        in_makerreson: {
            panels: "#dis_in_makerreson,#d_in_makerreson",
            tr: "#Initiatepantable tr:nth-child(9)"
        },
        in_chckerreson: {
            panels: "#dis_in_chckerreson,#d_in_chckerreson",
            tr: "#Initiatepantable tr:nth-child(10)"
        }
    };
    $.each(hidepanels, function (key, config) {
        if (row.hasOwnProperty(key) && row[key] !== null && row[key] !== "") {

            $(config.panels).show();
            $(config.tr).show();
        } else {
            $(config.panels).hide();
            $(config.tr).hide();
        }
    });
}


			var temp1=$('#sample1').val();
			var temp2=$('#sample2').val();

//var temp1 = '1,2,PHP,3000.00,917,3000.00,09001BOPIPHMMXXX,raised by ganesh p2,Maker19,04 Feb 2026 09:29:3,Maker28,1 day,BPI EXPRESS CAR,';
//var temp2 = '2,2,PHP,3000.00,917,3000.00,09001BOPIPHMMXXX,raised by ganesh p2,Maker19,04 Feb 2026 09:29:3,Maker28,1 day,BPI EXPRESS CAR,';
//var temp3 = '3,3,PHP,5000.00,918,5000.00,09002BOPIPHMMXXX,raised by ram p3,Maker20,04 Feb 2026 09:30:0,Maker29,2 days,BPI EXPRESS CAR,';
//var temp4 = '4,4,PHP,7000.00,919,7000.00,09003BOPIPHMMXXX,raised by sita p4,Maker21,04 Feb 2026 09:31:1,Maker30,3 days,BPI EXPRESS CAR,';
//var temp5 = '5,5,PHP,9000.00,920,9000.00,09004gfjtftgfjtfgjytfjytfjytffjtBOPIPHMMXXX,raised by laxman p5,Maker22,04 Feb 2026 09:32:2,Maker31,4 days,BPI EXPRESS CAR,';

    var arr = [temp1,temp2];



    for (var i = 0; i < arr.length; i++) {

        var parts = arr[i].split('$#$');
	   // i=i+1;
	 //   alert(parts[0]);
	    let j = i+1;
	    var initiatedId     = "disp_Initiatedate_"   + j;
var partialId       = "disp_in_partialfilg_" + j;
var currencyId      = "disp_in_txncurrency_" + j;
var payableId       = "disp_in_payableamt_"  + j;
var ofiAcctId       = "disp_in_ofiacctno_"   + j;
var disputeAmtId    = "disp_in_disputeamt_"  + j;
var rfiAcctId       = "disp_in_rfiacctno_"   + j;
var disputeReasonId = "disp_in_disputereason_" + j;
var makerId         = "disp_in_makerid_"     + j;
var makerDateId     = "disp_in_makerdate_"   + j;
var checkerId       = "disp_in_checkerid_"   + j;
var checkerDateId     = "disp_in_checkerdate_"   + j;
var ageingId        = "disp_in_ageing_"      + j;
var billerNameId    = "disp_in_billername_"  + j;
var makerResonId    = "disp_in_makerreson_"  + j;
var chckerreson    = "disp_in_chckerreson_"  + j;
var indocment    = "disp_in_indocment_"  + j;

console.log("disputeAmtId",disputeAmtId);
//alert(parts[0]);
console.log("disputeAmtId   parts[5]",parts[5]);
console.log("disputeAmtId   parts[5]",parts[3]);
$("#" + initiatedId).text(parts[0]);
$("#" + partialId).text(parts[1]);
$("#" + currencyId).text(parts[2]);
var amount1 = parseFloat(parts[3]);
var formattedAmount1 = amount1.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
$("#" + payableId).text(formattedAmount1);
$("#" + ofiAcctId).text(parts[4]);
var amount2 = parseFloat(parts[5]);
var formattedAmount2 = amount2.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
$("#" + disputeAmtId).text(formattedAmount2);
$("#" + rfiAcctId).text(parts[6]);
$("#" + disputeReasonId).text(parts[7]);
$("#" + makerId).text(parts[8]);
$("#" + makerDateId).text(parts[9]);
$("#" + checkerId).text(parts[10]);
$("#" + checkerDateId).text(parts[11]);
$("#" + ageingId).text(parts[12]);
$("#" + billerNameId).text(parts[13]);
$("#" + makerResonId).text(parts[14]);
$("#" + chckerreson).text(parts[15]);
$("#" + indocment).text(parts[16]);
	    //i=i-1;
	    

    }
    
    
    

}



let tabSelection = $('#tabcontainer .tab-state-selected', parent.document).text().trim() 
                 + '~' + 
                 $('.ui-state-highlight a', parent.document).text().trim();

if (tabSelection === 'Initiate Payable~Create Initiate Payable') {

    $('label[for="disputedamt_fld"]').html(
        'Initiate Payable Amount <span style="color:red"><strong>*</strong></span>'
    );

} 
else if (tabSelection === 'Dispute Management~Create Chargeback') {

    $('label[for="disputedamt_fld"]').html(
        'Chargeback Payable Amount <span style="color:red"><strong>*</strong></span>'
    );

} 
else {

    $('label[for="disputedamt_fld"]').html(
        'Disputed Amount <span style="color:red"><strong>*</strong></span>'
    );

}	
	/*$(document).ready(function() {
  	SearchField('tan_txn_no');
	}); */
	
	//$('#ab_disputedamt_fld,#cd_disputedamt_fld').attr('disabled',true).css('opacity','50%');
	
	// Hide unwanted Dispute Status options


	$("#distatus_fld").val('');
$(document).ready(function() {
    var isLocked = false; // controls stability

    // Append the info icon
    $('#filtby_mbnk').append(
        '<a href="javascript:void(0)">' +
        '<span>' +
        '<img id="info_icon" src="../css/dms/idct/images/information.png" style="width: 17px; height: 15px;margin-top: 6px;padding-left: 50%;">' +
        '</span>' +
        '</a>'
    );

    $('#dec_tab').hide();

    // Hover behavior (only if not locked)
    $('#info_icon').hover(
        function() {
            if (!isLocked) {
                $('#dec_tab').show();
            }
        },
        function() {
            if (!isLocked) {
                $('#dec_tab').hide();
            }
        }
    );

    // Click behavior (lock/unlock)
    $('#info_icon').on('click', function () {
        isLocked = !isLocked;

        if (isLocked) {
            $('#dec_tab').show(); // stay open
        } else {
            $('#dec_tab').hide(); // unlock and hide
        }
    });
});

 $('#Initiatepantable tr:nth-child(1) td').removeClass('even').addClass('odd');

 const icons = {
        plus: '../css/dms/idct/images/plus-sign.png',
        minus: '../css/dms/idct/images/minus-sign.png'
    };

    const panels = [
       { panel: '#payable_detail', content: '#Initiatepantable,#Initiatepantable2' },
       { panel: '#chgrbk_detail', content: '#chargetable,#chargetable2' }	
    ];

    panels.forEach(function (item) {
        const isExpanded = item.expanded === true;
        $(item.content).toggle(isExpanded);
        const iconSrc = isExpanded ? icons.minus : icons.plus;
        const iconHTML = `
            <a href="javascript:void(0)">
                <span><img src="${iconSrc}"
                         style="width:15px;height:15px;position:absolute;right:1.5%;margin-top:-15px;">
                </span>
            </a>
        `;

        $(item.panel).append(iconHTML);

        $(item.panel).on('click', function () {
            const $img = $(this).find('img');
            const isOpen = $img.attr('src') === icons.minus;
            $img.attr('src', isOpen ? icons.plus : icons.minus);

            $(item.content).stop(true, true).slideToggle(200);
        });

    });



$('#txt_maxlimit_fld input').val('0').css('opacity', 0.5);

$('#0_disputetype_fld, #1_disputetype_fld').on('click', function () {
  const val = this.id === '0_disputetype_fld' ? 0 : 1;
  $('#txt_maxlimit_fld input')
    .val(val)
    .prop('readonly', val === 0);
});

    setTimeout(function () {
        $('#txt_maxlimit_fld input').prop('readonly', true);
    }, 0);


	//$("imgPreview_CLAIM_DUE_TO_FRAUD_LETTER_upload").hide();
	
	$('#choosenImg_choosefile_bulk,#imgAnchorTag_CLAIM_DUE_TO_FRAUD_LETTER_upload').hide();
if (screenId == 'representment_src.null' || screenId == 'representment_src' || screenId == 'representment_src..null' || screenId == 'representment_src.') {

let screenText3 = $('.ui-state-highlight a', parent.document).text();	
let dispstatus3 = '';
   if (screenText3 == 'Approve Representment') {
    dispstatus3 = 'Representment';
} 
if (dispstatus3 !== '') {
		
	$.post("../formaction?bulkcmd=rp_fetch_dispute&screenName=transactor&dispstatus_fld="+dispstatus3).success(function (data) {
					  
					  let dashdata = JSON.parse(data).data.query0[0];
					  
					   let tabele1 = $('#representlabel_tab tbody tr:nth-child(1)');
					   let tabele2 = $('#representlabel_tab tbody tr:nth-child(2)');
					   
			Object.entries(dashdata).forEach(([key, value], index) => {

				tabele2.find('td').eq(index).append(`<span id="d_${key}">${value}</span>`);

					});

					   
			 $("#representlabel_tab tr:nth-child(2) td").slice(1).each(function (index,element) {
    			 $(this).css({'color':'blue','cursor':'pointer','text-decoration':'underline'});
    			 
    			  	$(this).click(function (e) {
					let distype = tabele2.find('td').eq(0).text();
					let status = tabele1.find('td').eq(index+1).text().trim();
					let sqty = $(this).find('span').text();
					
					$('#disputetype_fld').val(distype);
					$('#distatus_fld').val(status);
					$('#disquantity_fld').val(sqty);
					
					$('#submit_btn4').trigger('click');
					e.preventDefault();
					});
			});
					});
			
			}




let screenText = $('.ui-state-highlight a', parent.document).text();	
let dispstatus2 = '';
   if (screenText == 'Approve Initiate Payable') {
    dispstatus2 = 'Initiate_Payable';
} 
if (dispstatus2 !== '') {
		
	$.post("../formaction?bulkcmd=fetch_disp&screenName=transactor&dispstatus_fld="+dispstatus2).success(function (data) {
					  
					  let dashdata = JSON.parse(data).data.query0[0];
					  
					   let tabele1 = $('#representlabel_tab tbody tr:nth-child(1)');
					   let tabele2 = $('#representlabel_tab tbody tr:nth-child(2)');
					   
			Object.entries(dashdata).forEach(([key, value], index) => {

				tabele2.find('td').eq(index).append(`<span id="d_${key}">${value}</span>`);

					});

					   
			 $("#representlabel_tab tr:nth-child(2) td").slice(1).each(function (index,element) {
    			 $(this).css({'color':'blue','cursor':'pointer','text-decoration':'underline'});
    			 
    			  	$(this).click(function (e) {
					let distype = tabele2.find('td').eq(0).text();
					let status = tabele1.find('td').eq(index+1).text().trim();
					let sqty = $(this).find('span').text();
					
					$('#disputetype_fld').val(distype);
					$('#distatus_fld').val(status);
					$('#disquantity_fld').val(sqty);
					
					$('#submit_btn3').trigger('click');
					e.preventDefault();
					});
			});
					});
			
			}

	
let pageText = $('.ui-state-highlight a', parent.document).text();
let dispstatus = '';
   if (pageText == 'Approve Chargeback') {
    dispstatus = 'Chargeback';
} 
  
  else if (pageText == 'Approve Arbitration') {
    dispstatus = 'Arbitration';
  }
	
	if (dispstatus !== '') {
		
				   $.post("../formaction?bulkcmd=fetch_dispute&screenName=transactor&dispstatus_fld="+dispstatus).success(function (data) {
					  
					  let dashdata = JSON.parse(data).data.query0[0];
					  
					   let tabele1 = $('#representlabel_tab tbody tr:nth-child(1)');
					   let tabele2 = $('#representlabel_tab tbody tr:nth-child(2)');
					   
			Object.entries(dashdata).forEach(([key, value], index) => {

				tabele2.find('td').eq(index).append(`<span id="d_${key}">${value}</span>`);

					});

					   
			 $("#representlabel_tab tr:nth-child(2) td").slice(1).each(function (index,element) {
    			 $(this).css({'color':'blue','cursor':'pointer','text-decoration':'underline'});
    			 
    			  	$(this).click(function (e) {
					let distype = tabele2.find('td').eq(0).text();
					let status = tabele1.find('td').eq(index+1).text().trim();
					let sqty = $(this).find('span').text();
					
					$('#disputetype_fld').val(distype);
					$('#distatus_fld').val(status);
					$('#disquantity_fld').val(sqty);
					
					$('#submit_btn').trigger('click');
					e.preventDefault();
					});
			});
					});
			
			}
			
			function fetchtxnstatus(disfld){
			
				   $.post("../formaction?bulkcmd=fetch_txn_status&screenName=transactor&dispstatus_fld="+disfld).success(function (data) {
					  
					  let dashdata = JSON.parse(data).data.query0[0];
					  
					   let tabele1 = $('#representlabel_tab tbody tr:nth-child(1)');
					   let tabele2 = $('#representlabel_tab tbody tr:nth-child(2)');
					   
			Object.entries(dashdata).forEach(([key, value], index) => {
				tabele2.find('td').eq(index).append(`<span id="d_${key}">${value}</span>`);
					});
					   
			 $("#representlabel_tab tr:nth-child(2) td").slice(1).each(function (index,element) {
    			 $(this).css({'color':'blue','cursor':'pointer','text-decoration':'underline'});
    			 
    			  	$(this).click(function (e) {
					let distype = tabele2.find('td').eq(0).text();
					let status = tabele1.find('td').eq(index+1).text().trim();
					let sqty = $(this).find('span').text();
					
					$('#disputetype_fld').val(distype);
					$('#distatus_fld').val(status);
					$('#disquantity_fld').val(sqty);
					
					$('#submit_btn2').trigger('click');
					e.preventDefault();
					});
			});
					});
					
			
			
			}
			

	if($('.ui-state-highlight a',parent.document).text() == 'Approve Chargeback'){
	fetchdisputes("Chargeback")
	} 
	if($('.ui-state-highlight a',parent.document).text() == 'Approve Representment'){
	fetchdisputes("Representment")
	} 
	if($('.ui-state-highlight a',parent.document).text() == 'Approve Arbitration'){
	fetchdisputes("Arbitration")
	}
	if($('.ui-state-highlight a',parent.document).text() == 'Chargeback Action'){
	fetchtxnstatus("Chargeback")
	}
	if($('.ui-state-highlight a',parent.document).text() == 'Representment Action'){
	fetchtxnstatus("Representment")
	}
	if($('.ui-state-highlight a',parent.document).text() == 'Arbitration Action'){
	fetchtxnstatus("Arbitration")
	}
		}
		
		
		if (screenId == 'representment_view.null' || screenId == 'representment_view' || screenId == 'representment_view..null' || screenId == 'representment_view.') {
		
		
		let tabSelection = $('#tabcontainer .tab-state-selected',parent.document).text()+'~'+$('.ui-state-highlight a',parent.document).text();	
 		if(tabSelection == 'Initiate Payable~View Initiate Payable'){
 		$('#ip_initiate_payable_record,#aprinpay_head').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~View Chargeback'){
 		$('#submit_fld2,#aprcharge_head').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~Approve Chargeback'){
 		$('#submit_fld2,#aprcharge_head').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~Chargeback Action'){
 		$('#chrbkassign_btn,#aprcharge_head').css('display','inline-block');
		}
		else if(tabSelection == 'Initiate Payable~Approve Initiate Payable'){
 		$('#ip_initiate_payable_record,#aprinpay2_head').css('display','inline-block');
		}
		else if(tabSelection == 'Initiate Payable~Rejected Initiate Payable'){
 		$('#ip_rejected_reprocess,#rejin_head').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~Rejected Chargeback'){
 		$('#submit_rejin,#rej_chargeback').css('display','inline-block');
		}
		
		else if(tabSelection == 'Dispute Management~Approve Representment'){
 		$('#rp_app_grid_view,#aprep_head').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~Rejected Representment'){
 		$('#rp_rejected_reprocess,#repsent_reject').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~View Representment'){
 		$('#represent_view,#repsent_approve').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~Representment Action'){
 		$('#rep_action_view,#repsent_head').css('display','inline-block');
		}
		
		else if(tabSelection == 'Dispute Management~Approve Arbitration'){
 		$('#submit_fld2,#repsent_head').css('display','inline-block');
		}
		
		else if(tabSelection == 'Dispute Management~View Arbitration'){
 		$('#view_arbitration,#aprcharge_head').css('display','inline-block');
		}
				
		else if(tabSelection == 'Dispute Management~Rejected Arbitration'){
 		$('#submit_rejin,#aprcharge_head').css('display','inline-block');
		}
		
		else if(tabSelection == 'Dispute Management~Arbitration Action'){
 		$('#rep_action_view,#repsent_head').css('display','inline-block');
		}
		
		$("#submit_fld,#submit_repres,#view_arbitration,#submit_fld2,#submit_inpay,#submit_rejin,#raise_arbitration,#represent_view,#chrbkassign_btn,#rep_action_view,#ip_initiate_payable_record,#ip_rejected_reprocess").css("opacity", "50%").prop("disabled", true);
			  $("#repsent_grid_grid").on("jqGridSelectRow", function() {
			  console.log('Enter in grid');
		 	$("#submit_fld,#submit_repres,#view_arbitration,#submit_fld2,#submit_inpay,#submit_rejin,#raise_arbitration,#represent_view,#chrbkassign_btn,#rep_action_view,#ip_initiate_payable_record,#ip_rejected_reprocess").css("opacity", "100%").prop("disabled", false);

		          var id = $("#repsent_grid_grid").jqGrid("getGridParam", "selrow");
	    	$('#hiddenpanel #reference_no').val($("#repsent_grid_grid").jqGrid('getCell', id, 'reference_no'));
		        });
		        
		}
	
	if (screenId == 'trans_detail.null' || screenId == 'trans_detail' || screenId == 'trans_detail..null' || screenId == 'trans_detail.') {

clearTransDetail(); // Call this function when screen opens
this.initFilePopup('choosefile_bulk');
this.initFilePopup('upload_fld');
$('#sendacno_fld').removeAttr('value').val('');
$('#recacno_fld').removeAttr('value').val('');
	$(".p-right input").attr("name","search-txn");
	$('.table').addClass('disabled-panel');
	$('#dec_tab').removeClass('disabled-panel');
	$("#subscnum_fld,#invoicenum_fld").val("");
		$('input[name="search-txn"]').on('change', function () {
  	const selectedId = $('input[name="search-txn"]:checked').attr('id');
	const panelMap = {
 	   '0_filtby_trans': '#filt_transtab',
 	   '0_filt_membnk': '#membnk_tab'
 	 }; 
	$.each(panelMap, function (key, panel) {
	console.log('Key : '+key+' Panel : '+panel);
	$(panel.split(',')[0]).toggleClass('disabled-panel', key !== selectedId);
	// $(panel.split(',')[1]).toggleClass('hideclass', key !== selectedId);
	$(key.replace('0_','#')).val('', key !== selectedId);
 		
  	});
	});
	
	$('#lable_transervice_fld,#lable_usecase_fld').find('span').remove();
		     $('#transervice_fld,#usecase_fld').attr('data-mandatory','');
	
	$('#0_filt_membnk').on('click', function() {
	$('#lable_transervice_fld,#lable_usecase_fld').append('<span style="color:red"><strong>*</strong></span>');
		   $('#transervice_fld,#usecase_fld').attr('data-mandatory','Y');
		} );
	$('#0_filtby_trans').on('click', function() {  
	$('#lable_transervice_fld,#lable_usecase_fld').find('span').remove();
		     $('#transervice_fld,#usecase_fld').attr('data-mandatory','');
	});
	
	
         $.post(
         "../formaction?bulkcmd=SelectConfgServices&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('transervice_fld',JSON.parse(data).data.ConfgServices);
          if(JSON.parse(data).data.ConfgServices.length = 1){ 
	$('#transervice_fld').val(JSON.parse(data).data.ConfgServices[0].key);
	 }
        });
        
        $.post(
         "../formaction?bulkcmd=SelectConfgUseCase&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('usecase_fld',JSON.parse(data).data.ConfgUseCase);
        });
        
        $.post(
         "../formaction?bulkcmd=SelectParticipantOFI&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('memberofi_fld',JSON.parse(data).data.EntityOFI);
        });
        
        $.post(
         "../formaction?bulkcmd=SelectParticipantRFI&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('memberrfi_fld',JSON.parse(data).data.EntityRFI);
        });
        
        if($('.ui-state-highlight a',parent.document).text() == 'Create Initiate Payable'){
	$('#initate_hd').css('display', 'inline-block');
	     	$("#transdet_head").hide();
	

 }
		
		}

	$('td[aria-describedby="tans_grid_grid_tan_amnt"]').text(function (_, t) {
	let n = Number(t.replace(/,/g, ''));
	return isNaN(n) ? t : n.toLocaleString('en-IN', { minimumFractionDigits: 2 });
});

	$('td[aria-describedby="repsent_grid_grid_tan_amnt"]').text(function (_, t) {
	let n = Number(t.replace(/,/g, ''));
	return isNaN(n) ? t : n.toLocaleString('en-IN', { minimumFractionDigits: 2 });
});
/*

const fmt = v => {
    v = v.replace(/,/g,'');
    if (isNaN(v) || v === '') return v;
    let p = v.split('.');
    p[0] = Number(p[0]).toLocaleString('en-IN');
    return p.join('.');
};

$('#cd_disputedamt_fld').on('input', function () {
    let p = this.selectionStart,
        c = (this.value.slice(0,p).match(/,/g)||[]).length,
        v = fmt(this.value);

    this.value = v;
    p += (v.match(/,/g)||[]).length - c;
    this.setSelectionRange(p,p);
});
*/

	
		
	if (screenId == 'repres_ackno.null' || screenId == 'repres_ackno' || screenId == 'repres_ackno..null' || screenId == 'repres_ackno.') {
	
	

$("#chargeback_tab tr:first").css('display', 'none');
		
	this.initFilePopup('choosefile_bulk');
	this.initFilePopup('upload_fld');
	let conmsg = populateDataUtils.outputObjData.data.query0[0].confirm_msg;
	$('#confirm_msg').html(conmsg).css({'width':'100% !important','font-weight':'bold'});
		
		
		
	let tabSelection = $('#tabcontainer .tab-state-selected',parent.document).text()+'~'+$('.ui-state-highlight a',parent.document).text();	
	if(tabSelection == 'Dispute Management~Approve Chargeback'){
 		$('#aprchack_head,#charge_back,#menu_btn,#next_fld,#approve_div,#choosefile_bulk,#conmsg,#chgrbk_detail').css('display','inline-block');            	
	$('#chgrbk_detail').css('display','inline-block');
	$('#chargeback_btn').hide();
	$('#Initiatepantable,#Initiatepantable2').css('display','none');
	$("#transdetails_tab_grid tbody tr").each(function () {
	var removeRow = true;

	$(this).find("td").each(function () {
	var val = $(this).text().trim();

	if (val !== "") {
	removeRow = false;
	return false;     
	}
	});

	if (removeRow) {
	$(this).remove();
	}
	});
 		        
	$('#dis_reason_user').css('display','none');
	if($('#approve_fld').val() == 'Approve'){
	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
	$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
	$('#dis_reason_user').css('display','none');
	var ent = $("#entity_id").val();
	if ($.trim(ent) !== "") {
	$('#approve_confirm').css('display','none');
	$('#modify_btn').css('display','block');
	} else {
	$('#approve_confirm').css('display','block');
	$('#modify_btn').css('display','none');
	}  
	}else{
	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
	$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
	$('#dis_reason_user').css('display','block');
	$('#disp_reason_user').text($('#reason_user').val());
	}       	   	   	 
	}
	else if(tabSelection == 'Dispute Management~Rejected Chargeback'){
	$('#menu_btn,#inpaynext_rej,#charge_back,#choosefile_bulk,#conmsg,#approve_div,#rejackno_hd,#chgrbk_detail').css('display','inline-block');
	$('#chargeback_btn,#d_choosefile_bulk,#d_approve_fld').hide();
	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
		$("#transdetails_tab_grid tbody tr").each(function () {
	var removeRow = true;

	$(this).find("td").each(function () {
        var val = $(this).text().trim();

        if (val !== "") {
            removeRow = false;
            return false;     
        }
	});

	if (removeRow) {
        $(this).remove();
	}
});
		}
/*		else if(tabSelection == 'Dispute Management~Create Initiate Payable'){
 		$('#inpay_hd,#menu_btn,#inpaynext_fld').css('display','inline-block');
 		$('#d_trans_refno').hide();
 		 $('#chargeback_tab tr:nth-child(4) td').hide();
       	 $('#chargeback_tab tr:nth-child(5) td').hide();
       	  $('#chargeback_tab tr:nth-child(6) td').hide();
       	  $('#chargeback_tab tr:nth-child(7) td').hide();
       	  $('#chargeback_tab tr:nth-child(8) td').hide();
       	   $('#chargeback_tab tr:nth-child(9) td').hide();
		}  */
	else if(tabSelection == 'Initiate Payable~Rejected Initiate Payable'){
       	$('#inpay_hd,#inpaynext_rej,#choosefile_bulk,#menu_btn,#reason_blacklist,#conmsg,#approve_div,#rejinpay_head').css('display','inline-block');
	$('#chargetable,#chargetable2').hide();
	$('#d_approve_fld').hide();
      	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
	$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
      
	$("#transdetails_tab_grid tbody tr").each(function () {
	var removeRow = true;

	$(this).find("td").each(function () {
        var val = $(this).text().trim();

        if (val !== "") {
            removeRow = false;
            return false;     
        }
	});

	if (removeRow) {
        $(this).remove();
	}
});


      	
		} 
	else if(tabSelection == 'Initiate Payable~Approve Initiate Payable'){
 		$('#inpay_hd,#menu_btn,#next_fld,#choosefile_bulk,#reason_blacklist,#approve_div,#conmsg,#aprinpay_head').css('display','inline-block');
       	  //$('#dis_upload_fld').hide();
       	  $('#chargetable,#chargetable2').hide();
         $("#transdetails_tab_grid tbody tr").each(function () {
    var removeRow = true;

    $(this).find("td").each(function () {
        var val = $(this).text().trim();

        if (val !== "") {
            removeRow = false;
            return false;     
        }
    });

    if (removeRow) {
        $(this).remove();
    }
});


      		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
		$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
		$('#dis_reason_user').css('display','none');
 	      	if($('#approve_fld').val() == 'Approve'){
              	 
              	 
              	 	 $('#dis_reason_user').css('display','none');
              	 	  var ent = $("#entity_id").val();
   			if ($.trim(ent) !== "") {
   			 $('#approve_confirm').css('display','none');
   			  $('#modify_btn').css('display','block');
		   	 } else {
     		   	 $('#approve_confirm').css('display','block');
   			  $('#modify_btn').css('display','none');
    			}  
              	  }else{
              //	  $('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
              	  $('#dis_reason_user').css('display','block');
              	   $('#disp_reason_user').text($('#reason_user').val());
              	  }       	   	   	  
		}
		
		else if(tabSelection == 'Dispute Management~Search Dispute'){
 		$('#inpay_hd,#menu_btn,#inpaynext_fld').css('display','inline-block');
 		 $('#chargeback_tab tr:nth-child(4) td').hide();
       	 $('#chargeback_tab tr:nth-child(5) td').hide();
       	  $('#chargeback_tab tr:nth-child(6) td').hide();
       	  $('#chargeback_tab tr:nth-child(7) td').hide();
       	  $('#chargeback_tab tr:nth-child(8) td').hide();
       	   $('#chargeback_tab tr:nth-child(9) td').hide();
       	  // $('#d_trans_refno').hide();
		}
		
		
		else if(tabSelection == 'Dispute Management~Approve Representment'){
 		$('#raise_repres,#menu_btn,#next_fld,#approve_div,#conmsg,#chgrbk_detail').css('display','inline-block');
 		   $('#chargeback_btn,#d_choosefile_bulk').hide();
 		$('#dis_reason_user').css('display','none');
 	      	if($('#approve_fld').val() == 'Approve'){
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	 	 $('#dis_reason_user').css('display','none');
              	 	  var ent = $("#entity_id").val();
   			if ($.trim(ent) !== "") {
   			 $('#approve_confirm').css('display','none');
   			  $('#modify_btn').css('display','block');
		   	 } else {
     		   	 $('#approve_confirm').css('display','block');
   			  $('#modify_btn').css('display','none');
    			}  
              	  }else{
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	  $('#dis_reason_user').css('display','block');
              	   $('#disp_reason_user').text($('#reason_user').val());
              	  }       	   	   	 
		}
		
		else if(tabSelection == 'Dispute Management~Chargeback Action'){
 $('#charge_back,#menu_btn,#inpaynext_rej,#approve_div,#choosefile_bulk,#conmsg,#chrgackno_hd,#chgrbk_detail').css('display','inline-block');
 		  $('#chargeback_btn,#d_choosefile_bulk').hide();
 		$('#dis_reason_user').css('display','none');
 	      	if($('#approve_fld').val() == 'Approve'){
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	 	 $('#dis_reason_user').css('display','none');
              	 	  var ent = $("#entity_id").val();
   			if ($.trim(ent) !== "") {
   			 $('#approve_confirm').css('display','none');
   			  $('#modify_btn').css('display','block');
		   	 } else {
     		   	 $('#approve_confirm').css('display','block');
   			  $('#modify_btn').css('display','none');
    			}  
              	  }else{
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	  $('#dis_reason_user').css('display','block');
              	   $('#disp_reason_user').text($('#reason_user').val());
              	  }  
              	  	          $("#transdetails_tab_grid tbody tr").each(function () {
    var removeRow = true;

    $(this).find("td").each(function () {
        var val = $(this).text().trim();

        if (val !== "") {
            removeRow = false;
            return false;     
        }
    });

    if (removeRow) {
        $(this).remove();
    }
});     	   	   	 
		}
		
		else if(tabSelection == 'Dispute Management~Rejected Representment'){
 		$('#menu_btn,#inpaynext_rej,#raise_repres,#choosefile_bulk,#conmsg,#approve_div').css('display','inline-block');
 		  $('#chargeback_btn,#d_choosefile_bulk,#d_approve_fld').hide();
 		      	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
		}
		
		
		else if(tabSelection == 'Dispute Management~Representment Action'){
 		$('#viewpay_hd,#menu_btn,#inpaynext_fld').css('display','inline-block');
 		$('#chargeback_tab tr:nth-child(4) td').hide();
       	 $('#chargeback_tab tr:nth-child(5) td').hide();
       	  $('#chargeback_tab tr:nth-child(6) td').hide();
       	    $('#chargeback_tab tr:nth-child(8) td').hide();
 		
       	 // $('#d_upload_fld').hide();
       	   //$('#chargeback_tab tr:nth-child(8) td').hide();
		}

		else if(tabSelection == 'Initiate Payable~View Initiate Payable'){
 		$('#viewpay_hd,#menu_btn,#inpaynext_fld,#choosefile_bulk').css('display','inline-block');
       	//  $('#d_trans_refno').hide();
       	   //$('#chargeback_tab tr:nth-child(8) td').hide();
		}
		
		}
		
		if (screenId == 'chargeback_view.null' || screenId == 'chargeback_view' || screenId == 'chargeback_view..null' || screenId == 'chargeback_view.') {

	var rawValue = $("#currncy_amt").val();
    var amount = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
    var formattedAmount = "PHP " + amount.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
$("#currncy_amt,#disp_currncy_amt").text(formattedAmount);

	var rawValueq = $("#disputedamt_fld").val();
    var amountq = parseFloat(rawValueq.replace(/[^0-9.]/g, ''));
    var formattedAmountq = "PHP-" + amountq.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
$("#disp_disputedamt_fld").text(formattedAmountq);

$("#chrgbk_confirm tr:first").css('display', 'none');

		this.initFilePopup('upload_fld');
		this.initFilePopup('choosefile_bulk');
		this.initFilePopup('preinpay_doc');
		this.initFilePopup('in_indocment');

		 let tabSelection = $('#tabcontainer .tab-state-selected',parent.document).text()+'~'+$('.ui-state-highlight a',parent.document).text();	
 		if(tabSelection == 'Initiate Payable~Create Initiate Payable'){
 	   	  $('#Initiatepantable tr:nth-child(1) td').removeClass('odd').addClass('even');
 		$('#intiate_hd,#inpay_hd,#inpayconfirm_fld,#choosefile_bulk,#reason_blacklist,#back_btn').css('display','inline-block');
       	  $('#inpayconfirm').hide(); 
       	   $('#chargetable,#chargetable2').hide();
       	    $('#chrgbk_confirm tr td:nth-child(4)').hide();
		}
		else if(tabSelection == 'Dispute Management~Search Dispute'){
 		$('#intiate_hd,#inpay_hd,#inpayconfirm_fld,#choosefile_bulk,#reason_blacklist,#back_btn').css('display','inline-block');
       	  $('#inpayconfirm').hide(); 
       	   $('#chargetable,#chargetable2').hide();
       	   
		}
		else if(tabSelection == 'Initiate Payable~View Initiate Payable'){
 		$('#viewpay_head,#approve_div,#inpayconfirm_fld').css('display','inline-block');
 		 $('#chrgbk_confirm tr:nth-child(4) td').hide();
       	 $('#chrgbk_confirm tr:nth-child(5) td').hide();
       	  $('#chrgbk_confirm tr:nth-child(6) td').hide();
       	 // $('#d_trans_refno').hide();
		}
		
		else if(tabSelection == 'Initiate Payable~Approve Initiate Payable'){
       	 $('#aprintiate_hd,#inpay_hd,#approve_div,#ip_init_accept,#back_btn2').css('display','inline-block');
       	//  $('#dis_upload_fld').hide();
       	  $('#chargetable,#chargetable2').hide();
       	  $('#represent_tab tr:nth-child(5) td').hide();
	$('#represent_tab tr:nth-child(6) td').removeClass('odd').addClass('even');
       	  
 	     	 $('#dis_reason_user').css('display','none');
 	      	if($('#approve_fld').val() == 'Approve'){
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	 $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
              	 	 $('#dis_reason_user').css('display','none');
              	 	  var ent = $("#entity_id").val();
   			if ($.trim(ent) !== "") {
   			 $('#approve_confirm').css('display','none');
		   	 } else {
     		   	 $('#approve_confirm').css('display','block');
    			}  
              	  }else{
              //	  $('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
              	  $('#dis_reason_user').css('display','block');
              	//   $('#disp_reason_user').text($('#reason_user').val());
              	  }
		} 
		
		else if(tabSelection == 'Initiate Payable~Rejected Initiate Payable'){
       	 $('#inpay_hd,#ip_rejected_confirm,#choosefile_bulk,#reason_user,#back_btn,#approve_div,#rejintiate_hd').css('display','inline-block');
       	  $('#chargetable,#chargetable2').hide();
       	   $('#d_approve_fld').hide();
              	 $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
              	  $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
		} 
		
		else if(tabSelection == 'Dispute Management~Rejected Chargeback'){
   $('#charge_back,#rejinpay_confirm,#choosefile_bulk,#back_btn,#approve_div,#chgrbk_detail,#rejchbk_hd').css('display','inline-block');
       	    $('#d_choosefile_bulk,#d_approve_fld').hide();
       	                	 $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
				setTimeout(function () {

			    var $ddl = $('#disputecode_fld');

			    // Initiate_Payable select karo

			    $ddl.val('Chargeback');

			    // sirf wahi option rakho
			    $ddl.find('option').each(function () {
				if ($(this).val() !== 'Chargeback') {
				    $(this).remove();
				}
			    });

			}, 500);
		} 
		
		
		else if(tabSelection == 'Dispute Management~Create Chargeback'){
 		$('#chrbck_hd,#charge_back,#confirm_fld,#choosefile_bulk,#back_btn,#chgrbk_detail').css('display','inline-block');
       	  $('#Initiatepantable,#Initiatepantable2').hide(); 
		}
		else if(tabSelection == 'Dispute Management~View Chargeback'){
 		$('#charge_back,#confirm_fld').css('display','inline-block');
		}
		else if(tabSelection == 'Dispute Management~Approve Chargeback'){
       	 $('#charge_back,#approve_div,#intitiatepay_confirm,#choosefile_bulk,#back_btn2,#chgrbk_detail,#aprchrdet_hd').css('display','inline-block');
       	             $('#Initiatepantable,#Initiatepantable2').hide();
       	        	  $('#chrgbk_confirm tr:nth-child(8) td').hide();
       	        	  
       	        	   $('#dis_reason_user').css('display','none');
	if($('#approve_fld').val() == 'Approve'){
	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
	$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
	$('#dis_reason_user').css('display','none');
	var ent = $("#entity_id").val();
	if ($.trim(ent) !== "") {
	$('#approve_confirm').css('display','none');
	$('#modify_btn').css('display','block');
	} else {
	$('#approve_confirm').css('display','block');
	$('#modify_btn').css('display','none');
    			}  
	}else{
	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
	$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
	$('#dis_reason_user').css('display','block');
	$('#disp_reason_user').text($('#reason_user').val());
              	  }
		} 
		
		else if(tabSelection == 'Dispute Management~Chargeback Action'){
       $('#charge_back,#approve_div,#chrgebck_action_confirm,#back_btn2,#chrgview_hd,#chgrbk_detail').css('display','inline-block');
       	          	 $('#d_choosefile_bulk').hide();
 	     	 $('#dis_reason_user').css('display','none');
 	      	if($('#approve_fld').val() == 'Approve'){
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	     	 $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
              	 	 $('#dis_reason_user').css('display','none');
              	 	  var ent = $("#entity_id").val();
   			if ($.trim(ent) !== "") {
   			 $('#approve_confirm').css('display','none');
   			  $('#modify_btn').css('display','block');
		   	 } else {
     		   	 $('#approve_confirm').css('display','block');
   			  $('#modify_btn').css('display','none');
    			}  
              	  }else{
    	 $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
              	  $('#dis_reason_user').css('display','block');
              	   $('#disp_reason_user').text($('#reason_user').val());
              	  }
		} 
		
		else if(tabSelection == 'Dispute Management~Approve Representment'){
       	 $('#repres_head,#approve_div,#rp_accept,#back_btn2,#chgrbk_detail').css('display','inline-block');
       	 $('#d_choosefile_bulk').hide();
       	        	  $('#chrgbk_confirm tr:nth-child(8) td').hide();
       	        	  
       	        	   $('#dis_reason_user').css('display','none');
 	      	if($('#approve_fld').val() == 'Approve'){
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
              	 	 $('#dis_reason_user').css('display','none');
              	 	  var ent = $("#entity_id").val();
   			if ($.trim(ent) !== "") {
   			 $('#approve_confirm').css('display','none');
   			  $('#modify_btn').css('display','block');
		   	 } else {
     		   	 $('#approve_confirm').css('display','block');
   			  $('#modify_btn').css('display','none');
    			}  
              	  }else{
              	 $('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
              	 $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
              	  $('#dis_reason_user').css('display','block');
              	   $('#disp_reason_user').text($('#reason_user').val());
              	  }
		} 
		
		
		else if(tabSelection == 'Dispute Management~Rejected Representment'){
       	 $('#repres_head,#approve_div,#rp_rejected_confirm,#back_btn').css('display','inline-block');
       	          $('#d_choosefile_bulk,#d_approve_fld').hide();
       	     $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
		} 
		
		else if(tabSelection == 'Dispute Management~Representment Action'){
       	 $('#charge_back,#approve_div,#rep_action_accept').css('display','inline-block');
       	 $('#chrgbk_confirm tr:nth-child(4) td').hide();
       	 $('#chrgbk_confirm tr:nth-child(5) td').hide();
       	  $('#chrgbk_confirm tr:nth-child(6) td').hide();
		}
		
		
		else if(tabSelection == 'Dispute Management~Approve Arbitration'){
       	 $('#aprpay_hd,#approve_div,#intitiatepay_confirm').css('display','inline-block');
       	 $('#chrgbk_confirm tr:nth-child(4) td').hide();
       	 $('#chrgbk_confirm tr:nth-child(5) td').hide();
       	 $('#chrgbk_confirm tr:nth-child(8) td').hide();
       	//  $('#dis_upload_fld').hide();
       	  
       	   $("#txt_reason_user").hide();
 	   	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
		} 
		
		
		else if(tabSelection == 'Dispute Management~Rejected Arbitration'){
       	 $('#aprpay_hd,#approve_div,#rejinpay_confirm').css('display','inline-block');
       	 $('#chrgbk_confirm tr:nth-child(4) td').hide();
       	 $('#chrgbk_confirm tr:nth-child(5) td').hide();
       	  $('#chrgbk_confirm tr:nth-child(6) td').hide();
		} 
		
		else if(tabSelection == 'Dispute Management~Arbitration Action'){
       	 $('#aprpay_hd,#approve_div,#rep_action_accept').css('display','inline-block');
       	 $('#chrgbk_confirm tr:nth-child(4) td').hide();
       	 $('#chrgbk_confirm tr:nth-child(5) td').hide();
       	  $('#chrgbk_confirm tr:nth-child(6) td').hide();
		} 
		
		}


	if(screenId == 'chargeback_ackno'){
	
		var rawValue = $("#currncy_amt").val();
    var amount = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
    var formattedAmount = "PHP " + amount.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
$("#currncy_amt,#disp_currncy_amt").text(formattedAmount);

	var rawValueq = $("#disputedamt_fld").val();
    var amountq = parseFloat(rawValueq.replace(/[^0-9.]/g, ''));
    var formattedAmountq = "PHP-" + amountq.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
$("#disp_disputedamt_fld").text(formattedAmountq);

		$('#icon_plus').on('click', function () {


		});
	}
		if (screenId == 'chargeback_ackno.null' || screenId == 'chargeback_ackno' || screenId == 'chargeback_ackno..null' || screenId == 'chargeback_ackno.') {
$("#chrgbk_confirm tr:first").css('display', 'none');

			var tempo=$('#txncount').val();
			var arr = [];
			//var temp1=$('#sample1').val();
			//var temp2=$('#sample2').val();
			//var temp3=$('#sample3').val();
			//var temp4=$('#sample4').val();
			// var temp5=$('#sample5').val();
			// alert(temp1+ 'temp1');
			// alert(temp1+ 'temp1');
			// alert(temp3+ 'temp3');
			// alert(temp4+ 'temp4');
			// alert(temp5+ 'temp5');

			
	for(var k=1;k<=5;k++){
		let temp = "sample"+k;
		// alert(temp);
		temp = $("#"+temp).val();
		// alert(temp+' after assigning');
		if(temp !== null && temp.length !== 0){
			arr.push(temp);
			//alert(arr.length);
		}else{
			continue;
		}
var tableHtml = `<table border="0" lang="en" id="Initiatepantable" data-spine-container="form" class="table margin-spacer2" style="border-collapse: collapse; display: none;">
<tbody>
			<tr>
			<th style="text-align: left;    font-size: medium;"><lable>Case ${k}</lable></th>
			<th></th>
			</tr>
  <!-- 1. Initiate Payable Date & Time -->
  <tr>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_Initiatedate">
        <div class="fieldbox" id="d_Initiatedate">
          <label class="disp_Initiatedate field-label textview">Initiate Payable Date &amp; Time</label>
          <input type="hidden" id="Initiatedate" name="Initiatedate" data-spine-prop="Initiatedate">
          <span id="disp_Initiatedate"></span>
        </div>
        <div class="error-container" id="er_Initiatedate"></div>
      </div>
    </td>
    <!-- 2. Partial Flag -->
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_partialfilg">
        <div class="fieldbox" id="d_in_partialfilg">
          <label class="disp_in_partialfilg field-label textview">Partial Flag</label>
          <input type="hidden" id="in_partialfilg" name="in_partialfilg" data-spine-prop="in_partialfilg">
          <span id="disp_in_partialfilg"></span>
        </div>
        <div class="error-container" id="er_in_partialfilg"></div>
      </div>
    </td>
  </tr>
  <!-- 3. Txn Currency & 4. Payable Amount -->
  <tr>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_txncurrency">
        <div class="fieldbox" id="d_in_txncurrency">
          <label class="disp_in_txncurrency field-label textview">Txn Currency</label>
          <input type="hidden" id="in_txncurrency" name="in_txncurrency" data-spine-prop="in_txncurrency">
          <span id="disp_in_txncurrency"></span>
        </div>
        <div class="error-container" id="er_in_txncurrency"></div>
      </div>
    </td>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_payableamt">
        <div class="fieldbox" id="d_in_payableamt">
          <label class="disp_in_payableamt field-label textview">Payable Amount</label>
          <input type="hidden" id="in_payableamt" name="in_payableamt" data-spine-prop="in_payableamt">
          <span id="disp_in_payableamt"></span>
        </div>
        <div class="error-container" id="er_in_payableamt"></div>
      </div>
    </td>
  </tr>
  <!-- 5. OFI Account No & 6. Dispute Amount -->
  <tr>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_ofiacctno">
        <div class="fieldbox" id="d_in_ofiacctno">
          <label class="disp_in_ofiacctno field-label textview">OFI Account No</label>
          <input type="hidden" id="in_ofiacctno" name="in_ofiacctno" data-spine-prop="in_ofiacctno">
          <span id="disp_in_ofiacctno"></span>
        </div>
        <div class="error-container" id="er_in_ofiacctno"></div>
      </div>
    </td>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_disputeamt">
        <div class="fieldbox" id="d_in_disputeamt">
          <label class="disp_in_disputeamt field-label textview">Dispute Amount</label>
          <input type="hidden" id="in_disputeamt" name="in_disputeamt" data-spine-prop="in_disputeamt">
          <span id="disp_in_disputeamt"></span>
        </div>
        <div class="error-container" id="er_in_disputeamt"></div>
      </div>
    </td>
  </tr>
  <!-- 7. RFI Account No & 8. Dispute Reason -->
  <tr>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_rfiacctno">
        <div class="fieldbox" id="d_in_rfiacctno">
          <label class="disp_in_rfiacctno field-label textview">RFI Account No</label>
          <input type="hidden" id="in_rfiacctno" name="in_rfiacctno" data-spine-prop="in_rfiacctno">
          <span id="disp_in_rfiacctno"></span>
        </div>
        <div class="error-container" id="er_in_rfiacctno"></div>
      </div>
    </td>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_disputereason">
        <div class="fieldbox" id="d_in_disputereason">
          <label class="disp_in_disputereason field-label textview">Dispute Reason</label>
          <input type="hidden" id="in_disputereason" name="in_disputereason" data-spine-prop="in_disputereason">
          <span id="disp_in_disputereason"></span>
        </div>
        <div class="error-container" id="er_in_disputereason"></div>
      </div>
    </td>
  </tr>
  <!-- 9. Maker ID & 10. Maker Date -->
  <tr>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_makerid">
        <div class="fieldbox" id="d_in_makerid">
          <label class="disp_in_makerid field-label textview">Maker ID</label>
          <input type="hidden" id="in_makerid" name="in_makerid" data-spine-prop="in_makerid">
          <span id="disp_in_makerid"></span>
        </div>
        <div class="error-container" id="er_in_makerid"></div>
      </div>
    </td>
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_makerdate">
        <div class="fieldbox" id="d_in_makerdate">
          <label class="disp_in_makerdate field-label textview">Maker Date</label>
          <input type="hidden" id="in_makerdate" name="in_makerdate" data-spine-prop="in_makerdate">
          <span id="disp_in_makerdate"></span>
        </div>
        <div class="error-container" id="er_in_makerdate"></div>
      </div>
    </td>
  </tr>
  <!-- 11. Checker ID & 12. Checker Date -->
  <tr>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_checkerid">
        <div class="fieldbox" id="d_in_checkerid">
          <label class="disp_in_checkerid field-label textview">Checker ID</label>
          <input type="hidden" id="in_checkerid" name="in_checkerid" data-spine-prop="in_checkerid">
          <span id="disp_in_checkerid"></span>
        </div>
        <div class="error-container" id="er_in_checkerid"></div>
      </div>
    </td>
    <td class="odd" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_checkerdate">
        <div class="fieldbox" id="d_in_checkerdate">
          <label class="disp_in_checkerdate field-label textview">Checker Date</label>
          <input type="hidden" id="in_checkerdate" name="in_checkerdate" data-spine-prop="in_checkerdate">
          <span id="disp_in_checkerdate"></span>
        </div>
        <div class="error-container" id="er_in_checkerdate"></div>
      </div>
    </td>
  </tr>
  <!-- 13. Ageing & 14. Biller Name -->
  <tr>
    <!-- Ageing -->
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_ageing">
        <div class="fieldbox" id="d_in_ageing">
          <label class="disp_in_ageing field-label textview">Ageing</label>
          <input type="hidden" id="in_ageing" name="in_ageing" data-spine-prop="in_ageing">
          <span id="disp_in_ageing"></span>
        </div>
        <div class="error-container" id="er_in_ageing"></div>
      </div>
    </td>
    <!-- Biller Name -->
    <td class="even" style="padding: 3px;">
      <div class="my-displayfield-wrapper" id="dis_in_billername">
        <div class="fieldbox" id="d_in_billername">
          <label class="disp_in_billername field-label textview">Biller Name</label>
          <input type="hidden" id="in_billername" name="in_billername" data-spine-prop="in_billername">
          <span id="disp_in_billername"></span>
        </div>
        <div class="error-container" id="er_in_billername"></div>
      </div>
    </td>
  </tr>
<tr>

<td colspan="" class="odd" style="padding: 3px;">

<div class="my-displayfield-wrapper" id="dis_in_makerreson">

<div class="fieldbox" id="d_in_makerreson">

<label for="caption" class="disp_in_makerreson field-label textview">Maker Remark</label>

<input type="hidden" data-label="Maker Remark" class="" data-mandatory="Y" data-spine-prop="in_makerreson" name="in_makerreson" id="in_makerreson" data-spine-type="displayText" value="" data-rule-required="true">

<span type="text" id="disp_in_makerreson_1" name="disp_in_makerreson"></span></div>   

<div class="error-container" id="er_Initiatedate"></div>

</div>

</td>
<td colspan="" class="odd" style="padding: 3px;">       
</td>
</tr>

<tr>
<td colspan="" class="even" style="padding: 3px;">
<div class="my-displayfield-wrapper" id="dis_in_chckerreson">
<div class="fieldbox" id="d_in_chckerreson">
<label for="caption" class="disp_in_chckerreson field-label textview">Checker Remark</label>
<input type="hidden" data-label="Checker Remark" class="" data-mandatory="Y" data-spine-prop="in_chckerreson" name="in_chckerreson" id="in_chckerreson" data-spine-type="displayText" value="" data-rule-required="true">
<span type="text" id="disp_in_chckerreson" name="disp_in_chckerreson"></span>  
<div class="error-container" id="er_Initiatedate"></div>
</div>
</td>
<td colspan="" class="even" style="padding: 3px;">       
</td>
</tr>

<tr>
<td colspan="" class="odd" style="padding: 3px;">
<div class="my-displayfield-wrapper" id="dis_in_indocment">
<div class="fieldbox" id="d_in_indocment">
<label for="caption" class="disp_in_indocment field-label textview">Documents</label>
<input type="hidden" data-label="Documents" class="" data-mandatory="Y" data-spine-prop="in_indocment" name="in_indocment" id="in_indocment" data-spine-type="displayText" value="" data-rule-required="true">
<span type="text" id="disp_in_indocment" name="disp_in_indocment"></span>
</div>   
<div class="error-container" id="er_Initiatedate"></div>
</div>
</td>

<td colspan="" class="odd" style="padding: 3px;">       
</td>
</tr>
</tbody>
</table>`;
// Append to the element with id 'panel3'
$('#panel3').append(tableHtml);
		$("#disp_Initiatedate").attr("id", "disp_Initiatedate_" + k);
$("#disp_in_partialfilg").attr("id", "disp_in_partialfilg_" + k);
$("#disp_in_txncurrency").attr("id", "disp_in_txncurrency_" + k);
$("#disp_in_payableamt").attr("id", "disp_in_payableamt_" + k);
$("#disp_in_ofiacctno").attr("id", "disp_in_ofiacctno_" + k);
$("#disp_in_disputeamt").attr("id", "disp_in_disputeamt_" + k);
$("#disp_in_rfiacctno").attr("id", "disp_in_rfiacctno_" + k);
$("#disp_in_disputereason").attr("id", "disp_in_disputereason_" + k);
$("#disp_in_makerid").attr("id", "disp_in_makerid_" + k);
$("#disp_in_makerdate").attr("id", "disp_in_makerdate_" + k);
$("#disp_in_checkerid").attr("id", "disp_in_checkerid_" + k);
$("#disp_in_checkerdate").attr("id", "disp_in_checkerdate_" + k);
$("#disp_in_ageing").attr("id", "disp_in_ageing_" + k);
$("#disp_in_billername").attr("id", "disp_in_billername_" + k);
$("#disp_in_makerreson").attr("id", "disp_in_makerreson_" + k);
$("#disp_in_chckerreson").attr("id", "disp_in_chckerreson_" + k);
$("#disp_in_indocment").attr("id", "disp_in_indocment_" + k);
	}
			//var temp1=$('#sample1').val();
			//var temp2=$('#sample2').val();
			//alert(temp1);
			//alert(temp2);
	/*		$("#disp_Initiatedate").text('avinashhh');
var temp1 = '1,2,PHP,3000.00,917,3000.00,09001BOPIPHMMXXX,raised by ganesh p2,Maker19,04 Feb 2026 09:29:3,Maker28,1 day,BPI EXPRESS CAR,';
var temp2 = '2,2,PHP,3000.00,917,3000.00,09001BOPIPHMMXXX,raised by ganesh p2,Maker19,04 Feb 2026 09:29:3,Maker28,1 day,BPI EXPRESS CAR,';
var temp3 = '3,3,PHP,5000.00,918,5000.00,09002BOPIPHMMXXX,raised by ram p3,Maker20,04 Feb 2026 09:30:0,Maker29,2 days,BPI EXPRESS CAR,';
var temp4 = '4,4,PHP,7000.00,919,7000.00,09003BOPIPHMMXXX,raised by sita p4,Maker21,04 Feb 2026 09:31:1,Maker30,3 days,BPI EXPRESS CAR,';
var temp5 = '5,5,PHP,9000.00,920,9000.00,09004gfjtftgfjtfgjytfjytfjytffjtBOPIPHMMXXX,raised by laxman p5,Maker22,04 Feb 2026 09:32:2,Maker31,4 days,BPI EXPRESS CAR,';*/

    //var arr = [temp1, temp2];



    for (var i = 0; i < arr.length; i++) {
        var parts = arr[i].split('$#$');
	   // i=i+1;
	    let j = i+1;
	    var initiatedId     = "disp_Initiatedate_"   + j;
var partialId       = "disp_in_partialfilg_" + j;
var currencyId      = "disp_in_txncurrency_" + j;
var payableId       = "disp_in_payableamt_"  + j;
var ofiAcctId       = "disp_in_ofiacctno_"   + j;
var disputeAmtId    = "disp_in_disputeamt_"  + j;
var rfiAcctId       = "disp_in_rfiacctno_"   + j;
var disputeReasonId = "disp_in_disputereason_" + j;
var makerId         = "disp_in_makerid_"     + j;
var makerDateId     = "disp_in_makerdate_"   + j;
var checkerId       = "disp_in_checkerid_"   + j;
var checkerDateId     = "disp_in_chekerdate_"   + j;
var ageingId        = "disp_in_ageing_"      + j;
var billerNameId    = "disp_in_billername_"  + j;
var makerResonId    = "disp_in_makerreson_"  + j;
var chckerreson    = "disp_in_chckerreson_"  + j;
var indocment    = "disp_in_indocment_"  + j;
//alert(parts[0]);

$("#" + initiatedId).text(parts[0]);
$("#" + partialId).text(parts[1]);
$("#" + currencyId).text(parts[2]);
var amount1 = parseFloat(parts[3]);
var formattedAmount1 = amount1.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
$("#" + payableId).text(formattedAmount1);
$("#" + ofiAcctId).text(parts[4]);
var amount2 = parseFloat(parts[5]);
var formattedAmount2 = amount2.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
$("#" + disputeAmtId).text(formattedAmount2);
$("#" + rfiAcctId).text(parts[6]);
$("#" + disputeReasonId).text(parts[7]);
$("#" + makerId).text(parts[8]);
$("#" + makerDateId).text(parts[9]);
$("#" + checkerId).text(parts[10]);
$("#" + checkerDateId).text(parts[11]);
$("#" + ageingId).text(parts[12]);
$("#" + billerNameId).text(parts[13]);
$("#" + makerResonId).text(parts[14]);
$("#" + chckerreson).text(parts[15]);
$("#" + indocment).text(parts[16]);
	    //i=i-1;
    }



		this.initFilePopup('choosefile_bulk');
		this.initFilePopup('upload_fld');
		this.initFilePopup('in_indocment');

		
		 let tabSelection = $('#tabcontainer .tab-state-selected',parent.document).text()+'~'+$('.ui-state-highlight a',parent.document).text();	
 		if(tabSelection == 'Dispute Management~View Chargeback'){       	   
        $('#next_viewinpay,#charge_back,#chgrbk_detail,#chrbck_view').css('display','inline-block');
        $('#d_choosefile_bulk').hide();
	} 
	else if(tabSelection == 'Dispute Management~Create Chargeback'){
       	$('#next_inpay,#d_choosefile_bulk,#charge_back,#chrbck_hd,#chgrbk_detail').css('display','inline-block');
       	$('#Initiatepantable,#Initiatepantable2').hide();

		$("#transdetails_tab_grid tbody tr").each(function () {
		    var removeRow = true;

		    $(this).find("td").each(function () {
			var val = $(this).text().trim();

			if (val !== "") {
			    removeRow = false;
			    return false;     
			}
		    });

		    if (removeRow) {
			$(this).remove();
		    }
		});
		} 
		else if(tabSelection == 'Dispute Management~Rejected Chargeback'){
       	$('#charge_back,#next_aprnpay').css('display','inline-block');
       	$('#d_choosefile_bulk').hide();
		} 
	else if(tabSelection == 'Initiate Payable~View Initiate Payable'){
     $('#intiate_view,#view_inpay,#next_viewinpay,#d_choosefile_bulk,#reason_blacklist').css('display','inline-block');
       	 $('#chargetable,#chargetable2,#intiate_hd').hide();
       	//  $('#d_trans_refno').hide();

       	       	 
		} 
		else if(tabSelection == 'Initiate Payable~Approve Initiate Payable'){
       	$('#view_inpay,#next_aprnpay,#d_choosefile_bulk,#intiate_hd').css('display','inline-block');
       	 //  $('#d_trans_refno').hide();
       	    $('#chargetable,#chargetable2').hide();
       	     	  
		} 
		
		else if(tabSelection == 'Initiate Payable~Create Initiate Payable'){
		 	   	  $('#Initiatepantable tr:nth-child(1) td').removeClass('odd').addClass('even');
      $('#intiate_hd,#view_inpay,#next_inpay,#d_choosefile_bulk,#reason_blacklist').css('display','inline-block');
       	  $('#chargetable,#chargetable2').hide();
       	  
       	  

			$("#transdetails_tab_grid tbody tr").each(function () {
			    var removeRow = true;

			    $(this).find("td").each(function () {
				var val = $(this).text().trim();

				if (val !== "") {
				    removeRow = false;
				    return false;     
				}
			    });

			    if (removeRow) {
				$(this).remove();
			    }
			});
	
		} 
		
		else if(tabSelection == 'Dispute Management~Approve Chargeback'){
       	$('#charge_back,#next_aprnpay,#choosefile_bulk,#aprcharge_head,#chgrbk_detail').css('display','inline-block');
       	  $('#d_choosefile_bulk').hide();
		} 
		else if(tabSelection == 'Dispute Management~Search Dispute'){
       	$('#intiate_hd,#view_inpay,#next_inpay,#d_choosefile_bulk,#reason_blacklist').css('display','inline-block');
       	  $('#chargetable,#chargetable2').hide();
       	  

			$("#transdetails_tab_grid tbody tr").each(function () {
			    var removeRow = true;

			    $(this).find("td").each(function () {
				var val = $(this).text().trim();

				if (val !== "") {
				    removeRow = false;
				    return false;     
				}
			    });

			    if (removeRow) {
				$(this).remove();
			    }
			});
			       	  
		} 
		else if(tabSelection == 'Dispute Management~Approve Representment'){
       	$('#raise_repres,#next_aprnpay,#choosefile_bulk,#chgrbk_detail,#represent_hd').css('display','inline-block');
       	  $('#d_choosefile_bulk').hide();
		} 
		if(tabSelection == 'Dispute Management~View Representment'){       	   
        $('#next_viewinpay,#raise_repres,#chgrbk_detail,#repreview_hd').css('display','inline-block');
        $('#d_choosefile_bulk').hide();
	} 
		
		this.initFilePopup('upload_fld');
		
			let conmsg = populateDataUtils.outputObjData.data.query0[0].confirm_msg;
		$('#confirm_msg').html(conmsg).css({'width':'100% !important','font-weight':'bold'});
		
		}
		
	$(function () {
        const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        const dtRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        $("input[type=hidden][data-spine-type='displayText']").each(function () {
        const val = $(this).val();
        if (!dtRegex.test(val)) return;
        const [dateStr, time] = val.split(" ");
        const d = new Date(dateStr);
        const formatted = `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()} ${time}`;
        $("#disp_" + this.id).text(formatted);
    });
});

if (screenId == 'chargeback_src.null' || screenId == 'chargeback_src' || screenId == 'chargeback_src..null' || screenId == 'chargeback_src.') {
	
	
	var rawValue = $("#currncy_amt").val();
    var amount = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
    var formattedAmount = "PHP " + amount.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2});
$("#currncy_amt,#disp_currncy_amt").text(formattedAmount);
		
this.initFilePopup('choosefile_bulk');
this.initFilePopup('upload_fld');
this.initFilePopup('in_indocment');
	
			

let tabSelection = $('#tabcontainer .tab-state-selected',parent.document).text()+'~'+$('.ui-state-highlight a',parent.document).text();	

 	
   	if($('.ui-state-highlight a',parent.document).text() == 'Rejected Initiate Payable'){
        $('#rejintiate_hd,#inpayable_hd,#choosefile_bulk,#reason_user,#approve_div').css('display','inline-block');
        $('#chargetable,#chargetable2').hide();
        $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Initiate Payable")
        .success(function (data) {
        	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
        	if(JSON.parse(data).data.Distype.length = 1){ 
	$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	 }  
        
        });
        
         var choosefile_bulk = $("#choosefile_bulk[data-spine-type='file']").val();
				if (choosefile_bulk) {
   			 var fileName = choosefile_bulk.substring(choosefile_bulk.indexOf('=') + 1, choosefile_bulk.indexOf('&'));
    $("#fimager").length || $("#files_choosefile_bulk").append('<a id="fimager" href="'+choosefile_bulk+'" target="_blank">'+fileName+'</a>');
    			$("#fimager").attr("href", choosefile_bulk).text(fileName);
   			 $('.percentchoosefile_bulk').text('100%');
    				$('.barchoosefile_bulk').css({ width: '100%' });
		    $('#imgAnchorTag_choosefile_bulk').attr('href', choosefile_bulk);
//$('#imgPreview_choosefile_bulk').attr('src', choosefile_bulk).css({'width': '150px','height': '100px','display': 'inline','border': '1.5px solid black','object-fit':'contain'});
    $("#closeBtn_choosefile_bulk").length || $('#choosenImg_choosefile_bulk').append('<span id="closeBtn_choosefile_bulk" class="close-btn">×</span>');
		$("#closeBtn_choosefile_bulk").show();
	$("#closeBtn_choosefile_bulk").off("click").on("click", function() {
   		require("screenjs/transaction").clearchoosefile_bulk();
		});
		}
		// Add / update file link
        $("#fimager").length ||
            $("#files_choosefile_bulk").append(
                '<a id="fimager" href="' + upload_fld + '" target="_blank">' + fileName + '</a>'
            );

        $("#fimager").attr("href", upload_fld).text(fileName);

        // 🔥 HIDE "No File Chosen" TEXT WHEN FILE EXISTS
        if ($("#fimager").length) {

            $("#files_choosefile_bulk")

                .contents()
                .filter(function () {
                    return this.nodeType === 3 &&
                        $.trim(this.nodeValue) === "No File Chosen";
                })
                .remove();
        } setTimeout(function () {

    var $ddl = $('#disputecode_fld');


    // Initiate_Payable select karo
    $ddl.val('Initiate_Payable');

    // sirf wahi option rakho
    $ddl.find('option').each(function () {

        if ($(this).val() !== 'Initiate_Payable') {
            $(this).remove();
        }
    });

}, 500);


    setTimeout(function () {
        $('#txt_maxlimit_fld input').prop('readonly', true);
    }, 0);

		    setTimeout(function () {
	            console.log("NEWWWWWW 2 !!!!!!!!!");
	            $('div.upele_PAN_Card_upload').remove();
	            $('div.upele_Aadhar_Card_upload').remove();
	            $('div.upele_Certificate_upload').remove();  
            }, 500);  	
        
	} 
	
		else if($('.ui-state-highlight a',parent.document).text() == 'Search Dispute'){
		$('#intiate_hd,#inpayable_hd,#choosefile_bulk').css('display','inline-block');
                $('#chargetable,#chargetable2,#d_chargeback_view').hide();
	       $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Initiate Payable")
		.success(function (data) {
	   	 populateDataUtils.ObjectDropDown(
		'disputecode_fld',JSON.parse(data).data.Distype);
	    if (JSON.parse(data).data.Distype.length === 1) {
		$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	    }
		});

		 $.post(
       	  "../formaction?bulkcmd=InitiateDocumentList&screenName=transactor").success(function (data) {
       	   populateDataUtils.ObjectDropDown('docname_fld',JSON.parse(data).data.InitiateList);
       	 });

        
	} 
	 else if($('.ui-state-highlight a',parent.document).text() == 'View Initiate Payable'){
        $('#viewpayable_hd').css('display','inline-block');
        $('#chrgbk_tab tr:nth-child(4) td').hide();
        $('#chrgbk_tab tr:nth-child(5) td').hide();
       //  $('#d_trans_refno').hide();
	} 
	else if($('.ui-state-highlight a',parent.document).text() == 'Create Chargeback'){
        $('#charge_back,#chrbck_hd,#chgrbk_detail').css('display','inline-block');
                 $('#Initiatepantable,#Initiatepantable2').hide();
			 $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Chargeback")
        .success(function (data) {
        	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
        /*	  if(JSON.parse(data).data.Distype.length = 1){ 
	$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	 }  */
        });
        
        this.initFilePopup('upload_fld');
        
        $.post(
         "../formaction?bulkcmd=ChargebackDocumentList&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('docname_fld',JSON.parse(data).data.ChargebackList);
        });

$('#submit_fld').prop('disabled', true).css('opacity', '0.5');

		$('[data-mandatory="Y"]:visible').on('change keyup', function() {
		    let ok = true;
		    $('[data-mandatory="Y"]:visible').each(function() {
			if (!$(this).val()) ok = false;
		    });

		    $('#submit_fld')
			.prop('disabled', !ok)
			.css('opacity', ok ? '1' : '0.5');
		}).trigger('change');
		
 setTimeout(function () {

    var $ddl = $('#disputecode_fld');

    // Initiate_Payable select karo
    $ddl.val('Chargeback');

    // sirf wahi option rakho
    $ddl.find('option').each(function () {
        if ($(this).val() !== 'Chargeback') {
            $(this).remove();
        }
    });

}, 500);
	} 
	
	else if($('.ui-state-highlight a',parent.document).text() == 'Rejected Representment'){
        $('#repsent_reject,#approve_div').css('display','inline-block');
                $('#chrgbk_tab tr:nth-child(6) td').hide();
                $("#chargeback_files").hide();
                                 	   	  $('#chrgbk_tab tr:nth-child(7) td').removeClass('even').addClass('odd');
			 $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Representment")
        .success(function (data) {
        	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
          if(JSON.parse(data).data.Distype.length = 1){ 
	$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	 }  
        });
        
	} 
	 
	 else if($('.ui-state-highlight a',parent.document).text() == 'Rejected Arbitration'){
        $('#charge_back').css('display','inline-block');
                $('#chrgbk_tab tr:nth-child(6) td').hide();
			 $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Arbitration")
        .success(function (data) {
        	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
          if(JSON.parse(data).data.Distype.length = 1){ 
	$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	 }  
        });
	} 
	 
	 else if($('.ui-state-highlight a',parent.document).text() == 'Arbitration Action'){
        $('#charge_back').css('display','inline-block');
                $('#chrgbk_tab tr:nth-child(6) td').hide();
			 $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Arbitration")
        .success(function (data) {
        	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
          if(JSON.parse(data).data.Distype.length = 1){ 
	$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	 }  
        });
        
	} 
	 
	 else if($('.ui-state-highlight a',parent.document).text() == 'View Chargeback'){
        $('#charge_back,#chgrbk_detail').css('display','inline-block');
	} 
	 else if($('.ui-state-highlight a',parent.document).text() == 'Approve Chargeback'){
        $('#charge_back,#chgrbk_detail').css('display','inline-block');
	} 
	 else if($('.ui-state-highlight a',parent.document).text() == 'Approve Initiate Payable'){
        $('#aprpayable_hd').css('display','inline-block');
        $('#chrgbk_tab tr:nth-child(4) td').hide();
        $('#chrgbk_tab tr:nth-child(5) td').hide();
   //      $('#d_trans_refno').hide();
	} 
	else if($('.ui-state-highlight a',parent.document).text() == 'Rejected Chargeback'){
	
        $('#charge_back,#approve_div,#chgrbk_detail,#chrgrej_hd').css('display','inline-block');
        $('#chrgbk_tab tr:nth-child(6) td').hide();
         	   	  $('#chrgbk_tab tr:nth-child(7) td').removeClass('even').addClass('odd');
        
        $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Chargeback")
        .success(function (data) {
        	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
        	/* if(JSON.parse(data).data.Distype.length = 1){ 
	$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
        	  }*/
        });
        
          var upload_fld = $("#upload_fld[data-spine-type='file']").val();
				if (upload_fld) {
   			 var fileName = upload_fld.substring(upload_fld.indexOf('=') + 1, upload_fld.indexOf('&'));
    $("#fimager").length || $("#files_upload_fld").append('<a id="fimager" href="'+upload_fld+'" target="_blank">'+fileName+'</a>');
    			$("#fimager").attr("href", upload_fld).text(fileName);
   			 $('.percentupload_fld').text('100%');
    				$('.barupload_fld').css({ width: '100%' });
		    $('#imgAnchorTag_upload_fld').attr('href', upload_fld);
//$('#imgPreview_upload_fld').attr('src', upload_fld).css({'width': '150px','height': '100px','display': 'inline','border': '1.5px solid black','object-fit':'contain'});
    $("#closeBtn_upload_fld").length || $('#choosenImg_upload_fld').append('<span id="closeBtn_upload_fld" class="close-btn">×</span>');
		$("#closeBtn_upload_fld").show();
	$("#closeBtn_upload_fld").off("click").on("click", function() {
   		require("screenjs/transaction").clearUpload_fld();
		});
		}
        
         setTimeout(function () {

    var $ddl = $('#disputecode_fld');

    // Initiate_Payable select karo
    $ddl.val('Chargeback');

    // sirf wahi option rakho
    $ddl.find('option').each(function () {
        if ($(this).val() !== 'Chargeback') {
            $(this).remove();
        }
    });

}, 500);
   
        
        
	} 
	else if($('.ui-state-highlight a',parent.document).text() == 'Create Initiate Payable'){
 	   	  $('#Initiatepantable tr:nth-child(1) td').removeClass('odd').addClass('even');
        	$('#intiate_hd,#inpayable_hd,#choosefile_bulk').css('display','inline-block');
                $('#chargetable,#chargetable2,#d_chargeback_view').hide();
	       $.post("../formaction?bulkcmd=fetchdisputetype&screenName=transactor&dis_type=Initiate_Payable")
		.success(function (data) {
	   	 populateDataUtils.ObjectDropDown('disputecode_fld',JSON.parse(data).data.Distype);
	    if (JSON.parse(data).data.Distype.length === 1) {
		$('#disputecode_fld').val(JSON.parse(data).data.Distype[0].key);
	    }
		});

		function InitiateDocumentList(){
		 $.post(
       	  "../formaction?bulkcmd=InitiateDocumentList&screenName=transactor").success(function (data) {
       	   populateDataUtils.ObjectDropDown('docname_fld',JSON.parse(data).data.InitiateList);
       	 });
		}

		function fetchreasoncode(){
		 $.post(
       	  "../formaction?bulkcmd=fetchreasoncodes&screenName=transactor&dis_type=Initiate_Payable").success(function (data) {
       	   populateDataUtils.ObjectDropDown('disputereason_fld',JSON.parse(data).data.ReasonCodes);
       	 });
		}


		
		InitiateDocumentList();
       	 
		$('#submit_fld').prop('disabled', true).css('opacity', '0.5');

		$('[data-mandatory="Y"]:visible').on('change keyup', function() {
		    let ok = true;
		    $('[data-mandatory="Y"]:visible').each(function() {
			if (!$(this).val()) ok = false;
		    });

		    $('#submit_fld')
			.prop('disabled', !ok)
			.css('opacity', ok ? '1' : '0.5');
		}).trigger('change');
	

 setTimeout(function () {

    var $ddl = $('#disputecode_fld');

    // Initiate_Payable select karo
    $ddl.val('Initiate_Payable');

    // sirf wahi option rakho
    $ddl.find('option').each(function () {
        if ($(this).val() !== 'Initiate_Payable') {
            $(this).remove();
        }
    });

}, 500);

   $('#cd_disputedamt_fld').on('blur', function () {
    let val = $(this).val().trim();

    if (val === '') return;

    // number banake 2 decimal fix
    val = parseFloat(val);

    if (!isNaN(val)) {
        $(this).val(val.toFixed(2)); // .00 ke sath
    }
});
		

$('#0_disputetype_fld').prop('checked',true);


$('#0_disputetype_fld').on('click',function(){
   				$('#ab_disputedamt_fld,#cd_disputedamt_fld').attr('disabled',true).css('opacity','50%');
   				$('#disputedamt_fld').val('');
   			$('#ab_disputedamt_fld,#cd_disputedamt_fld').attr('disabled',true).css('opacity','50%');
   			$('#ab_disputedamt_fld').val(prevdata.tan_txnccy);
   			$('#cd_disputedamt_fld').val(prevdata.tan_amnt);
   			$('#disputedamt_fld').val(prevdata.tan_txnccy + '-' + prevdata.tan_amnt);
   			});
   			$('#1_disputetype_fld').on('click',function(){
   			$('#ab_disputedamt_fld').val(prevdata.tan_txnccy);
   			$('#cd_disputedamt_fld').attr('disabled',true).css('opacity','50%');
   				$('#cd_disputedamt_fld').attr('disabled',false).css('opacity','100%');
   				$('#ab_disputedamt_fld').attr('disabled',true).css('opacity','50%');
   				//$('#disputedamt_fld,#cd_disputedamt_fld').val('');
   			});



			function InitiateDocumentList2(selectedDoc){
    $.post(
        "../formaction?bulkcmd=InitiateDocumentList&screenName=transactor"
    ).success(function (data) {

        let parsed = JSON.parse(data);
        let docList = parsed.data.InitiateList;

        populateDataUtils.ObjectDropDown('docname_fld', docList);

        if(selectedDoc){
            $('#docname_fld').val(selectedDoc);
        }

		require("screenjs/transaction").ConfigDocChange2(selectedDoc);
    });
}


function fetchreasoncode2(selectedValue){
    $.post(
        "../formaction?bulkcmd=fetchreasoncodes&screenName=transactor&dis_type=Initiate_Payable"
    ).success(function (data) {

        let parsed = JSON.parse(data);
        let reasonList = parsed.data.ReasonCodes;

        populateDataUtils.ObjectDropDown('disputereason_fld', reasonList);

        // 👉 Set value AFTER dropdown populated
        if(selectedValue){
            $('#disputereason_fld').val(selectedValue);
        }


		
    });
}


				//on back functionality
			
				if(populateDataUtils.outputObjData.prevInputData.bulkcmd === "back_inpay"){
			console.log("The value of output object : ",populateDataUtils.outputObjData);

			console.log("The value of output object : ",JSON.parse(populateDataUtils.outputObjData.prevInputData.multi_transactor_back_inpay).chrgbk_confirm[0]);
			
			const the_back_json = populateDataUtils.outputObjData;

			const back_payable = JSON.parse(populateDataUtils.outputObjData.prevInputData.multi_transactor_back_inpay).chrgbk_confirm[0];

			if(back_payable.disputetype_fld === "Partial Amount"){

				$('#1_disputetype_fld').prop("checked",true);
				$('#maxlimit_fld').val('1');
			}else{
					$('#0_disputetype_fld').prop("checked",true);
					$('#maxlimit_fld').val('0');
			}

			
			let count = document.getElementById("disputereason_fld").options.length;
				
				if(count >1 ){
					

				//	widgetHelper.setValue($('#disputereason_fld'),back_payable.disputereason_fld);
					fetchreasoncode2(back_payable.disputereason_fld);
					//$('#disputereason_fld').val(back_payable.disputereason_fld);
					InitiateDocumentList2(back_payable.docname_fld);
				//	widgetHelper.setValue($('#docname_fld'),back_payable.docname_fld);
				//	$('#docname_fld').val(back_payable.docname_fld);


				
					
				}else{

					setTimeout(function(){
						fetchreasoncode2(back_payable.disputereason_fld);
					},1000);
					InitiateDocumentList2(back_payable.docname_fld);
					//$('#docname_fld').val(back_payable.docname_fld);
				}

			}

			

	} 
        
		
   			let prevdata = populateDataUtils.outputObjData.data.query0[0];
   			$('#ab_disputedamt_fld,#cd_disputedamt_fld').attr('disabled',true).css('opacity','50%');
   			$('#ab_disputedamt_fld').val(prevdata.tan_txnccy);
   			$('#cd_disputedamt_fld').val(prevdata.tan_amnt);
  			$('#disputedamt_fld').val(prevdata.tan_txnccy + '-' + prevdata.tan_amnt);
			
   			
   	
        }
		
	

  
  if (screenId == 'trans_viewdetail.null' || screenId == 'trans_viewdetail' || screenId == 'trans_viewdetail..null' || screenId == 'trans_viewdetail.') {
  
$("#chargetable tr:nth-child(5), #chargetable tr:nth-child(6)").each(function () {
    $(this).find("td:not(:first-child)").remove();
    $(this).find("td:first-child").attr("colspan", "3").css("width", "100%");
});

$("#chargetable tr:nth-child(4)").each(function () {
    $(this).find("td:nth-child(n+3)").remove(); 
    $(this).find("td:nth-child(2)").attr("colspan", "2").css("width", "100%"); 
});
  
  
//$('#panel2,#panel3,#panel4,#panel5,#panel6,#origtranbtn').addClass('hideclass');
//$('#origtrandetails,#chargetable,#chargetable2,#presentable,#presentable2,#arbitrationtable,#arbitrationtable2,#dispclosetable,#dispclosetable2').hide();
const icons = {
    plus: '../css/dms/idct/images/plus-sign.png',
    minus: '../css/dms/idct/images/minus-sign.png'
};
const panels = [
    { panel: '#Initiatepan', content: '#Initiatepantable,#Initiatepantable2' },
    { panel: '#transum_hd', content: '#panel2,#panel3' },
    { panel: '#chargbackpan', content: '#chargetable,#chargetable2' },
    { panel: '#presentpan', content: '#presentable,#presentable2' },
    { panel: '#atributionpan', content: '#arbitrationtable,#arbitrationtable2' },
    { panel: '#dispclosepan', content: '#dispclosetable,#dispclosetable2' }
];

panels.forEach(({ panel, content }) => {
    const iconHTML = `<a href="javascript:void(0)">
  <span><img src="${icons.minus}" style="width:15px; height:15px; position:absolute; float:right; margin-top:-15px; right:1.5%;"></span>    </a>`;

    $(panel).append(iconHTML).on('click', function () {
        const $img = $(this).find('img');
        const isExpanded = $img.attr('src') === icons.plus;
        $img.attr('src', isExpanded ? icons.minus : icons.plus);
        $(content).stop(true, true).toggle();
    });
});

		let exdata = populateDataUtils.outputObjData.data;
		
		if(Object.keys(exdata.query0[0]).length >0){
			$('#panel2').removeClass('hideclass');
			
			//this.linkCreator("tan_billernam");
			this.linkCreator("tan_subno");
			this.linkCreator("tan_fromac");
			this.linkCreator("tan_toac");
			
			if (exdata.query0[0].tan_dispute=='Chargeback'){
			$('#panel3').removeClass('hideclass');
			}
		}
		
	/*	if(Object.keys(exdata.query2[0]).length >0){
			$('#panel3').removeClass('hideclass');
			
			this.initFilePopup('documents_fld');
			
			this.linkCreator("billername_fld");
			this.linkCreator("claimant_fld");
			this.linkCreator("respondend_fld");
		}*/
		

}

var t = $('#tan_amnt').val() || '0';
t = t.replace(/,/g, '');
$('#disp_tan_amnt').text(
  Number(t).toLocaleString('en-IN', { minimumFractionDigits: 2 })
);

 if (screenId == 'new_transdetail.null' || screenId == 'new_transdetail' || screenId == 'new_transdetail..null' || screenId == 'new_transdetail.') {
 $("#Initiatepantable").hide();
     function toggleSection(sectionId, tableId) {
        // tbody ke andar actual rows check kar rahe hain
        if ($(tableId + " tbody tr").length > 0) {
            $(sectionId).show();
        } else {
            $(sectionId).hide();
        }
    }

    

 $("#create_inbtn,#chbk_submit").hide();
 this.initFilePopup('upload_fld');
 this.initFilePopup('choosefile_bulk');
 this.initFilePopup('in_indocment');
 this.renderBackendFiles("disp_in_indocment_1");
 this.renderBackendFiles("disp_in_indocment_2");
 this.renderBackendFiles("disp_in_indocment_3");


    const icons = {
        plus: '../css/dms/idct/images/plus-sign.png',
        minus: '../css/dms/idct/images/minus-sign.png'
    };

    const panels = [
        { panel: '#Initiatepan', content: '#Initiatepantable,#Initiatepantable2' },
        { panel: '#transum_hd', content: '#transdetails_tab,#origtranpan,#origtrandetails,#fee_subhead,#fee_tab', expanded: true },
        { panel: '#chargbackpan', content: '#chargetable,#chargetable2' },
        { panel: '#presentpan', content: '#presentable,#presentable2' },
        { panel: '#atributionpan', content: '#arbitrationtable,#arbitrationtable2' },
        { panel: '#dispclosepan', content: '#dispclosetable,#dispclosetable2' }
    ];

    panels.forEach(function (item) {
        const isExpanded = item.expanded === true;
        $(item.content).toggle(isExpanded);
        const iconSrc = isExpanded ? icons.minus : icons.plus;
        const iconHTML = `
            <a href="javascript:void(0)">
                <span><img src="${iconSrc}"
                         style="width:15px;height:15px;position:absolute;right:1.5%;margin-top:-15px;">
                </span>
            </a>
        `;

        $(item.panel).append(iconHTML);

        $(item.panel).on('click', function () {
            const $img = $(this).find('img');
            const isOpen = $img.attr('src') === icons.minus;
            $img.attr('src', isOpen ? icons.plus : icons.minus);

            $(item.content).stop(true, true).slideToggle(200);
        });

    });

 
 if($('.ui-state-highlight a',parent.document).text() == 'Create Initiate Payable'){
     $('#create_inbtn').css('display', 'inline-block');
     	$("#chbk_submit,#next_btn").hide();

 }
 
  if($('.ui-state-highlight a',parent.document).text() == 'Create Chargeback'){
     $('#chbk_submit').css('display', 'inline-block');
     $("#next_btn").hide();
 }
 
  }    
      if (screenId == 'repres_src.null' || screenId == 'repres_src' || screenId == 'repres_src..null' || screenId == 'repres_src.') {
	this.initFilePopup('choosefile_bulk');
	this.initFilePopup('upload_fld');
			let prevdata = JSON.parse(populateDataUtils.outputObjData.prevInputData.submitdata);
			
			$('#chargeback_tab #disputedamt_fld').val(prevdata.origtrandetails[0].tan_txnccy+"-"+prevdata.origtrandetails[0].tan_amnt);
			$('#chargeback_tab #disp_disputedamt_fld').text(prevdata.origtrandetails[0].tan_txnccy+" - "+prevdata.origtrandetails[0].tan_amnt);
		
      }
      
if (screenId == 'tans_master.null' || screenId == 'tans_master' || screenId == 'tans_master..null' || screenId == 'tans_master.') {

		$("#tan_submit").css("opacity", "50%").prop("disabled", true);
		
			  $("#tans_grid_grid").on("jqGridSelectRow", function() {
			  console.log('Enter in grid');
		 	$("#tan_submit").css("opacity", "100%").prop("disabled", false);
		          var id = $("#tans_grid_grid").jqGrid("getGridParam", "selrow");
	    	widgetHelper.setValue($("[data-spine-prop=tan_txn_no]"), $("#tans_grid_grid").jqGrid('getCell', id, 'tan_txn_no'));
		        });
      }
      
 if (screenId == 'represent_details.null' || screenId == 'represent_details' || screenId == 'represent_details..null' || screenId == 'represent_details.') {
this.initFilePopup('choosefile_bulk');
this.initFilePopup('upload_fld');
 if($('.ui-state-highlight a',parent.document).text() == 'Approve Initiate Payable'){
        $('#intiate_hd,#d_choosefile_bulk,#inpay_submit,#reason_blacklist,#aprinpay_hd').css('display','inline-block');
                $('#chargetable,#chargetable2').hide();
	$('#represent_tab tr:nth-child(5) td').hide();
	$('#represent_tab tr:nth-child(6) td').removeClass('odd').addClass('even');

                // $('#d_trans_refno').hide();
                        $('#represent_tab tr:nth-child(7) td').hide();
             	   	  $('#represent_tab tr:nth-child(8) td').removeClass('even').addClass('odd');
                        $("#txt_reason_user").hide();
                         $
                         ('#inpay_submit').prop('disabled', true).css('opacity','0.5');
 	 $(document).on('change keyup', 'input[name="approve_fld"], #reason_user', function () {
  	  var v = $('input[name="approve_fld"]:checked').val();
   	  var r = $.trim($('#reason_user').val());
    $('#inpay_submit').prop('disabled', v === 'Decline' && r === '').css('opacity', (v === 'Decline' && r === '') ? '0.5' : '1');
	 });
 	   	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
              	  
   
	} 
	 
	else if($('.ui-state-highlight a',parent.document).text() == 'Approve Chargeback'){
        $('#inpay_submit,#hdcreate_chbk,#reason_blacklist,#represent_fld,#aprchar_hd,#chgrbk_detail').css('display','inline-block');
                                                $('#Initiatepantable,#Initiatepantable2').hide();
                             $('#represent_tab tr:nth-child(7) td').removeClass('even').addClass('odd');
                               $('#represent_tab tr:nth-child(8) td').removeClass('odd').addClass('even');
                                      $('#represent_tab tr:nth-child(7) td').hide();
                                      
$('#inpay_submit').prop('disabled', true).css('opacity','0.5');
 	 $(document).on('change keyup', 'input[name="approve_fld"], #reason_user', function () {
  	  var v = $('input[name="approve_fld"]:checked').val();
   	  var r = $.trim($('#reason_user').val());
    $('#inpay_submit').prop('disabled', v === 'Decline' && r === '').css('opacity', (v === 'Decline' && r === '') ? '0.5' : '1');
	 });                                      
                                      
                         	$("#txt_reason_user,#choosefile_bulk").hide();
 	   	   	   	$('#approve_div tr:nth-child(1) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
		} 
 
 
 	
else if($('.ui-state-highlight a',parent.document).text() == 'Chargeback Action'){
        $('#inpay_submit,#raised_represent,#choosefile_bulk,#reason_blacklist').css('display','inline-block');
         $('#charge_back,#chgrbk_detail,#chrgac_hd').css('display','inline-block');
             $('#represent_tab tr:nth-child(7) td').remove();
                $('#d_choosefile_bulk').hide();
                        
                          $("#txt_reason_user").hide();
                         
 	   	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		 $("#reason_user").val();
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
               		if($('#approve_fld').val() == 'Approve'){
              	 	 $('#d_reason_user').css('display','none');
   			
              	  }
	} 
	
	else if($('.ui-state-highlight a',parent.document).text() == 'Approve Representment'){
        $('#repres_hd,#choosefile_bulk,#inpay_submit,#reason_blacklist,#chgrbk_detail').css('display','inline-block');
                $('#d_choosefile_bulk').hide();
                         $("#txt_reason_user").hide();
 	   	       $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
	} 

else if($('.ui-state-highlight a',parent.document).text() == 'Representment Action'){
        $('#inpay_submit,#raised_represent,#d_choosefile_bulk,#reason_blacklist').css('display','inline-block');
         $('#represent_tab tr:nth-child(4) td').hide();
        $('#represent_tab tr:nth-child(5) td').hide();

                        $('#represent_tab tr:nth-child(7) td').hide();
                        
                         $("#txt_reason_user").hide();
 	   	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
	} 
	
	 
 	
else if($('.ui-state-highlight a',parent.document).text() == 'Approve Arbitration'){
        $('#inpay_submit,#raised_represent,#d_choosefile_bulk,#reason_blacklist').css('display','inline-block');
         $('#represent_tab tr:nth-child(4) td').hide();
        $('#represent_tab tr:nth-child(5) td').hide();

                        $('#represent_tab tr:nth-child(7) td').hide();
                        
                         $("#txt_reason_user").hide();
 	   	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
	} 
	
		
else if($('.ui-state-highlight a',parent.document).text() == 'Arbitration Action'){
        $('#inpay_submit,#raised_represent,#d_choosefile_bulk,#reason_blacklist').css('display','inline-block');
         $('#represent_tab tr:nth-child(4) td').hide();
        $('#represent_tab tr:nth-child(5) td').hide();
                        $('#represent_tab tr:nth-child(7) td').hide();
                        
                         $("#txt_reason_user").hide();
 	   	  $('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		$("#0_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#reason_user').attr('data-mandatory','');
               		$("#txt_reason_user").hide();
               		$('#approve_div tr:nth-child(2) td').removeClass('even').addClass('odd');
               		});
               		$("#1_approve_fld").on("click",function(){
               		$('#te_reason_user span').remove();
               		$('#te_reason_user').append('<span class="mandatoryred"><strong>*</strong></span>');
               		$('#reason_user').attr('data-mandatory','Y');
               		$("#txt_reason_user").show();
               		$('#reason_user').removeAttr('value').val('');
               		$('#approve_div tr:nth-child(2) td').removeClass('odd').addClass('even');
               		});
	} 
	

//	$('#0_accept_reject').prop('checked',true);
$("#txt_dis_reason").parent().parent().hide();      
    $("#0_accept_reject, #1_accept_reject").css("cursor","pointer");
    $("#0_accept_reject").on("click", function () {
        $("#txt_dis_reason").parent().parent().hide();            
    });
    $("#1_accept_reject").on("click", function () {
        $("#txt_dis_reason").parent().parent().show();           
    });
    
    			this.initFilePopup('upload_fld');
			//this.linkCreator("tan_billernam");
			this.linkCreator("tan_subno");
			this.linkCreator("tan_fromac");
			this.linkCreator("tan_toac");
			
			//let prevdata = JSON.parse(populateDataUtils.outputObjData.prevInputData.submitdata);
			
		//	$('#represent_tab #tan_dispute').val(prevdata.origtrandetails[0].tan_dispute);
			//$('#represent_tab #disp_tan_dispute').text(prevdata.origtrandetails[0].tan_dispute);
			
}

if (screenId == 'create_chargebk.null' || screenId == 'create_chargebk' || screenId == 'create_chargebk..null' || screenId == 'create_chargebk.') {
	
	if($('.ui-state-highlight a',parent.document).text() == 'Create Chargeback'){
        $('#chbk_submit,#chbk_head').css('display','inline-block');
	} 
	else if($('.ui-state-highlight a',parent.document).text() == 'View Chargeback'){
        $('#chbk_view,#viewchbk_head').css('display','inline-block');
	}
	else if($('.ui-state-highlight a',parent.document).text() == 'View Initiate Payable'){
        $('#inpay_submit,#viewpay_head').css('display','inline-block');
	}
	else if($('.ui-state-highlight a',parent.document).text() == 'Create Initiate Payable'){
        $('#create_inpay,#inpay_head').css('display','inline-block');

	}
	else if($('.ui-state-highlight a',parent.document).text() == 'Approve Initiate Payable'){
        $('#chbk_submit,#aprpay_head').css('display','inline-block');
	}
	


}

if (screenId == 'reject_chrg.null' || screenId == 'reject_chrg' || screenId == 'reject_chrg..null' || screenId == 'reject_chrg.') {


if($('.ui-state-highlight a',parent.document).text() == 'Rejected Chargeback'){
        $('#rejchbk_head,#reject_chargeback').css('display','inline-block');

 $.post(
         "../formaction?bulkcmd=RejectedChargeback&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.RejectedChargebk);
        });
                
        
	} 
	
	else if($('.ui-state-highlight a',parent.document).text() == 'View Chargeback'){
        $('#chbk_view,#viewchbk_head').css('display','inline-block');
        
         $.post(
         "../formaction?bulkcmd=ChargebackView&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.ChargebkView);
        });
                
	}
	
	else if($('.ui-state-highlight a',parent.document).text() == 'Chargeback Action'){
        $('#chrgaction_head,#action_chargeback').css('display','inline-block');
        
         $.post(
         "../formaction?bulkcmd=ChargebackAction&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.ChargebkAction);
        });
	}
	
	else if($('.ui-state-highlight a',parent.document).text() == 'View Initiate Payable'){
        $('#inpay_submit,#viewpay_head').css('display','inline-block');
        
         $.post(
         "../formaction?bulkcmd=ApprovedIntPayable&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.ApprovedIntPay);
        });
	}
	
	else if($('.ui-state-highlight a',parent.document).text() == 'Rejected Initiate Payable'){
        $('#rejpay_head,#ip_rejected_records_grid').css('display','inline-block');
        
        $.post(
         "../formaction?bulkcmd=RejectedIntPayable&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.RejectedIntPay);
        });
        
	}
	
	else if($('.ui-state-highlight a',parent.document).text() == 'View Representment'){
        $('#represent_view,#viewrepresent_hd').css('display','inline-block');
        
         $.post(
         "../formaction?bulkcmd=Represent_view&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.RepresentView);
        });
                
	}
	
	else if($('.ui-state-highlight a',parent.document).text() == 'Representment Action'){
        $('#rep_action_grid,#represe_action').css('display','inline-block');
        
         $.post(
         "../formaction?bulkcmd=Represent_action&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.RepresentAction);
        });
                
	}
	else if($('.ui-state-highlight a',parent.document).text() == 'Rejected Representment'){
        $('#rejrepres_head,#represent_reject').css('display','inline-block');
        
        $.post(
         "../formaction?bulkcmd=Represent_reject&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.RejectRepresentment);
        });
        
	}
	
	else if($('.ui-state-highlight a',parent.document).text() == 'View Arbitration'){
        $('#arbitration_view').css('display','inline-block');
        
        $.post(
         "../formaction?bulkcmd=View_Arbitration&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.ViewArbitration);
        });
        
	}
	else if($('.ui-state-highlight a',parent.document).text() == 'Rejected Arbitration'){
        $('#arbitration_reject').css('display','inline-block');
        
        $.post(
         "../formaction?bulkcmd=Reject_Arbitration&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.RejectArbitration);
        });
        
	}
	else if($('.ui-state-highlight a',parent.document).text() == 'Arbitration Action'){
        $('#chrgaction_head,#arb_action_grid').css('display','inline-block');
        
         $.post(
         "../formaction?bulkcmd=ArbitrationAction&screenName=transactor").success(function (data) {
          populateDataUtils.ObjectDropDown('tan_txn_no',JSON.parse(data).data.ArbiAction);
        });
	}
	
          
}

if (screenId == 'arbitration_detail.null' || screenId == 'arbitration_detail' || screenId == 'arbitration_detail..null' || screenId == 'arbitration_detail.') {

    $("#0_radiobtn_fld, #1_radiobtn_fld").css("cursor","pointer");
    $("#representmrnt_fld").hide();
    $("#0_radiobtn_fld").on("click", function () {
        $("#cancel_fld, #submit_fld").show(); 
        $("#representmrnt_fld").hide();            
    });

    $("#1_radiobtn_fld").on("click", function () {
        $("#representmrnt_fld").show();           
        $("#cancel_fld, #submit_fld").hide();   

    });
}
	},
	





 ConfigDocChange: function () {

	

    console.log("Hitesh !!!!!!");
    const self = this;
    const uploadField = $('#upload_fld');


    $('#chargeback_files').empty();
    $('#se_docname_fld').find('[class^="upele_"]').remove();


    let rescode = $('#docname_fld').val();
    if (rescode === '') return;

    let mandatoryDocs = ['PAN Card', 'Aadhar Card'];


    $.post("../formaction?bulkcmd=fetchreasoncodedata&screenName=transactor&rescode=" + rescode)
        .success(function (data) {

            console.log("data !!!!!!", data);
            console.log("Hitesh 2 !!!!!!");
            let exdata = JSON.parse(data).data.FetchResCodeData[0];
            console.log("exdata !!!!!!", exdata);

            if (exdata.isrequired !== 'Yes') return;

            let docarr = exdata.doclist.split(',');
            let panelroot = $('#se_docname_fld');


            docarr.forEach(function (value) {
            
            console.log("Hitesh 3 !!!!!!");


                let fname = value.replace(/\s+/g, '_');
                let isMandatory = mandatoryDocs.includes(value);


                let tfield = {
                    name: fname + "_upload",

                    label: value,
                    capturetype: "file",
                    fieldType: "file",

                    mandatoryDecorate: isMandatory ? 'Y' : 'N'
                };

                let divele = $('<div class="upele_' + tfield.name + '"></div>');

                panelroot.append(divele);

                let panroot = $('.upele_' + tfield.name);
                widgetHelper.render(panroot, tfield, "edit");


                // ---- NOTE ADDED ----
                panroot.append(
                    '<div class="upload-note" style="font-size:12px;color:#666;margin-top:4px;">' +
                    'Note: Only .pdf, .jpeg, .jpg files accepted. Max size 1 MB.' +
                    '</div>'
                );

       
            panroot.on('change', 'input[type="file"]', function (e) {
                const file = this.files && this.files[0];
                if (!file) return;
                const maxSize = 1 * 1024 * 1024; // 1 MB
                var isValidType = /\.(pdf|jpeg|jpg)$/i.test(file.name);
                if (file.size > maxSize) {
                    var warnMsg="File size must be less than or equal to 1 MB.";
		            showMessage("<font color='red'>"+warnMsg+"</font>");
                    // Clear file input
                    $(this).val('');
                    // Also clear related hidden input (if any)
                    panroot.find('input[type="hidden"]').val('');
                    setTimeout(function() { clearMessages(); }, 7000);
                    e.preventDefault();
			        e.stopPropagation();
			        return;

                }
                
                 if (isValidType) {
                     panroot.on('change', 'input[type="hidden"]', function () {
                        let allValues = uploadField.val()? uploadField.val().split(','): [];
                        allValues = allValues.filter(v => !v.startsWith(value + ' - '));
                        panroot.find('input[type="hidden"]').each(function () {
                            let val = $(this).val();
                            if (val && val.toLowerCase() !== 'default') {
                                allValues.push(value + ' - ' + val);
                            }
                        });
                        uploadField.val(allValues.join(','));
                        self.initFilePopup('upload_fld');
                    });
                }

            });
                    
                

            });
        });
},


 ConfigDocChange2: function (docname) {

	

    console.log("Hitesh !!!!!!");
    const self = this;
    const uploadField = $('#upload_fld');


    $('#chargeback_files').empty();
    $('#se_docname_fld').find('[class^="upele_"]').remove();


    let rescode = docname;
	console.log("rescode :",rescode);
    if (rescode === '') return;

    let mandatoryDocs = ['PAN Card', 'Aadhar Card'];


    $.post("../formaction?bulkcmd=fetchreasoncodedata&screenName=transactor&rescode=" + rescode)
        .success(function (data) {

            console.log("data !!!!!!", data);
            console.log("Hitesh 2 !!!!!!");
            let exdata = JSON.parse(data).data.FetchResCodeData[0];
            console.log("exdata !!!!!!", exdata);

            if (exdata.isrequired !== 'Yes') return;

            let docarr = exdata.doclist.split(',');
            let panelroot = $('#se_docname_fld');


            docarr.forEach(function (value) {
            
            console.log("Hitesh 3 !!!!!!");


                let fname = value.replace(/\s+/g, '_');
                let isMandatory = mandatoryDocs.includes(value);


                let tfield = {
                    name: fname + "_upload",

                    label: value,
                    capturetype: "file",
                    fieldType: "file",

                    mandatoryDecorate: isMandatory ? 'Y' : 'N'
                };

                let divele = $('<div class="upele_' + tfield.name + '"></div>');

                panelroot.append(divele);

                let panroot = $('.upele_' + tfield.name);
                widgetHelper.render(panroot, tfield, "edit");


                // ---- NOTE ADDED ----
                panroot.append(
                    '<div class="upload-note" style="font-size:12px;color:#666;margin-top:4px;">' +
                    'Note: Only .pdf, .jpeg, .jpg files accepted. Max size 1 MB.' +
                    '</div>'
                );

       
            panroot.on('change', 'input[type="file"]', function (e) {
                const file = this.files && this.files[0];
                if (!file) return;
                const maxSize = 1 * 1024 * 1024; // 1 MB
                var isValidType = /\.(pdf|jpeg|jpg)$/i.test(file.name);
                if (file.size > maxSize) {
                    var warnMsg="File size must be less than or equal to 1 MB.";
		            showMessage("<font color='red'>"+warnMsg+"</font>");
                    // Clear file input
                    $(this).val('');
                    // Also clear related hidden input (if any)
                    panroot.find('input[type="hidden"]').val('');
                    setTimeout(function() { clearMessages(); }, 7000);
                    e.preventDefault();
			        e.stopPropagation();
			        return;

                }
                
                 if (isValidType) {
                     panroot.on('change', 'input[type="hidden"]', function () {
                        let allValues = uploadField.val()? uploadField.val().split(','): [];
                        allValues = allValues.filter(v => !v.startsWith(value + ' - '));
                        panroot.find('input[type="hidden"]').each(function () {
                            let val = $(this).val();
                            if (val && val.toLowerCase() !== 'default') {
                                allValues.push(value + ' - ' + val);
                            }
                        });
                        uploadField.val(allValues.join(','));
                        self.initFilePopup('upload_fld');
                    });
                }

            });
                    
                

            });
        });
},



 initfullpath : function(){
  let fullPath = $("#preinpay_doc").val().replace('../rest/file/download?', '../rest/file/view?');
    let fileName = fullPath.split("originalFileName=")[1]?.split("&")[0] || fullPath;
    $("#disp_preinpay_doc").html(`<a href="${fullPath}" id="display_file" target="">${fileName}</a>`);
    $("#display_file").click(function(e){
        if(fullPath){
            window.open(fullPath,'popUpWindow','height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'); 
        }
        var imgWidth = $(".imageholder").find("img").width();
        var imgHeight = $(".imageholder").find("img").height();
        var viewportWidth =  $(window).width();
        var viewportHeight =  $(window).height();
        $(".imageholder").find(".ui-corner-all").offset({top: Math.abs(viewportHeight/2 - imgHeight/2), left: Math.abs(viewportWidth/2 - 		imgWidth/2)});
        e.preventDefault();
    });
	},
  



	initFilePopup: function (field_id) {

    	 let fullPath = $("#"+field_id).val();
	    if (!fullPath) return;
   	 let paths = fullPath.split(",");
   	 $("#disp_"+field_id).html("");

   	 paths.forEach((path, index) => {
        path = path.trim();
        let urlPart = path.includes("../rest/file/download?") ? path.substring(path.indexOf("../rest/file/download?")) : path;
        let filePath = urlPart.replace("../rest/file/download?", "../rest/file/view?");

        let fileName = filePath.split("originalFileName=")[1]?.split("&")[0] || filePath;
        let linkId = "display_file_" + index;
        let label = path.split(' - ')[0];
        label=  label.includes("../rest/file/download?")?"":label;

        $("#disp_"+field_id).append(
            `${label ? label + " - " : ""}<a href="${filePath}" id="${linkId}" target="">${fileName}</a>` +
            (index < paths.length - 1 ? " , " : "")

        );
        $("#" + linkId).click(function (e) {
            if (filePath) {
                window.open(filePath,"popUpWindow",                    "height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"

                );
            }
            var imgWidth = $(".imageholder").find("img").width();

            var imgHeight = $(".imageholder").find("img").height();
            var viewportWidth = $(window).width();
            var viewportHeight = $(window).height();
            $(".imageholder").find(".ui-corner-all").offset({

                top: Math.abs(viewportHeight / 2 - imgHeight / 2),
                left: Math.abs(viewportWidth / 2 - imgWidth / 2)
            });

            e.preventDefault();
        });
    });
},











	linkCreator : function(field_id){
		 let FieldName = $("#"+field_id).val();
    let link = $("<a>", {
        id: "displink_"+field_id,name: "displink_"+field_id,href: "#",text: FieldName,
    });
    $("#d_"+field_id+" span#disp_"+field_id).remove();
    $("#d_"+field_id).append(link);
    $("#displink_"+field_id).css('text-decoration','none');
    
	},
	
	DisputeChanger :function(){
	let distype = $('#disputecode_fld').val();
			 $.post("../formaction?bulkcmd=fetchreasoncodes&screenName=transactor&dis_type="+distype)
		.success(function (data) {
			 populateDataUtils.ObjectDropDown('disputereason_fld',JSON.parse(data).data.ReasonCodes);
		});
	},
	
	 onClear: function () {
            var removeMsg = $.t("clear.panel");
            if (confirm(removeMsg)) {
                populateDataUtils.clearPanel("membnk_tab,filt_transtab");
            }
        },



	onAfterSubmit: function (data) {
      populateDataUtils.outputObjData = JSON.parse(data);
all_data=JSON.parse(data);
console.log("all_data",all_data);
    }
};	

});

