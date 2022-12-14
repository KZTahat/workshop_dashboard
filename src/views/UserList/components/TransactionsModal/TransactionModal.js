import { PropTypes } from 'prop-types';
import {
    Typography,
    Modal,
    Box,
    Table,
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
                <Box sx={style} style={{ maxHeight: '600px', overflow: 'scroll' }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Customer Transactions ({transactions.length})
                    </Typography>
                    {transactions.length ?
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
                        :
                        <Typography align='center' mt='4%'>No Transactions For This Customer</Typography>}
                </Box>
            </Modal>
    )
}

TransactionsModal.propTypes = {
    className: PropTypes.string,
    product: PropTypes.object.isRequired
};

export default TransactionsModal;