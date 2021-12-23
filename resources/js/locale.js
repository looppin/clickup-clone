let locale = document.getElementsByTagName("html")[0].getAttribute("lang");

const translations = {
    tr: {
        okay:'Tamam',
        updated: 'Güncellendi',
        saved: 'Kaydedildi',
        duplicated: 'Kopyalandı',
        are_you_sure: 'Emin misiniz?',
        are_you_sure_msg: 'Bu işlem sonucunda kayıt geri alınamaz bir şekilde silinecek',
        cancel: 'İptal',
        delete: 'Sil',
        record_deleted: 'Kayıt silindi',
        redirecting_to_table: 'Tekrar listeye yönlendiriliyorsunuz',
        action_queeud: 'İşlem sıraya alındı',
        first_select_records: 'İşlem yapmak istediğiniz kayıtları seçin',
        errors_occurred: 'Aşağıdaki hatalar oluştu',
        upload_complete: 'Dosya yükleme tamamlandı',
        media_added: 'İçerik listeye eklendi',
    },
    en: {
        okay:'Okay',
        updated: 'Updated',
        saved: 'Saved',
        duplicated: 'Duplicated',
        are_you_sure: 'Are you sure?',
        are_you_sure_msg: 'As a result of this action, the record will be deleted irreversibly.',
        cancel: 'Cancel',
        delete: 'Delete',
        record_deleted: 'Record deleted',
        redirecting_to_table: 'Redirecting to table',
        action_queued:'Action queued for execution',
        first_select_records: 'First select some records',
        errors_occurred: 'Errors',
        upload_complete: 'Upload complete',
        media_added: 'Media added to list',
    },
    ar: {
        okay:'تمام',
        updated: 'محدث',
        saved: 'تم الحفظ',
        duplicated: 'مكرر',
        are_you_sure: 'هل أنت واثق؟',
        are_you_sure_msg: 'نتيجة لهذا الإجراء ، سيتم حذف السجل نهائيًا.',
        cancel: 'يلغي',
        delete: 'حذف',
        record_deleted: 'تم حذف السجل',
        redirecting_to_table: 'إعادة التوجيه إلى الجدول',
        action_queued:'تم وضع الإجراء في قائمة انتظار التنفيذ',
        first_select_records: 'حدد أولاً بعض السجلات',
        errors_occurred: 'أخطاء',
        upload_complete: 'اكتمل التحميل',
        media_added: 'تمت إضافة الوسائط إلى القائمة',
    }
}



const __ = (key) => {

    locale = document.getElementsByTagName("html")[0].getAttribute("lang");

    return translations[locale][key]
}

export { locale, __ }
