var myLandFund =
  '<div class="form-inline mt-2">' +
  "<p5>Atstumas</p5>" +
  '<div class="form-group mx-sm-2">' +
  '<input type="number" name ="atstumas" class="form-control" id="distance" placeholder="atstumas" />' +
  "</div>" +
  "<p5>metrais</p5>" +
  "</div>" +
  '<div class="form-inline my-2">' +
  '   <div class="form-check-inline">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="0"' +
  "         />DIRV_DB10LT Žemės balas" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="1"' +
  "         />AZ_PR10LT Apleistos žemės" +
  "   </div>" +
  "   </div>";
var myMerge =
  '<div class="form-inline mt-2">' +
  "      <p5>Rezultato kordinačių sistema</p5>" +
  '      <div class="form-group mx-sm-2">' +
  "        <input" +
  '          type="text"' +
  '          name="sourceCRS"' +
  '          class="form-control"' +
  '          id="targetCRS"' +
  '          placeholder="CRS"' +
  "        />" +
  "      </div>" +
  "    </div>";
var myTransform =
  '<div class="form-inline mt-2">' +
  "      <p5>Esama kordinačių sistema</p5>" +
  '      <div class="form-group mx-sm-2">' +
  "        <input" +
  '          type="text"' +
  '          name="sourceCRS"' +
  '          class="form-control"' +
  '          id="sourceCRS"' +
  '          placeholder="CRS"' +
  "        />" +
  "      </div>" +
  "    </div>" +
  '    <div class="form-inline mt-2">' +
  "      <p5>Norima kordinačių sistema</p5>" +
  '      <div class="form-group mx-sm-2">' +
  "        <input" +
  '          type="text"' +
  '          name="targetCRS"' +
  '          class="form-control"' +
  '          id="targetCRS"' +
  '          placeholder="CRS"' +
  "        />" +
  "      </div>" +
  "    </div>" +
  '    <div class="form-inline mt-2">' +
  "      <p5>Formatas</p5>" +
  '      <div class="form-group mx-sm-2">' +
  '        <select class="browser-default custom-select" id="format">' +
  '          <option selected value="ESRI Shapefile">ESRI Shapefile</option>' +
  '          <option value="CSV">CSV</option>' +
  '          <option value="GML">GML</option>' +
  '           <option value="KML">KML</option>' +
  '          <option value="GeoJSON">GeoJSON</option>' +
  "        </select>" +
  "      </div>" +
  "    </div>" +
  '    <div class="form-inline my-2">' +
  '      <div class="custom-control custom-checkbox" id="skipFailures">' +
  "        <input" +
  '          type="checkbox"' +
  '          class="custom-control-input"' +
  '          id="defaultUnchecked"' +
  "        />" +
  '        <label class="custom-control-label" for="defaultUnchecked"' +
  "          >Praleisti netinkamus objektus</label" +
  "        >" +
  "      </div>" +
  "    </div>";

var blockSelectAttribute =
  '<div class="form-inline mt-2">' +
  "      <p5>Atributas</p5>" +
  '      <select class="browser-default custom-select mx-sm-2"id="selectAttribute">' +
  "<option>Pasirinkti atributą</option>" +
  "</select>" +
  "      </div>" +
  "    </div>" +
  '    <div class="form-inline mt-2">' +
  "      <p5>Operatorius</p5>" +
  '      <div class="form-group mx-sm-2">' +
  '        <select class="browser-default custom-select" id="operator">' +
  '          <option selected value="0">=</option>' +
  '          <option value="1">≠</option>' +
  '          <option value="2">></option>' +
  '          <option value="3">≥</option>' +
  '          <option value="4">≤</option>' +
  '          <option value="5">prasideda</option>' +
  '          <option value="6">turi</option>' +
  '          <option value="8">yra null</option>' +
  '          <option value="9">nėra null</option>' +
  '          <option value="10">neturi</option>' +
  "        </select>" +
  "      </div>" +
  "    </div>" +
  '    <div class="form-inline mt-2">' +
  "      <p5>Reikšmė</p5>" +
  '      <div class="form-group mx-sm-2">' +
  "        <input" +
  '          type="text"' +
  '          name="reiksme"' +
  '          class="form-control"' +
  '          id="valueField"' +
  '          placeholder="atributas"' +
  "        />" +
  "      </div>" +
  "    </div>";

var basicBlock =
  '<fieldset class="reset-this redo-fieldset">' +
  '<legend class="reset-this redo-legend">Įvesties objektai</legend>' +
  '<div id="container"></div>' +
  '<div class="form-inline my-2" id ="controls">' +
  '<button class="btn btn-primary ml-sm-2 selected" data-target ="selectLayer" data-toggle="button" title="Pasirinkti sluoksnį ir pažymėti visus jo objektus">' +
  '<i class="fa fa-list"> </i>' +
  '<button class="btn btn-primary ml-sm-2" data-target ="selectObject" data-toggle="button" title="Pažymėti objektą žemėlapyje">' +
  '<i class="fa fa-mouse-pointer"></i>' +
  "</button>" +
  '<button class="btn btn-primary ml-auto" data-target ="deleteTarget" title="Pašalinti visus">' +
  '<i class="fas fa-trash-alt"></i>' +
  "</button>" +
  "</div>" +
  "</fieldset>";
