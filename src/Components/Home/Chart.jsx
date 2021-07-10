import React from 'react';
import {Box, Divider, Grid, Paper, Typography} from "@material-ui/core";
import {analytics} from "../../Api_Services/services_payloads/service";
import {AndroidOutlined, Audiotrack, FolderOpen, Image, PictureAsPdf} from "@material-ui/icons";


function Chart(props) {
    const [chartData , setChartData] =React.useState([])
    const callAnalyticsApi = React.useCallback(()=>{
        const icons = [FolderOpen , Image , AndroidOutlined , PictureAsPdf , Audiotrack]
        analytics('999254').then(res => {
            console.log(res)
            if(res && res.length > 0){
                setChartData(()=>(res.map((ele, index) => {return {...ele, icons : icons[index]}})))
            }
        }).catch(err =>{
            console.log(err)
        })
    },[])

    React.useEffect(()=>{
        callAnalyticsApi()
    },[callAnalyticsApi])

    console.log(chartData)
    return (
       <Box>
           <Typography variant={'h6'}>
               Contents
           </Typography>
           <Divider/>
           <Box sx={{marginTop:'20px'}}>
               {
                   chartData.length > 0 ?
                       <Grid container spacing={2}>
                           {
                               chartData.map((data, index) =>(
                                   <Grid item xs={4} key={index}>
                                           <ChartComponent data={data} />
                                   </Grid>
                               ))
                           }
                       </Grid>
                       :
                       <Grid item xs={12}>
                           <Typography>NoData</Typography>
                       </Grid>
               }
           </Box>
       </Box>
    );
}

const ChartComponent = ({data }) => {
    return(
        <Grid container component={Paper} elevation={4} sx={{padding:1}}>
            <Grid item xs={4} sx={{display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                <data.icons color={'inherit'}/>
            </Grid>
            <Grid container item xs={8}>
                <Grid item xs={12} component={Typography}  noWrap color={'inherit'}>
                    {data.resourceType}
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={6} component={Typography}  noWrap color={'inherit'}>
                        Total Items
                    </Grid>
                    <Grid item xs={6} component={Typography}  noWrap color={'inherit'}>
                        {data.totalItems}
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={6} component={Typography}  noWrap color={'inherit'}>
                        Total Size
                    </Grid>
                    <Grid item xs={6} component={Typography}  noWrap color={'inherit'}>
                        {data.totalSize}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Chart;

