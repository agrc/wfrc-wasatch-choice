import React from "react";
import MapWidget from "./MapWidget";
import { faHandPointer, faList } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "MapWidget",
  component: MapWidget,
};

export const Filter = () => (
  <MapWidget name="Filter" defaultOpen={true} showReset={true} icon={faList}>
    child widget content
  </MapWidget>
);

export const ProjectInformation = () => (
  <MapWidget name="Project Information" defaultOpen={true} icon={faHandPointer}>
    child widget content
  </MapWidget>
);
