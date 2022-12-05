import { PropTypes } from 'prop-types';
import {
    Typography,
    Modal,
    Box,
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

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

const TransactionsModal = (props) => {
    const { showModal, transactions, handleCloseModal } = props
    return (
        <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Customer Transactions ({transactions.length});
                </Typography>
                <Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Buyer Name</TableCell>
                                <TableCell>Phone #</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            {transactions.map((transaction) => {
                                return (
                                    <TableRow>
                                        <TableCell>{transaction.buyerName}</TableCell>
                                        <TableCell>{transaction.buyerPhoneNumber}</TableCell>
                                        <TableCell>{transaction.transactionDate}</TableCell>
                                        <TableCell>{transaction.status}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableHead>
                    </Table>
                </Typography>

            </Box>
        </Modal>
    )
}

TransactionsModal.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default TransactionsModal;