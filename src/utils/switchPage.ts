import * as React from 'react';

import Ativos from "../pages/Dashboard/sections/Ativos";
import Overview from "../pages/Dashboard/sections/Overview";

export default function switchPages(name: any): React.FC {
  switch (name) {
    case "Overview":
      return Overview;
      break;
    case "Ativos":
      return Ativos;
      break;
    case "Empresas":
      return Overview;
      break;

    default:
      return Overview;
      break;
  }
}
