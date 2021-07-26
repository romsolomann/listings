import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

export function useIsMobileScreen(size: Breakpoint | number = "sm"): boolean {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down(size));
}
