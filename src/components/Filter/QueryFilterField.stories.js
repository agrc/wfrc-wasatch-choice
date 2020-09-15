import React from "react";
import { QueryFilterField } from "./QueryFilter";
import { MapWidgetContext } from '../MapWidget/MapWidget';

export default {
  title: "QueryFilterField",
  component: QueryFilterField,
};

const fields = [
  {
    label: "Funding Program",
    openOnLoad: true,
    fieldName: "MSTR_PIN",
    fieldType: "text",
    checkboxes: [
      {
        label: "CMAQ",
        values: ["WFRC OGDEN/LAYTON CMAQ", "WFRC SALT LAKE/ WEST VALLEY CMAQ"],
        color: "rgb(255, 128, 0)",
      },
      {
        label: "STP",
        values: ["WFRC OGDEN/LAYTON STP", "WFRC SALT LAKE/ WEST VALLEY STP"],
        color: "rgb(20, 178, 179)",
      },
      {
        label: "TAP",
        values: ["WFRC OGDEN/LAYTON TAP", "WFRC SALT LAKE/ WEST VALLEY TAP"],
        color: "rgb(56, 168, 0)",
      },
      {
        label: "Other",
        other: true,
        color: "rgb(255, 100, 155)",
      },
    ],
  },
  {
    label: "Year",
    openOnLoad: false,
    fieldName: "FORECAST",
    fieldType: "number",
    checkboxes: [
      {
        label: "Before 2020",
        other: true,
      },
      {
        label: "2020",
        values: ["2020"],
      },
      {
        label: "2021",
        values: ["2021"],
      },
      {
        label: "2022",
        values: ["2022"],
      },
      {
        label: "2023",
        values: ["2023"],
      },
      {
        label: "2024",
        values: ["2024"],
      },
      {
        label: "2025",
        values: ["2025"],
      },
      {
        label: "2026",
        values: ["2026"],
      },
    ],
  },
];

export const Default = () => (
  <div>
    <MapWidgetContext.Provider value={{ updateScrollbar: () => {} }}>
      <div className="query-filter">
        <QueryFilterField onChange={() => {}} {...fields[0]}></QueryFilterField>
        <QueryFilterField onChange={() => {}} {...fields[1]}></QueryFilterField>
      </div>
    </MapWidgetContext.Provider>
  </div>
);
