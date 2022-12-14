import { PropTypes } from 'prop-types';
import {
    Typography,
    Modal,
    Box,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Divider,
} from '@mui/material';
import { useData } from '../../dataContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const imageStyle = {
    width: '100px',
    height: '100px'
}
const TransDetailsModal = (props) => {
    const data = useData();
    const { showModal, handleCloseModal } = props

    return (
        <Modal
            open={showModal}
            onClose={handleCloseModal}
        >
            <Box sx={style} style={{ maxHeight: '600px', overflow: 'scroll' }}>
                <Typography variant="h3" component="h2">
                    Transaction Details
                </Typography>
                <Divider />
                <Typography variant="h5" component="h4">
                    User Details
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Signup date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableRow>
                        <TableCell>Khaled Tahat</TableCell>
                        <TableCell>kztahta96@gmail.com</TableCell>
                        <TableCell>Irbid</TableCell>
                        <TableCell>0779927823</TableCell>
                        <TableCell>11/11/2022</TableCell>
                    </TableRow>
                </Table>
                <Divider />
                <Typography id="purchases" variant="h5" component="h4">
                    Purchases
                </Typography>
                <Table>
                    <TableHead>
                        <TableCell>image</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>how many</TableCell>
                    </TableHead>
                    {data.purchases.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell><img style={imageStyle} src={product.image} /></TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    ))}

                </Table>
            </Box>
        </Modal>
    )
}

TransDetailsModal.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default TransDetailsModal;


