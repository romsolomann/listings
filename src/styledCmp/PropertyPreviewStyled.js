import { makeStyles } from "@material-ui/core";

export const usePropertyPreview = makeStyles({
    propertyPreview: {
      border:'1px solid lightgrey',
      boxShadow:'none',
      borderRadius:10,
      transition:"all .3s",
      "&:hover":{
        boxShadow: "0 0 10px -2px grey",
        cursor:"pointer"
      }
    },
    imgContent:{
      position:'relative',
    },
    price:{
      width:'100%',
      height:'40px',
      background:'rgba(0,0,0,0.3)',
      color:'white',
      position:'absolute',
      bottom:0
    },
    imgUrl: {
      height:140,
      padding: 0,
      objectFit:"cover"
    },
    actions:{
      marginTop:'5px',
    },
    btn:{
      color:"white",
      border:'2px solid white',
      display:'flex',
      padding:'5px 20px',
      fontSize:'0.9rem',
      textAlign:'center',
      transition:'all 0.25s ease-out 0s',
      fontWeight:'bold',
      marginLeft:'15px',
      whiteSpace:'nowrap',
      marginRight:'5px',
      borderRadius:'30px',
      justifyContent:'center',
      backgroundColor:'#001145',
      width:'100%',
      "&:hover":{
        color: "rgb(0, 73, 237)",
        border: "2px solid rgb(0, 73, 237)",
        backgroundColor:"#001145"
      }
    },
    redBanner:props=>({
      top: '31px',
      color: 'rgb(255, 255, 255)',
      left: '-41px',
      width: '189px',
      padding: '5px 0px',
      position: 'absolute',
      zIndex:'1000',
      fontSize: '13px',
      transform: 'rotate(-45deg) translate3d(0px, 0px, 0px)',
      boxShadow: 'rgb(0 0 0 / 30%) 0px 0px 4px',
      textAlign: 'center',
      fontWeight: '600',
      letterSpacing: '0.6px',
      backgroundColor: 'var(--negative-red-color)',
      display:props.isFlipped ? 'none':'block'
    }),
    newOnShelf:{
      position:'absolute',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      color:'white',
      top:20,
      right:10,
      width:50,
      height:25,
      backgroundColor:'#18634b',
      zIndex:100,
      borderRadius:5
    },
    detailsBtn:{
      backgroundColor:'white',
      color:'#001145',
      border:'2px solid white',
      marginTop:'10px',
      "&:hover":{
        backgroundColor:'white'
      }
    },
    backTile:{
      backgroundColor:'#001145',
      height:310,
      color:'white',
      padding:'0 20px'
    }
  });