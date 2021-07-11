import React from 'react';
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Tooltip,
    IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withRouter} from "react-router";
import Context from "../../Api_Services/Context";
import {contents} from "../../Api_Services/services_payloads/service";
import CardComponent from "./Card";
import {breakpointColumnsObj} from "../../Api_Services/constant";
import Masonry from "react-masonry-css";
import AppsIcon from '@material-ui/icons/Apps';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import {experimentalStyled as styled} from "@material-ui/core";
import MuiTextField from '@material-ui/core/TextField'
const CustomTextField = styled(MuiTextField)({
    '& .MuiOutlinedInput-notchedOutline ':{
        borderRadius:'20px'
    }
})


function File(props) {
    const [viewType , setViewType] = React.useState('grid')
    const context = React.useContext(Context)
    const {contentApiPojo} = context
    const {id} = props.match.params;
    const [listFile , setListFile] = React.useState([])

    const folderApiCall = React.useCallback((data)=>{
        contents({...contentApiPojo, ...data}).then(
            res =>{
                if(res && res.content && res.content.length > 0){
                    setListFile(()=>(res.content))
                }
            }
        )
    },[contentApiPojo])

    React.useEffect(()=>{
        folderApiCall({"contentType": id})
    },[folderApiCall , id])

    const renderUi = () =>{
        switch(viewType){
            case 'grid':
                return(
                    <Grid container spacing={2}>
                        {
                            listFile && listFile.map((ele, index) => (
                                <Grid item xs={2}>
                                    <CardComponent {...ele} key={index}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                )
            case 'masonry':
                return (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        {
                            listFile && listFile.map((ele, index) => (
                                <CardComponent {...ele } propsStyle={{height:'100%' , width:'100%', objectFit:'contain'}} key={index}/>
                            ))
                        }
                    </Masonry>
                )
            default:
                break;
        }
    }

    return (
        <Accordion elevation={0}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h6'}>Files</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={8}>
                        <CustomTextField
                            fullWidth
                            sx={{
                                marginBottom:1,
                                padding:0
                            }}
                        />
                    </Grid>
                    <Grid item xs={2} container>
                        <Grid item xs={6}>
                            <IconButton onClick={()=>{
                                setViewType(()=>('grid'))
                            }}>
                                <Tooltip title={'Grid View'} placement={'bottom'}>
                                    <AppsIcon/>
                                </Tooltip>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton onClick={()=>{
                                setViewType(()=>('masonry'))
                            }}>
                                <Tooltip title={'Masonry View'} placement={'bottom'}>
                                    <ViewCompactIcon/>
                                </Tooltip>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                {renderUi()}
            </AccordionDetails>
        </Accordion>
    );
}

export default withRouter(File);