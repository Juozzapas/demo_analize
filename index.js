import "bootstrap";
import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css

import "jsgrid/dist/jsgrid-theme.min.css";
import "jsgrid/dist/jsgrid.min.css";
import "jsgrid/dist/jsgrid";
import "jquery-ui-dist/jquery-ui.css";
import "jquery-ui-dist/jquery-ui.theme.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { unByKey } from "ol/Observable";
import { intersection } from "./analysisFunctions/intersection";
import { clip } from "./analysisFunctions/clip";
import { buffer } from "./analysisFunctions/buffer";
import { selectByLocation } from "./analysisFunctions/selectByLocation";
import { transformation } from "./transformation/transformation";
import { landFundAnalysis } from "./landFundAnalysis/landFundAnalysis";
import { mergeVectorLayers } from "./analysisFunctions/mergeVectorLayers";
import "ol/ol.css";
import { Map, View, Overlay } from "ol";
import OSM from "ol/source/OSM";

import GeoJSON from "ol/format/GeoJSON";
import {
  VectorImage as VectorImageLayer,
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { addFeaturesToNewLayer } from "./addFeature";
import { addOverlay } from "./overlayAttributes";
import { selectByAttribute } from "./analysisFunctions/selectByAttribute";
import { get as getProjection } from "ol/proj";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { GPX, IGC, KML, TopoJSON, XSD, GML } from "ol/format";
import { defaults as defaultInteractions, DragAndDrop } from "ol/interaction";
proj4.defs(
  "EPSG:3346",
  "+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9998 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs "
);
proj4.defs(
  "EPSG:27700",
  "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 " +
    "+x_0=400000 +y_0=-100000 +ellps=airy " +
    "+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 " +
    "+units=m +no_defs"
);
proj4.defs(
  "EPSG:23032",
  "+proj=utm +zone=32 +ellps=intl " +
    "+towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5479",
  "+proj=lcc +lat_1=-76.66666666666667 +lat_2=" +
    "-79.33333333333333 +lat_0=-78 +lon_0=163 +x_0=7000000 +y_0=5000000 " +
    "+ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:21781",
  "+proj=somerc +lat_0=46.95240555555556 " +
    "+lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel " +
    "+towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:3413",
  "+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 " +
    "+x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
);
proj4.defs(
  "EPSG:2163",
  "+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 " +
    "+a=6370997 +b=6370997 +units=m +no_defs"
);
proj4.defs(
  "ESRI:54009",
  "+proj=moll +lon_0=0 +x_0=0 +y_0=0 +datum=WGS84 " + "+units=m +no_defs"
);
register(proj4);
var proj3346 = getProjection("EPSG:3346");
proj3346.setExtent([172763.81, 5983979.34, 673835.64, 6260983.36]);
var proj27700 = getProjection("EPSG:27700");
proj27700.setExtent([0, 0, 700000, 1300000]);

var proj23032 = getProjection("EPSG:23032");
proj23032.setExtent([-1206118.71, 4021309.92, 1295389.0, 8051813.28]);

var proj5479 = getProjection("EPSG:5479");
proj5479.setExtent([6825737.53, 4189159.8, 9633741.96, 5782472.71]);

var proj21781 = getProjection("EPSG:21781");
proj21781.setExtent([485071.54, 75346.36, 828515.78, 299941.84]);

var proj3413 = getProjection("EPSG:3413");
proj3413.setExtent([-4194304, -4194304, 4194304, 4194304]);

var proj2163 = getProjection("EPSG:2163");
proj2163.setExtent([-8040784.5135, -2577524.921, 3668901.4484, 4785105.1096]);

var proj54009 = getProjection("ESRI:54009");
proj54009.setExtent([-18e6, -9e6, 18e6, 9e6]);
var source = new VectorSource({
  wrapX: false,
});
var vector = new VectorLayer({
  source: source,
  name: "Bendras",
});
var dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON],
});
const map = new Map({
  interactions: defaultInteractions().extend([dragAndDropInteraction]),
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    vector,
  ],
  view: new View({
    projection: proj3346,
    center: [431194.04, 6115464.68],
    zoom: 3,
  }),
  renderer: "webgl",
});
addOverlay(map);
dragAndDropInteraction.on("addfeatures", function (event) {
  var vectorSource = new VectorSource({
    features: event.features,
  });
  map.addLayer(
    new VectorImageLayer({
      name: "Įkelti",
      source: vectorSource,
    })
  );
  map.getView().fit(vectorSource.getExtent());
});
var typeSelectGeometry = document.getElementById("typeGeometry");

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelectGeometry.value;
  if (value !== "none") {
    draw = new Draw({
      source: source,
      type: typeSelectGeometry.value,
    });
    draw.on("drawend", function (e) {
      e.feature.setId(Math.floor(Math.random() * 10000) + 1);
      console.log(e.feature, e.feature.getProperties());
    });
    map.addInteraction(draw);
  }
}
typeSelectGeometry.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};
/**
 * Handle change event.
 */

