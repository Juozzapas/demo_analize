import { transformationHTML } from "../analizesFunkcijos";
import { createJsGrid } from "../jsGridTable";
import { addControls } from "../analysisFunctions/controls";
import { transformationListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function transformation(element) {
  $("#transformation").click(function () {
    dialogElement.dialog({
      open: function (event, ui) {
        dialogElement.empty();
        dialogElement.html(transformationHTML());
        addControls(element);
      },
      title: "Transformavimas",
      autoOpen: true,
      minHeight: 450,
      minWidth: 550,
      close: function () {
        dialogElement.empty();
        element.resetAll();
      },
      buttons: {
        Vykdyti: function () {
          isTransformationInputValid(element);
        },
        Atšaukti: function () {
          $(this).dialog("close");
        },
      },
    });
    createJsGrid(element);
  });
}

function isTransformationInputValid(element) {
  const errorElement = document.getElementById("errorBufferInput");
  const type = document.getElementById("format").value;
  const skipFailures = $("#skipFailures").is(":checked");
  const sourceCrs = document.getElementById("sourceCRS").value;
  const targetCrs = document.getElementById("targetCRS").value;
  errorElement.style.display = "none";
  let messages = [];
  if (element.selected.length == 0) {
    messages.push("įvesties sluoksnis yra tuščias");
  }
  if (sourceCrs.length != 0 && targetCrs.length == 0) {
    messages.push(
      "jeigu įvesta esama kordinačių sistema reikia įvesti ir norima"
    );
  }
  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    transformationListener(element, type, sourceCrs, targetCrs, skipFailures);
  }
  return true;
}
