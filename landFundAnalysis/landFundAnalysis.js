import { landFundAnalysisHTML } from "../analizesFunkcijos";
import { createJsGrid } from "../jsGridTable";
import { addControls } from "../analysisFunctions/controls";
import { landFundAnalysisListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function landFundAnalysis(element) {
  $("#landFundAnalysis").click(function () {
    dialogElement.dialog({
      open: function (event, ui) {
        dialogElement.empty();
        dialogElement.html(landFundAnalysisHTML());
        addControls(element);
      },
      title: "Žemės fondo analizė ir vertinimas",
      autoOpen: true,
      minHeight: 450,
      minWidth: 550,
      close: function () {
        dialogElement.empty();
        element.resetAll();
      },
      buttons: {
        Vykdyti: function () {
          isLandFundAnalysisInputValid(element);
        },
        Atšaukti: function () {
          $(this).dialog("close");
        },
      },
    });
    createJsGrid(element);
  });
}

function isLandFundAnalysisInputValid(element) {
  const errorElement = document.getElementById("errorBufferInput");
  errorElement.style.display = "none";
  var arrayMine = [];
  let messages = [];
  $("input:checkbox[name=type]:checked").each(function () {
    arrayMine.push(parseInt($(this).val()));
  });
  let distance = $("#distance").val();

  if (element.selected.length == 0) {
    messages.push("įvesties sluoksnis yra privalomas");
  }
  /*
  element.selected.forEach((x) => {
    console.log(x.getGeometry().getType());
    if (
      x.getGeometry().getType() != "MultiPolygon" &&
      x.getGeometry().getType() != "Polygon"
    ) {
      messages.push("įvesties sluoksnye turi būti poligono tipo objektas");
    
  });
  */
  if (arrayMine.length == 0) {
    messages.push("bent viena dežutė turi būti pažymėta ");
  }
  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    landFundAnalysisListener(element, distance, arrayMine);
  }

  return true;
}
