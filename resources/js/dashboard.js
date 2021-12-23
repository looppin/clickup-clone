require('./bootstrap');
// require('./common');

import { blurBackground, unblurBackground, getSelectedChecks, showErrorModal, showSuccessModal } from './common';
import { Modal } from './modal';
import { Form } from './form';
import swal from 'sweetalert';
import axios from 'axios';
import { locale, __ } from './locale';

const Uppy = require('@uppy/core')
const Dashboard = require('@uppy/dashboard')
const XHRUpload = require('@uppy/xhr-upload')

const Turkish = require('@uppy/locales/lib/tr_TR')
const English = require('@uppy/locales/lib/en_US')
const Arabic = require('@uppy/locales/lib/ar_SA')

require('@uppy/core/dist/style.css')
require('@uppy/dashboard/dist/style.css')

let uppy;

const table = document.getElementById('media-table');

const modal = new Modal({
    id: 'media-edit-modal',
    close: '.close-modal',
});

window.taskAdd = () => {

    window.startProgress();

    // Düzenleme penceresini aç
    modal.load('/tasks/create').then(()=>{

        // Modal slota ekle
        modal.append();

        initUploadArea();

        window.endProgress();

        // Formu oluştur
        const form = new Form({
            element: '#customer-form',
            submitButton: '#customer-form-submit',
            messageSlot: '#customer-form-message',
            success: (response) => {
                form.disableSubmitButton();
                // window.startProgress();
                // modal.remove();

                swal({
                    title: __('saved'),
                    text: __('redirecting_to_table'),
                    icon: "success",
                    button: __('okay')
                });

                setTimeout(()=>{
                    location.reload();
                }, 1500);
            }
        })

    });
}

window.customerDelete = (button, event, id) => {

    event.preventDefault();

    blurBackground();

    swal({
        title: __('are_you_sure'),
        text: __('are_you_sure_msg'),
        icon: "warning",
        buttons: [__('cancel'),__('delete')],
        dangerMode: true,
    })
        .then((willDelete) => {

            unblurBackground();

            if (willDelete) {

                window.startProgress();

                axios.delete(`/customers/${id}`)
                    .then((response)=>{

                        window.endProgress();

                        swal({
                            title: __('deleted'),
                            text: __('redirecting_to_table'),
                            icon: "success",
                            button: false
                        });

                        setTimeout(()=>{
                            location.reload();
                        }, 500);

                    })



            } else {

            }
        });
}

const initUploadArea = (addMode = true) => {

    // const actionButton = document.getElementById("upload-action-button");

    console.log("locale",locale)

    let uppyLocale = Turkish;

    switch(locale){
        case 'en':
            uppyLocale = English;
            break;
        case 'ar':
            uppyLocale = Arabic;
            break;
    }

    uppy = Uppy({
        autoProceed: true,
        allowMultipleUploads: addMode ? false : true,
        restrictions: {
            allowedFileTypes: ['image/*','video/*'],
            maxFileSize: 1024 * 1024 * 1024 * 512 // 512mb
        } ,
        meta: {
            add_mode: addMode
        },
        locale: uppyLocale,

    })
        .use(Dashboard, {
            trigger: '#file-list',
            showProgressDetails: true,
            // closeAfterFinish: true,
            height: 300,
            inline: true,
            target: "#file-upload-area",
            // showSelectedFiles: false,
            // hideProgressAfterFinish: true,
            // closeModalOnClickOutside: true,

            proudlyDisplayPoweredByUppy: false,
        })
        .use(XHRUpload, {
            endpoint: '/medias/upload',
            fieldName: 'file',
            timeout: 5 * 60 * 1000,
            headers: {
                'X-CSRF-TOKEN': document.getElementsByName('_token')[0].value
            },
        })
        .on('upload', () => {
            // actionButton.disabled = "disabled";
        })
        .on('complete', (result) => {

            result.successful.forEach( (file) => {

                // Ekleme
                if (addMode){



                    // var input = document.createElement('input');
                    // input.type = 'hidden';
                    // input.name = 'medias[]';
                    // input.value = 1
                    // document.getElementById("uploaded-media").appendChild(input)

                    // Güncelleme
                } else {
                    const titleElement = document.querySelector('input[name=title]');

                    if (titleElement.value == ""){
                        titleElement.value = file.name;
                    }

                    document.querySelector('input[name=file_name]').value = file.response.body.name;
                    document.querySelector('input[name=file_original_name]').value = file.name;
                    document.querySelector('input[name=file_type]').value = file.response.body.type;
                    document.querySelector('input[name=video_duration]').value = file.response.body.duration;
                }


            })

            // Eğer yükleme ise
            if (addMode){

                swal({
                    title: __('upload_complete'),
                    icon: "success",
                    button: __('okay')
                })

                setTimeout(function(){
                    location.reload();
                }, 1500)
            }

        });

}
