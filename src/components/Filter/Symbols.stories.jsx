import React from "react";
import { Classes } from "./Symbols";

export default {
  title: "Symbols",
  component: Classes,
};

const layersLookup = {
  layerOne: {
    renderer: {
      uniqueValueInfos: [
        {
          label: "Metropolitan Center",
          symbol: {
            color: {
              a: 1,
              b: 33,
              g: 100,
              r: 235,
            },
          },
        },
        {
          label: "Urban Center",
          symbol: {
            color: {
              a: 1,
              b: 46,
              g: 144,
              r: 230,
            },
          },
        },
        {
          label: "City Center",
          symbol: {
            color: {
              a: 1,
              b: 38,
              g: 183,
              r: 255,
            },
          },
        },
        {
          label: "Neighborhood Center",
          symbol: {
            color: {
              a: 1,
              b: 153,
              g: 219,
              r: 255,
            },
          },
        },
      ],
    },
  },
  layerTwo: {},
  employment: {
    renderer: {
      type: "class-breaks",
      valueExpressionTitle: "Jobs Per Developable Acre",
      classBreakInfos: [
        {
          label: "label one",
          symbol: {
            color: {
              a: 1,
              b: 97,
              g: 48,
              r: 5,
            },
          },
        },
        {
          label: "label two",
          symbol: {
            color: {
              a: 1,
              b: 172,
              g: 102,
              r: 33,
            },
          },
        },
        {
          label: "label three",
          symbol: {
            color: {
              a: 1,
              b: 195,
              g: 147,
              r: 67,
            },
          },
        },
        {
          label: "label four",
          symbol: {
            color: {
              a: 1,
              b: 222,
              g: 197,
              r: 146,
            },
          },
        },
        {
          label: "> 1.3 to 2",
          symbol: {
            color: {
              a: 1,
              b: 240,
              g: 229,
              r: 209,
            },
          },
        },
        {
          label: "> 2 to 3.4",
          symbol: {
            color: {
              a: 1,
              b: 199,
              g: 219,
              r: 253,
            },
          },
        },
        {
          label: "> 3.4 To 5",
          symbol: {
            color: {
              a: 1,
              b: 130,
              g: 165,
              r: 244,
            },
          },
        },
        {
          label: "> 5.7 To 10",
          symbol: {
            color: {
              a: 1,
              b: 77,
              g: 96,
              r: 214,
            },
          },
        },
        {
          label: "> 10 To 17.2",
          symbol: {
            color: {
              a: 1,
              b: 43,
              g: 24,
              r: 178,
            },
          },
        },
        {
          label: "> 17.2 To 252.3",
          symbol: {
            color: {
              a: 1,
              b: 31,
              g: 0,
              r: 103,
            },
          },
        },
      ],
    },
  },
};

export const ClassesUniqueValues = () => (
  <Classes layersLookup={layersLookup} layerNames={["layerOne"]} />
);
export const ClassesBreaks = () => (
  <Classes layersLookup={layersLookup} layerNames={["employment"]} />
);
