import React, { useEffect, useState } from 'react';
import deliveryAPI from '../api/deliveryAPI';
import { Table, Card, CardTitle, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import numberWithCommas from '../utils/numberWithCommas';

// React bootstrap table
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const DeliveryTable = () => {

    const token = useSelector(state => state.staff.token);

    const [deliveries, setDeliveries] = useState([]);

    const fetchdeliveries = async () => {
        var deliveries = [];
        try {
            deliveries = await deliveryAPI.getAll(token);
            // console.log(stores);
        } catch (error) {
            console.log("Failed to fetch options: ", error);
        }
        setDeliveries(deliveries);
    }

    useEffect(() => {
        fetchdeliveries();
    }, []);

    const selectOptions = {
        Ordered: 'Chờ Lấy Hàng',
        Delivering: 'Đang giao hàng',
        Delivered: 'Đã giao hàng',
        Canceled: 'Đã hủy',
    };

    const columns = [
        {
            dataField: 'DeliveryId',
            text: 'Mã vận đơn',
            sort: true,
            filter: textFilter({ placeholder: 'Mã vận đơn...', }),
            style: {
                fontWeight: 'bold',
            },
            headerStyle: {
                width: '80px',
            }
        },
        {
            dataField: 'StoreId',
            text: 'Mã cửa hàng',
            sort: true,
            filter: textFilter({ placeholder: 'Mã cửa hàng...', }),
            headerStyle: {
                width: '80px',
            }
        },
        {
            dataField: 'RecieverName',
            text: 'Tên người nhận',
            sort: true,
            filter: textFilter({ placeholder: 'Tên người nhận...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'RecieverPhone',
            text: 'SĐT người nhận',
            sort: true,
            filter: textFilter({ placeholder: 'SĐT người nhận...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'AddressDetail',
            text: 'Địa chỉ',
            sort: true,
            filter: textFilter({ placeholder: 'Địa chỉ...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'WardName',
            text: 'Phường/Xã',
            sort: true,
            filter: textFilter({ placeholder: 'Phường/Xã...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'DistrictName',
            text: 'Quận/Huyện',
            sort: true,
            filter: textFilter({ placeholder: 'Quận/Huyện...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'ProvinceName',
            text: 'Tỉnh, TP',
            sort: true,
            filter: textFilter({ placeholder: 'Tỉnh, TP...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'COD',
            text: 'Thu hộ',
            sort: true,
            formatter: cell => numberWithCommas(cell),
            filter: numberFilter({ placeholder: 'Nhập tổng tiền ...', }),
            headerStyle: {
                width: '120px',
            }
        },
        {
            dataField: 'ShipType',
            text: 'Loại giao hàng',
            sort: true,
            filter: textFilter({ placeholder: 'Loại giao hàng...', }),
            headerStyle: {
                width: '108px',
            }
        },
        {
            dataField: 'OrderDate',
            text: 'Ngày đặt hàng',
            headerStyle: { width: '110px' },
            sort: true,
            formatter: cell => cell.split('T')[0],
            filter: dateFilter()
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
                    <CardTitle tag="h5">Chi tiết vận đơn</CardTitle>
                    <CardBody>
                        <Table striped hover bordered responsive>
                            <tbody>
                                <tr>
                                    <th>Tên mặt hàng</th>
                                    <th>Kích thước</th>
                                    <th>Cân nặng</th>
                                    <th>Loại hàng</th>
                                </tr>
                                <tr>
                                    <td>{delivery.GoodName}</td>
                                    <td>{delivery.GoodSize}</td>
                                    <td>{delivery.GoodWeight}</td>
                                    <td>{delivery.GoodType}</td>
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
                    Danh Sách Vận Đơn
                </div>
            </div>
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
                            <MyExportCSV {...props.csvProps}>Xuất File Excel!!</MyExportCSV>
                            <hr />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default DeliveryTable;