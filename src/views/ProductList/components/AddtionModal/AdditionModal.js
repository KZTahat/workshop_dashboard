import { PropTypes } from 'prop-types';
import {
    Typography,
    Modal,
    Box,
    Button,
} from '@mui/material';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
    },
}))

const AdditionModal = (props) => {

    const classes = useStyles();
    return (
        <Modal
            open={props.showModal}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add A Product
                </Typography>
                <form
                    onSubmit={props.handleAddition}>
                    <TextField
                        className={classes.textField}
                        label="Product Name"
                        name="productName"
                        type='text'
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textField}
                        label="image URL"
                        name="image"
                        type='text'
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textField}
                        label="Price"
                        name="price"
                        type='text'
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textField}
                        label="Description"
                        name="description"
                        type='text'
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textField}
                        label="In Stock"
                        name="inStock"
                        type='text'
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            className={classes.textField}
                            label="Category"
                            name="category"
                            variant="outlined"
                            defaultValue='antique'
                            required
                        >
                            <MenuItem value='antique'>antique</MenuItem>
                            <MenuItem value='furniture'>furniture</MenuItem>
                            <MenuItem value='electricity'>electricity</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type='submit' variant='contained' >Add</Button>
                </form>
            </Box>
        </Modal>
    )
}

AdditionModal.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default AdditionModal;