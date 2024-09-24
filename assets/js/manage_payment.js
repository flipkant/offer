var itemData;
$(document).ready(function () {
  startTimer(500 - 120, $("#offerend-time"));
  $(".form-check").on("click", function () {
    $(".form-check").removeClass("active");
    $(this).addClass("active");
  });
  $("#back_btn").on("click", function () {
    history.back();
  });

  var selected_verient = localStorage.getItem("selected_verient");
  itemData = JSON.parse(selected_verient);
  $("#item_image").prop("src", itemData.img1);
  var name =
    itemData.name +
    " " +
    (itemData.color ? " (" + itemData.color + ")" : "") +
    (itemData.size ? " (" + itemData.size + ")" : "") +
    (itemData.storage ? " (" + itemData.storage + ")" : "");
  $("#product-title").html(name);
  $(".selling_price, .payable").html("&#8377;" + itemData.selling_price);
  $(".mrp").html("&#8377;" + itemData.mrp);

  if (SHOW_GPAY == false) {
    $(".gpay").addClass("d-none");
    $(".gpay").remove();
    $('[pay-type="phonepe"]').addClass("active");
  }
});

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text(minutes + "min " + seconds + "sec");

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

function payNow(upi_address) {
  var payType = $(".form-check.active").attr("pay-type");
  var redirect_url = "";
  var site_name = "Online Shopping";
  var amt = localStorage.getItem("price");
  switch (payType) {
    case "gpay":
      redirect_url =
        "tez://upi/pay?pa=" +
        upi_address +
        "&pn=Shop&purpose=00&am=" +
        amt +
        "&cu=INR&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr";
      break;

    case "phonepe":
      redirect_url =
        "phonepe://pay?ver=01&mode=19&pa=murufmondol560819.rzp@icici&pn=MURUFMONDOL&tr=RZPOqcM57owRKvc7dqrv2&cu=INR&mc=5511&qrMedium=04&tn=PaymenttoMURUFMONDOL&am="+ amt +"";
      break;

    case "paytm":
      redirect_url =
        "paytmmp://pay?ver=01&mode=19&pa=murufmondol560819.rzp@icici&pn=MURUFMONDOL&tr=RZPOqcM57owRKvc7dqrv2&cu=INR&mc=5511&qrMedium=04&tn=PaymenttoMURUFMONDOL&am="+ amt +"";
      break;

    case "bhim_upi":
      redirect_url =
        "upi://pay?ver=01&mode=19&pa=murufmondol560819.rzp@icici&pn=MURUFMONDOL&tr=RZPOqcM57owRKvc7dqrv2&cu=INR&mc=5511&qrMedium=04&tn=PaymenttoMURUFMONDOL&am="+ amt +"";
      break;

    case "whatspp_pay":
      redirect_url =
        "whatsapp://pay?pa=" +
        upi_address +
        "&pn=" +
        site_name +
        "&am=" +
        amt +
        "&cu=INR&tn=" +
        site_name;
      break;

    default:
      break;
  }
  window.location.href = redirect_url;
}

document.getElementById("mrp").innerHTML =
  "₹" + new Intl.NumberFormat().format(localStorage.getItem("price")) + ".00";
document.getElementById("selling_price").innerHTML =
  "₹" + new Intl.NumberFormat().format(localStorage.getItem("price")) + ".00";

document.getElementById("mrp-footer").innerHTML =
  "₹" + new Intl.NumberFormat().format(localStorage.getItem("mrp")) + ".00";
document.getElementById("selling_price-footer").innerHTML =
  "₹" + new Intl.NumberFormat().format(localStorage.getItem("price")) + ".00";
