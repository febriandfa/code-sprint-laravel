import { useState } from 'react';
import DataTable from 'react-data-table-component';

export default function DataTables({ columns, data, searchBy }: { columns: any[]; data: any[]; searchBy: string[] }) {
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;

        const filtered = data.filter((row) => {
            return searchBy.some((key) => {
                const cellValue = row[key]?.toString().toLowerCase() || '';
                return cellValue.includes(search.toLowerCase());
            });
        });

        setFilteredData(filtered);
    };

    return (
        <div>
            <div className="flex w-full justify-end">
                <input type="text" placeholder="Cari data..." onChange={handleSearch} className="mb-4 w-60 rounded-md border px-4 py-1" />
            </div>
            <DataTable columns={columns} data={filteredData} pagination paginationPerPage={10} />
        </div>
    );
}
