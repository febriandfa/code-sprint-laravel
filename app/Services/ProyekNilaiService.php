<?php

namespace App\Services;

use App\Repositories\ProyekNilaiRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProyekNilaiService
{
    /**
     * Create a new class instance.
     */

    protected $proyekNilaiRepository;

    public function __construct(ProyekNilaiRepository $proyekNilaiRepository)
    {
        $this->proyekNilaiRepository = $proyekNilaiRepository;
    }

    public function validateInput(array $data)
    {
        return Validator::make($data, [
            'nilais' => 'required|array',
            'nilais.*.user_id' => 'required|exists:users,id',
            'nilais.*.kelompok_id' => 'required|exists:kelompoks,id',
            'nilais.*.nilai_orientasi_masalah' => 'required|numeric|in:0,1,2,3,4,5',
            'nilais.*.nilai_kerja_sama' => 'required|numeric|in:0,1,2,3,4,5',
            'nilais.*.nilai_proses' => 'required|numeric|in:0,1,2,3,4,5',
            'nilais.*.nilai_waktu' => 'required|numeric|in:0,1,2,3,4,5',
            'nilais.*.nilai_hasil_proyek' => 'required|numeric|in:0,1,2,3,4,5',
            'nilais.*.evaluasi' => 'nullable|string',
            'nilais.*.nilai' => 'required|numeric',
        ]);
    }

    public function validateUpdate(array $data)
    {
        return Validator::make($data, [
            'nilai_orientasi_masalah' => 'required|numeric|in:0,1,2,3,4,5',
            'nilai_kerja_sama' => 'required|numeric|in:0,1,2,3,4,5',
            'nilai_proses' => 'required|numeric|in:0,1,2,3,4,5',
            'nilai_waktu' => 'required|numeric|in:0,1,2,3,4,5',
            'nilai_hasil_proyek' => 'required|numeric|in:0,1,2,3,4,5',
            'evaluasi' => 'nullable|string',
            'nilai' => 'required|numeric',
        ]);
    }

    public function create(Request $request, string $proyekId)
    {
        try {
            $validator = $this->validateInput($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            foreach ($validatedData['nilais'] as $nilai) {
                $nilai['proyek_id'] = $proyekId;
                $nilai['created_at'] = now();
                $nilai['updated_at'] = now();
                $this->proyekNilaiRepository->create($nilai);
            }

            return to_route('guru.proyek.syntaxSix', [$proyekId, $request->kelompok_id])->with('success', 'Nilai berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage())->withInput();
        }
    }

    public function update(Request $request, string $proyekId, string $id)
    {
        try {
            $validator = $this->validateUpdate($request->all());

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput();
            }
            $validatedData = $validator->validated();

            $this->proyekNilaiRepository->update($validatedData, $id);

            return to_route('guru.proyek.syntaxSix', [$proyekId, $request->kelompok_id])->with('success', 'Nilai berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage())->withInput();
        }
    }
}
