# The-Vault [register.html](https://github.com/user-attachments/files/25475073/register.html)

[edit-submission.html](https://github.com/user-attachments/files/25511061/edit-submission.html)
[edit-submission.js](https://github.com/user-attachments/files/25511063/edit-submission.js)[dashboard.js](https://github.com/user-attachments/files/25511075/dashboard.js)
[dashboard.html](https://github.com/user-attachments/files/25511074/dashboard.html)
[auth.js](https://github.com/user-attachments/files/25511073/auth.js)
[admin-login.html](https://github.com/user-attachments/files/25511072/admin-login.html)
[admin-dashboard.js](https://github.com/user-attachments/files/25511071/admin-dashboard.js)
[admin-dashboard.html](https://github.com/user-attachments/files/25511070/admin-dashboard.html)
[admin-auth.js](https://github.com/user-attachments/files/25511069/admin-auth.js)
[styles.css](https://github.com/user-attachments/files/25511068/styles.css)
[login.html](https://github.com/user-attachments/files/25511067/login.html)
[index.html](https://github.com/user-attachments/files/25511066/index.html)
[register.html](https://github.com/user-attachments/files/25528765/register.html)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Upload Course | Staff Portal</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">

    <style>
        textarea.form-control {
            min-height: 120px;
            resize: vertical;
        }

        .info-text {
            font-size: 0.8rem;
            color: #a1a1aa;
            margin-top: 0.5rem;
        }

        .message {
            margin-top: 1rem;
            font-size: 0.9rem;
        }

        .success {
            color: #10b981;
        }

        .error-msg {
            color: #ef4444;
        }
    </style>
</head>

<body>
<div class="auth-container">

    <div class="auth-header">
        <h1 class="auth-title">Upload Course</h1>
        <p class="auth-subtitle">Submit course content for review</p>
    </div>

    <form id="uploadForm" class="auth-form" novalidate>

        <div class="form-group">
            <label class="form-label">Course Title</label>
            <input type="text" id="title" class="form-control" required>
        </div>

        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea id="description" class="form-control" required></textarea>
        </div>

        <div class="form-group">
            <label class="form-label">Upload Files</label>
            <input type="file"
                   id="files"
                   class="form-control"
                   multiple
                   accept=".mp4,.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp3,.wav"
                   required>
            <div class="info-text">
                Allowed:
                MP4 (≤1GB),
                PDF/DOC/DOCX,
                PPT/PPTX,
                JPG/PNG (≤2MB),
                MP3/WAV
            </div>
        </div>

        <button type="submit" class="btn-primary">Submit Course</button>

        <div id="message" class="message"></div>

    </form>

</div>

<script>
const uploadForm = document.getElementById("uploadForm");
const messageDiv = document.getElementById("message");

const ONE_GB = 1 * 1024 * 1024 * 1024;
const TWO_MB = 2 * 1024 * 1024;

uploadForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    messageDiv.textContent = "";
    messageDiv.className = "message";

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const files = document.getElementById("files").files;

    if (!title || !description) {
        showError("Title and description are required.");
        return;
    }

    if (files.length === 0) {
        showError("You must upload at least one file.");
        return;
    }

    for (let file of files) {

        const type = file.type;

        if (type === "video/mp4") {
            if (file.size > ONE_GB) {
                showError(`Video ${file.name} exceeds 1GB limit.`);
                return;
            }
        }

        else if (type === "image/jpeg" || type === "image/png") {
            if (file.size > TWO_MB) {
                showError(`Image ${file.name} exceeds 2MB limit.`);
                return;
            }
        }

        else if (
            type === "application/pdf" ||
            type === "application/msword" ||
            type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            type === "application/vnd.ms-powerpoint" ||
            type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            type === "audio/mpeg" ||
            type === "audio/wav"
        ) {
            // allowed
        }

        else {
            showError(`File type not allowed: ${file.name}`);
            return;
        }
    }

    // Build FormData for backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    for (let file of files) {
        formData.append("files", file);
    }

    try {

        // 🔁 Replace URL with backend endpoint
        const response = await fetch("https://your-api-endpoint.com/api/courses", {
            method: "POST",
            body: formData,
            headers: {
                // If needed later:
                // "Authorization": "Bearer " + accessToken
            }
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        showSuccess("Course submitted successfully. Status: Pending Review.");

        uploadForm.reset();

    } catch (err) {
        showError("Something went wrong during upload.");
    }
});

function showError(msg) {
    messageDiv.textContent = msg;
    messageDiv.classList.add("error-msg");
}

function showSuccess(msg) {
    messageDiv.textContent = msg;
    messageDiv.classList.add("success");
}
</script>

</body>
</html>
