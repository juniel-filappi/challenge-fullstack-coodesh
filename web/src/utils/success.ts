import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const handleSuccess = (message: string) => {
  MySwal.fire({ title: 'Sucesso', icon: "success", timer: 5000, html: message });
};
