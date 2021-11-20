import React, { useEffect, useState } from 'react';
import shipperAPI from '../api/shipperAPI';
import { Table, ButtonToggle,  Card, CardTitle, CardBody } from 'reactstrap';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

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

    const StaffId = props.row.StaffId;

    const handleCheck = props.handleCheck;

    const Status = props.row.Status;

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
            StaffId: StaffId,
            newStatus: 'On',
        }
        const fetchUpdateShipper = async () => {
            var result = {};
            try {
                result = await shipperAPI.updateStatus(item, token);
            } catch (error) {
                console.log("Failed to update shipper status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Kích hoạt Shipper thành công!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/shipper');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Kích hoạt Shipper thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/shipper');
            }
        }
        confirmAlert({
            title: 'Kích Hoạt Shipper',
            message: 'Bạn có chắc chắc muốn kích hoạt Shipper này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => fetchUpdateShipper()
                },
                {
                    label: 'Không',
                    onClick: () => {
                        history.push('/shipper');
                    }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    const hanleLock = () => {
        const Item = {
            StaffId: StaffId,
            newStatus: 'Off',
        }
        const fetchUpdateShipper = async () => {
            var result = {};
            try {
                result = await shipperAPI.updateStatus(Item, token);
            } catch (error) {
                console.log("Failed to update shipper status: ", error);
            }
            if (result.successful == true) {
                store.addNotification({
                    title: "Wonderfull!",
                    message: `Khóa Shipper thành công!`,
                    type: "success",
                    ...configNotify
                });
                handleCheck();
                history.push('/shipper');
            } else {
                store.addNotification({
                    title: "Error!",
                    message: `Khóa Shipper thất bại, vui lòng thử lại sau!`,
                    type: "warning",
                    ...configNotify
                });
                handleCheck();
                history.push('/shipper');
            }
        }
        confirmAlert({
            title: 'Khóa Shipper',
            message: 'Bạn có chắc chắc muốn khóa Shipper này không?',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => fetchUpdateShipper()
                },
                {
                    label: 'Không',
                    onClick: () => {
                        history.push('/shipper');
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

const ShipperTable = () => {

    const token = useSelector(state => state.staff.token);

    const [check, setCheck] = useState(false);

    const [shippers, setShippers] = useState([]);

    const fetchShippers = async () => {
        var shippers = [];
        try {
            shippers = await shipperAPI.getAll(token);
            // console.log(stores);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setShippers(shippers);
    }

    useEffect(() => {
        fetchShippers();
    }, []);

    useEffect(() => {
        fetchShippers();
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
            dataField: 'StaffId',
            text: 'Mã nhân viên',
            sort: true,
            filter: textFilter({ placeholder: 'Mã nhân viên...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '120px',
            }
        }, 
        {
            dataField: 'FullName',
            text: 'Tên nhân viên',
            sort: true,
            filter: textFilter({ placeholder: 'Tên nhân viên...', }),
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
            dataField: 'Address',
            text: 'Địa chỉ',
            sort: true,
            filter: textFilter({ placeholder: 'Địa chỉ...', }),
            headerStyle: {
                width: '120px',
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
                width: '60px',
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
            text: 'All', value: shippers.length
        }]
    };

    const expandRow = {
        onlyOneExpanding: true,
        renderer: (row, rowIndex) => {
            const shipper = shippers.find(shipper => shipper.StaffId === row.StaffId);
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
                                    <td>{shipper.AccountBank}</td>
                                    <td>{shipper.Fullname}</td>
                                    <td>{shipper.BankName}</td>
                                    <td>{shipper.BankBranch}</td>
                                    <td>{shipper.IdentityId}</td>
                                    <td>{shipper.GetDate.slice(0, 10)}</td>
                                    <td>{shipper.BirthDay.slice(0, 10)}</td>
                                    <td>{shipper.Sex}</td>
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
                <div className="col-sm-12 btn btn-info">
                    Danh Sách cửa hàng
                </div>
            </div>
            <ToolkitProvider
                keyField="StaffId"
                data={shippers}
                columns={columns}
                exportCSV={{
                    fileName: 'shippers.csv',
                    blobType: 'text/csv;charset=UTF-8'
                }}
            >
                {
                    props => (
                        <div>
                            <BootstrapTable
                                keyField='StaffId'
                                data={shippers}
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

export default ShipperTable;