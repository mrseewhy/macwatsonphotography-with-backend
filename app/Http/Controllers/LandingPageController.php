<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Landing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class LandingPageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $LandingImages = Landing::latest()->paginate(10);
        $LandingImages->each(function ($image) {
            if ($image->type !== 'link') {
                $image->path = Storage::url($image->path);
            }
        });
        return Inertia::render('dashboard/Landing', ['LandingImages' => $LandingImages]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    //     $validated = $request->validate([
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'required_if:type,link|nullable|url',
    //         'file' => 'required_if:type,upload|nullable|image|max:3072',
    //         'path' => 'nullable'
    //     ]);


    //     $filePath = null;
    //     if ($request->type === 'upload' && $request->hasFile('file')) {
    //         $filePath = $request->file('file')->store('uploads/landing', 'public');
    //     }
    //     $validated['path'] = $filePath ?? $validated['link'] ?? null;
    //     unset($validated['file'], $validated['link']); // not needed in DB

    //     Landing::create($validated);

    //     return redirect()->route('landing.index');
    // }

    // public function store(Request $request)
    // {
    //     // Basic validation first
    //     $validated = $request->validate([
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'nullable|url',
    //         'file' => 'nullable|image|max:3072',
    //     ]);

    //     // Strong type-based validation with redirects
    //     if ($request->type === 'link') {
    //         if (!$request->filled('link')) {
    //             return back()
    //                 ->withErrors(['link' => 'A URL is required when type is set to link.'])
    //                 ->withInput();
    //         }

    //         if ($request->hasFile('file')) {
    //             return back()
    //                 ->withErrors(['file' => 'You cannot provide a file when type is set to link.'])
    //                 ->withInput();
    //         }

    //         $validated['path'] = $validated['link'];
    //     } elseif ($request->type === 'upload') {
    //         if (!$request->hasFile('file')) {
    //             return back()
    //                 ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
    //                 ->withInput();
    //         }

    //         if ($request->filled('link')) {
    //             return back()
    //                 ->withErrors(['link' => 'You cannot provide a link when type is set to upload.'])
    //                 ->withInput();
    //         }

    //         $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //     }

    //     // Remove unused fields
    //     unset($validated['file'], $validated['link']);

    //     Landing::create($validated);

    //     return redirect()->route('landing.index')->with('success', 'Image added successfully.');
    // }

    // public function store(Request $request)
    // {
    //     // Basic validation first
    //     $validated = $request->validate([
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'nullable|url',
    //         'file' => 'nullable|image|max:3072',
    //     ]);

    //     // Check for invalid combinations and add error to 'type' field
    //     $hasFile = $request->hasFile('file');
    //     $hasLink = $request->filled('link');

    //     if ($hasFile && $hasLink) {
    //         return back()
    //             ->withErrors(['type' => 'You must choose either a link OR a file upload, not both.'])
    //             ->withInput();
    //     }

    //     // Ensure required fields based on type
    //     if ($request->type === 'link' && !$hasLink) {
    //         return back()
    //             ->withErrors(['link' => 'A URL is required when type is set to link.'])
    //             ->withInput();
    //     }

    //     if ($request->type === 'upload' && !$hasFile) {
    //         return back()
    //             ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
    //             ->withInput();
    //     }

    //     // Set path based on type
    //     if ($request->type === 'upload') {
    //         $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //     } else { // type is 'link'
    //         $validated['path'] = $validated['link'];
    //     }

    //     // Remove unused fields
    //     unset($validated['file'], $validated['link']);

    //     Landing::create($validated);

    //     return redirect()->route('landing.index')->with('success', 'Image added successfully.');
    // // }
    // public function store(Request $request)
    // {
    //     try {
    //         // Basic validation first
    //         $validated = $request->validate([
    //             'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //             'size' => 'required|in:small,medium,large',
    //             'type' => 'required|in:link,upload',
    //             'link' => 'nullable|url',
    //             'file' => 'nullable|image|max:3072',
    //         ]);

    //         // Check for invalid combinations and add error to 'type' field
    //         $hasFile = $request->hasFile('file');
    //         $hasLink = $request->filled('link');

    //         if ($hasFile && $hasLink) {
    //             return back()
    //                 ->withErrors(['type' => 'You must choose either a link OR a file upload, not both.'])
    //                 ->withInput();
    //         }

    //         // Ensure required fields based on type
    //         if ($request->type === 'link' && !$hasLink) {
    //             return back()
    //                 ->withErrors(['link' => 'A URL is required when type is set to link.'])
    //                 ->withInput();
    //         }

    //         if ($request->type === 'upload' && !$hasFile) {
    //             return back()
    //                 ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
    //                 ->withInput();
    //         }

    //         // Start a database transaction
    //         DB::beginTransaction();

    //         try {
    //             // Store file or set link before creating record
    //             $uploadedFilePath = null;

    //             if ($request->type === 'upload') {
    //                 // Store the file
    //                 $uploadedFilePath = $request->file('file')->store('uploads/landing', 'public');
    //                 $validated['path'] = $uploadedFilePath;
    //             } else { // type is 'link'
    //                 $validated['path'] = $validated['link'];
    //             }

    //             // Remove unused fields
    //             unset($validated['file'], $validated['link']);

    //             // Create the record
    //             $landing = Landing::create($validated);

    //             // If we got here, everything worked - commit the transaction
    //             DB::commit();

    //             return redirect()->route('landing.index')->with('success', 'Image added successfully.');
    //         } catch (\Exception $e) {
    //             // Roll back the database transaction
    //             DB::rollBack();

    //             // Clean up any uploaded file if the database operation failed
    //             if ($uploadedFilePath && Storage::disk('public')->exists($uploadedFilePath)) {
    //                 Storage::disk('public')->delete($uploadedFilePath);
    //             }

    //             // Re-throw the exception to be caught by the outer try-catch
    //             throw $e;
    //         }
    //     } catch (\Exception $e) {
    //         // Log the error (optional)
    //         // Log::error('Error creating landing image: ' . $e->getMessage());

    //         // Return with a user-friendly error message
    //         return back()
    //             ->withErrors(['general' => 'An error occurred while saving the image: ' . $e->getMessage()])
    //             ->withInput();
    //     }
    // }

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
                'category' => 'required|in:stories,published,portraits,drone-shots,prints',
                'size' => 'required|in:small,medium,large',
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
                    $uploadedFilePath = $request->file('file')->store('uploads/landing', 'public');
                    $validated['path'] = $uploadedFilePath;
                } else { // type is 'link'
                    $validated['path'] = $validated['link'];
                }

                // Remove unused fields
                unset($validated['file'], $validated['link']);

                // Create the record
                $landing = Landing::create($validated);

                // If we got here, everything worked - commit the transaction
                DB::commit();

                return redirect()->route('landing.index')->with('success', 'Image added successfully.');
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

    /**
     * Update the specified resource in storage.
     */






    // public function update(Request $request, string $id)
    // {
    //     $image = Landing::findOrFail($id);

    //     $validated = $request->validate([
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'required_if:type,link|nullable|url',
    //         'file' => 'nullable|image|max:3072',
    //     ]);

    //     // Delete old file if new one is uploaded or type is changed
    //     if (
    //         $image->type !== $request->type ||
    //         ($request->type === 'upload' && $request->hasFile('file'))
    //     ) {
    //         if ($image->path && Storage::disk('public')->exists($image->path)) {
    //             Storage::disk('public')->delete($image->path);
    //         }
    //     }

    //     // Store new file or assign new link
    //     if ($request->type === 'link' && $request->hasFile('file')) {
    //         $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //     } else if ($request->type === 'upload' && $request->hasFile('file')) {
    //         $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //     } elseif ($request->type === 'link') {
    //         $validated['path'] = $validated['link'];
    //     } else {
    //         // Keep existing path if nothing changed
    //         $validated['path'] = $image->path;
    //     }

    //     // Remove unused fields
    //     unset($validated['file'], $validated['link']);

    //     $image->update($validated);

    //     return to_route('landing.index')->with('success', 'Image updated successfully.');
    // }

    // public function update(Request $request, string $id)
    // {
    //     $image = Landing::findOrFail($id);

    //     // Custom validator with mutual exclusivity logic
    //     $validator = Validator::make($request->all(), [
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'required_if:type,link|nullable|url',
    //         'file' => 'required_if:type,upload|nullable|image|max:3072',
    //     ]);

    //     // Prevent both link and file from being sent
    //     $validator->after(function ($validator) use ($request) {
    //         if ($request->hasFile('file') && $request->filled('link')) {
    //             $validator->errors()->add('file', 'You cannot provide both a file and a link.');
    //             $validator->errors()->add('link', 'You cannot provide both a link and a file.');
    //         }
    //     });

    //     $validated = $validator->validate();

    //     // Delete old file if:
    //     // - Type has changed, or
    //     // - A new file is being uploaded
    //     if (
    //         $image->type !== $request->type ||
    //         ($request->type === 'upload' && $request->hasFile('file'))
    //     ) {
    //         if ($image->path && Storage::disk('public')->exists($image->path)) {
    //             Storage::disk('public')->delete($image->path);
    //         }
    //     }

    //     // Handle new file or link
    //     if ($request->type === 'upload' && $request->hasFile('file')) {
    //         $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //     } elseif ($request->type === 'link') {
    //         $validated['path'] = $validated['link'];
    //     } else {
    //         // No new upload or link provided, keep existing path
    //         $validated['path'] = $image->path;
    //     }

    //     // Remove extra inputs before update
    //     unset($validated['file'], $validated['link']);

    //     $image->update($validated);

    //     return to_route('landing.index')->with('success', 'Image updated successfully.');
    // }

    // public function update(Request $request, string $id)
    // {
    //     $image = Landing::findOrFail($id);

    //     // Basic validation first
    //     $validated = $request->validate([
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'nullable|url',
    //         'file' => 'nullable|image|max:3072',
    //     ]);

    //     // Strong type-based validation with redirects
    //     if ($request->type === 'link') {
    //         if (!$request->filled('link')) {
    //             return back()
    //                 ->withErrors(['link' => 'A URL is required when type is set to link.'])
    //                 ->withInput();
    //         }

    //         if ($request->hasFile('file')) {
    //             return back()
    //                 ->withErrors(['file' => 'You cannot provide a file when type is set to link.'])
    //                 ->withInput();
    //         }
    //     } elseif ($request->type === 'upload') {
    //         if (!$request->hasFile('file')) {
    //             return back()
    //                 ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
    //                 ->withInput();
    //         }

    //         if ($request->filled('link')) {
    //             return back()
    //                 ->withErrors(['link' => 'You cannot provide a link when type is set to upload.'])
    //                 ->withInput();
    //         }
    //     }

    //     // Delete old file if new one is uploaded or type is changed
    //     if (
    //         $image->type !== $request->type ||
    //         ($request->type === 'upload' && $request->hasFile('file'))
    //     ) {
    //         if ($image->path && Storage::disk('public')->exists($image->path)) {
    //             Storage::disk('public')->delete($image->path);
    //         }
    //     }

    //     // Store new file or assign new link based on type
    //     if ($request->type === 'upload') {
    //         $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //     } else { // type is 'link'
    //         $validated['path'] = $validated['link'];
    //     }

    //     // Remove unused fields
    //     unset($validated['file'], $validated['link']);

    //     $image->update($validated);

    //     return to_route('landing.index')->with('success', 'Image updated successfully.');
    // }

    // public function update(Request $request, string $id)
    // {
    //     $image = Landing::findOrFail($id);

    //     // Basic validation first
    //     $validated = $request->validate([
    //         'category' => 'required|in:stories,published,portraits,drone-shots,prints',
    //         'size' => 'required|in:small,medium,large',
    //         'type' => 'required|in:link,upload',
    //         'link' => 'nullable|url',
    //         'file' => 'nullable|image|max:3072',
    //     ]);

    //     // Check for invalid combinations and add error to 'type' field
    //     $hasFile = $request->hasFile('file');
    //     $hasLink = $request->filled('link');

    //     if ($hasFile && $hasLink) {
    //         return back()
    //             ->withErrors(['type' => 'You must choose either a link OR a file upload, not both.'])
    //             ->withInput();
    //     }

    //     // Ensure required fields based on type
    //     if ($request->type === 'link' && !$hasLink) {
    //         return back()
    //             ->withErrors(['link' => 'A URL is required when type is set to link.'])
    //             ->withInput();
    //     }

    //     if ($request->type === 'upload' && !$hasFile && $image->type !== 'upload') {
    //         // Only require file if this is a new upload or changing from link to upload
    //         return back()
    //             ->withErrors(['file' => 'A file upload is required when type is set to upload.'])
    //             ->withInput();
    //     }

    //     // Delete old file if new one is uploaded or type is changed from upload to link
    //     if (
    //         ($image->type === 'upload' && $request->type === 'link') ||
    //         ($request->type === 'upload' && $hasFile)
    //     ) {
    //         if ($image->path && Storage::disk('public')->exists($image->path)) {
    //             Storage::disk('public')->delete($image->path);
    //         }
    //     }

    //     // Set path based on type
    //     if ($request->type === 'upload') {
    //         if ($hasFile) {
    //             $validated['path'] = $request->file('file')->store('uploads/landing', 'public');
    //         } else {
    //             // Keep existing path for updates without new file
    //             $validated['path'] = $image->path;
    //         }
    //     } else { // type is 'link'
    //         $validated['path'] = $validated['link'];
    //     }

    //     // Remove unused fields
    //     unset($validated['file'], $validated['link']);

    //     $image->update($validated);

    //     return to_route('landing.index')->with('success', 'Image updated successfully.');
    // }

    public function update(Request $request, string $id)
    {
        try {
            // First check if the record exists
            $image = Landing::findOrFail($id);

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
                'category' => 'required|in:stories,published,portraits,drone-shots,prints',
                'size' => 'required|in:small,medium,large',
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
                        $uploadedFilePath = $request->file('file')->store('uploads/landing', 'public');
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

                return to_route('landing.index')->with('success', 'Image updated successfully.');
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
        $landing = Landing::findOrFail($id);
        if ($landing->type !== 'link') {
            Storage::disk('public')->delete($landing->path);
        }
        $landing->delete();
        return redirect()->route('landing.index');
    }
}
