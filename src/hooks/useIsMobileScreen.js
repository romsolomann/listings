import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function useIsMobileScreen(size  = "sm") {
	const theme = useTheme();
	return useMediaQuery(theme.breakpoints.down(size));
}
