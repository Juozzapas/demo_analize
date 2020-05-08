import { intersectionHtml } from "../analizesFunkcijos";
import { createJsGrid } from "../jsGridTable";
import { unByKey } from "ol/Observable";
import { addControls } from "./controls";
import { intersectionListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function intersection(a, b) {
  $("#intersection").click(function () {
    $("#dialog1").dialog({
      open: function (event, ui) {
        dialogElement.empty();
        dialogElement.html(intersectionHtml());
        addControls(a);
        addControls(b);
      },
      title: "Susikirtimas",
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
          isIntersectionInputValid(a, b);
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
function isIntersectionInputValid(element1, element2) {
  const errorElement = document.getElementById("errorBufferInput");
  errorElement.style.display = "none";
  let messages = [];

  if (element1.selected.length == 0) {
    messages.push("įvesties sluoksnis yra privalomas");
  }
  if (element2.selected.length == 0) {
    messages.push("perdangos sluoksnis yra privalomas");
  }

  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    intersectionListener(element1, element2);
  }

  return true;
}