var basicBlockv2 =
  '<fieldset class="reset-this redo-fieldset">' +
  '<legend class="reset-this redo-legend">Įvesties objektai</legend>' +
  '<div id="container"></div>' +
  '<div class="form-inline my-2" id ="controls">' +
  '<button class="btn btn-primary ml-sm-2 selected" data-target ="selectLayer" data-toggle="button" title="Pasirinkti sluoksnį ir pažymėti visus jo objektus">' +
  '<i class="fa fa-list"> </i>' +
  '<button class="btn btn-primary ml-sm-2" data-target ="selectObject" data-toggle="button" title="Pažymėti objektą žemėlapyje">' +
  '<i class="fa fa-mouse-pointer"></i>' +
  "</button>" +
  '<button class="btn btn-primary ml-auto" data-target ="deleteTarget" title="Pašalinti visus">' +
  '<i class="fas fa-trash-alt"></i>' +
  "</button>" +
  "</div>" +
  "</fieldset>";

var basicBlock2 =
  '<fieldset class="reset-this redo-fieldset mt-2">' +
  '<legend class="reset-this redo-legend">Perdangos objektai</legend>' +
  '<div id="container1"></div>' +
  '<div class="form-inline my-2" id ="controls1">' +
  '<button class="btn btn-primary ml-sm-2 selected" data-target ="selectLayer" data-toggle="button" title="Pasirinkti sluoksnį ir pažymėti visus jo objektus">' +
  '<i class="fa fa-list"> </i>' +
  '<button class="btn btn-primary ml-sm-2" data-target ="selectObject" data-toggle="button" title="Pažymėti objektą žemėlapyje">' +
  '<i class="fa fa-mouse-pointer"></i>' +
  "</button>" +
  '<button class="btn btn-primary ml-auto" data-target ="deleteTarget" title="Pašalinti visus">' +
  '<i class="fas fa-trash-alt"></i>' +
  "</button>" +
  "</div>" +
  "</fieldset>";

var errors =
  '<div id="errorBufferInput"  class="p-3 mb-2 bg-danger text-white"></div>';
var checkboxEs =
  '<div class="form-inline my-2">' +
  '   <div class="form-check-inline">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="0"' +
  "         />susikerta" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="1"' +
  "         />įtraukia" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="2"' +
  "         />atjungtas" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="3"' +
  "         />lygu" +
  "      </label>" +
  "   </div>" +
  "</div>" +
  '<div class="form-inline mb-2">' +
  '   <div class="form-check-inline">' +
  '      <label class="form-check-label">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="4"' +
  "         />liečia" +
  "      </label>" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  '      <label class="form-check-label">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="5"' +
  "         />persidengia" +
  "      </label>" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  '      <label class="form-check-label">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="6"' +
  "         />yra viduje" +
  "      </label>" +
  "   </div>" +
  '   <div class="form-check-inline">' +
  '      <label class="form-check-label">' +
  "      <input" +
  '         type="checkbox"' +
  '         class="form-check-input"' +
  '         name="type"' +
  '         value="7"' +
  "         />kerta" +
  "      </label>" +
  "   </div>" +
  "</div>";

export function bufferHtml() {
  return (
    basicBlock +
    (errors +
      '<div class="form-inline mt-2">' +
      "<p5>Atstumas</p5>" +
      '<div class="form-group mx-sm-2">' +
      '<input type="number" name ="atstumas" class="form-control" id="bufferAlgorithm" placeholder="atstumas" />' +
      "</div>" +
      "<p5>metrais</p5>" +
      "</div>")
  );
}
export function intersectionHtml() {
  return basicBlock + basicBlock2 + errors;
}
export function clipHtml() {
  return basicBlock + basicBlock2 + errors;
}
export function selectByLocationHtml() {
  return (
    basicBlock +
    (basicBlock2 +
      checkboxEs +
      '<div class="form-inline mb-2">' +
      "<p5>Atstumas</p5>" +
      '<div class="form-group mx-sm-2">' +
      '<input type="number" name ="atstumas" class="form-control" id="distanceLocation" placeholder="atstumas" />' +
      "</div>" +
      "<p5>metrais</p5>" +
      "</div>" +
      errors)
  );
}
export function selectByAttributeHtml() {
  return basicBlock + blockSelectAttribute + errors;
}
export function transformationHTML() {
  return basicBlock + myTransform + errors;
}
export function mergeVectorLayersHTML() {
  return basicBlockv2 + myMerge + errors;
}
export function landFundAnalysisHTML() {
  return basicBlock + myLandFund + errors;
}
