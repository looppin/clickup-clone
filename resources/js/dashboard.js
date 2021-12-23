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

        window.endProgress();

        // Formu oluştur
        const form = new Form({
            element: '#task-form',
            submitButton: '#task-form-submit',
            messageSlot: '#task-form-message',
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
