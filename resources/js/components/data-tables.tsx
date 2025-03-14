import { Link, router } from '@inertiajs/react';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import { Eye, PenIcon, TrashIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import Button from './ui/button';

type DataTableProps = {
    columns: any[];
    data: any[];
    routeShow?: (id: string) => string;
    routeEdit?: (id: string) => string;
    routeDelete?: (id: string) => string;
};

export default function DataTables({ columns, data, routeShow, routeEdit, routeDelete }: DataTableProps) {
    DataTable.use(DT);

    const handleDeleteOnClick = (id: string) => {
        Swal.fire({
            title: 'Hapus data?',
            text: 'Data yang dihapus tidak dapat dikembalikan',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            confirmButtonColor: 'red',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed && routeDelete) {
                router.delete(routeDelete(id), {
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Data berhasil dihapus',
                            icon: 'success',
                            timer: 1500,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <div className="bg-white">
            <DataTable
                columns={columns.map((col) => ({ title: col.title }))}
                data={data.map((row) => columns.map((col) => row[col.data]))}
                slots={{
                    [columns.length]: (data: any, row: any) => {
                        const rowId = row[0];

                        return (
                            <div className="flex items-center space-x-1">
                                {routeShow && (
                                    <Link href={routeShow(rowId)}>
                                        <Button variant="primary" size="small">
                                            <Eye size="16px" />
                                        </Button>
                                    </Link>
                                )}
                                {routeEdit && (
                                    <Link href={routeEdit(rowId)}>
                                        <Button variant="warning" size="small">
                                            <PenIcon size="16px" />
                                        </Button>
                                    </Link>
                                )}
                                {routeDelete && (
                                    // <Link method="delete" href={routeDelete(rowId)} as="button">
                                    <Button variant="danger" size="small" onClick={() => handleDeleteOnClick(rowId)}>
                                        <TrashIcon size="16px" />
                                    </Button>
                                    // </Link>
                                )}
                            </div>
                        );
                    },
                }}
                className="text-base"
            >
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.title}</th>
                        ))}
                        <th>Aksi</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
}
