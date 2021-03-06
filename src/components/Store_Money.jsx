import React, { useEffect, useState } from 'react';
import paymentAPI from '../api/paymentAPI';
import { Table, ButtonToggle, Card, CardTitle, CardBody, Spinner } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import numberWithCommas from '../utils/numberWithCommas';

// notification
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

// confirm alert
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// React bootstrap table
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, dateFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const EditButton = (props) => {

    const token = useSelector(state => state.staff.token);

    const StaffId = useSelector(state => state.staff.staff.StaffId);

    const history = useHistory();

    const handleCheck = props.handleCheck;

    const Status = props.row.Status;

    const DeliveryId = props.row.DeliveryId;

    const configNotify = {
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    }

    const hanlePayment = () => {
        const item = {
            DeliveryId: DeliveryId,
            StaffId: StaffId
        }
        const fetchPay = async () => {
            var result = {};
            try {
                result = await paymentAPI.payCODByDelivery(item, token);
            } catch (error) {
                console.log("Failed to fetch update store status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Thanh to??n th??nh c??ng!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/store/money');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Thanh to??n th???t b???i, vui l??ng th??? l???i sau!`,
                    type: "warning",
                    ...configNotify
                });
                // handleCheck();
                // history.push('/store/money');
            }
        }
        confirmAlert({
            title: 'Thanh to??n ti???n thu h???',
            message: 'B???n c?? ch???c ch???c mu???n thanh to??n ti???n thu h??? cho ????n h??ng n??y kh??ng?',
            buttons: [
                {
                    label: 'C??',
                    onClick: () => fetchPay()
                },
                {
                    label: 'Kh??ng',
                    onClick: () => {
                        history.push('/store/money');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    return (
        <div>
            {Status.trim() === 'Ch??a thanh to??n' ?
                <td>
                    <ButtonToggle color="success" onClick={hanlePayment}>Thanh to??n</ButtonToggle>{' '}
                </td>
                :
                <td>
                </td>
            }

        </div>
    );
};

const StoreMoneyTable = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const token = useSelector(state => state.staff.token);

    const StaffId = useSelector(state => state.staff.staff.StaffId);

    const [deliveries, setDeliveries] = useState([]);

    const [total, setTotal] = useState(0);

    const [totalPay, setTotalPay] = useState(0);

    const [check, setCheck] = useState(false);

    const [loading, setLoading] = useState(false);

    const fetchDeliveries = async () => {
        var deliveries = [];
        try {
            deliveries = await paymentAPI.getAllCODStore(token);
            var tempTotalPay = 0;
            var tempTotal = 0;
            deliveries.forEach(deliver => {
                if (deliver.Status === '???? thanh to??n') {
                    tempTotalPay += parseInt(deliver.COD);
                    tempTotal += parseInt(deliver.COD);
                } else {
                    tempTotal += parseInt(deliver.COD);
                }
            })
            setTotalPay(tempTotalPay);
            setTotal(tempTotal);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setDeliveries(deliveries);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        fetchDeliveries();
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchDeliveries();
        // setLoading(false);
    }, [check]);

    const handleCheck = () => {
        setCheck(!check);
    }

    const cellButton = (cell, row, rowIndex) => (
        <EditButton cell={cell} row={row} rowIndex={rowIndex} handleCheck={handleCheck} />
    );

    const configNotify = {
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScreen: true
        }
    }

    const handlePay = () => {
        const fetchPay = async () => {
            const item = {
                Deliveries: deliveries,
                StaffId: StaffId
            }
            var result = {};
            try {
                result = await paymentAPI.payCOD(item, token);
            } catch (error) {
                console.log("Failed to fetch pay COD: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Thanh to??n ti???n thu h??? th??nh c??ng!`,
                    type: "success",
                    ...configNotify
                });
                fetchDeliveries();
                history.push('/store/money');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Thanh to??n ti???n thu h??? th???t b???i, vui l??ng th??? l???i sau!`,
                    type: "warning",
                    ...configNotify
                });
                fetchDeliveries();
                history.push('/store/money');
            }
        }
        confirmAlert({
            title: 'Thanh To??n Ti???n Thu H???',
            message: 'B???n c?? ch???c ch???c mu???n thanh to??n ti???n thu h??? cho to??n b??? ????n h??ng n??y kh??ng?',
            buttons: [
                {
                    label: 'C??',
                    onClick: () => fetchPay()
                },
                {
                    label: 'Kh??ng',
                    onClick: () => {
                        history.push('/store/money');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    const selectOptions = {
        ['???? thanh to??n']: '???? thanh to??n',
        ['Ch??a thanh to??n']: 'Ch??a thanh to??n'
    };

    const selectTypeOptions = {
        ['Giao h??ng nhanh']: 'Giao h??ng nhanh',
        ['Giao h??ng ti??u chu???n']: 'Giao h??ng ti??u chu???n'
    };

    const columns = [
        {
            dataField: 'DeliveryId',
            text: 'M?? v???n ????n',
            sort: true,
            filter: textFilter({ placeholder: 'M?? v???n ????n...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'StoreId',
            text: 'M?? c???a h??ng',
            sort: true,
            filter: textFilter({ placeholder: 'M?? c???a h??ng...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'OrderDate',
            text: 'Ng??y ?????t h??ng',
            headerStyle: { width: '110px' },
            sort: true,
            formatter: cell => cell.split('T')[0],
            filter: dateFilter()
        },
        {
            dataField: 'COD',
            text: 'Thu h??? COD',
            sort: true,
            filter: textFilter({ placeholder: 'Thu h??? COD...', }),
            formatter: cell => numberWithCommas(cell),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'FeeShip',
            text: 'Ph?? giao h??ng',
            sort: true,
            filter: textFilter({ placeholder: 'Ph?? giao h??ng...', }),
            formatter: cell => numberWithCommas(cell),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'ShipType',
            text: 'Lo???i giao h??ng',
            sort: true,
            headerStyle: { width: '110px' },
            formatter: cell => selectTypeOptions[cell],
            filter: selectFilter({
                options: selectTypeOptions
            })
        },
        {
            dataField: 'Status',
            text: 'Tr???ng th??i',
            sort: true,
            headerStyle: { width: '110px' },
            formatter: cell => selectOptions[cell],
            filter: selectFilter({
                options: selectOptions
            })
        },
        {
            text: "Thao T??c",
            formatter: cellButton,
            sort: true,
            headerStyle: {
                width: '120px',
            },
        }
    ];

    const PageOptions = {
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: '15', value: 15
        }, {
            text: 'All', value: deliveries.length
        }]
    };

    const expandRow = {
        onlyOneExpanding: true,
        renderer: (row, rowIndex) => {
            const delivery = deliveries.find(delivery => delivery.DeliveryId === row.DeliveryId);
            return (
                <Card>
                    <CardTitle tag="h5">Chi ti???t c???a h??ng</CardTitle>
                    <CardBody>
                        <Table striped hover bordered responsive>
                            <tbody>
                                <tr>
                                    <th>T??n c???a h??ng</th>
                                    <th>S??? t??i kho???n</th>
                                    <th>Ch??? t??i kho???n</th>
                                    <th>T??n ng??n h??ng</th>
                                    <th>T??n chi nh??nh</th>
                                </tr>
                                <tr>
                                    <td>{delivery.StoreName}</td>
                                    <td>{delivery.AccountBank}</td>
                                    <td>{delivery.FullName}</td>
                                    <td>{delivery.BankName}</td>
                                    <td>{delivery.BankBranch}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            );
        },
    };

    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        };
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                <button className="btn btn-info" onClick={handleClick}>Xu???t File</button>
                <button className="btn btn-success" onClick={handlePay}>Thanh to??n to??n b???</button>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}>
                    <span>T???ng c???ng: {numberWithCommas(total)} ??</span>
                    <span>???? thanh to??n: {numberWithCommas(totalPay)} ??</span>
                    <span>C??n l???i: {numberWithCommas(total - totalPay)} ??</span>
                </div>
            </div>
        );
    };


    return (
        <div >
            <div className="row">
                <div className="col-sm-12 title">
                    Danh S??ch ????n H??ng ???? Giao
                </div>
            </div>
            {loading === true ?
                <div className="loading">
                    <Spinner
                        color="success"
                        children=""
                    >
                    </Spinner>
                    <Spinner
                        color="danger"
                        children=""
                    >
                    </Spinner>
                    <Spinner
                        color="warning"
                        children=""
                    >
                    </Spinner>
                </div> :
                <div></div>}
            <ToolkitProvider
                keyField="DeliveryId"
                data={deliveries}
                columns={columns}
                exportCSV={{
                    fileName: 'deliveries.csv',
                    blobType: 'text/csv;charset=UTF-8'
                }}
            >
                {
                    props => (
                        <div>
                            <BootstrapTable
                                keyField='DeliveryId'
                                data={deliveries}
                                columns={columns}
                                tabIndexCell
                                striped
                                hover
                                condensed
                                pagination={paginationFactory(PageOptions)}
                                filter={filterFactory()}
                                filterPosition="top"
                                expandRow={expandRow}
                                {...props.baseProps} />
                            <hr />
                            <MyExportCSV {...props.csvProps}>Xu???t File Excel!!</MyExportCSV>
                            <hr />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default StoreMoneyTable;