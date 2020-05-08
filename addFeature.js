import GeoJSON from "ol/format/GeoJSON";
import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import {
  buildData,
  buildTableResult,
  buildTableResult2,
} from "./tableManipulation";
var i = 1;
export function addFeatureToNewLayer(
  geojson,
  highlightStyle,
  map,
  myname,
  results
) {
  let tempFeature = new GeoJSON().readFeatures(geojson);
  var arr = [];
  var obj = [];
  console.log(geojson);
  tempFeature.forEach((f) => {
    f.set("objekto_id", i++);
    obj = f.getProperties();
    delete obj["geometry"];
    arr.push(obj);
  });
  console.log(arr);

  $("#results")
    .append("<li class='list-group-item'>" + myname + "</li>")
    .trigger("liAdded");
  if (tempFeature.length == 0) {
    var h = document.createElement("H4"); // Create a <h1> element
    var t = document.createTextNode("Rezultato sluoksnis yra tuščias"); // Create a text node
    h.appendChild(t); // Append the text to <h1>
    results.push(h);
    return;
  }
  var attributeTable = document.createElement("div");
  var h = document.createElement("H4"); // Create a <h1> element
  var t = document.createTextNode("Atributų lentelė"); // Create a text node
  h.appendChild(t);
  attributeTable.appendChild(h);
  attributeTable.appendChild(buildTableResult(Object.keys(arr[0]), arr));
  results.push(attributeTable);

  var vectorSource = new VectorSource({
    features: tempFeature,
  });
  var vectorLayer = new VectorLayer({
    source: vectorSource,
    name: myname,
    style: new Style({
      fill: new Fill({
        color: "rgba(206, 112, 88, 0.3)",
      }),
      stroke: new Stroke({
        color: "#C04D4D",
        width: 3,
      }),
    }),
  });
  map.addLayer(vectorLayer);
}
var formatArea = function (area) {
  var output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
  } else {
    output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
  }
  return output;
};
export function addFeatureToNewLayerBuffer(
  geojson,
  highlightStyle,
  map,
  myname,
  results,
  manuga
) {
  let tempFeature = new GeoJSON().readFeatures(geojson);
  var arr = [];
  var obj = [];
  let counter = 0;
  console.log(geojson);
  tempFeature.forEach((f) => {
    obj = f.getProperties();
    let element = manuga.find((x) => x.key == counter);
    counter++;
    let resultObject = new Object();
    if (element != undefined) {
      let areaBefore = element.plotis;
      let areaNow = f.getGeometry().getArea();
      resultObject.id = f.getId();
      resultObject.buderio_dydis = element.buferioDydis;
      resultObject.pradinio_objekto_id = element.value;
      resultObject.plotas_pries_operacija = formatArea(areaBefore);
      resultObject.plotas_po_operacija = formatArea(areaNow);
      resultObject.ploto_santykis =
        Math.round((areaNow / areaBefore) * 100) / 100;
    }
    arr.push(resultObject);
  });
  console.log(arr);

  $("#results")
    .append("<li class='list-group-item'>" + myname + "</li>")
    .trigger("liAdded");
  if (tempFeature.length == 0) {
    var h = document.createElement("H4"); // Create a <h1> element
    var t = document.createTextNode("Rezultato sluoksnis yra tuščias"); // Create a text node
    h.appendChild(t); // Append the text to <h1>
    results.push(h);
    return;
  }
  var attributeTable = document.createElement("div");
  var h = document.createElement("H4"); // Create a <h1> element
  var t = document.createTextNode("Analizės rezultatai"); // Create a text node
  h.appendChild(t);
  attributeTable.appendChild(h);
  attributeTable.appendChild(buildTableResult(Object.keys(arr[0]), arr));
  results.push(attributeTable);

  var vectorSource = new VectorSource({
    features: tempFeature,
  });
  var vectorLayer = new VectorLayer({
    source: vectorSource,
    name: myname,
    style: new Style({
      fill: new Fill({
        color: "rgba(206, 112, 88, 0.3)",
      }),
      stroke: new Stroke({
        color: "#A84B4B",
        width: 2,
      }),
    }),
  });
  map.addLayer(vectorLayer);
}
export function addFeaturesToNewLayer(geojson, vardas, stilius, zemelapis) {
  let tempFeature = new GeoJSON().readFeatures(geojson);

  var vectorSource = new VectorSource({
    features: tempFeature,
  });
  var vectorLayer = new VectorLayer({
    source: vectorSource,
    name: vardas,
    style: stilius,
  });
  zemelapis.addLayer(vectorLayer);
}
export function addLandFundRezultToResults(json, myname, results, map) {
  if (typeof json.DIRV_DB10LT !== "undefined") {
    addFeaturesToNewLayer(
      json.DIRV_DB10LT.results.overlappingFeatureGeoJson,
      myname + 1,
      undefined,
      map
    );
  }
  if (typeof json.AZ_PR10LT !== "undefined") {
    addFeaturesToNewLayer(
      json.AZ_PR10LT.results.overlappingFeatureGeoJson,
      myname + 2,
      undefined,
      map
    );
  }

  var bothTables = document.createElement("div");

  console.log(json.DIRV_DB10LT);

  if (json.DIRV_DB10LT) {
    let name = "Žemės balas: iš rinkinio DIRV_DB10LT";
    delete json.DIRV_DB10LT.results.overlappingFeatureGeoJson;
    let body = json.DIRV_DB10LT.results;
    let fakeLabels = [
      "Įvesto (-ų) objekto (-ų) plotas, ha",
      "Persidengimo plotas, ha",
      "Persidengimo plotas, %",
      "Persidengimo perimetras, m",
      "Rasta objektų",
      "Dirvožemio našumas, balais",
    ];
    let realValues = Object.values(body);
    bothTables.appendChild(buildData([fakeLabels, realValues]));
  }
  if (json.AZ_PR10LT) {
    delete json.AZ_PR10LT.results.overlappingFeatureGeoJson;
    let name = "Apleistos žemės: iš rinkinio AZ_PR10LT";
    let body = json.AZ_PR10LT.results;
    let realValues = Object.values(body);
    let fakeLabels = [
      "Įvesto (-ų) objekto (-ų) plotas, ha",
      "Persidengimo plotas, ha",
      "Persidengimo plotas, %",
      "Persidengimo perimetras, m",
      "Rasta objektų",
    ];
    bothTables.appendChild(buildData([fakeLabels, realValues]));
  }

  //buildTable(Object.keys(obj).concat(["d"]), arr, $("#info")[0]);

  results.push(bothTables);
  $("#results")
    .append("<li class='list-group-item'>" + myname + "</li>")
    .trigger("liAdded");
}
export function addEmptyResults(json, myname, results) {
  var h = document.createElement("H1"); // Create a <h1> element
  // Create a text node

  if (json.result_message) {
    var t = document.createTextNode("Rezultato sluoksnis yra tuščias");
    h.appendChild(t);
  }
  results.push(h);
  $("#results")
    .append("<li class='list-group-item'>" + myname + "</li>")
    .trigger("liAdded");
}
