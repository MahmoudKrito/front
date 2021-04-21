
if ($(".navbar")[0]){
    $("body").css("padding-top","70px")
}
//====================== Footer bottom ==========================
// $(document).ready(function(){
//     function footerAlign() {
//         let footer = $("footer");
//         footer.css('display', 'block');
//         footer.css('height', 'auto');
//         let footerHeight = footer.outerHeight();
//         $('body').css('padding-bottom', footerHeight);
//         footer.css('height', footerHeight);
//     }
//     footerAlign();
//     $(window).resize(function () {
//         footerAlign();
//     });
// });

// Tooltip
$(function () {
    $('[data-toggle="popover"]').popover()
});

// File Upload
$(document).ready(function(){
    $("#FileAttachment").click(function () {
        document.getElementById("FileAttachment").onchange = function () {
            document.getElementById("fileuploadurl").value = this.value;
        };
    });
});
//
$("#datePicker").each(function () {
    $('#datePicker').datetimepicker({
        format: 'L'
    });
});
$("#timePicker").each(function () {
    $('#timePicker').datetimepicker({
        format: 'LT',
    });
});

// Dark Mode
$('.switch-mode input[type="checkbox"]').change(function() {
  if ($(this).is(':checked')) {
    // alert('Dark mode');
    $("body").addClass("dark-mode")
  }
  else{
    // alert('Light mode');
    $("body").removeClass("dark-mode")

  }
});

//Preloader
$(window).on('load', function() { // makes sure the whole site is loaded
    function hidePreloader() {
        $('.preLoader-content').fadeOut(3500);
        $('#preLoader').delay(3500).fadeOut('slow');
    }
    hidePreloader();
});
//
$('.navbar-collapse').on('shown.bs.collapse', function() {
    $(".navbar").addClass("scrolled")
});
$('.navbar-collapse').on('hidden.bs.collapse', function() {
    $(".navbar").removeClass("scrolled")
});
//
$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 150) {
        $('.intro-section .arrow-animation').addClass("arrow-1");
    }
});
$(document).scroll(function() {
    var x = $(this).scrollTop();
    if(x > 800) {
        $('.about-wrapper .arrow-animation').addClass("arrow-2");

    }
});
//
$(document).ready(function() {
    $(".consult-content-1").addClass("active");
    $(".btn-send-consult").click(function () {
        $(".consult-content-1").removeClass("active");
        $(".consult-content-3").removeClass("active");
        $(".consult-content-2").addClass("active");
    })
    $(".btn-confirm-yes").click(function () {
        $(".consult-content-1").removeClass("active");
        $(".consult-content-2").removeClass("active");
        $(".consult-content-3").addClass("active");
        setTimeout(function() {
            $('#consultModal').modal('hide');
            }, 4000);
    })
    $(".btn-confirm-no").click(function () {
        $(".consult-content-2").removeClass("active");
        $(".consult-content-3").removeClass("active");
        $(".consult-content-1").addClass("active");
    })
});
