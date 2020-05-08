import { mergeVectorLayersHTML } from "../analizesFunkcijos";
import { createJsGrid } from "../jsGridTable";
import { addControls } from "./controls";
import { mergeVectorLayersListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function mergeVectorLayers(element) {
  $("#mergeVectorLayers").click(function () {
    dialogElement.dialog({
      open: function (event, ui) {
        dialogElement.empty();
        dialogElement.html(mergeVectorLayersHTML());
        addControls(element);
      },
      title: "Suliejimas",
      autoOpen: true,
      minHeight: 450,
      minWidth: 550,
      close: function () {
        dialogElement.empty();
        element.resetAll();
      },
      buttons: {
        Vykdyti: function () {
          isMergeVectorLayerInputValid(element);
        },
        Atšaukti: function () {
          $(this).dialog("close");
        },
      },
    });
    createJsGrid(element);
  });
}

function isMergeVectorLayerInputValid(element) {
  const errorElement = document.getElementById("errorBufferInput");
  errorElement.style.display = "none";
  let targetCrs = $("#targetCRS").val();
  let messages = [];
  if (element.selected.length == 0) {
    messages.push("įvesties sluoksnis yra privalomas");
  }
  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    mergeVectorLayersListener(element, targetCrs);
  }
  return true;
}
