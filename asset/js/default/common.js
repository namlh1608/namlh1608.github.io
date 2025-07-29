/* ---------------------------------------------------------------- */
function redirect(url) {
	window.location.href = url;
}
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
/* |||||||||||| START - TOOLTIPS |||||||||||| */
function initTooltip(id, info, cl) {
	//$("#" + id).tooltip('dispose');
	if(LANGUAGE === "vn") {
		/* -== JPAGINATE ==- */
		$("#" + id).attr("data-bs-title", info);
	} else if(LANGUAGE === 'en') {
		/* -== JPAGINATE ==- */
		$("#" + id).attr(info);
	}
	$("#" + id).attr("data-bs-custom-class", cl);
}
/* |||||||||||| END - TOOLTIPS |||||||||||| */
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
/* |||||||||||| START - JPAGINATE |||||||||||| */
function generatePaging(p_arr_id_name, p_page, p_total_page, changingPageURL) {
    var arr_id_name = p_arr_id_name;
    var page = parseInt(p_page);
    var total_page = parseInt(p_total_page);
    var display = 5;
    var min_count = 0;
    var max_count = 0;
    if (page > 0 && page <= 3) {
        min_count = 1;
        if (total_page < 5) {
            max_count = total_page + 1;
        } else {
            max_count = display + 1;
        }
    } else if (page === total_page) {
        if(page < 5) {
            min_count = page - (display - 2);
        } else {           
            min_count = page - (display - 1);
        }
        max_count = page + 1;
    } else {
        var ck_max_count = page + 3;
        var crr_total_page = total_page + 1;
        if (ck_max_count > crr_total_page) {
            min_count = page - 3;
            max_count = ck_max_count - total_page + page;
        } else {
            min_count = page - 2;
            max_count = page + 3;
        }
    }
    for (var i = 0; i < arr_id_name.length; i++) {
        var _nav = generateDataPaging(min_count, max_count, page, total_page, changingPageURL);
        $("#" + arr_id_name[i]).empty().append(_nav);
    }
}
function generateDataPaging(min_count, max_count, page, total_page, changingPageURL) {
    var _nav = $(document.createElement("nav"));
    var _ul = $(document.createElement("ul"));
    _ul.addClass("pagination");
    var genrate_first_page = "";
    var genrate_last_page = "";
    if (page === 1) {
        genrate_first_page = "";
    } else {
        genrate_first_page = "<li><a href='" + changingPageURL + "1' aria-label='First'><span aria-hidden='true'>&#124;&laquo;</span></a></li>";
    }
    if (page === total_page) {
        genrate_last_page = '';
    } else {
        genrate_last_page = "<li> <a href='" + changingPageURL + total_page + "' aria-label='Last'><span aria-hidden='true'>&raquo;&#124;</span></a></li>";
    }
    _ul.append(genrate_first_page);
    for (var i = min_count; i < max_count; i++) {
        var _li = $(document.createElement("li"));
        var _a = "";
        if (i === page) {
            _li.addClass("_disabled").addClass("current_page");
            _a = "<a>" + i + "</a>";
        } else {
            _a = "<a href='" + changingPageURL + i + "'>" + i + "</a>";
        }
        _li.append(_a);
        _ul.append(_li);
    }
    _ul.append(genrate_last_page);
    _nav.append(_ul);
    return _nav;
}
/* :::::::::::: Start - Go To Page :::::::::::: */
function checkGoToPage(e, id) {
    var v = $("#" + id).val().trim();
    if (e.keyCode === 13) {
        var vK = checkPageNum (v, id);
        if(vK === 1) {
            window.location.href = changingPageURL + v;
        }
        e.preventDefault(); /* Ensure it is only this code that runs */
    } else {
        var vK = checkPageNum (v, id);
        if(vK === 1) {
            $("#" + id).attr("data-bs-title", "info-tooltip");
        }
    }
}
function clickGoToPage(id) {
    var v = $("#" + id).val().trim();
    var chk = checkPageNum (v, id);
    if(chk === 1) {
        window.location.href = changingPageURL + v;
    }
}
function checkPageNum (v, id) {
	$("#" + id).tooltip("dispose");
    if (isNaN(v) === true || v.length === 0) {
        if(LANGUAGE === "vn") {
			$("#" + id).attr("data-bs-title", "Vui lòng nhập số trang!");
        } else if(LANGUAGE === 'en') {
			$("#" + id).attr("Please enter page number!");
        }
		$("#" + id).attr("data-bs-custom-class", "err-tooltip");
		$("#" + id).tooltip("setContent");
		$("#" + id).tooltip("show");
        return 0;
    } else if (parseInt(v) > parseInt(tbl_totalPage) || parseInt(v) <= 0) {
        if(LANGUAGE === "vn") {
			$("#" + id).attr("data-bs-title", "LỖI: Chỉ nhập số");
        } else if(LANGUAGE === 'en') {
			$("#" + id).attr("ERR: Page number does not exist");
        }		
		$("#" + id).attr("data-bs-custom-class", "err-tooltip");
		$("#" + id).tooltip("setContent");
		$("#" + id).tooltip("show");
        return 0;
    } else {			
		$("#" + id).attr("data-bs-custom-class", "info-tooltip");
		$("#" + id).tooltip("setContent");
		$("#" + id).tooltip("show");
        return 1;
    }
}
/* :::::::::::: End - Go To Page :::::::::::: */
/* |||||||||||| END - JPAGINATE |||||||||||| */
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
function formatNumber(num) {
	if(num.length >= 3) {
		n = num.replace(/,/g, '');
		return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	} else {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}	
}
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
function removeComma(num) {
	return num.replace(/,/g, '');
}
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
function getCurrentDate(type) {
	var currentDate = new Date();
	var day = String(currentDate.getDate()).padStart(2, '0');
	var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
	var year = currentDate.getFullYear();
	if(type === "date") {
		var formattedDate = day + '/' + month + '/' + year;
		return formattedDate;
	} else if(type === "datetime") {
		/*
		var hours = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		var seconds = currentDate.getSeconds();
		var milliseconds = currentDate.getMilliseconds();
		*/
		
		var hours = String(currentDate.getHours()).padStart(2, '0');
		var minutes = String(currentDate.getMinutes()).padStart(2, '0');
		var seconds = String(currentDate.getSeconds()).padStart(2, '0');
		var milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
		
		var formattedDatetime = day + month + year + hours + minutes + seconds + milliseconds;
		return formattedDatetime;
	}
}
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */
function clearAllInputs(id) {
	$("#" + id + " input[type='text']").val("");
	$("#" + id + " input[type='checkbox']").prop("checked", false);
}
/* ---------------------------------------------------------------- */
/* ---------------------------------------------------------------- */