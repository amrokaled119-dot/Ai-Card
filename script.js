/**
 * AI Card Studio - Logic Engine
 * وظيفة الملف: التحكم في التنقل، تحديث البيانات لحظياً، وتصدير الصورة
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. تعريف العناصر (DOM Elements)
    const inputs = {
        name: document.getElementById('nameInput'),
        job: document.getElementById('jobInput'),
        phone: document.getElementById('phoneInput'),
        email: document.getElementById('emailInput')
    };

    const preview = {
        name: document.getElementById('cardName'),
        job: document.getElementById('cardJob'),
        phone: document.getElementById('cardPhone'),
        email: document.getElementById('cardEmail')
    };

    const panels = {
        form: document.getElementById('formPanel'),
        loader: document.getElementById('loader'),
        preview: document.getElementById('previewSection')
    };

    // 2. التحديث اللحظي (Live Sync)
    // هذه الوظيفة تجعل المستخدم يرى التغييرات فور كتابتها
    const syncData = () => {
        preview.name.innerText = inputs.name.value || "الاسم الكامل";
        preview.job.innerText = inputs.job.value || "المسمى الوظيفي";
        preview.phone.innerText = inputs.phone.value ? `هاتف: ${inputs.phone.value}` : "رقم الهاتف";
        preview.email.innerText = inputs.email.value ? `بريد: ${inputs.email.value}` : "البريد الإلكتروني";
    };

    // ربط المدخلات بحدث الكتابة
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', syncData);
    });

    // 3. التحكم في الخطوات (Navigation)
    window.nextStep = (stepNumber) => {
        // التحقق من إدخال البيانات الأساسية في الخطوة الأولى
        if (stepNumber === 2 && !inputs.name.value) {
            alert("يرجى إدخال الاسم أولاً لإبهار الجميع!");
            return;
        }
        
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step${stepNumber}`).classList.add('active');
    };

    // 4. محاكاة توليد الذكاء الاصطناعي (AI Simulation)
    window.generateCard = () => {
        panels.form.style.display = 'none';
        panels.loader.style.display = 'block';

        // محاكاة وقت المعالجة ليعطي شعوراً بالفخامة
        setTimeout(() => {
            panels.loader.style.display = 'none';
            panels.preview.style.display = 'block';
            
            // إضافة تأثير حركي عند ظهور البطاقة
            document.getElementById('businessCard').style.animation = 'fadeIn 1s ease-out';
            
            // إعادة تفعيل الأيقونات إذا لزم الأمر
            if (window.lucide) lucide.createIcons();
        }, 2500);
    };

    // 5. وظيفة تحميل الصورة (Download Logic)
    window.downloadCard = () => {
        const cardElement = document.getElementById('businessCard');
        const btn = document.querySelector('.btn-primary[onclick="downloadCard()"]');
        
        // تغيير نص الزر أثناء المعالجة
        btn.innerText = "جاري التحضير...";
        btn.style.opacity = '0.7';

        html2canvas(cardElement, {
            backgroundColor: null, // خلفية شفافة
            scale: 3, // دقة عالية جداً للطباعة (3x)
            useCORS: true,
            logging: false
        }).then(canvas => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = image;
            link.download = `AI-Card-${inputs.name.value || 'Studio'}.png`;
            link.click();
            
            // إعادة الزر لحالته الطبيعية
            btn.innerHTML = 'تحميل البطاقة كصورة <i data-lucide="download"></i>';
            btn.style.opacity = '1';
            lucide.createIcons();
        });
    };
});
