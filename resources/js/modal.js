import { blurBackground, unblurBackground } from './common';

const modalSlot = document.getElementById('modal-slot');

class Modal {

    constructor(attrs) {
        this.attrs = attrs;
        this.url = null;
    }

    reload() {
        this.remove();
        this.load(this.attrs.url);
    }

    load(url = null) {

        if (url != null){
            this.attrs.url = url
        }

        this.attrs.url = url;

        return axios.get(this.attrs.url)
            .then((response)=>{

                // Pencere HTML oluştur
                this.element = document.createElement('div');
                this.element.innerHTML = response.data;

                // ESC ile kapat
                window.addEventListener('keyup', (e)=>{
                    if (e.key === "Escape") {
                        this.remove();
                    }
                })

                // Pencere kapatma elemanları
                this.element.querySelectorAll(this.attrs.close).forEach((closeElement)=>{
                    closeElement.addEventListener('click', ()=>{
                        this.remove();
                    })
                })

            })
            .catch(()=>{

            })
    }

    reloadContent() {

        return axios.get(this.attrs.url)
            .then((response)=>{

                // Pencere HTML oluştur
                this.element = document.createElement('div');
                this.element.innerHTML = response.data;

                // ESC ile kapat
                window.addEventListener('keyup', (e)=>{
                    if (e.key === "Escape") {
                        this.remove();
                    }
                })

                // Pencere kapatma elemanları
                this.element.querySelectorAll(this.attrs.close).forEach((closeElement)=>{
                    closeElement.addEventListener('click', ()=>{
                        this.remove();
                    })
                })

            })
            .catch(()=>{

            })
    }

    append() {
        blurBackground();
        modalSlot.appendChild(this.element);
    }

    remove() {
        unblurBackground();
        modalSlot.removeChild(this.element);

        if (this.onRemove){
            this.onRemove()
        }

    }

    hide() {

    }

}

export { Modal }
