
class Form {

    constructor(attrs){

        this.attrs = attrs;

        // Formun kendisi
        this.element = document.querySelector(this.attrs.element)

        // Submit
        if (this.attrs.submitButton != null){
            this.submitButton = document.querySelector(this.attrs.submitButton);
            this.submitButton.addEventListener('click', (e)=>{
                e.preventDefault();
                this.submit()
            })
        }

        if (this.attrs.messageSlot != null){
            this.messageSlot = document.querySelector(this.attrs.messageSlot);
        }

        if (this.element){
            this.element.addEventListener('keydown', (e)=>{
                switch(e.key){
                    case 'Enter':
                        e.preventDefault();
                        break;
                }
            })
        }

        if (this.attrs.ready != null){
            this.attrs.ready(this.element);
        }
    }

    // Form verisini hazırlar
    getValues() {

        let formData = new FormData();

        this.element.querySelectorAll("input, select, textarea").forEach((input)=>{
            switch(input.type){
                case 'file':
                    formData.append(input.name, input.file);
                    break;
                case 'checkbox':
                    if( input.checked ){
                        formData.append(input.name, input.value);
                    }
                    break;
                default:
                    formData.append(input.name, input.value);
                    break;
            }
        })

        return formData;
    }

    // Submit işlemi
    submit() {

        this.showSubmitButtonLoading();

        // const _methodInput = this.element.querySelector('input[name=_method]');
        // const method = _methodInput ? _methodInput.value : this.element.method;

        axios({
            method: this.element.method,
            url: this.element.action,
            data: this.getValues(),
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response)=>{

                this.hideSubmitButtonLoading();
                this.showSuccessMessage(response.data.message);
                this.removeErrorMessages();

                this.attrs.success(response);

            })
            .catch((error)=>{
                this.hideSubmitButtonLoading();
                this.catch(error)

                if (error.response != null){
                    this.showErrorMessage(error.response.data.message);
                }

            })
    }

    // Sonuç 200 döndürüyor
    then(response) {
        // console.log(response)
    }

    // Hata kodu geliyor
    catch(error) {
        this.handleErrors(error)
    }

    disableSubmitButton() {
        this.submitButton.classList.add('opacity-75');
        this.submitButton.disabled = true;
    }

    enableSubmitButton() {
        this.submitButton.classList.remove('opacity-75');
        this.submitButton.disabled = false;
    }

    showSubmitButtonLoading() {
        this.disableSubmitButton();
        this.submitButton.querySelector('svg').classList.remove('hidden');
    }

    hideSubmitButtonLoading() {
        this.enableSubmitButton();
        this.submitButton.querySelector('svg').classList.add('hidden');
    }

    // Hata mesajlarını inputlara dağıt
    handleErrors(error) {

        this.removeErrorMessages();

        if (error.response != null){
            for (const [key, messages] of Object.entries(error.response.data.errors)){

                var field = this.element.querySelector(`#${key}-field`);

                if (field) {
                    field.classList.add('has-errors');

                    // var ise önceki hata mesajlarını silelim
                    field.querySelectorAll('.field-error').forEach((span)=>{
                        field.removeChild(span);
                    })

                    // hata mesajları için spanları oluştur
                    messages.forEach((message)=>{
                        var span = document.createElement('span');
                        field.appendChild(span);
                        span.innerHTML = message;
                        span.classList.add('text-xs','text-red-500','animate-pulse','field-error');
                    })
                }
            }
        }
    }

    removeErrorMessages() {
        this.element.querySelectorAll('.field').forEach((element)=>{
            element.querySelectorAll('.field-error').forEach((span)=>{
                element.removeChild(span);
            })
            element.classList.remove('has-errors')
        })
    }

    hideMessage() {
        this.messageSlot.classList.add('hidden');
        this.messageSlot.querySelector('.message-slot').innerHTML = "";
    }


    showMessage(state, message) {

        this.messageSlot.classList.remove('hidden');
        this.messageSlot.querySelectorAll('svg').forEach(element=>element.classList.add('hidden'));

        switch(state){
            case 'success':
                // this.messageSlot.querySelector('svg.success-svg').classList.remove('hidden');
                break;
            case 'error':
                this.messageSlot.querySelector('svg.error-svg').classList.remove('hidden');
                break;
        }

        this.messageSlot.querySelector('.message-slot').innerHTML = message;
    }

    showErrorMessage(message) {
        this.showMessage('error', message);
    }

    showSuccessMessage(message) {
        this.showMessage('success', message);
    }

}

export { Form }
