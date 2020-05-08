import { bufferHtml } from "../analizesFunkcijos";
import { createJsGrid } from "../jsGridTable";
import { addControls } from "./controls";
import { bufferListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function buffer(element) {
  $("#buffer").click(function () {
    dialogElement.dialog({
      open: function (event, ui) {
        dialogElement.empty();
        dialogElement.html(bufferHtml());
        addControls(element);
      },
      title: "Buferių kūrimas",
      autoOpen: true,
      minHeight: 450,
      minWidth: 550,
      close: function () {
        dialogElement.empty();
        element.resetAll();
      },
      buttons: {
        Vykdyti: function () {
          isBufferInputValid(element);
        },
        Atšaukti: function () {
          $(this).dialog("close");
        },
      },
    });
    createJsGrid(element);
  });
}

function isBufferInputValid(element) {
  const errorElement = document.getElementById("errorBufferInput");
  errorElement.style.display = "none";
  let distance = $("#bufferAlgorithm").val();
  let messages = [];
  if (element.selected.length == 0) {
    messages.push("įvesties sluoksnis yra privalomas");
  }
  if (distance == "") {
    messages.push("atstumas yra privalomas");
  }
  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    bufferListener(element, distance);
  }
  return true;
}
