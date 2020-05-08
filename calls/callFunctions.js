import GeoJSON from "ol/format/GeoJSON";
import { getArea, getLength } from "ol/sphere";
import EsriJSON from "ol/format/EsriJSON";
const axios = require("axios").default;
var uri = "https://localhost:44339/api/";

import {
  addLandFundRezultToResults,
  addFeaturesToSameLayerNoId,
  addFeatureToNewLayer,
  addFeatureToNewLayerBuffer,
  addEmptyResults,
} from "../addFeature";
import { isEmpty } from "ol/extent";

var rezId = 0;
var results = [];
$("#results").on("liAdded", function () {
  $("#badgePop").fadeIn("slow").fadeOut("slow");
});
$(document).on("click", "#results .list-group-item", function () {
  var index = $("#results .list-group-item").index(this);
  var element = document.getElementById("info");
  element.innerHTML = "";
  element.appendChild(results[index]);
  element.parentElement.style.background = "#f3f3f3";
});

function handleError(error, errorElement) {
  if (error.response != undefined) {
    if (error.response.data) errorElement.innerText = error.response.data.error;
  } else errorElement.innerText = error;
}
export function bufferListener(element, distanc) {
  const errorElement = document.getElementById("errorBufferInput");
  let distance = distanc;
  let bufferController = "Buffer";
  let fullUri = uri.concat(bufferController);
  var writer = new GeoJSON();
  var geojsonStr = writer.writeFeatures(element.selected);

  console.log(geojsonStr);
  var myObj = JSON.parse(geojsonStr);
  console.log(myObj);
  var myJSON = {
    inputLayer: myObj,
    distance: parseInt(distance),
  };
  let counter = 0;
  let manuga = element.selected.map((x) => {
    let a = counter++;
    let b = x.getId();
    let c;
    if (
      x.getGeometry().getType() == "MultiPolygon" ||
      x.getGeometry().getType() == "Polygon"
    ) {
      c = x.getGeometry().getArea();
    }
    console.log(x.getGeometry().getType());
    return { key: a, value: b, plotis: c, buferioDydis: parseInt(distance) };
  });
  console.log(manuga);
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      addFeatureToNewLayerBuffer(
        response.data,
        undefined,
        element.map,
        "Buferis_" + rezId,
        results,
        manuga
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}
export function intersectionListener(element1, element2) {
  const errorElement = document.getElementById("errorBufferInput");
  let controller = "Intersection";
  let fullUri = uri.concat(controller);
  var writer = new GeoJSON();
  var geojsonStr1 = writer.writeFeatures(element1.selected);
  var geojsonStr2 = writer.writeFeatures(element2.selected);
  var myObj1 = JSON.parse(geojsonStr1);
  var myObj2 = JSON.parse(geojsonStr2);

  var myJSON = {
    inputLayer: myObj1,
    overlayLayer: myObj2,
  };
  console.log(JSON.stringify(myJSON));
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      addFeatureToNewLayer(
        response.data,
        undefined,
        element1.map,
        "Susikirtimas " + rezId,
        results
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}
export function clipListener(element1, element2) {
  const errorElement = document.getElementById("errorBufferInput");
  let controller = "Clip";
  let fullUri = uri.concat(controller);
  var writer = new GeoJSON();
  var geojsonStr1 = writer.writeFeatures(element1.selected);
  var geojsonStr2 = writer.writeFeatures(element2.selected);
  var myObj1 = JSON.parse(geojsonStr1);
  var myObj2 = JSON.parse(geojsonStr2);

  var myJSON = {
    inputLayer: myObj1,
    overlayLayer: myObj2,
  };
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      addFeatureToNewLayer(
        response.data,
        undefined,
        element1.map,
        "Apkirpimas " + rezId,
        results
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}
export function selectByLocationListener(
  element1,
  element2,
  predicateArray,
  distanc
) {
  const errorElement = document.getElementById("errorBufferInput");
  let controller = "SelectByLocation";
  let fullUri = uri.concat(controller);
  var writer = new GeoJSON();
  var geojsonStr1 = writer.writeFeatures(element1.selected);
  var geojsonStr2 = writer.writeFeatures(element2.selected);
  var myObj1 = JSON.parse(geojsonStr1);
  var myObj2 = JSON.parse(geojsonStr2);

  console.log(myJSON);
  var myJSON = {
    inputLayer: myObj1,
    overlayLayer: myObj2,
  };
  if (predicateArray.length) {
    myJSON["predicate"] = predicateArray;
  }
  if (distanc) {
    myJSON["distance"] = parseInt(distanc);
  }
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      addFeatureToNewLayer(
        response.data,
        undefined,
        element1.map,
        "Atranka pagal vietą " + rezId,
        results
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}
export function selectByAttributeListener(element, attribute, operator, value) {
  const errorElement = document.getElementById("errorBufferInput");
  let bufferController = "SelectByAttribute";
  let fullUri = uri.concat(bufferController);
  var writer = new GeoJSON();
  var geojsonStr = writer.writeFeatures(element.selected);
  var myObj = JSON.parse(geojsonStr);
  console.log(operator);
  var myJSON = {
    inputLayer: myObj,
    field: attribute,
    usedOperator: parseInt(operator),
  };
  if (value.length) {
    myJSON["value"] = value;
  }
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));

      addFeatureToNewLayer(
        response.data,
        undefined,
        element.map,
        "Atranka pagal atributą " + rezId,
        results
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}
export function transformationListener(
  element,
  type,
  sourceCrs,
  targetCrs,
  skipFailures
) {
  const errorElement = document.getElementById("errorBufferInput");
  let bufferController = "transform";
  let fullUri = uri.concat(bufferController);
  var writer = new GeoJSON();
  var geojsonStr = writer.writeFeatures(element.selected);
  var myObj = JSON.parse(geojsonStr);
  var myJSON = {
    inputLayer: myObj,
    type: type,
  };
  if (sourceCrs.length) {
    myJSON["sourceCrs"] = sourceCrs;
  }
  if (targetCrs.length) {
    myJSON["targetCrs"] = targetCrs;
  }
  if (skipFailures.length) {
    myJSON["skipFailures"] = "true";
  }

  axios
    .post(fullUri, myJSON, {
      responseType: "arraybuffer", // important
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.zip"); //or any other extension
      document.body.appendChild(link);
      link.click();
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      errorElement.style.display = "block";
      if (error.response) {
        var decodedString = String.fromCharCode.apply(
          null,
          new Uint8Array(error.response.data)
        );
        var obj = JSON.parse(decodedString);
        console.log(obj.error);
        errorElement.innerText = obj.error;
      } else {
        errorElement.innerText = error;
      }
    });
}
export function mergeVectorLayersListener(element, targetCRS) {
  const errorElement = document.getElementById("errorBufferInput");
  let Controller = "MergeVectorLayers";
  let fullUri = uri.concat(Controller);
  var writer = new GeoJSON();
  var geojsonStr = writer.writeFeatures(element.selected);
  console.log(geojsonStr);
  var myObj = JSON.parse("[" + geojsonStr + "]");
  var myJSON = {
    inputLayers: myObj,
  };
  if (targetCRS.length) {
    myJSON["targetCrs"] = targetCRS;
  }
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      addFeatureToNewLayer(
        response.data,
        undefined,
        element.map,
        "Suliejimas " + rezId,
        results
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error.response);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}

export function landFundAnalysisListener(element1, distance, predicateArray) {
  const errorElement = document.getElementById("errorBufferInput");
  let controller = "LandFundAnalysis";
  let fullUri = uri.concat(controller);
  var writer = new GeoJSON();
  var geojsonStr1 = writer.writeFeatures(element1.selected);
  var myObj1 = JSON.parse(geojsonStr1);

  console.log(geojsonStr1);
  var myJSON = {
    inputLayer: myObj1,
  };
  if (predicateArray.length) {
    myJSON["predicate"] = predicateArray;
  }

  if (distance) {
    myJSON["distance"] = parseInt(distance);
  }
  console.log(myJSON);
  axios
    .post(fullUri, myJSON)
    .then((response) => {
      rezId++;
      $("#cover-spin").hide(0);
      console.log(response);
      console.log(response.data);
      //console.log(JSON.parse(response.data));
      addLandFundRezultToResults(
        response.data,
        "Žemės analizė" + rezId,
        results,
        element1.map
      );
    })
    .catch(function (error) {
      $("#cover-spin").hide(0);
      console.log(error);
      errorElement.style.display = "block";
      handleError(error, errorElement);
    });
}
