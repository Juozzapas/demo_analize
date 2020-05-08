import { selectByAttributeHtml } from "../analizesFunkcijos";
import { createJsGridForAttribute } from "../jsGridTable";
import { unByKey } from "ol/Observable";
import { addControls } from "./controls";
import { selectByAttributeListener } from "../calls/callFunctions";
var dialogElement = $("#dialog1");
export function selectByAttribute(a) {
  $("#selectByAttribute").click(function() {
    $("#dialog1").dialog({
      open: function(event, ui) {
        dialogElement.empty();
        dialogElement.html(selectByAttributeHtml());
        addControls(a);
      },
      title: "Atranka pagal atributą",
      autoOpen: true,
      minHeight: 450,
      minWidth: 550,
      close: function() {
        a.resetAll();
        dialogElement.empty();
      },
      buttons: {
        Vykdyti: function() {
          isSelectByAttributeInputValid(a);
        },
        Atšaukti: function() {
          $(this).dialog("close");
        }
      }
    });
    createJsGridForAttribute(a);
  });
}
function isSelectByAttributeInputValid(element) {
  const errorElement = document.getElementById("errorBufferInput");
  const attributeField = document.getElementById("selectAttribute");
  const valueField = document.getElementById("valueField");
  const operatorElement = document.getElementById("operator");
  errorElement.style.display = "none";
  let messages = [];

  let attribute = attributeField.value;
  let value = valueField.value;
  let operator = operatorElement.value;

  if (element.selected.length == 0) {
    messages.push("įvesties sluoksnis yra tuščias");
  }
  if (attribute == "Pasirinkti") {
    messages.push("nepasirinktas atributas");
  }
  if (operator.length == 0) {
    messages.push("nepasirinktas palyginimo operatorius");
  }
  if (messages.length != 0) {
    errorElement.style.display = "block";
    errorElement.innerText = messages.join(", ");
    return false;
  } else {
    $("#cover-spin").show(0);
    selectByAttributeListener(element, attribute, operator, value);
  }

  return true;
}
export function selectAttribute(element) {
  $("#selectAttribute").empty();
  $("#selectAttribute").append(
    $("<option></option>")
      .val("Pasirinkti")
      .html("Pasirinkti")
  );
  var names = element.getAttributes();
  console.log(names);
  $.each(names, function(i, p) {
    $("#selectAttribute").append(
      $("<option></option>")
        .val(p)
        .html(p)
    );
  });
}
