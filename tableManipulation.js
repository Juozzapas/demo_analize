export function buildTable(labels, objects, container) {
  var table = document.createElement("table");
  table.setAttribute("id", "mura");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  var theadTr = document.createElement("tr");
  for (var i = 0; i < labels.length; i++) {
    var theadTh = document.createElement("th");
    theadTh.innerHTML = labels[i];
    theadTr.appendChild(theadTh);
  }
  thead.appendChild(theadTr);
  table.appendChild(thead);

  for (let j = 0; j < objects.length; j++) {
    var tbodyTr = document.createElement("tr");
    for (let k = 0; k < labels.length; k++) {
      var tbodyTd = document.createElement("td");
      tbodyTd.innerHTML = objects[j][labels[k]];
      tbodyTr.appendChild(tbodyTd);
    }
    tbodyTr.appendChild(tbodyTd);
    tbody.appendChild(tbodyTr);
  }
  table.appendChild(tbody);

  container.appendChild(table);
}
export function buildTableResult(labels, objects) {
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  var theadTr = document.createElement("tr");
  for (var i = 0; i < labels.length; i++) {
    var theadTh = document.createElement("th");
    theadTh.innerHTML = labels[i];
    theadTr.appendChild(theadTh);
  }
  thead.appendChild(theadTr);
  table.appendChild(thead);

  for (let j = 0; j < objects.length; j++) {
    var tbodyTr = document.createElement("tr");
    for (let k = 0; k < labels.length; k++) {
      var tbodyTd = document.createElement("td");
      console.log(objects[j][labels[k]]);
      tbodyTd.innerHTML = objects[j][labels[k]];
      tbodyTr.appendChild(tbodyTd);
    }
    tbodyTr.appendChild(tbodyTd);
    tbody.appendChild(tbodyTr);
  }
  table.appendChild(tbody);

  return table;
}
export function buildTableResult2(labelsBig, fakeLabels, labels, objects) {
  var table = document.createElement("table");
  table.setAttribute("id", "dura");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  var theadTrBig = document.createElement("tr");
  var theadThBig = document.createElement("th");
  theadThBig.colSpan = labels.length;
  theadThBig.innerHTML = labelsBig;
  theadTrBig.appendChild(theadThBig);
  thead.appendChild(theadTrBig);

  var theadTr = document.createElement("tr");
  for (var i = 0; i < fakeLabels.length; i++) {
    var theadTh = document.createElement("th");
    theadTh.innerHTML = fakeLabels[i];
    theadTr.appendChild(theadTh);
  }
  thead.appendChild(theadTr);
  table.appendChild(thead);

  for (let j = 0; j < objects.length; j++) {
    var tbodyTr = document.createElement("tr");
    for (let k = 0; k < labels.length; k++) {
      var tbodyTd = document.createElement("td");
      if (isNaN(objects[j][labels[k]]))
        tbodyTd.innerHTML = objects[j][labels[k]];
      else tbodyTd.innerHTML = objects[j][labels[k]];
      tbodyTr.appendChild(tbodyTd);
    }
    tbodyTr.appendChild(tbodyTd);
    tbody.appendChild(tbodyTr);
  }
  table.appendChild(tbody);

  return table;
}
export function buildData(array) {
  var table = document.createElement("table");
  table.setAttribute("id", "twoTables");
  var trOne = document.createElement("tr");
  var thOne = document.createElement("th");
  thOne.innerHTML = "Parametras";
  var thTwo = document.createElement("th");
  thTwo.innerHTML = "Reikšmė";
  //var thThree = document.createElement("th");
  //thThree.innerHTML = "Year";
  trOne.appendChild(thOne);
  trOne.appendChild(thTwo);
  //trOne.appendChild(thThree);
  table.appendChild(trOne);
  //We created header row and now we will create rows from your array
  for (var i = 0; i < array[0].length; i++) {
    var trTwo = document.createElement("tr");
    var tdOne = document.createElement("td");
    tdOne.innerHTML = array[0][i]; //titles
    var tdTwo = document.createElement("td");
    tdTwo.innerHTML = array[1][i]; //authors
    //var tdThree = document.createElement("td");
    //tdThree.innerHTML = array[2][i]; //years
    trTwo.appendChild(tdOne);
    trTwo.appendChild(tdTwo);
    //trTwo.appendChild(tdThree);
    table.appendChild(trTwo);
  }
  return table;
}
