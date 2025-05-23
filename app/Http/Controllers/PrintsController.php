<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Prints;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PrintsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $prints = Prints::latest()->paginate(10);
        // dd($prints);
        $prints->each(function ($print) {
            if ($print->type !== 'link') {
                $print->path = Storage::url($print->path);
            }
        });
        return Inertia::render('dashboard/Prints', ['prints' => $prints]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }



    public function store(Request $request)
    {
        try {
            // Handle file size validation explicitly before other validations
            $maxFileSize = 3072; // 3MB in kilobytes

            if ($request->hasFile('file')) {
                $fileSize = $request->file('file')->getSize() / 1024; // Convert to KB
                if ($fileSize > $maxFileSize) {
                    return back()
                        ->withErrors(['file' => "The file must not be larger than {$maxFileSize}KB. Your file is " . round($fileSize) . "KB."])
                        ->withInput();
                }

                if (!$request->file('file')->isValid()) {
                    return back()
                        ->withErrors(['file' => 'The uploaded file is invalid or corrupted.'])
                        ->withInput();
                }
            }

            // Basic validation
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'size' => 'required|string|max:255',
                'range' => 'required|string|max:255',
                'amount' => 'required|integer',
                'type' => 'required|in:link,upload',
                'link' => 'nullable|url',
                'file' => 'nullable|image|max:' . $maxFileSize,
            ]);

            if ($validator->fails()) {
                return back()
                    ->withErrors($validator)
                    ->withInput();
            }

            $validated = $validator->validated();

            // Check for invalid combinations and add error to 'type' field
            $hasFile = $request->hasFile('file');
            $hasLink = $request->filled('link');

            if ($hasFile && $hasLink) {
                return back()
                    ->withErrors(['type' => 'You must choose either a link OR a file upload, not both.'])
                    ->withInput();
            }

            // Ensure required fields based on type
            if ($request->type === 'link' && !$hasLink) {
                return back()
                    ->withErrors(['link' => 'A URL is required when type is set to link.'])
                    ->withInput();
            }

            if ($request->type === 'upload' && !$hasFile) {
                return back()
                    ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
                    ->withInput();
            }

            // Start a database transaction
            DB::beginTransaction();

            try {
                // Store file or set link before creating record
                $uploadedFilePath = null;

                if ($request->type === 'upload') {
                    // Store the file
                    $uploadedFilePath = $request->file('file')->store('uploads/prints', 'public');
                    $validated['path'] = $uploadedFilePath;
                } else { // type is 'link'
                    $validated['path'] = $validated['link'];
                }

                // Remove unused fields
                unset($validated['file'], $validated['link']);

                // Create the record
                $image =   Prints::create($validated);

                // If we got here, everything worked - commit the transaction
                DB::commit();

                return redirect()->route('prints.index')->with('success', 'Image added successfully.');
            } catch (\Exception $e) {
                // Roll back the database transaction
                DB::rollBack();

                // Clean up any uploaded file if the database operation failed
                if ($uploadedFilePath && Storage::disk('public')->exists($uploadedFilePath)) {
                    Storage::disk('public')->delete($uploadedFilePath);
                }

                // Re-throw the exception to be caught by the outer try-catch
                throw $e;
            }
        } catch (\Exception $e) {
            // Return with a user-friendly error message
            return back()
                ->withErrors(['general' => 'An error occurred while saving the image: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }



    public function update(Request $request, string $id)
    {
        try {
            // First check if the record exists
            $image = Prints::findOrFail($id);

            // Handle file size validation explicitly before other validations
            $maxFileSize = 3072; // 3MB in kilobytes

            if ($request->hasFile('file')) {
                $fileSize = $request->file('file')->getSize() / 1024; // Convert to KB
                if ($fileSize > $maxFileSize) {
                    return back()
                        ->withErrors(['file' => "The file must not be larger than {$maxFileSize}KB. Your file is " . round($fileSize) . "KB."])
                        ->withInput();
                }

                if (!$request->file('file')->isValid()) {
                    return back()
                        ->withErrors(['file' => 'The uploaded file is invalid or corrupted.'])
                        ->withInput();
                }
            }

            // Basic validation
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'size' => 'required|string|max:255',
                'range' => 'required|string|max:255',
                'amount' => 'required|integer',
                'type' => 'required|in:link,upload',
                'link' => 'nullable|url',
                'file' => 'nullable|image|max:' . $maxFileSize,
            ]);

            if ($validator->fails()) {
                return back()
                    ->withErrors($validator)
                    ->withInput();
            }

            $validated = $validator->validated();

            // Check for invalid combinations
            $hasFile = $request->hasFile('file');
            $hasLink = $request->filled('link');

            if ($hasFile && $hasLink) {
                return back()
                    ->withErrors(['type' => 'You must choose either a link OR a file upload, not both.'])
                    ->withInput();
            }

            // Ensure required fields based on type
            if ($request->type === 'link' && !$hasLink) {
                return back()
                    ->withErrors(['link' => 'A URL is required when type is set to link.'])
                    ->withInput();
            }

            // Only require file if this is a new upload or changing from link to upload
            if ($request->type === 'upload' && !$hasFile && $image->type !== 'upload') {
                return back()
                    ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
                    ->withInput();
            }

            // Start a database transaction
            DB::beginTransaction();

            try {
                $oldPath = $image->path;
                $oldType = $image->type;
                $uploadedFilePath = null;

                // Set path based on type
                if ($request->type === 'upload') {
                    if ($hasFile) {
                        // Store the new file
                        $uploadedFilePath = $request->file('file')->store('uploads/prints', 'public');
                        $validated['path'] = $uploadedFilePath;
                    } else {
                        // Keep existing path for updates without new file
                        $validated['path'] = $image->path;
                    }
                } else { // type is 'link'
                    $validated['path'] = $validated['link'];
                }

                // Remove unused fields
                unset($validated['file'], $validated['link']);

                // Update the record
                $image->update($validated);

                // If we got here, the database update was successful

                // Delete old file if needed and if we successfully updated the database
                if (
                    ($oldType === 'upload' && $request->type === 'link') ||
                    ($request->type === 'upload' && $hasFile && $oldPath !== $validated['path'])
                ) {
                    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                // Commit the transaction
                DB::commit();

                return to_route('prints.index')->with('success', 'Image updated successfully.');
            } catch (\Exception $e) {
                // If anything goes wrong, roll back the transaction
                DB::rollBack();

                // If we had uploaded a new file, try to clean it up
                if ($uploadedFilePath && Storage::disk('public')->exists($uploadedFilePath)) {
                    Storage::disk('public')->delete($uploadedFilePath);
                }

                throw $e;
            }
        } catch (\Exception $e) {
            return back()
                ->withErrors(['general' => 'An error occurred: ' . $e->getMessage()])
                ->withInput();
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $print = Prints::findOrFail($id);
        if ($print->type === 'upload') {
            Storage::disk('public')->delete($print->path);
        }
        $print->delete();
        return redirect()->route('prints.index');
    }
}
