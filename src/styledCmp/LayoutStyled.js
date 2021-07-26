import { makeStyles } from "@material-ui/core";

export const useLayoutStyles = makeStyles({
    layout:{
        height:'100%',
        display:'grid',
        gridAutoRows:'65px 90%',
        gap:'20px 0',
    },
    main:{
        display:'grid',
        gridTemplateRows:'2fr 10fr',
        gap:'20px 0',
        padding:'0 24px'
    }
})