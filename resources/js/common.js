import swal from 'sweetalert';
import { locale, __ } from './locale';

const blurBackground = () => {
    document.getElementById('top').classList.add('filter-blur');
}

const unblurBackground = () => {
    document.getElementById('top').classList.remove('filter-blur');
}

const progress = document.getElementById('progress')

window.startProgress = () => {

    progress.classList.remove('hidden');

    setTimeout(()=>{
        progress.classList.remove('progress-ends');
        progress.classList.add('progress-begins');
    },200)
}

window.endProgress = () => {
    progress.classList.remove('progress-begins')
    progress.classList.add('progress-ends')
    setTimeout(()=>{
        progress.classList.remove('progress-ends');
        progress.classList.add('hidden');
    }, 1000)
}

window.jumpOnChange = (item) => {
    window.location = item.value;
}

window.toggleMenu = (id) =>{
    const element = document.querySelector(id);
    element.classList.toggle('hidden')
    element.classList.remove('prevent-click-race')
    setTimeout(()=>{
        element.classList.add('prevent-click-race')
    }, 200)
}

// Menü dışına tıklandığında menüleri kapat
window.addEventListener('click', (e)=>{

    // Context menülerin kapatılması
    document.querySelectorAll('.context-menu').forEach((menuBox)=>{
        if (!menuBox.contains(e.target) && menuBox.classList.contains('prevent-click-race')){
            menuBox.classList.add('hidden');
            menuBox.classList.remove('prevent-click-race');
        }
    })

    // document.querySelectorAll('.inline-search-form').forEach((searchForm)=>{
    //     if (!searchForm.contains(e.target)){
    //         // searchForm.classList.add('hidden');
    //     }
    // })

})

window.showSearch = (element, event, dst) => {
    event.preventDefault();

    let form = document.querySelector(dst)

    element.classList.add('hidden')
    form.classList.remove('hidden')

    document.addEventListener('click', (e)=>{
        if (e.target.contains(form)){
            element.classList.remove('hidden')
            form.classList.add('hidden')
        }
    });

}


window.toggleSidebar = (element, event) => {
    event.preventDefault();
    document.getElementsByTagName('body')[0].classList.toggle('mobile-menu-closed');
}


// Verilen tablodaki seçili satırların id değerlerini döndürür
const getSelectedChecks = (table) => {
    let ids = [];
    if (table != null){
        table.querySelectorAll('input.id-checkbox:checked').forEach(element => {
            ids.push(element.value)
        });
    }
    return ids;
}


const showErrorModal = (error) => {

    let errorMessage = "";

    for (const [key, messages] of Object.entries(error.response.data.errors)){
        messages.forEach((message)=>{
            errorMessage += `${message}`
        });
    };

    swal({
        title: __('errors_occurred'),
        text: errorMessage,
        icon: "warning",
        button: 'Tamam',
        dangerMode: true,
    })
}

const showSuccessModal = (params) => {

    const swalParams = {
        title: '',
        text: '',
        icon: "success",
        button: false,
        ...params
    }

    swal(swalParams)
}

export { blurBackground, unblurBackground, getSelectedChecks, showErrorModal, showSuccessModal }
