import { selectAttribute } from "./analysisFunctions/selectByAttribute";
export function createJsGrid(element) {
  $(element.containerId).jsGrid({
    sorter: "number", // uses sorter for numbers
    align: "center", // right text alignment
    readOnly: false, // a boolean defines whether input is readonly (added in v1.4)
    width: "100%",
    height: "200px",
    align: "right",
    filtering: false,
    editing: false,
    sorting: false,
    data: element.myId,
    selecting: true,
    confirmDeleting: false,

    deleteButton: false, // show delete button

    rowClick: function (args) {
      if (element.canToogle(args.item.Id)) {
        var $row = this.rowByItem(args.item);
        $row.toggleClass("highlight");
        element.toogleSelection(args.item.Id);
      }
    },
    onItemDeleted: function (args) {
      element.clearById(args.item.Id);
      element.myId.forEach((id) => {
        if (element.idArray.includes(id.Id)) {
          let $row = this.rowByItem(id);
          if (!$row.hasClass("highlight")) $row.toggleClass("highlight");
        }
      });
    },
    onItemInserted: function (args) {
      element.myId.forEach((id) => {
        if (element.idArray.includes(id.Id)) {
          let $row = this.rowByItem(id);
          if (!$row.hasClass("highlight")) $row.toggleClass("highlight");
        }
      });
    },
    onRefreshed: function (args) {
      element.myId.forEach((id) => {
        if (element.idArray.includes(id.Id)) {
          let $row = this.rowByItem(id);
          if (!$row.hasClass("highlight")) $row.toggleClass("highlight");
        }
      });
    },
    fields: [
      {
        name: "Id",
        align: "center",
        type: "number",
      },
      {
        editButton: false,
        type: "control",
      },
    ],
  });
}

export function createJsGridForAttribute(element) {
  $(element.containerId).jsGrid({
    sorter: "number", // uses sorter for numbers
    align: "center", // right text alignment
    readOnly: false, // a boolean defines whether input is readonly (added in v1.4)
    width: "100%",
    height: "200px",
    align: "right",
    filtering: false,
    editing: false,
    sorting: false,
    data: element.myId,
    selecting: true,
    confirmDeleting: false,

    deleteButton: false, // show delete button

    rowClick: function (args) {
      if (element.canToogle(args.item.Id)) {
        var $row = this.rowByItem(args.item);
        $row.toggleClass("highlight");
        element.toogleSelection(args.item.Id);
      }
    },
    onItemDeleted: function (args) {
      element.clearById(args.item.Id);
      element.myId.forEach((id) => {
        if (element.idArray.includes(id.Id)) {
          let $row = this.rowByItem(id);
          if (!$row.hasClass("highlight")) $row.toggleClass("highlight");
        }
      });
      selectAttribute(element);
    },
    onItemInserted: function (args) {
      element.myId.forEach((id) => {
        if (element.idArray.includes(id.Id)) {
          let $row = this.rowByItem(id);
          if (!$row.hasClass("highlight")) $row.toggleClass("highlight");
        }
      });
      selectAttribute(element);
    },
    onRefreshed: function (args) {
      element.myId.forEach((id) => {
        if (element.idArray.includes(id.Id)) {
          let $row = this.rowByItem(id);
          if (!$row.hasClass("highlight")) $row.toggleClass("highlight");
        }
      });
      selectAttribute(element);
    },
    fields: [
      {
        name: "Id",
        align: "center",
        type: "number",
      },
      {
        editButton: false,
        type: "control",
      },
    ],
  });
}
