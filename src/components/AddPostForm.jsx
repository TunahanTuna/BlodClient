import React from 'react'
import { makeStyles } from '@material-ui/core';
import {
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
    title: yup.string().required(),
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),
    tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {

    const { register, hadleSubmit, control, errors, reset } = useForm({
        resolver: yupResolver(postSchema)
    });

    const classes = useStyles();
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Yeni Yazı Ekle</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Yeni yazı ekleyebilmek için formu doldurmanız gerekmektedir!
                </DialogContentText>
                <div className={classes.root}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="title"
                            label="Başlık"
                            name="title"
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            inputRef={register}
                            error={errors.title ? true : false}
                            fullWidth
                        />
                        <TextField
                            id="subtitle"
                            label="Alt Başlık"
                            name="subtitle"
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            inputRef={register}
                            error={errors.subtitle ? true : false}
                            fullWidth
                        />
                        <Controller
                            as={
                                <Select
                                    input={<Input />}
                                    className={classes.textField}
                                    fullWidth
                                >
                                    {
                                        tags.map((tag, index) => (
                                            <MenuItem key={index} value={tag} >
                                                {tag}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            }
                            name="tag"
                            control={control}
                            error = {errors.tag ? true : false}
                            defaultValue={tags[0]}
                        />
                        <TextField
                            id="content"
                            label="İçerik"
                            name="content"
                            multiline
                            rows={4}
                            variant="outlined"
                            className={classes.textField}
                            size="small"
                            inputRef={register}
                            error={errors.content ? true : false}
                            fullWidth
                        />
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" >Vazgeç</Button>
                <Button type="submit" variant="outlined" color="primary" >Yayınla</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPostForm
