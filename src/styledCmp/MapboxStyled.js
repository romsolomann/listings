import { makeStyles } from "@material-ui/styles";

export const useMapStyles = makeStyles({
   
    clusterMarker :{
        
        borderRadius: "50%",
        backgroundColor: "var(--main-prop-color)",
        color: "white",
     
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    marker :{
        borderRadius: "50%",
        backgroundColor: "var(--main-prop-color)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    }
});