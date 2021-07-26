import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import React from "react";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const RTL: React.FC = ({ children }) => {
	return <StylesProvider jss={jss}>{children}</StylesProvider>;
};
