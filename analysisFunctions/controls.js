import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { unByKey } from "ol/Observable";
function selectObject(element) {
  return element.map.on("singleclick", function (e) {
    if (element.isSelectActive)
      element.map.forEachFeatureAtPixel(e.pixel, function (f) {
        var selIndex = element.selected.indexOf(f);
        let id = f.getId();
        let obj = {
          Id: id,
        };
        if (selIndex < 0) {
          element.selected.push(f);
          if (f.getStyle() == undefined) f.setStyle(element.style1);
          f.setStyle(element.style1);

          element.featureStyleObserver.addStyleObj({
            Id: obj.Id,
            style: element.style1,
          });
          $(element.containerId).jsGrid("insertItem", obj);
        } else {
          var pageIndex = $(element.containerId)
            .jsGrid("option", "data")
            .filter((obj) => {
              return obj.Id == id;
            });
          $(element.containerId).jsGrid("deleteItem", pageIndex[0]);
        }
      });
  });
}

export function addControls(element) {
  element.onListener = selectObject(element);
  $(element.controlsId)
    .find("[data-target = selectLayer]")
    .click(function () {
      diablo(element);
    });
  $(element.controlsId)
    .find("[data-target = selectObject]")
    .click(function () {
      element.selectButtonToogle();
    });
  $(element.controlsId)
    .find("[data-target = deleteTarget]")
    .click(function () {
      element.clearJsGrid();
    });
}
export function diablo(element) {
  $("#dialog0").dialog({
    open: function () {
      $("#selectLayer").empty();
      var names = element.getLayerNames();
      $.each(names, function (i, p) {
        $("#selectLayer").append($("<option></option>").val(p).html(p));
      });
      $(".ui-widget-overlay").addClass("custom-overlay");
    },
    title: "Pasirinkti sluoksnį",
    modal: true,
    autoOpen: true,
    buttons: {
      Pažymėti: function () {
        element.addLayerFeatures();
        $(this).dialog("close");
      },
      Atšaukti: function () {
        $(this).dialog("close");
      },
    },
  });
}
