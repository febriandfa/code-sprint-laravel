export default function NoData() {
    return (
        <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 22rem)' }}>
            <div className="mt-16 flex flex-col items-center gap-2">
                <img src="/assets/images/no-data.png" alt="no-data" className="w-32" />
                <p className="text-center text-lg font-semibold">Oops! Sepertinya masih kosong</p>
                <p className="text-center text-sm text-slate-600">
                    Tidak ada data yang tersedia saat ini.
                    <br /> Coba periksa kembali nanti atau eksplorasi opsi lainnya.
                </p>
            </div>
        </div>
    );
}
