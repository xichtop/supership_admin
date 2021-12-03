import React, { useEffect, useState } from 'react';
import storeAPI from '../api/storeAPI';
import { Table, ButtonToggle, Card, CardTitle, CardBody } from 'reactstrap';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// confirm alert
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// React bootstrap table
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const EditButton = (props) => {

    const token = useSelector(state => state.staff.token);

    const history = useHistory();

    const handleCheck = props.handleCheck;

    const Status = props.row.Status;

    const StoreId = props.row.StoreId;

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

    const hanleActive = () => {
        const item = {
            StoreId: StoreId,
            newStatus: 'On',
        }
        const fetchUpdateStore = async () => {
            var result = {};
            try {
                result = await storeAPI.updateStatus(item, token);
            } catch (error) {
                console.log("Failed to fetch update store status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Kích hoạt cửa hàng thành công!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/store');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Kích hoạt cửa hàng thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/store');
            }
        }
        confirmAlert({
            title: 'Kích Hoạt Cửa Hàng',
            message: 'Bạn có chắc chắc muốn kích hoạt cửa hàng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => fetchUpdateStore()
                },
                {
                    label: 'Không',
                    onClick: () => {
                        history.push('/store');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    const hanleLock = () => {
        const item = {
            StoreId: StoreId,
            newStatus: 'Off',
        }
        const fetchUpdateStore = async () => {
            var result = {};
            try {
                result = await storeAPI.updateStatus(item, token);
            } catch (error) {
                console.log("Failed to fetch order list: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Ẩn cửa hàng thành công!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/store');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Ẩn cửa hàng thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/store');
            }
        }
        confirmAlert({
            title: 'Khóa Cửa Hàng',
            message: 'Bạn có chắc chắc muốn khóa cửa hàng này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => fetchUpdateStore()
                },
                {
                    label: 'Không',
                    onClick: () => {
                        history.push('/store');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });

    }
    return (
        <div>
            {Status.trim() === 'Off' ?
                <td>
                    <ButtonToggle color="info" onClick={hanleActive}>Kích Hoạt</ButtonToggle>{' '}
                </td>
                :
                <td>
                    <ButtonToggle color="danger" onClick={hanleLock}>Khóa</ButtonToggle>{' '}
                </td>
            }

        </div>
    );
};

const StoreTable = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const token = useSelector(state => state.staff.token);

    const [check, setCheck] = useState(false);

    const [stores, setStores] = useState([]);

    const fetchStores = async () => {
        var stores = [];
        try {
            stores = await storeAPI.getAll(token);
            // console.log(stores);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setStores(stores);
    }

    useEffect(() => {
        fetchStores();
    }, []);

    useEffect(() => {
        fetchStores();
    }, [check]);

    const handleCheck = () => {
        setCheck(!check);
    }

    const cellButton = (cell, row, rowIndex) => (
        <EditButton cell={cell} row={row} rowIndex={rowIndex} handleCheck={handleCheck} />
    );

    const selectOptions = {
        On: 'On',
        Off: 'Off',
        Vertified: 'Vertified',
        Unvertify: 'Unvertify',
    };

    const columns = [
        {
            dataField: 'StoreId',
            text: 'Mã cửa hàng',
            sort: true,
            filter: textFilter({ placeholder: 'Mã cửa hàng...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'StoreName',
            text: 'Tên cửa hàng',
            sort: true,
            filter: textFilter({ placeholder: 'Tên cửa hàng...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'Phone',
            text: 'Số điện thoại',
            sort: true,
            filter: textFilter({ placeholder: 'Số điện thoại...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'AddressDetail',
            text: 'Địa chỉ chỉ tiết',
            sort: true,
            filter: textFilter({ placeholder: 'Địa chỉ chỉ tiết...', }),
            headerStyle: {
                width: '140px',
            }
        },
        {
            dataField: 'WardName',
            text: 'Phường/Xã',
            sort: true,
            filter: textFilter({ placeholder: 'Phường/Xã...', }),
            headerStyle: {
                width: '140px',
            }
        },
        {
            dataField: 'DistrictName',
            text: 'Quận/Huyện',
            sort: true,
            filter: textFilter({ placeholder: 'Quận/Huyện...', }),
            headerStyle: {
                width: '140px',
            }
        },
        {
            dataField: 'ProvinceName',
            text: 'Tỉnh, TP',
            sort: true,
            filter: textFilter({ placeholder: 'Tỉnh, TP...', }),
            headerStyle: {
                width: '140px',
            }
        },
        {
            dataField: 'AccountBank',
            text: 'Số tài khoản',
            sort: true,
            filter: textFilter({ placeholder: 'Số tài khoản...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'IdentityId',
            text: 'Số CCCD',
            sort: true,
            filter: textFilter({ placeholder: 'Số CCCD...', }),
            headerStyle: {
                width: '100px',
            }
        },
        {
            dataField: 'Status',
            text: 'Trạng thái',
            sort: true,
            headerStyle: { width: '110px' },
            formatter: cell => selectOptions[cell],
            filter: selectFilter({
                options: selectOptions
            })
        },
        {
            text: "Thao Tác",
            formatter: cellButton,
            sort: true,
            headerStyle: {
                width: '82px',
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
            text: 'All', value: stores.length
        }]
    };

    const expandRow = {
        onlyOneExpanding: true,
        renderer: (row, rowIndex) => {
            const store = stores.find(store => store.StoreId === row.StoreId);
            return (
                <Card>
                    <CardTitle tag="h5">Chi tiết cửa hàng</CardTitle>
                    <CardBody>
                        <Table striped hover bordered responsive>
                            <tbody>
                                <tr>
                                    <th>Số tài khoản</th>
                                    <th>Tên tài khoản</th>
                                    <th>Tên ngân hàng</th>
                                    <th>Tên chi nhánh</th>
                                    <th>Số CCCD</th>
                                    <th>Ngày cấp</th>
                                    <th>Sinh nhật</th>
                                    <th>Giới tính</th>
                                </tr>
                                <tr>
                                    <td>{store.AccountBank}</td>
                                    <td>{store.Fullname}</td>
                                    <td>{store.BankName}</td>
                                    <td>{store.BankBranch}</td>
                                    <td>{store.IdentityId}</td>
                                    <td>{store.GetDate.slice(0, 10)}</td>
                                    <td>{store.BirthDay.slice(0, 10)}</td>
                                    <td>{store.Sex}</td>
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
                <button className="btn btn-info" onClick={handleClick}>Xuất File</button>
            </div>
        );
    };


    return (
        <div >
            <div className="row">
                <div className="col-sm-12 title">
                    Danh Sách Cửa Hàng
                </div>
            </div>
            <ToolkitProvider
                keyField="StoreId"
                data={stores}
                columns={columns}
                exportCSV={{
                    fileName: 'stores.csv',
                    blobType: 'text/csv;charset=UTF-8'
                }}
            >
                {
                    props => (
                        <div>
                            <BootstrapTable
                                keyField='StoreId'
                                data={stores}
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
                            <MyExportCSV {...props.csvProps}>Xuất File Excel!!</MyExportCSV>
                            <hr />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default StoreTable;