import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';


export const allguardsGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem( 'userConnect')==null || localStorage.getItem('userConnect')==undefined) {
    Swal.fire({
      icon:'error',
      text:'Connectez-vous si vous voulez acceder à cet espace',
      title:'Oops',
      confirmButtonColor: "#1E1E1E",
    }
      
    )
    router.navigate(['/accueil']);
    return false;

  }else{

    return true;
  }
};