var highlightStyle = new Style({
  stroke: new Stroke({
    color: "blue",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 255, 0.3001)",
  }),
});
var highlightStyle2 = new Style({
  stroke: new Stroke({
    color: "red",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 255, 0.1)",
  }),
});
var highlightStyle3 = new Style({
  stroke: new Stroke({
    color: "#CD9964",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(205, 153, 100, 0.3)",
  }),
});
var highlightStyle4 = new Style({
  stroke: new Stroke({
    color: "orange",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 255, 0.1)",
  }),
});
class FeatureStyleObserver {
  constructor() {
    this.currentFeatureStyle = [];
  }
  doSkipStyleSetting(id, style1, style2) {
    let obj = this.returnStyleObjs(id, style1, style2);
    console.log(obj);
    if (obj) {
      console.log("skip");
      return true;
    }
    return false;
  }
  addStyleObj(obj) {
    this.currentFeatureStyle.push(obj);
  }
  whichStyle(id, style1, style2, style3) {
    let style = undefined;
    let obj = undefined;

    obj = this.currentFeatureStyle.filter((x) => {
      return x.Id == id && (x.style == style1 || x.style == style2);
    });

    if (obj.length > 1) {
      style = style2;
    } else if (obj.length == 1) {
      style = style1;
    }
    console.log(obj);
    return style;
  }
  returnStyleObjs(id, style1, style2) {
    let obj = this.currentFeatureStyle.find((x) => {
      return x.Id == id && x.style != style1 && x.style != style2;
    });
    return obj;
  }
  removeStyleObjs(id, style1, style2) {
    this.currentFeatureStyle = this.currentFeatureStyle.filter((x) => {
      if (x.Id == id && (x.style == style1 || x.style == style2)) return false;
      return true;
    });
  }
  removeStyleObj(id, style1) {
    this.currentFeatureStyle = this.currentFeatureStyle.filter((x) => {
      if (x.Id == id && x.style == style1) return false;
      return true;
    });
  }
}
class SubjectTest {
  constructor(
    highStyle1,
    highStyle2,
    highStyle3,
    highStyle4,
    containerId,
    controlsId,
    myMap,
    featureStyleObserver
  ) {
    this.featureStyleObserver = featureStyleObserver;
    this.selected = [];
    this.idArray = [];
    this.myId = [];
    this.style1 = highStyle1;
    this.style2 = highStyle2;
    this.style3 = highStyle3;
    this.style4 = highStyle4;
    this.isSelectActive = false;
    this.containerId = containerId;
    this.controlsId = controlsId;
    this.map = myMap;
    this.onListener = undefined;
  }
  clearJsGrid() {
    this.clearAll();
    $(this.containerId).jsGrid("option", "data", this.myId);
  }
  SelectActiveFalse() {
    this.isSelectActive = false;
  }
  selectButtonToogle() {
    this.isSelectActive = !this.isSelectActive;
  }
  resetAll() {
    unByKey(this.onListener);
    this.isSelectActive = false;
    this.onListener = undefined;
    this.clearAll();
  }
  clearAll() {
    this.selected.forEach((f) => {
      var style = this.featureStyleObserver.whichStyle(
        f.getId(),
        this.style3,
        this.style4
      );
      f.setStyle(style);
      this.featureStyleObserver.removeStyleObjs(
        f.getId(),
        this.style1,
        this.style2
      );
    });

    this.idArray = [];
    this.selected = [];
    this.myId = [];
  }
  clearById(id) {
    console.log(this);
    this.selected = this.selected.filter((f) => {
      if (f.getId() == id) {
        var style = this.featureStyleObserver.whichStyle(
          id,
          this.style3,
          this.style4
        );
        f.setStyle(style);

        this.featureStyleObserver.removeStyleObjs(id, this.style1, this.style2);
        return false;
      } else return true;
    });
    this.idArray = this.idArray.filter((num) => {
      return num != id;
    });
  }
  canToogle(id) {
    let rez = false;
    this.selected.forEach((feature) => {
      if (feature.getId() == id) {
        let style = feature.getStyle();
        if (style != this.style4) {
          rez = true;
        }
      }
    });
    return rez;
  }
  toogleSelection(id) {
    if (!this.idArray.includes(id)) {
      this.idArray.push(id);
      this.selected.forEach((feature) => {
        if (feature.getId() == id) {
          feature.setStyle(this.style2);
          this.featureStyleObserver.addStyleObj({
            Id: id,
            style: this.style2,
          });
        }
      });
    } else
      this.selected.forEach((feature) => {
        if (feature.getId() == id) {
          feature.setStyle(this.style1);
          this.featureStyleObserver.removeStyleObj(id, this.style2);
        }

        this.idArray = this.idArray.filter((num) => {
          return num != id;
        });
      });
  }
  getAttributes() {
    let arrAttributes = [];
    this.selected.forEach((f) => {
      let obj = Object.keys(f.getProperties());

      console.log(obj);
      obj.forEach((element) => {
        if (arrAttributes.indexOf(element) === -1 && element != "geometry") {
          arrAttributes.push(element);
        }
      });
    });
    return arrAttributes;
  }
  getLayerNames() {
    this.layerNames = [];
    this.map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer || layer instanceof VectorImageLayer) {
        this.layerNames.push(layer.get("name"));
      }
    });
    return this.layerNames;
  }
  addLayerFeatures() {
    var layerName = $("#selectLayer").find(":selected").text();
    this.map.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        if (layer.get("name") == layerName) {
          let src = layer.getSource();
          src.getFeatures().forEach((f) => {
            var selIndex = this.selected.indexOf(f);
            let id = f.getId();
            let obj = {
              Id: id,
            };
            if (selIndex < 0) {
              this.selected.push(f);
              if (f.getStyle() == undefined) f.setStyle(this.style1);
              this.featureStyleObserver.addStyleObj({
                Id: id,
                style: this.style1,
              });

              $(this.containerId).jsGrid("insertItem", obj);
            }
          });
        }
      }
    });
  }
}

