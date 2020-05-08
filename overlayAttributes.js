import { Map, View, Overlay } from "ol";
import { buildTable } from "./tableManipulation";

export function addOverlay(map) {
  var typeOverlay = document.getElementById("overlayOn");
  var container = document.getElementById("popup");
  var content = document.getElementById("popup-content");
  var closer = document.getElementById("popup-closer");

  var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
  map.addOverlay(overlay);
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  map.on("singleclick", function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    if (feature && typeOverlay.value != "none") {
      var obj = feature.getProperties();
      delete obj["geometry"];
      var coordinate = evt.coordinate;
      content.innerHTML = "<p>Atributų lentelė:</p>";
      buildTable(Object.keys(obj), [obj], content);
      // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
      overlay.setPosition(coordinate);
    }
  });
}
