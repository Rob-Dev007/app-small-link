import Swal from "sweetalert2";

export const toast = ({icon, title}) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
};

export const confirmDelete = async ({title, text, icon, cancelButton = true}) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: cancelButton,
    confirmButtonColor: "#06b6d4",
    cancelButtonColor: "#dc2626",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  return result;
};

export const showAlert = ({title, text, icon, buttonText = 'Aceptar'})=>{
         Swal.fire({
                    title : title,
                    text : text,
                    icon : icon,
                    confirmButtonText : buttonText,
                    customClass :{
                        popup: 'custom-popup',
                        title: 'custom-title',
                        confirmButton: 'custom-confirm-button'
                    }
                });
    }