var observer = new FeatureStyleObserver();
var a = new SubjectTest(
  highlightStyle,
  highlightStyle2,
  highlightStyle3,
  highlightStyle4,
  "#container",
  "#controls",
  map,
  observer
);
var b = new SubjectTest(
  highlightStyle3,
  highlightStyle4,
  highlightStyle,
  highlightStyle2,
  "#container1",
  "#controls1",
  map,
  observer
);

buffer(a);
intersection(a, b);
clip(a, b);
selectByLocation(a, b);
selectByAttribute(a);
transformation(a);
mergeVectorLayers(a);
landFundAnalysis(a);
import {
  bufferGeoJson,
  apkirpimas,
  susikirtimas,
  zemesAnalize1,
  zemesAnalize2,
} from "./analizesOperacijos/readyToUseGeojson";

var warmStyle = new Style({
  stroke: new Stroke({
    color: "#3F7FBF",
    width: 3,
  }),
  fill: new Fill({
    color: "rgba(206, 112, 88, 0.05)",
  }),
});

addFeaturesToNewLayer(bufferGeoJson, "Bufferių kūrimas", warmStyle, map);
addFeaturesToNewLayer(apkirpimas, "Pirmas spiečius", warmStyle, map);
addFeaturesToNewLayer(susikirtimas, "Antras spiečius", warmStyle, map);
addFeaturesToNewLayer(zemesAnalize1, "Zemes analize 1", warmStyle, map);
addFeaturesToNewLayer(zemesAnalize2, "Zemes analize 2", warmStyle, map);

var layersToRemove = [];
var layersToKeep = [
  "Buferių kūrimas",
  "Pirmas spiečius",
  "Antras spiečius",
  "Bendras",
  "Žemės analizė 1",
  "Žemės analizė 2",
];

$("#removeResults").click(function () {
  map.getLayers().forEach(function (layer) {
    if (
      layer.get("name") != undefined &&
      !layersToKeep.includes(layer.get("name"))
    ) {
      layersToRemove.push(layer);
    }
  });
  var len = layersToRemove.length;
  for (var i = 0; i < len; i++) {
    map.removeLayer(layersToRemove[i]);
  }
  source.clear();
});
var viewProjSelect = document.getElementById("view-projection");
function updateViewProjection() {
  var newProj = getProjection(viewProjSelect.value);
  var newProjExtent = newProj.getExtent();
  var newView = new View({
    projection: newProj,
    center: getCenter(newProjExtent || [0, 0, 0, 0]),
    zoom: 0,
    extent: newProjExtent || undefined,
  });
  map.setView(newView);
}
/**
 * Handle change event.
 */
viewProjSelect.onchange = function () {
  updateViewProjection();
};
import { getWidth, getCenter } from "ol/extent";
