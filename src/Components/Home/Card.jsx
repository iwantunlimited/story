import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {services} from "../../Api_Services/environment";
import {Typography} from "@material-ui/core";



export default function CardComponent(props) {
    const {name , createdOn , mimeType ,propsStyle, id} = props
    const imageStyle ={
        height:'100px',
        width:'100%',
        objectFit:'contain'
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
            <img
                src={services.HOST+'/services/media-service/iwantcdn/resources/'+ id +'?actionCode=ACTION_GET_RESOURCE'}
                alt=""
                style={propsStyle ? propsStyle : imageStyle}
            />
            <CardContent>
                <Typography noWrap variant={'body1'}><b>{name}</b></Typography>
                <Typography noWrap variant={'caption'} component={'div'}>{mimeType}</Typography>
                <Typography noWrap variant={'caption'}  component={'div'}>{new Date(createdOn).toString()}</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}