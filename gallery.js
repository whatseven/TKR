// 照片上传和展示功能
document.getElementById('photo-upload').addEventListener('change', function(e) {
    const files = e.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                addPhotoToGallery(e.target.result);
                // 保存到 localStorage
                saveToLocalStorage(e.target.result);
            }
            
            reader.readAsDataURL(file);
        }
    }
});

function addPhotoToGallery(imageUrl) {
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    galleryItem.innerHTML = `
        <img src="${imageUrl}" alt="照片">
        <button class="delete-btn" onclick="deletePhoto(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    galleryGrid.appendChild(galleryItem);
}

function deletePhoto(button) {
    const galleryItem = button.parentElement;
    const imageUrl = galleryItem.querySelector('img').src;
    
    // 从 localStorage 中删除
    removeFromLocalStorage(imageUrl);
    
    galleryItem.remove();
}

// localStorage 操作
function saveToLocalStorage(imageUrl) {
    let photos = JSON.parse(localStorage.getItem('gallery-photos') || '[]');
    photos.push(imageUrl);
    localStorage.setItem('gallery-photos', JSON.stringify(photos));
}

function removeFromLocalStorage(imageUrl) {
    let photos = JSON.parse(localStorage.getItem('gallery-photos') || '[]');
    photos = photos.filter(url => url !== imageUrl);
    localStorage.setItem('gallery-photos', JSON.stringify(photos));
}

// 页面加载时恢复照片
window.addEventListener('load', function() {
    const photos = JSON.parse(localStorage.getItem('gallery-photos') || '[]');
    photos.forEach(imageUrl => addPhotoToGallery(imageUrl));
}); 