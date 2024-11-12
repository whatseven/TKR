// 显示时钟
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    // 更新数字时钟
    timeElement.textContent = now.toLocaleTimeString('zh-CN');
    dateElement.textContent = now.toLocaleDateString('zh-CN');
    
    // 更新模拟时钟
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');
    
    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
    const hourDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;

    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

// 个人照片上传
document.getElementById('profile-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-photo').src = e.target.result;
            // 可以添加保存到localStorage的代码
            localStorage.setItem('profile-photo', e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

// 加载保存的照片
window.addEventListener('load', function() {
    const savedPhoto = localStorage.getItem('profile-photo');
    if (savedPhoto) {
        document.getElementById('profile-photo').src = savedPhoto;
    }
});

// 滚动到备忘录部分
function scrollToMemo() {
    document.getElementById('memo-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// 备忘录功能
function addMemo() {
    const title = document.getElementById('memo-title').value;
    const content = document.getElementById('memo-content').value;
    const imageFile = document.getElementById('memo-image').files[0];
    const reminderTime = document.getElementById('reminder-time').value;
    
    if (!title || !content) return;

    const memoList = document.getElementById('memo-list');
    const memoCard = document.createElement('div');
    memoCard.className = 'memo-card';

    const now = new Date();
    
    let reminderHtml = '';
    if (reminderTime) {
        reminderHtml = `<div class="reminder-badge">
            <i class="fas fa-bell"></i> ${new Date(reminderTime).toLocaleString('zh-CN')}
        </div>`;
        
        // 设置提醒
        const timeUntilReminder = new Date(reminderTime) - new Date();
        if (timeUntilReminder > 0) {
            setTimeout(() => {
                alert(`提醒：${title}\n${content}`);
            }, timeUntilReminder);
        }
    }
    
    memoCard.innerHTML = `
        ${reminderHtml}
        <h3>${title}</h3>
        <p>${content}</p>
        <small>${now.toLocaleString('zh-CN')}</small>
    `;

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'memo-image';
            memoCard.appendChild(img);
        }
        reader.readAsDataURL(imageFile);
    }

    memoList.insertBefore(memoCard, memoList.firstChild);
    
    // 清空输入
    document.getElementById('memo-title').value = '';
    document.getElementById('memo-content').value = '';
    document.getElementById('memo-image').value = '';
    document.getElementById('reminder-time').value = '';
}

// 在现有代码后添加名字修改功能
function editName() {
    const nameElement = document.getElementById('user-name');
    const currentName = nameElement.textContent;
    const newName = prompt('请输入新的名字：', currentName);
    
    if (newName && newName.trim() !== '') {
        nameElement.textContent = newName.trim();
        // 保存到 localStorage
        localStorage.setItem('user-name', newName.trim());
    }
}

// 页面加载时恢复保存的名字
window.addEventListener('load', function() {
    const savedName = localStorage.getItem('user-name');
    if (savedName) {
        document.getElementById('user-name').textContent = savedName;
    }
});