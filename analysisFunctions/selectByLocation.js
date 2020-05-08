import { selectByLocationHtml } from "../analizesFunkcijos";
import { createJsGrid } from "../jsGridTable";
import { unByKey } from "ol/Observable";
import { addControls } from "./controls";
import { selectByLocationListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function selectByLocation(a, b) {
  $("#selectByLocation").click(function () {
    $("#dialog1").dialog({
      open: function (event, ui) {
        dialogElement.empty();
        dialogElement.html(selectByLocationHtml());
        addControls(a);
        addControls(b);
      },
      title: "Atranka pagal vietą",
      autoOpen: true,
      minHeight: 450,
      minWidth: 550,
      close: function () {
        a.resetAll();
        b.resetAll();
        dialogElement.empty();
      },
      buttons: {
        Vykdyti: function () {
          isSelectByLocationInputValid(a, b);
        },
        Atšaukti: function () {
          $(this).dialog("close");
        },
      },
    });
    createJsGrid(a);
    createJsGrid(b);
  });
}
function isSelectByLocationInputValid(element1, element2) {
  const errorElement = document.getElementById("errorBufferInput");
  errorElement.style.display = "none";
  var arrayMine = [];
  let messages = [];
  $("input:checkbox[name=type]:checked").each(function () {
    arrayMine.push(parseInt($(this).val()));
  });
  let distance = $("#distanceLocation").val();

  if (element1.selected.length == 0) {
    messages.push("įvesties sluoksnis yra privalomas");
  }
  if (element2.selected.length == 0) {
    messages.push("perdangos sluoksnis yra privalomas");
  }
  if (arrayMine.length == 0) {
    messages.push("bent viena dežutė turi būti pažymėta ");
  }
  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    selectByLocationListener(element1, element2, arrayMine, distance);
  }

  return true;
}
